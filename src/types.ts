export type WorkoutSessionType = 'morning' | 'evening';
export type DayStatus = 'green' | 'yellow' | 'red';

export interface Exercise {
  id: string;
  name: string;
  image: string;
  sets: number;
  reps: string;
  restSeconds: number;
  description: string;
  notes: string;
  targets?: string[];
  durationSeconds?: number;
}

export interface RoutineExercise extends Exercise {
  order: number;
}

export interface DailyRecord {
  date: string;
  morningCompleted: boolean;
  eveningCompleted: boolean;
  notes?: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  url: string;
  category: WorkoutSessionType;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface GuidedWorkoutState {
  session: WorkoutSessionType;
  exerciseIndex: number;
  isRunning: boolean;
  isPaused: boolean;
  isResting: boolean;
  remainingSeconds: number;
  completedSets: number;
  startedAt?: string;
}

export interface AppState {
  exercises: Exercise[];
  routines: Record<WorkoutSessionType, RoutineExercise[]>;
  records: DailyRecord[];
  playlists: PlaylistItem[];
  settings: AppSettings;
  guidedWorkout: GuidedWorkoutState | null;
}
