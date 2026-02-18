'use client';

import { useTranslations } from '@/lib/i18n';

const categories = ['all', 'residential', 'farm', 'commercial'] as const;

interface DealFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function DealFilter({ activeFilter, onFilterChange }: DealFilterProps) {
  const t = useTranslations();

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          aria-pressed={activeFilter === cat}
          className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
            activeFilter === cat
              ? 'bg-primary text-white'
              : 'border border-border bg-white text-text-secondary'
          }`}
        >
          {t(`deals.${cat}`)}
        </button>
      ))}
    </div>
  );
}
