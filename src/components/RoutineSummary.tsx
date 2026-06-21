import { calculateRoutineDuration } from '../utils/workout';
import type { RoutineExercise } from '../types';

interface Props {
  routine: RoutineExercise[];
  title: string;
}

export const RoutineSummary = ({ routine, title }: Props) => {
  const minutes = Math.ceil(calculateRoutineDuration(routine) / 60);

  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{routine.length} exercises planned</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Duration</p>
          <p className="text-lg font-semibold text-accent">~{minutes} min</p>
        </div>
      </div>
    </div>
  );
};
