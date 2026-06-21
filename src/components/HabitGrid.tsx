import { getDayStatus, getPastDays } from '../utils/workout';
import type { DailyRecord } from '../types';

interface Props {
  records: DailyRecord[];
  onSelect: (date: string) => void;
}

const colors = {
  green: 'bg-success',
  yellow: 'bg-warning',
  red: 'bg-danger/70',
};

export const HabitGrid = ({ records, onSelect }: Props) => {
  const days = getPastDays(30);

  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
      {days.map((day) => {
        const record = records.find((entry) => entry.date === day);
        const status = getDayStatus(record);
        return (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={`aspect-square rounded-xl border border-border ${colors[status]} transition hover:scale-105`}
            title={day}
          />
        );
      })}
    </div>
  );
};
