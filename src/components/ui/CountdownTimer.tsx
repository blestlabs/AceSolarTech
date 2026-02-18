'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

interface CountdownTimerProps {
  expiresAt: string;
}

function getTimeRemaining(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export default function CountdownTimer({ expiresAt }: CountdownTimerProps) {
  const t = useTranslations();
  const [remaining, setRemaining] = useState(() => getTimeRemaining(expiresAt));

  useEffect(() => {
    const update = () => setRemaining(getTimeRemaining(expiresAt));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!remaining) return null;

  return (
    <span aria-live="polite" aria-atomic="true" className="inline-flex items-center gap-1.5 text-sm font-medium text-danger">
      <Clock size={14} className="shrink-0" />
      {t('deals.endsIn')}{' '}
      {remaining.days}{t('deals.days')}{' '}
      {remaining.hours}{t('deals.hours')}{' '}
      {remaining.minutes}{t('deals.minutes')}
    </span>
  );
}
