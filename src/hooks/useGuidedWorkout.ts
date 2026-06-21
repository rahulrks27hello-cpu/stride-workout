import { useEffect, useMemo, useRef } from 'react';
import type { GuidedWorkoutState, RoutineExercise, WorkoutSessionType } from '../types';

interface Options {
  routine: RoutineExercise[];
  session: WorkoutSessionType;
  state: GuidedWorkoutState | null;
  onChange: (next: GuidedWorkoutState | null) => void;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export const useGuidedWorkout = ({ routine, session, state, onChange, soundEnabled, vibrationEnabled }: Options) => {
  const audioRef = useRef<AudioContext | null>(null);

  const currentExercise = useMemo(() => {
    if (!state || state.session !== session) return null;
    return routine[state.exerciseIndex] ?? null;
  }, [routine, session, state]);

  useEffect(() => {
    if (!state || state.session !== session || state.isPaused || !state.isRunning) return;

    const timer = window.setTimeout(() => {
      if (state.remainingSeconds > 0) {
        onChange({ ...state, remainingSeconds: state.remainingSeconds - 1 });
        return;
      }

      if (soundEnabled && typeof window !== 'undefined') {
        audioRef.current ??= new AudioContext();
        const oscillator = audioRef.current.createOscillator();
        const gain = audioRef.current.createGain();
        oscillator.connect(gain);
        gain.connect(audioRef.current.destination);
        oscillator.frequency.value = 880;
        gain.gain.value = 0.03;
        oscillator.start();
        oscillator.stop(audioRef.current.currentTime + 0.15);
      }

      if (vibrationEnabled && navigator.vibrate) navigator.vibrate(150);

      if (!currentExercise) {
        onChange(null);
        return;
      }

      if (!state.isResting) {
        onChange({
          ...state,
          isResting: true,
          remainingSeconds: currentExercise.restSeconds,
        });
        return;
      }

      const nextIndex = state.exerciseIndex + 1;
      if (nextIndex >= routine.length) {
        onChange(null);
        return;
      }

      const nextExercise = routine[nextIndex];
      onChange({
        ...state,
        exerciseIndex: nextIndex,
        isResting: false,
        remainingSeconds: nextExercise.durationSeconds ?? 45,
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [currentExercise, onChange, routine, session, soundEnabled, state, vibrationEnabled]);

  const controls = {
    start: () => {
      const first = routine[0];
      if (!first) return;
      onChange({
        session,
        exerciseIndex: 0,
        isRunning: true,
        isPaused: false,
        isResting: false,
        remainingSeconds: first.durationSeconds ?? 45,
        completedSets: 0,
        startedAt: new Date().toISOString(),
      });
    },
    pause: () => state && onChange({ ...state, isPaused: true }),
    resume: () => state && onChange({ ...state, isPaused: false }),
    end: () => onChange(null),
    next: () => {
      if (!state) return;
      const nextIndex = Math.min(state.exerciseIndex + 1, routine.length - 1);
      const nextExercise = routine[nextIndex];
      onChange({ ...state, exerciseIndex: nextIndex, isResting: false, remainingSeconds: nextExercise.durationSeconds ?? 45 });
    },
    previous: () => {
      if (!state) return;
      const prevIndex = Math.max(state.exerciseIndex - 1, 0);
      const prevExercise = routine[prevIndex];
      onChange({ ...state, exerciseIndex: prevIndex, isResting: false, remainingSeconds: prevExercise.durationSeconds ?? 45 });
    },
    skip: () => {
      if (!state) return;
      controls.next();
    },
  };

  return { currentExercise, controls };
};
