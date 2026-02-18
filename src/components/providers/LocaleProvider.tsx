'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { LocaleContext } from '@/lib/i18n';
import type { Locale } from '@/i18n/config';

export const LocaleToggleContext = createContext<() => void>(() => {});

export function useToggleLocale() {
  return useContext(LocaleToggleContext);
}

export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const newLocale = prev === 'en' ? 'mr' : 'en';
      document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      document.documentElement.lang = newLocale;
      return newLocale;
    });
  }, []);

  return (
    <LocaleContext.Provider value={locale}>
      <LocaleToggleContext.Provider value={toggleLocale}>
        {children}
      </LocaleToggleContext.Provider>
    </LocaleContext.Provider>
  );
}
