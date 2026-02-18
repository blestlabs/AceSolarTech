'use client';

import {
  Sun, Sprout, Zap, Lightbulb, Lamp, Building2, Car, Droplets,
  MessageCircle, MapPin, Wrench,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations, getLocalizedField } from '@/lib/i18n';
import productsData from '@/data/products.json';
import SchemesSection from '@/components/home/SchemesSection';
import ServiceArea from '@/components/home/ServiceArea';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Sprout,
  Zap,
  Lightbulb,
  Lamp,
  Building2,
  Car,
  Droplets,
};

const steps = [
  { num: 1, icon: MessageCircle, titleKey: 'about.step1', descKey: 'about.step1Desc' },
  { num: 2, icon: MapPin, titleKey: 'about.step2', descKey: 'about.step2Desc' },
  { num: 3, icon: Wrench, titleKey: 'about.step3', descKey: 'about.step3Desc' },
];

export default function AboutPageContent() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      {/* Mission Section */}
      <section className="px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl border-l-4 border-primary pl-5 py-2"
        >
          <p className="font-display text-xl font-medium text-text md:text-2xl">
            {t('about.mission')}
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl font-bold md:text-2xl"
          >
            {t('about.services')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          >
            {productsData.products.map((product) => {
              const Icon = iconMap[product.icon] || Sun;
              return (
                <div
                  key={product.id}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-4 text-center"
                >
                  <Icon size={36} className="text-primary" />
                  <span className="text-sm font-semibold text-text">
                    {getLocalizedField(product.name, locale)}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {getLocalizedField(product.description, locale)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center font-display text-xl font-bold md:text-2xl"
          >
            {t('about.howItWorks')}
          </motion.h2>

          <div className="relative mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0">
            {/* Connection line (desktop only) */}
            <div className="absolute left-[16.67%] right-[16.67%] top-6 hidden h-0.5 bg-border md:block" />

            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center md:flex-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {step.num}
                  </div>
                  <StepIcon size={24} className="mt-3 text-primary" />
                  <h3 className="mt-2 font-display text-base font-bold text-text">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-1 max-w-[200px] text-sm text-text-secondary">
                    {t(step.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reused Components */}
      <SchemesSection />
      <ServiceArea />
      <WhatsAppCTA />
    </>
  );
}
