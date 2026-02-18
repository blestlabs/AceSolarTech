'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';

const districts = [
  { name: 'Dhule', hq: true },
  { name: 'Nashik', hq: false },
  { name: 'Jalgaon', hq: false },
  { name: 'Nandurbar', hq: false },
  { name: 'Ahmednagar', hq: false },
  { name: 'Pune', hq: false },
  { name: 'Mumbai', hq: false },
  { name: 'Chh. Sambhajinagar', hq: false },
  { name: 'Kolhapur', hq: false },
  { name: 'Nagpur', hq: false },
];

export default function ServiceArea() {
  const t = useTranslations();

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-xl font-bold md:text-2xl">
            {t('serviceArea.title')}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{t('serviceArea.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {districts.map((district) => (
            <span
              key={district.name}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                district.hq
                  ? 'bg-primary text-white'
                  : 'bg-primary-light text-text'
              }`}
            >
              {district.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
