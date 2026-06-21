import type { DailyRecord, DayStatus, RoutineExercise, WorkoutSessionType } from '../types';

export const formatDate = (date: Date) =>
  date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

export const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const getTodayKey = () => new Date().toISOString().slice(0, 10);

export const getDayStatus = (record?: DailyRecord): DayStatus => {
  if (!record) return 'red';
  if (record.morningCompleted && record.eveningCompleted) return 'green';
  if (record.morningCompleted || record.eveningCompleted) return 'yellow';
  return 'red';
};

export const getPastDays = (count: number) => {
  const days: string[] = [];
  const today = new Date();
  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
};

export const calculateRoutineDuration = (routine: RoutineExercise[]) =>
  routine.reduce((total, exercise) => {
    const active = exercise.durationSeconds ?? exercise.sets * 45;
    const rest = Math.max(exercise.sets - 1, 0) * exercise.restSeconds;
    return total + active + rest;
  }, 0);

export const addSeconds = (date: Date, seconds: number) => new Date(date.getTime() + seconds * 1000);

export const getCompletionStats = (records: DailyRecord[]) => {
  const totalCompletedWorkouts = records.reduce(
    (sum, record) => sum + Number(record.morningCompleted) + Number(record.eveningCompleted),
    0,
  );

  const statusCounts = records.reduce(
    (acc, record) => {
      acc[getDayStatus(record)] += 1;
      return acc;
    },
    { green: 0, yellow: 0, red: 0 } as Record<DayStatus, number>,
  );

  const streakDates = records
    .filter((record) => record.morningCompleted || record.eveningCompleted)
    .map((record) => record.date)
    .sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let cursor = new Date();

  while (streakDates.includes(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  let running = 0;
  let previous: Date | null = null;
  for (const value of streakDates) {
    const current = new Date(value);
    if (previous) {
      const diff = Math.round((current.getTime() - previous.getTime()) / 86400000);
      running = diff === 1 ? running + 1 : 1;
    } else {
      running = 1;
    }
    longestStreak = Math.max(longestStreak, running);
    previous = current;
  }

  return {
    totalCompletedWorkouts,
    totalMissedWorkouts: records.length * 2 - totalCompletedWorkouts,
    currentStreak,
    longestStreak,
    statusCounts,
  };
};

export const getMonthlyCompletion = (records: DailyRecord[]) => {
  const now = new Date();
  const monthRecords = records.filter((record) => {
    const date = new Date(record.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const completed = monthRecords.reduce(
    (sum, record) => sum + Number(record.morningCompleted) + Number(record.eveningCompleted),
    0,
  );
  const possible = Math.max(monthRecords.length * 2, 1);
  return Math.round((completed / possible) * 100);
};

export const updateRoutineOrders = (routine: RoutineExercise[]) =>
  routine.map((exercise, index) => ({ ...exercise, order: index + 1 }));

export const moveItem = <T,>(items: T[], from: number, to: number) => {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const toggleRecordSession = (
  records: DailyRecord[],
  session: WorkoutSessionType,
  date = getTodayKey(),
) => {
  const index = records.findIndex((record) => record.date === date);
  if (index === -1) {
    return [
      ...records,
      {
        date,
        morningCompleted: session === 'morning',
        eveningCompleted: session === 'evening',
      },
    ];
  }

  return records.map((record, recordIndex) =>
    recordIndex === index
      ? {
          ...record,
          morningCompleted: session === 'morning' ? !record.morningCompleted : record.morningCompleted,
          eveningCompleted: session === 'evening' ? !record.eveningCompleted : record.eveningCompleted,
        }
      : record,
  );
};
