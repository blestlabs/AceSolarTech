'use client';

import {
  Sun, Sprout, Zap, Lightbulb, Lamp, Building2, Car, Droplets,
  MessageCircle, MapPin, Wrench, Building, Award, IndianRupee,
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
  { num: 1, icon: MessageCircle, titleKey: 'about.step1', descKey: 'about.step1Desc' },
  { num: 2, icon: MapPin, titleKey: 'about.step2', descKey: 'about.step2Desc' },
  { num: 3, icon: Wrench, titleKey: 'about.step3', descKey: 'about.step3Desc' },
];

export default function AboutPageContent() {
  const locale = useLocale();
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Our Story Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-primary-light p-6 md:p-8"
          >
            <h2 className="font-display text-xl font-bold md:text-2xl">
              {locale === 'mr' ? 'आमची कथा' : 'Our Story'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
              {locale === 'mr'
                ? 'ACE SOLAR TECH LLP ही धुळे, महाराष्ट्र स्थित सौर ऊर्जा कंपनी आहे. आम्ही घरमालक, शेतकरी आणि उत्तर महाराष्ट्रातील व्यवसायांना सेवा देतो. PM सूर्य घर आणि कुसुम योजनांचे अधिकृत डीलर म्हणून, आम्ही प्रदेशातील सर्वात कमी किमतीत सोलर परवडणारे बनवण्यासाठी वचनबद्ध आहोत.'
                : 'ACE SOLAR TECH LLP is a solar energy company based in Dhule, Maharashtra. We serve homeowners, farmers, and businesses across North Maharashtra. As authorized dealers for PM Surya Ghar and KUSUM Yojana, we are committed to making solar affordable with the lowest prices in the region.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-text">
                <Award size={14} className="text-primary" />
                {locale === 'mr' ? 'PM सूर्य घर अधिकृत डीलर' : 'PM Surya Ghar Authorized Dealer'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-text">
                <IndianRupee size={14} className="text-primary" />
                {locale === 'mr' ? 'कुसुम योजना अधिकृत डीलर' : 'KUSUM Yojana Authorized Dealer'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-text">
                <Building size={14} className="text-primary" />
                {locale === 'mr' ? 'धुळे, महाराष्ट्र' : 'Dhule, Maharashtra'}
              </span>
            </div>
            <p className="mt-3 text-xs text-text-muted">
              {locale === 'mr'
                ? 'पत्ता: दुकान क्र. 108, श्रीराम शॉपिंग कॉम्प्लेक्स, साक्री रोड, धुळे'
                : 'Address: Shop No. 108, Shriram Shopping Complex, Sakri Road, Dhule'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 mt-4 md:mt-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-surface p-6 md:p-8"
          >
            <p className="font-display text-lg font-medium text-text md:text-xl">
              {t('about.mission')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 mt-12 md:mt-16">
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
      <section className="bg-surface px-4 mt-12 py-8 md:mt-16 md:py-12">
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

          <div className="relative mt-8 flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
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
