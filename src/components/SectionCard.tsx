import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export const SectionCard = ({ title, subtitle, action, children }: Props) => (
  <section className="rounded-3xl border border-border bg-card p-4 shadow-glow transition duration-300">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {action}
    </div>
    {children}
  </section>
);
