'use client';

import Image from 'next/image';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations, getLocalizedField } from '@/lib/i18n';
import { dealInquiry, generalInquiry } from '@/lib/whatsapp';
import deals from '@/data/deals.json';

export default function HeroDeal() {
  const locale = useLocale();
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const featuredDeal = deals.deals.find((d) => d.active && d.featured);

  if (!featuredDeal) {
    return (
      <section className="bg-gradient-to-b from-primary-light to-white px-4 py-10 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl font-bold md:text-4xl"
          >
            {t('hero.tagline')}
          </motion.h1>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <a
              href={generalInquiry(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white active:bg-whatsapp-dark"
            >
              <MessageCircle size={20} />
              {t('cta.whatsappUs')}
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  const title = getLocalizedField(featuredDeal.title, locale);
  const badge = getLocalizedField(featuredDeal.badge, locale);
  const features = featuredDeal.features[locale] || featuredDeal.features.en;
  const discount = Math.round(
    ((featuredDeal.originalPrice - featuredDeal.dealPrice) / featuredDeal.originalPrice) * 100
  );

  return (
    <section className="bg-gradient-to-b from-primary-light to-white px-4 py-8 md:py-14">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl md:flex md:items-center md:gap-12"
      >
        {/* Text content */}
        <div className="flex-1">
          {/* Badge */}
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            {badge}
          </span>

          {/* Title */}
          <h1 className="mt-3 font-display text-2xl font-bold leading-tight md:text-4xl">
            {title}
          </h1>

          {/* Price row */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-lg text-text-muted line-through">
              ₹{featuredDeal.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-3xl font-bold text-primary md:text-4xl">
              ₹{featuredDeal.dealPrice.toLocaleString('en-IN')}
            </span>
            <span className="rounded-full bg-success px-2.5 py-0.5 text-sm font-semibold text-white">
              {discount}% {t('deals.off')}
            </span>
          </div>

          {/* Features */}
          <ul className="mt-5 space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-text md:text-base">
                <CheckCircle size={18} className="shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={dealInquiry(title, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white active:bg-whatsapp-dark"
            >
              <MessageCircle size={20} />
              {t('hero.cta')}
            </a>
            <a
              href="/deals"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary active:bg-primary-light"
            >
              {t('hero.viewAll')}
            </a>
          </div>
        </div>

        {/* Right side: hero image on desktop */}
        <div className="mt-8 hidden flex-1 items-center justify-center md:flex">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/deal-residential.png"
              alt="Modern home with rooftop solar panels in Maharashtra"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 0vw, 50vw"
            />
            <div className="absolute bottom-4 right-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 shadow-lg">
              <span className="text-center font-display text-2xl font-bold text-white">
                {discount}%
                <br />
                <span className="text-xs">{t('deals.off')}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
