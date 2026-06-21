import { useState } from 'react';
import { SectionCard } from '../components/SectionCard';
import { RoutineEditorRow } from '../components/RoutineEditorRow';
import type { Exercise, RoutineExercise, WorkoutSessionType } from '../types';

interface Props {
  exercises: Exercise[];
  routines: Record<WorkoutSessionType, RoutineExercise[]>;
  onAddToRoutine: (session: WorkoutSessionType, exerciseId: string) => void;
  onUpdateExercise: (session: WorkoutSessionType, exercise: RoutineExercise) => void;
  onRemove: (session: WorkoutSessionType, order: number) => void;
  onReorder: (session: WorkoutSessionType, from: number, to: number) => void;
  onMove: (from: WorkoutSessionType, to: WorkoutSessionType, order: number) => void;
}

export const BuilderPage = ({ exercises, routines, onAddToRoutine, onUpdateExercise, onRemove, onReorder, onMove }: Props) => {
  const [selectedMorning, setSelectedMorning] = useState(exercises[0]?.id ?? '');
  const [selectedEvening, setSelectedEvening] = useState(exercises[0]?.id ?? '');

  return (
    <div className="space-y-4">
      {(['morning', 'evening'] as WorkoutSessionType[]).map((session) => (
        <SectionCard key={session} title={`${session[0].toUpperCase()}${session.slice(1)} Routine Builder`} subtitle="Autosaves every change to local storage.">
          <div className="mb-4 flex gap-3">
            <select value={session === 'morning' ? selectedMorning : selectedEvening} onChange={(event) => session === 'morning' ? setSelectedMorning(event.target.value) : setSelectedEvening(event.target.value)} className="flex-1 rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white">
              {exercises.map((exercise) => <option key={exercise.id} value={exercise.id}>{exercise.name}</option>)}
            </select>
            <button onClick={() => onAddToRoutine(session, session === 'morning' ? selectedMorning : selectedEvening)} className="rounded-2xl bg-accent px-4 py-3 font-semibold text-slate-950">Add</button>
          </div>
          <div className="space-y-3">
            {routines[session].map((exercise, index) => (
              <RoutineEditorRow
                key={`${session}-${exercise.order}-${exercise.id}`}
                exercise={exercise}
                session={session}
                onChange={(updated) => onUpdateExercise(session, updated)}
                onRemove={() => onRemove(session, exercise.order)}
                onMove={() => onMove(session, session === 'morning' ? 'evening' : 'morning', exercise.order)}
                onReorder={(direction) => onReorder(session, index, direction === 'up' ? Math.max(index - 1, 0) : Math.min(index + 1, routines[session].length - 1))}
              />
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  );
};
