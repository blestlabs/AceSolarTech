'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@/i18n/config';
import en from '@/i18n/en.json';
import mr from '@/i18n/mr.json';

const messages: Record<string, typeof en> = { en, mr };

export const LocaleContext = createContext<Locale>('en');

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useTranslations() {
  const locale = useLocale();
  return function t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    let result = typeof value === 'string' ? value : key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v));
      }
    }
    return result;
  };
}

export function getLocalizedField<T extends Record<string, string>>(field: T, locale: Locale): string {
  return field[locale] || field['en'] || '';
}
