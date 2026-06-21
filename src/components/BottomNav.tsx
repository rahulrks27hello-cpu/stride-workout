import { NavLink } from 'react-router-dom';
import { Activity, BarChart3, BookOpen, Dumbbell, Home, Music2, Settings } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/today', label: 'Today', icon: Activity },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/builder', label: 'Builder', icon: Dumbbell },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
  { to: '/music', label: 'Music', icon: Music2 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/90 px-2 py-2 backdrop-blur">
    <div className="mx-auto grid max-w-4xl grid-cols-7 gap-2">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] transition ${
              isActive ? 'bg-accent/15 text-accent' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);
