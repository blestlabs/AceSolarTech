'use client';

import { useLocale } from '@/lib/i18n';
import { useToggleLocale } from '@/components/providers/LocaleProvider';

export default function LangToggle() {
  const locale = useLocale();
  const toggleLocale = useToggleLocale();

  return (
    <button
      onClick={toggleLocale}
      className="flex h-8 items-center rounded-full border border-border bg-surface text-sm"
      aria-label="Toggle language"
    >
      <span
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === 'en'
            ? 'bg-primary text-white'
            : 'text-text-secondary'
        }`}
      >
        EN
      </span>
      <span
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === 'mr'
            ? 'bg-primary text-white'
            : 'text-text-secondary'
        }`}
      >
        मराठी
      </span>
    </button>
  );
}
