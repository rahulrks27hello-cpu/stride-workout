import { useState } from 'react';
import { Music2, Trash2 } from 'lucide-react';
import { SectionCard } from '../components/SectionCard';
import type { PlaylistItem, WorkoutSessionType } from '../types';

interface Props {
  playlists: PlaylistItem[];
  active?: PlaylistItem;
  onActivate: (playlist: PlaylistItem) => void;
  onSave: (playlist: PlaylistItem) => void;
  onDelete: (playlistId: string) => void;
}

export const MusicPage = ({ playlists, active, onActivate, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<WorkoutSessionType>('morning');

  return (
    <div className="space-y-4">
      <SectionCard title="Music Companion" subtitle="Save YouTube videos or playlists for each session.">
        <div className="grid gap-3 sm:grid-cols-3">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Playlist title" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="YouTube URL" className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white" />
          <select value={category} onChange={(event) => setCategory(event.target.value as WorkoutSessionType)} className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-white">
            <option value="morning">Morning Playlist</option>
            <option value="evening">Evening Playlist</option>
          </select>
          <button
            onClick={() => {
              const item = { id: `${category}-${Date.now()}`, title: title || `${category} playlist`, url, category };
              onSave(item);
              setTitle('');
              setUrl('');
            }}
            className="sm:col-span-3 rounded-2xl bg-accent px-4 py-3 font-semibold text-slate-950"
          >
            Save Playlist
          </button>
        </div>
      </SectionCard>

      <div className="space-y-3">
        {playlists.map((playlist) => (
          <article key={playlist.id} className="rounded-3xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{playlist.category}</p>
                <h3 className="font-semibold text-white">{playlist.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{playlist.url}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onActivate(playlist)} className="rounded-2xl bg-muted px-3 py-2 text-white"><Music2 size={16} /></button>
                <button onClick={() => onDelete(playlist.id)} className="rounded-2xl bg-danger/10 px-3 py-2 text-danger"><Trash2 size={16} /></button>
              </div>
            </div>
            {active?.id === playlist.id ? <p className="mt-3 text-sm text-accent">Now playing in floating player.</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
};
