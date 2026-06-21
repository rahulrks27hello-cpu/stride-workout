import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SectionCard } from '../components/SectionCard';
import { getCompletionStats, getDayStatus, getPastDays, getMonthlyCompletion } from '../utils/workout';
import type { DailyRecord } from '../types';

interface Props {
  records: DailyRecord[];
}

export const StatsPage = ({ records }: Props) => {
  const stats = getCompletionStats(records);
  const monthly = getMonthlyCompletion(records);
  const trendData = getPastDays(30).map((day) => {
    const record = records.find((entry) => entry.date === day);
    return {
      day: day.slice(5),
      completed: Number(record?.morningCompleted) + Number(record?.eveningCompleted),
      streak: getDayStatus(record) === 'red' ? 0 : 1,
      green: getDayStatus(record) === 'green' ? 1 : 0,
      yellow: getDayStatus(record) === 'yellow' ? 1 : 0,
      red: getDayStatus(record) === 'red' ? 1 : 0,
    };
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          ['Current Streak', stats.currentStreak],
          ['Longest Streak', stats.longestStreak],
          ['Success Rate', `${monthly}%`],
          ['Completed', stats.totalCompletedWorkouts],
          ['Missed', stats.totalMissedWorkouts],
          ['Green Days', stats.statusCounts.green],
          ['Yellow Days', stats.statusCounts.yellow],
          ['Red Days', stats.statusCounts.red],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-3xl border border-border bg-card p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Monthly Completion Trend" subtitle="Workouts completed per day.">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid stroke="#273142" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Streak Trend" subtitle="Consistency signal over the last 30 days.">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid stroke="#273142" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="streak" stroke="#facc15" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Workout Consistency Chart" subtitle="Day color distribution over time.">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} stackOffset="expand">
              <CartesianGrid stroke="#273142" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="green" stackId="a" fill="#22c55e" />
              <Bar dataKey="yellow" stackId="a" fill="#facc15" />
              <Bar dataKey="red" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
};
