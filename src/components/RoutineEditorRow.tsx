import { ArrowDown, ArrowUp, ArrowRightLeft, Trash2 } from 'lucide-react';
import type { RoutineExercise, WorkoutSessionType } from '../types';

interface Props {
  exercise: RoutineExercise;
  session: WorkoutSessionType;
  onChange: (exercise: RoutineExercise) => void;
  onRemove: () => void;
  onMove: () => void;
  onReorder: (direction: 'up' | 'down') => void;
}

export const RoutineEditorRow = ({ exercise, session, onChange, onRemove, onMove, onReorder }: Props) => (
  <div className="space-y-3 rounded-2xl border border-border bg-muted/30 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{session} #{exercise.order}</p>
        <h4 className="font-semibold text-white">{exercise.name}</h4>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onReorder('up')} className="rounded-xl bg-card p-2 text-slate-300"><ArrowUp size={14} /></button>
        <button onClick={() => onReorder('down')} className="rounded-xl bg-card p-2 text-slate-300"><ArrowDown size={14} /></button>
        <button onClick={onMove} className="rounded-xl bg-card p-2 text-slate-300"><ArrowRightLeft size={14} /></button>
        <button onClick={onRemove} className="rounded-xl bg-danger/10 p-2 text-danger"><Trash2 size={14} /></button>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 text-sm">
      <label className="space-y-1 text-slate-400">
        <span>Sets</span>
        <input value={exercise.sets} type="number" min="1" onChange={(event) => onChange({ ...exercise, sets: Number(event.target.value) })} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-white" />
      </label>
      <label className="space-y-1 text-slate-400">
        <span>Reps</span>
        <input value={exercise.reps} onChange={(event) => onChange({ ...exercise, reps: event.target.value })} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-white" />
      </label>
      <label className="space-y-1 text-slate-400">
        <span>Rest</span>
        <input value={exercise.restSeconds} type="number" min="0" onChange={(event) => onChange({ ...exercise, restSeconds: Number(event.target.value) })} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-white" />
      </label>
    </div>
  </div>
);
