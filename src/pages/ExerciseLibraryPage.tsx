import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionCard } from '../components/SectionCard';
import { ExerciseCard } from '../components/ExerciseCard';
import type { Exercise } from '../types';

interface Props {
  exercises: Exercise[];
  onAdd: (exercise: Exercise) => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseId: string) => void;
  onDuplicate: (exerciseId: string) => void;
}

const blankExercise: Exercise = {
  id: '',
  name: '',
  image: '',
  sets: 3,
  reps: '12 reps',
  restSeconds: 45,
  description: '',
  notes: '',
};

export const ExerciseLibraryPage = ({ exercises, onAdd, onEdit, onDelete, onDuplicate }: Props) => {
  const [draft, setDraft] = useState<Exercise>(blankExercise);
  const [editingId, setEditingId] = useState<string | null>(null);

  const availableImages = useMemo(() => Array.from(new Set(exercises.map((exercise) => exercise.image))).filter(Boolean), [exercises]);

  const submit = () => {
    const next = { ...draft, id: editingId ?? draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
    if (editingId) onEdit(next);
    else onAdd(next);
    setDraft(blankExercise);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Exercise Library" subtitle="Add, edit, duplicate, and manage your exercise collection.">
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Exercise name" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <select value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white">
            <option value="">Select asset image</option>
            {availableImages.map((image) => <option key={image} value={image}>{image}</option>)}
          </select>
          <input value={draft.sets} type="number" min="1" onChange={(event) => setDraft({ ...draft, sets: Number(event.target.value) })} placeholder="Sets" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <input value={draft.reps} onChange={(event) => setDraft({ ...draft, reps: event.target.value })} placeholder="Reps" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <input value={draft.restSeconds} type="number" min="0" onChange={(event) => setDraft({ ...draft, restSeconds: Number(event.target.value) })} placeholder="Rest time" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <input value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} placeholder="Notes" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Description" className="sm:col-span-2 rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" rows={3} />
          <button onClick={submit} className="sm:col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 font-semibold text-slate-950">
            <Plus size={16} /> {editingId ? 'Update Exercise' : 'Add Exercise'}
          </button>
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={() => {
              setDraft(exercise);
              setEditingId(exercise.id);
            }}
            onDuplicate={() => onDuplicate(exercise.id)}
            onDelete={() => onDelete(exercise.id)}
          />
        ))}
      </div>
    </div>
  );
};
