'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from '@/lib/i18n';
import { calculate } from '@/lib/solar-calc';
import { generalInquiry } from '@/lib/whatsapp';

export default function QuickCalculator() {
  const locale = useLocale();
  const t = useTranslations();
  const [bill, setBill] = useState(3000);

  const result = calculate(bill, 'residential', 'dhule');
  const savings = result.monthlySavings;
  const annual = result.annualSavings;

  return (
    <section className="px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl rounded-2xl bg-surface p-6"
      >
        <h2 className="font-display text-xl font-bold md:text-2xl">
          {t('calculator.title')}
        </h2>

        {/* Slider label */}
        <p className="mt-4 text-sm text-text-secondary">{t('calculator.monthlyBill')}</p>

        {/* Current value */}
        <p className="mt-1 text-2xl font-bold text-primary">
          ₹{bill.toLocaleString('en-IN')}<span className="text-base font-normal text-text-secondary">{t('calculator.perMonth')}</span>
        </p>

        {/* Range slider */}
        <input
          type="range"
          min={500}
          max={50000}
          step={500}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-text-muted">
          <span>₹500</span>
          <span>₹50,000</span>
        </div>

        {/* Savings output */}
        <div className="mt-5 rounded-xl bg-white p-4">
          <p className="text-base text-text">
            {t('calculator.youSave')}{' '}
            <span className="text-xl font-bold text-success">
              ₹{savings.toLocaleString('en-IN')}{t('calculator.perMonth')}
            </span>
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {t('calculator.thats')}{' '}
            <span className="font-semibold text-success">₹{annual.toLocaleString('en-IN')}{t('calculator.perYear')}</span>!
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={generalInquiry(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white active:bg-whatsapp-dark"
          >
            <MessageCircle size={20} />
            {t('calculator.getQuote')}
          </a>
          <Link
            href="/calculator"
            className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-primary"
          >
            {t('calculator.fullCalc')} <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
