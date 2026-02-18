'use client';

import { useTranslations } from '@/lib/i18n';
import SavingsCalculator from '@/components/calculator/SavingsCalculator';

export default function CalculatorPageContent() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-lg px-4 py-6">
      <h1 className="font-display text-2xl font-bold">{t('calculator.title')}</h1>
      <div className="mt-6">
        <SavingsCalculator />
      </div>
    </section>
  );
}
