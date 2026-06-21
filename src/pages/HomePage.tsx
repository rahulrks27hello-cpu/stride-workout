import { Link } from 'react-router-dom';
import { Activity, CalendarRange, Flame, MoonStar, PlayCircle, TrendingUp } from 'lucide-react';
import { SectionCard } from '../components/SectionCard';
import { StatusPill } from '../components/StatusPill';
import { HabitGrid } from '../components/HabitGrid';
import { formatDate, formatTime, getCompletionStats, getDayStatus, getMonthlyCompletion } from '../utils/workout';
import type { DailyRecord, WorkoutSessionType } from '../types';

interface Props {
  now: Date;
  records: DailyRecord[];
  todayRecord?: DailyRecord;
  onToggleSession: (session: WorkoutSessionType) => void;
  onSelectDay: (day: string) => void;
}

export const HomePage = ({ now, records, todayRecord, onToggleSession, onSelectDay }: Props) => {
  const stats = getCompletionStats(records);
  const monthlyCompletion = getMonthlyCompletion(records);
  const todayStatus = getDayStatus(todayRecord);

  return (
    <div className="space-y-4">
      <SectionCard
        title="Stride Dashboard"
        subtitle="Your personal training, streak, and recovery command center."
        action={<MoonStar className="text-accent" size={20} />}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-muted/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Today</p>
            <p className="mt-2 text-xl font-semibold text-white">{formatDate(now)}</p>
            <p className="text-slate-400">{formatTime(now)}</p>
          </div>
          <div className="rounded-2xl bg-muted/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
            <div className="mt-3"><StatusPill status={todayStatus} label={todayStatus.toUpperCase()} /></div>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Current Streak', value: stats.currentStreak, icon: Flame },
          { label: 'Longest Streak', value: stats.longestStreak, icon: TrendingUp },
          { label: 'Completed Workouts', value: stats.totalCompletedWorkouts, icon: Activity },
          { label: 'Monthly Success', value: `${monthlyCompletion}%`, icon: CalendarRange },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-3xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-400">{label}</p>
              <Icon size={16} className="text-accent" />
            </div>
            <p className="text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Today's Check-in" subtitle="Track both sessions and keep the streak alive.">
        <div className="space-y-3">
          {[
            { key: 'morning', label: 'Morning Workout', value: todayRecord?.morningCompleted },
            { key: 'evening', label: 'Evening Workout', value: todayRecord?.eveningCompleted },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => onToggleSession(item.key as WorkoutSessionType)}
              className="flex w-full items-center justify-between rounded-2xl bg-muted/30 px-4 py-4 text-left"
            >
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-slate-400">{item.value ? 'Completed' : 'Pending'}</p>
              </div>
              <StatusPill status={item.value ? 'green' : 'red'} label={item.value ? 'Done' : 'Pending'} />
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Quick Actions" subtitle="Jump straight into today’s plan.">
        <div className="grid grid-cols-2 gap-3">
          <Link to="/today?session=morning" className="rounded-2xl bg-accent px-4 py-4 text-center font-semibold text-slate-950">Start Morning Workout</Link>
          <Link to="/today?session=evening" className="rounded-2xl bg-warning px-4 py-4 text-center font-semibold text-slate-950">Start Evening Workout</Link>
          <Link to="/stats" className="rounded-2xl bg-muted px-4 py-4 text-center font-semibold text-white">View Statistics</Link>
          <Link to="/calendar" className="rounded-2xl bg-muted px-4 py-4 text-center font-semibold text-white">View Workout Calendar</Link>
        </div>
      </SectionCard>

      <SectionCard title="Monthly Habit Tracker" subtitle="GitHub-style 30-day consistency view.">
        <HabitGrid records={records} onSelect={onSelectDay} />
      </SectionCard>

      <SectionCard title="Month Snapshot" subtitle="Green = both, yellow = one, red = missed.">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-success/10 p-4 text-success"><p className="text-2xl font-semibold">{stats.statusCounts.green}</p><p className="text-sm">Green</p></div>
          <div className="rounded-2xl bg-warning/10 p-4 text-warning"><p className="text-2xl font-semibold">{stats.statusCounts.yellow}</p><p className="text-sm">Yellow</p></div>
          <div className="rounded-2xl bg-danger/10 p-4 text-danger"><p className="text-2xl font-semibold">{stats.statusCounts.red}</p><p className="text-sm">Red</p></div>
        </div>
      </SectionCard>
    </div>
  );
};
