import type { AppState } from '../types';
import { defaultExercises, defaultPlaylists, defaultRoutines } from '../data/defaults';

export const STORAGE_KEY = 'stride-workout-state';

export const createDefaultState = (): AppState => ({
  exercises: defaultExercises,
  routines: defaultRoutines,
  records: [],
  playlists: defaultPlaylists,
  settings: {
    theme: 'dark',
    soundEnabled: true,
    vibrationEnabled: true,
  },
  guidedWorkout: null,
});

export const loadState = (): AppState => {
  if (typeof window === 'undefined') return createDefaultState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();

    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...createDefaultState(),
      ...parsed,
      settings: {
        ...createDefaultState().settings,
        ...parsed.settings,
      },
      routines: {
        ...createDefaultState().routines,
        ...parsed.routines,
      },
    };
  } catch {
    return createDefaultState();
  }
};

export const saveState = (state: AppState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
