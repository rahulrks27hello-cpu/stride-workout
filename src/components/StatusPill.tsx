import { CheckCircle2, CircleDashed, XCircle } from 'lucide-react';
import type { DayStatus } from '../types';

const styles: Record<DayStatus, string> = {
  green: 'bg-success/20 text-success border-success/40',
  yellow: 'bg-warning/20 text-warning border-warning/40',
  red: 'bg-danger/20 text-danger border-danger/40',
};

const icons = {
  green: CheckCircle2,
  yellow: CircleDashed,
  red: XCircle,
};

export const StatusPill = ({ status, label }: { status: DayStatus; label: string }) => {
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>
      <Icon size={14} />
      {label}
    </span>
  );
};
