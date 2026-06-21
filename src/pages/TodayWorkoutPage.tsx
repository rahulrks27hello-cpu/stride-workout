import { useMemo } from 'react';
import { SectionCard } from '../components/SectionCard';
import { GuidedWorkoutPanel } from '../components/GuidedWorkoutPanel';
import { RoutineSummary } from '../components/RoutineSummary';
import { addSeconds, calculateRoutineDuration, formatTime } from '../utils/workout';
import type { GuidedWorkoutState, RoutineExercise, WorkoutSessionType } from '../types';

interface Props {
  routines: Record<WorkoutSessionType, RoutineExercise[]>;
  guidedWorkout: GuidedWorkoutState | null;
  session: WorkoutSessionType;
  controls: {
    start: () => void;
    pause: () => void;
    resume: () => void;
    previous: () => void;
    next: () => void;
    skip: () => void;
    end: () => void;
  };
  currentExercise: RoutineExercise | null;
}

export const TodayWorkoutPage = ({ routines, guidedWorkout, session, controls, currentExercise }: Props) => {
  const routine = routines[session];
  const duration = calculateRoutineDuration(routine);
  const finishTime = useMemo(() => formatTime(addSeconds(new Date(), duration)), [duration]);

  return (
    <div className="space-y-4">
      <SectionCard title="Today's Workout" subtitle="Guided mode with progress, controls, and finish estimates.">
        <div className="grid gap-3 sm:grid-cols-2">
          <RoutineSummary title="Morning Routine" routine={routines.morning} />
          <RoutineSummary title="Evening Routine" routine={routines.evening} />
        </div>
      </SectionCard>

      <SectionCard title={`${session === 'morning' ? 'Morning' : 'Evening'} Guided Mode`} subtitle={`Expected completion around ${finishTime}`}>
        <GuidedWorkoutPanel
          state={guidedWorkout?.session === session ? guidedWorkout : null}
          currentExercise={currentExercise}
          total={routine.length}
          onStart={controls.start}
          onPause={controls.pause}
          onResume={controls.resume}
          onPrevious={controls.previous}
          onNext={controls.next}
          onSkip={controls.skip}
          onEnd={controls.end}
        />
      </SectionCard>

      <SectionCard title="Exercise Flow" subtitle={`Estimated duration: ${Math.ceil(duration / 60)} minutes`}>
        <div className="space-y-3">
          {routine.map((exercise) => (
            <article key={`${session}-${exercise.order}-${exercise.id}`} className="rounded-2xl border border-border bg-card/80 p-3">
              <div className="flex gap-3">
                <img src={`./exercises/${exercise.image}`} alt={exercise.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Exercise {exercise.order}</p>
                  <h3 className="font-semibold text-white">{exercise.name}</h3>
                  <p className="text-sm text-slate-400">{exercise.sets} sets × {exercise.reps}</p>
                  <p className="text-sm text-slate-400">Rest: {exercise.restSeconds} seconds</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};
