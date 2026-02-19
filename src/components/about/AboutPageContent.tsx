'use client';

import Image from 'next/image';
import {
  Sun, Sprout, Zap, Lightbulb, Lamp, Building2, Car, Droplets,
  MessageCircle, MapPin, Wrench,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
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
  { num: 1, icon: MessageCircle, titleKey: 'about.step1', descKey: 'about.step1Desc', image: '/images/about-step-whatsapp.png', imageAlt: 'Customer sending WhatsApp message to AceSolarTech' },
  { num: 2, icon: MapPin, titleKey: 'about.step2', descKey: 'about.step2Desc', image: '/images/about-step-site-visit.png', imageAlt: 'Solar technicians doing rooftop site assessment' },
  { num: 3, icon: Wrench, titleKey: 'about.step3', descKey: 'about.step3Desc', image: '/images/about-step-installation.png', imageAlt: 'Professional solar panel installation in progress' },
];

export default function AboutPageContent() {
  const locale = useLocale();
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Mission Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[3/1]">
              <Image src="/images/about-mission.png" alt="Maharashtra transitioning to solar energy" fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center px-6 md:px-12">
              <p className="max-w-lg font-display text-lg font-medium text-white md:text-2xl drop-shadow-lg">
                {t('about.mission')}
              </p>
            </div>
          </motion.div>

          {/* Team photo */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[2.5/1]">
              <Image src="/images/about-team.png" alt="AceSolarTech team" fill className="object-cover" sizes="100vw" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl font-bold md:text-2xl"
          >
            {t('about.services')}
          </motion.h2>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
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
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
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
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center md:flex-1"
                >
                  <div className="mx-auto mb-3 w-48 overflow-hidden rounded-xl">
                    <Image src={step.image} alt={step.imageAlt} width={192} height={192} className="object-cover" />
                  </div>
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
