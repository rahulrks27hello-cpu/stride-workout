import { Edit3, Copy, Trash2 } from 'lucide-react';
import type { Exercise } from '../types';

interface Props {
  exercise: Exercise;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const ExerciseCard = ({ exercise, onEdit, onDuplicate, onDelete }: Props) => (
  <article className="overflow-hidden rounded-3xl border border-border bg-card">
    <img src={`./exercises/${exercise.image}`} alt={exercise.name} className="h-44 w-full object-cover" />
    <div className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{exercise.name}</h3>
          <p className="text-sm text-slate-400">{exercise.sets} sets • {exercise.reps} • {exercise.restSeconds}s rest</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">{exercise.notes}</p>
      <div className="flex gap-2">
        <button onClick={onEdit} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-white">
          <Edit3 size={14} /> Edit
        </button>
        <button onClick={onDuplicate} className="rounded-2xl bg-muted px-3 py-2 text-white">
          <Copy size={14} />
        </button>
        <button onClick={onDelete} className="rounded-2xl bg-danger/10 px-3 py-2 text-danger">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  </article>
);
