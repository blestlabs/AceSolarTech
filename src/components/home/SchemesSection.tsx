'use client';

import { FileCheck, IndianRupee, Tractor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';

export default function SchemesSection() {
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
            {t('schemes.title')}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{t('schemes.subtitle')}</p>
        </motion.div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* PM Surya Ghar card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
          >
            <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <IndianRupee size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-base font-bold">{t('schemes.pmSurya')}</h3>
            </div>

            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
                <span className="text-sm text-text">1 kW</span>
                <span className="text-sm font-bold text-success">₹30,000</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
                <span className="text-sm text-text">2 kW</span>
                <span className="text-sm font-bold text-success">₹60,000</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
                <span className="text-sm text-text">3 kW</span>
                <span className="text-sm font-bold text-success">₹78,000</span>
              </li>
            </ul>

            <p className="mt-3 flex items-center gap-1.5 text-sm text-text-secondary">
              <FileCheck size={16} className="text-primary" />
              {t('schemes.freeProcess')}
            </p>
            </div>
          </motion.div>

          {/* KUSUM Yojana card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
          >
            <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <Tractor size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-base font-bold">{t('schemes.kusum')}</h3>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {t('schemes.kusumDesc')}
            </p>

            <div className="mt-4 flex items-center gap-1.5">
              <FileCheck size={16} className="text-primary" />
              <span className="text-sm font-medium text-text">{t('schemes.freeProcessKusum')}</span>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
