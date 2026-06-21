import { useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { PlaylistItem } from '../types';

const toEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.get('list')) {
      return `https://www.youtube.com/embed/videoseries?list=${parsed.searchParams.get('list')}`;
    }
    const videoId = parsed.searchParams.get('v') ?? parsed.pathname.split('/').filter(Boolean).pop();
    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return '';
  }
};

interface Props {
  playlist?: PlaylistItem;
  minimized: boolean;
  onToggle: () => void;
}

export const FloatingMusicPlayer = ({ playlist, minimized, onToggle }: Props) => {
  const embedUrl = useMemo(() => (playlist ? toEmbedUrl(playlist.url) : ''), [playlist]);
  if (!playlist || !embedUrl) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-border bg-card p-3 shadow-glow">
      <button onClick={onToggle} className="mb-2 flex w-full items-center justify-between text-sm text-slate-300">
        <span>{playlist.title}</span>
        {minimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {!minimized ? (
        <div className="overflow-hidden rounded-2xl">
          <iframe
            className="aspect-video w-full"
            src={embedUrl}
            title={playlist.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
};
