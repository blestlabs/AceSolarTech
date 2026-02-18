'use client';

import { MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from '@/lib/i18n';
import { generalInquiry } from '@/lib/whatsapp';

export default function WhatsAppCTA() {
  const locale = useLocale();
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-whatsapp px-4 py-8">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl text-center"
      >
        <h2 className="font-display text-xl font-bold text-white md:text-2xl">
          {t('cta.anyQuestion')}
        </h2>
        <a
          href={generalInquiry(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-whatsapp active:bg-surface"
        >
          <MessageCircle size={20} />
          {t('cta.whatsappUs')}
        </a>
      </motion.div>
    </section>
  );
}
