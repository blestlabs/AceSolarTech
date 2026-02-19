'use client';

import Image from 'next/image';
import { useTranslations } from '@/lib/i18n';
import SavingsCalculator from '@/components/calculator/SavingsCalculator';

export default function CalculatorPageContent() {
  const t = useTranslations();

  return (
    <>
      <div className="relative h-40 md:h-56">
        <Image src="/images/calculator-hero.png" alt="Solar savings calculator concept" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-2xl font-bold text-white drop-shadow-lg md:text-3xl">{t('calculator.title')}</h1>
        </div>
      </div>
      <section className="mx-auto max-w-lg px-4 py-6">
        <SavingsCalculator />
      </section>
    </>
  );
}
