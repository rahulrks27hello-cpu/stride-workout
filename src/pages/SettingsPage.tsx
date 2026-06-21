import { Download, RotateCcw, Upload } from 'lucide-react';
import { SectionCard } from '../components/SectionCard';
import type { AppState } from '../types';

interface Props {
  state: AppState;
  onThemeToggle: () => void;
  onSoundToggle: () => void;
  onVibrationToggle: () => void;
  onReset: () => void;
  onImport: (value: AppState) => void;
}

export const SettingsPage = ({ state, onThemeToggle, onSoundToggle, onVibrationToggle, onReset, onImport }: Props) => {
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stride-workout-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Preferences" subtitle="Theme, notifications, and persistence controls.">
        <div className="space-y-3">
          <button onClick={onThemeToggle} className="flex w-full items-center justify-between rounded-2xl bg-muted/30 px-4 py-4 text-white"><span>Theme</span><span>{state.settings.theme}</span></button>
          <button onClick={onSoundToggle} className="flex w-full items-center justify-between rounded-2xl bg-muted/30 px-4 py-4 text-white"><span>Sound</span><span>{state.settings.soundEnabled ? 'On' : 'Off'}</span></button>
          <button onClick={onVibrationToggle} className="flex w-full items-center justify-between rounded-2xl bg-muted/30 px-4 py-4 text-white"><span>Vibration</span><span>{state.settings.vibrationEnabled ? 'On' : 'Off'}</span></button>
        </div>
      </SectionCard>

      <SectionCard title="Backup & Restore" subtitle="Export your local data or import it back later.">
        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={exportData} className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 font-semibold text-slate-950"><Download size={16} /> Export Data</button>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-muted px-4 py-3 font-semibold text-white">
            <Upload size={16} /> Import Data
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                onImport(JSON.parse(text));
              }}
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Reset Progress" subtitle="Clears local history, routines, playlists, and settings.">
        <button onClick={onReset} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-danger/15 px-4 py-3 font-semibold text-danger"><RotateCcw size={16} /> Reset All Progress</button>
      </SectionCard>
    </div>
  );
};
