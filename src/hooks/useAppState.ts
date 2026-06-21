import { useEffect, useMemo, useState } from 'react';
import type { AppState, DailyRecord, Exercise, GuidedWorkoutState, PlaylistItem, RoutineExercise, WorkoutSessionType } from '../types';
import { defaultPlaylists } from '../data/defaults';
import { createDefaultState, loadState, saveState } from '../utils/storage';
import { getTodayKey, moveItem, toggleRecordSession, updateRoutineOrders } from '../utils/workout';

const createExerciseFromTemplate = (exercise: Exercise, order: number): RoutineExercise => ({
  ...exercise,
  order,
});

export const useAppState = () => {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
    document.documentElement.classList.toggle('dark', state.settings.theme === 'dark');
    document.body.dataset.theme = state.settings.theme;
  }, [state]);

  const todayRecord = useMemo(
    () => state.records.find((record) => record.date === getTodayKey()),
    [state.records],
  );

  const actions = {
    toggleSessionComplete: (session: WorkoutSessionType, date?: string) => {
      setState((current) => ({ ...current, records: toggleRecordSession(current.records, session, date) }));
    },
    addExercise: (exercise: Exercise) => {
      setState((current) => ({ ...current, exercises: [...current.exercises, exercise] }));
    },
    updateExercise: (exercise: Exercise) => {
      setState((current) => ({
        ...current,
        exercises: current.exercises.map((item) => (item.id === exercise.id ? exercise : item)),
        routines: {
          morning: current.routines.morning.map((item) => (item.id === exercise.id ? { ...exercise, order: item.order } : item)),
          evening: current.routines.evening.map((item) => (item.id === exercise.id ? { ...exercise, order: item.order } : item)),
        },
      }));
    },
    deleteExercise: (exerciseId: string) => {
      setState((current) => ({
        ...current,
        exercises: current.exercises.filter((item) => item.id !== exerciseId),
        routines: {
          morning: updateRoutineOrders(current.routines.morning.filter((item) => item.id !== exerciseId)),
          evening: updateRoutineOrders(current.routines.evening.filter((item) => item.id !== exerciseId)),
        },
      }));
    },
    duplicateExercise: (exerciseId: string) => {
      setState((current) => {
        const source = current.exercises.find((item) => item.id === exerciseId);
        if (!source) return current;
        const duplicate = { ...source, id: `${source.id}-${Date.now()}`, name: `${source.name} Copy` };
        return { ...current, exercises: [...current.exercises, duplicate] };
      });
    },
    addExerciseToRoutine: (session: WorkoutSessionType, exerciseId: string) => {
      setState((current) => {
        const exercise = current.exercises.find((item) => item.id === exerciseId);
        if (!exercise) return current;
        const routine = current.routines[session];
        return {
          ...current,
          routines: {
            ...current.routines,
            [session]: [...routine, createExerciseFromTemplate(exercise, routine.length + 1)],
          },
        };
      });
    },
    updateRoutineExercise: (session: WorkoutSessionType, updated: RoutineExercise) => {
      setState((current) => ({
        ...current,
        routines: {
          ...current.routines,
          [session]: current.routines[session].map((item) => (item.order === updated.order ? updated : item)),
        },
      }));
    },
    removeRoutineExercise: (session: WorkoutSessionType, order: number) => {
      setState((current) => ({
        ...current,
        routines: {
          ...current.routines,
          [session]: updateRoutineOrders(current.routines[session].filter((item) => item.order !== order)),
        },
      }));
    },
    reorderRoutine: (session: WorkoutSessionType, from: number, to: number) => {
      setState((current) => ({
        ...current,
        routines: {
          ...current.routines,
          [session]: updateRoutineOrders(moveItem(current.routines[session], from, to)),
        },
      }));
    },
    moveExerciseBetweenRoutines: (from: WorkoutSessionType, to: WorkoutSessionType, order: number) => {
      setState((current) => {
        const source = current.routines[from].find((item) => item.order === order);
        if (!source) return current;
        return {
          ...current,
          routines: {
            ...current.routines,
            [from]: updateRoutineOrders(current.routines[from].filter((item) => item.order !== order)),
            [to]: updateRoutineOrders([...current.routines[to], { ...source, order: current.routines[to].length + 1 }]),
          },
        };
      });
    },
    setGuidedWorkout: (guidedWorkout: GuidedWorkoutState | null) => {
      setState((current) => ({ ...current, guidedWorkout }));
    },
    savePlaylist: (playlist: PlaylistItem) => {
      setState((current) => {
        const exists = current.playlists.some((item) => item.id === playlist.id);
        return {
          ...current,
          playlists: exists
            ? current.playlists.map((item) => (item.id === playlist.id ? playlist : item))
            : [...current.playlists, playlist],
        };
      });
    },
    deletePlaylist: (playlistId: string) => {
      setState((current) => {
        const next = current.playlists.filter((item) => item.id !== playlistId);
        return { ...current, playlists: next.length ? next : defaultPlaylists };
      });
    },
    updateSettings: (partial: Partial<AppState['settings']>) => {
      setState((current) => ({ ...current, settings: { ...current.settings, ...partial } }));
    },
    importState: (nextState: AppState) => setState(nextState),
    resetAll: () => setState(createDefaultState()),
    upsertRecord: (record: DailyRecord) => {
      setState((current) => ({
        ...current,
        records: current.records.some((item) => item.date === record.date)
          ? current.records.map((item) => (item.date === record.date ? record : item))
          : [...current.records, record],
      }));
    },
  };

  return { state, actions, todayRecord };
};
