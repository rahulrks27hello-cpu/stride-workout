import { Pause, Play, SkipBack, SkipForward, Square, TimerReset } from 'lucide-react';
import type { GuidedWorkoutState, RoutineExercise } from '../types';

interface Props {
  state: GuidedWorkoutState | null;
  currentExercise: RoutineExercise | null;
  total: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  onEnd: () => void;
}

export const GuidedWorkoutPanel = ({
  state,
  currentExercise,
  total,
  onStart,
  onPause,
  onResume,
  onPrevious,
  onNext,
  onSkip,
  onEnd,
}: Props) => {
  const progress = state ? ((state.exerciseIndex + 1) / Math.max(total, 1)) * 100 : 0;

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-4 shadow-glow">
      {!state || !currentExercise ? (
        <button onClick={onStart} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 font-semibold text-slate-950">
          <Play size={16} /> Start Workout
        </button>
      ) : (
        <>
          <img src={`./exercises/${currentExercise.image}`} alt={currentExercise.name} className="h-52 w-full rounded-2xl object-cover" />
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Exercise {state.exerciseIndex + 1} of {total}</p>
            <h3 className="text-2xl font-semibold text-white">{currentExercise.name}</h3>
            <p className="text-slate-400">{currentExercise.sets} sets × {currentExercise.reps} • Rest {currentExercise.restSeconds}s</p>
          </div>
          <div>
            <div className="mb-2 h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>{state.isResting ? 'Rest' : 'Active'}</span>
              <span className="font-semibold text-white">{state.remainingSeconds}s</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={onPrevious} className="rounded-2xl bg-muted p-3 text-white"><SkipBack size={16} className="mx-auto" /></button>
            {state.isPaused ? (
              <button onClick={onResume} className="rounded-2xl bg-accent p-3 text-slate-950"><Play size={16} className="mx-auto" /></button>
            ) : (
              <button onClick={onPause} className="rounded-2xl bg-warning p-3 text-slate-950"><Pause size={16} className="mx-auto" /></button>
            )}
            <button onClick={onNext} className="rounded-2xl bg-muted p-3 text-white"><SkipForward size={16} className="mx-auto" /></button>
            <button onClick={onSkip} className="rounded-2xl bg-muted p-3 text-white"><TimerReset size={16} className="mx-auto" /></button>
          </div>
          <button onClick={onEnd} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-danger/15 px-4 py-3 font-medium text-danger">
            <Square size={16} /> End Workout
          </button>
        </>
      )}
    </div>
  );
};
