'use client';

import Image from 'next/image';
import { MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';
import type { LucideIcon } from 'lucide-react';

interface Reason {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  image: string;
  imageAlt: string;
}

const reasons: Reason[] = [
  { icon: MapPin, titleKey: 'why.freeVisit', descKey: 'why.freeVisitDesc', image: '/images/why-free-visit.png', imageAlt: 'Solar technician arriving for free site visit' },
  { icon: CreditCard, titleKey: 'why.emi', descKey: 'why.emiDesc', image: '/images/why-emi-available.png', imageAlt: 'Easy EMI solar financing' },
  { icon: ShieldCheck, titleKey: 'why.warranty', descKey: 'why.warrantyDesc', image: '/images/why-warranty-25year.png', imageAlt: '25-year solar panel warranty' },
];

export default function WhyUs() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-xl font-bold md:text-2xl"
        >
          {t('why.title')}
        </motion.h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reasons.map(({ icon: Icon, titleKey, descKey, image, imageAlt }, idx) => (
            <motion.div
              key={titleKey}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="mt-3 text-base font-semibold">{t(titleKey)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{t(descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
