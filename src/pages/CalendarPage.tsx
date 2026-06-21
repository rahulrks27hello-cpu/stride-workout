import { SectionCard } from '../components/SectionCard';
import { StatusPill } from '../components/StatusPill';
import { getDayStatus } from '../utils/workout';
import type { DailyRecord } from '../types';

interface Props {
  record?: DailyRecord;
  date: string;
}

export const CalendarPage = ({ record, date }: Props) => {
  const status = getDayStatus(record);
  return (
    <div className="space-y-4">
      <SectionCard title="Workout Calendar" subtitle="Tap any box from the dashboard to inspect the day.">
        <div className="rounded-3xl bg-muted/30 p-5">
          <p className="text-sm text-slate-400">Selected day</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{date}</h2>
          <div className="mt-3"><StatusPill status={status} label={status.toUpperCase()} /></div>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>Morning Workout: {record?.morningCompleted ? 'Completed' : 'Pending'}</p>
            <p>Evening Workout: {record?.eveningCompleted ? 'Completed' : 'Pending'}</p>
            {record?.notes ? <p>Notes: {record.notes}</p> : null}
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
