import { useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { useAppState } from './hooks/useAppState';
import { useClock } from './hooks/useClock';
import { useGuidedWorkout } from './hooks/useGuidedWorkout';
import { BuilderPage } from './pages/BuilderPage';
import { CalendarPage } from './pages/CalendarPage';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { HomePage } from './pages/HomePage';
import { MusicPage } from './pages/MusicPage';
import { SettingsPage } from './pages/SettingsPage';
import { StatsPage } from './pages/StatsPage';
import { TodayWorkoutPage } from './pages/TodayWorkoutPage';
import type { PlaylistItem, WorkoutSessionType } from './types';

const App = () => {
  const now = useClock();
  const location = useLocation();
  const { state, actions, todayRecord } = useAppState();
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date().toISOString().slice(0, 10));
  const [activePlaylist, setActivePlaylist] = useState<PlaylistItem | undefined>(state.playlists[0]);
  const [musicMinimized, setMusicMinimized] = useState(false);

  const search = new URLSearchParams(location.search);
  const session = (search.get('session') === 'evening' ? 'evening' : 'morning') as WorkoutSessionType;

  const guided = useGuidedWorkout({
    routine: state.routines[session],
    session,
    state: state.guidedWorkout,
    onChange: actions.setGuidedWorkout,
    soundEnabled: state.settings.soundEnabled,
    vibrationEnabled: state.settings.vibrationEnabled,
  });

  const selectedRecord = useMemo(
    () => state.records.find((record) => record.date === selectedCalendarDate),
    [selectedCalendarDate, state.records],
  );

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-5">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Stride Workout</p>
          <h1 className="text-2xl font-semibold text-white">Train consistently, recover smart.</h1>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage now={now} records={state.records} todayRecord={todayRecord} onToggleSession={actions.toggleSessionComplete} onSelectDay={(day) => setSelectedCalendarDate(day)} />} />
        <Route path="/today" element={<TodayWorkoutPage routines={state.routines} guidedWorkout={state.guidedWorkout} session={session} controls={guided.controls} currentExercise={guided.currentExercise} />} />
        <Route path="/library" element={<ExerciseLibraryPage exercises={state.exercises} onAdd={actions.addExercise} onEdit={actions.updateExercise} onDelete={actions.deleteExercise} onDuplicate={actions.duplicateExercise} />} />
        <Route path="/builder" element={<BuilderPage exercises={state.exercises} routines={state.routines} onAddToRoutine={actions.addExerciseToRoutine} onUpdateExercise={actions.updateRoutineExercise} onRemove={actions.removeRoutineExercise} onReorder={actions.reorderRoutine} onMove={actions.moveExerciseBetweenRoutines} />} />
        <Route path="/stats" element={<StatsPage records={state.records} />} />
        <Route path="/music" element={<MusicPage playlists={state.playlists} active={activePlaylist} onActivate={setActivePlaylist} onSave={actions.savePlaylist} onDelete={actions.deletePlaylist} />} />
        <Route path="/settings" element={<SettingsPage state={state} onThemeToggle={() => actions.updateSettings({ theme: state.settings.theme === 'dark' ? 'light' : 'dark' })} onSoundToggle={() => actions.updateSettings({ soundEnabled: !state.settings.soundEnabled })} onVibrationToggle={() => actions.updateSettings({ vibrationEnabled: !state.settings.vibrationEnabled })} onReset={actions.resetAll} onImport={actions.importState} />} />
        <Route path="/calendar" element={<CalendarPage record={selectedRecord} date={selectedCalendarDate} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FloatingMusicPlayer playlist={activePlaylist} minimized={musicMinimized} onToggle={() => setMusicMinimized((value) => !value)} />
      <BottomNav />
    </div>
  );
};

export default App;
