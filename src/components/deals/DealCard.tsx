'use client';

import { CheckCircle, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations, getLocalizedField } from '@/lib/i18n';
import { dealInquiry } from '@/lib/whatsapp';
import CountdownTimer from '@/components/ui/CountdownTimer';

interface Deal {
  id: string;
  title: { en: string; mr: string };
  description: { en: string; mr: string };
  originalPrice: number;
  dealPrice: number;
  category: string;
  badge: { en: string; mr: string };
  features: { en: string[]; mr: string[] };
  expiresAt: string | null;
  active: boolean;
  featured: boolean;
}

interface DealCardProps {
  deal: Deal;
  index?: number;
}

export default function DealCard({ deal, index = 0 }: DealCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const title = getLocalizedField(deal.title, locale);
  const description = getLocalizedField(deal.description, locale);
  const badge = getLocalizedField(deal.badge, locale);
  const features = deal.features[locale] || deal.features.en;

  const discount = Math.round(
    ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100
  );
  const savings = deal.originalPrice - deal.dealPrice;

  const isLimited = deal.expiresAt !== null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="rounded-xl border border-border bg-white p-5 shadow-sm"
    >
      {/* Badge */}
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
          isLimited
            ? 'bg-danger/10 text-danger'
            : 'bg-primary-light text-primary'
        }`}
      >
        {badge}
      </span>

      {/* Title */}
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-1 text-sm text-text-secondary">{description}</p>

      {/* Price row */}
      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <span className="text-sm text-text-muted line-through">
          &#8377;{deal.originalPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-xl font-bold text-primary">
          &#8377;{deal.dealPrice.toLocaleString('en-IN')}
        </span>
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
          {discount}% {t('deals.off')}
        </span>
      </div>

      {/* Save line */}
      <p className="mt-1 text-sm font-medium text-success">
        {t('deals.save')} &#8377;{savings.toLocaleString('en-IN')}
      </p>

      {/* Features */}
      <ul className="mt-4 space-y-1.5">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle size={16} className="mt-0.5 shrink-0 text-success" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Countdown */}
      {deal.expiresAt && (
        <div className="mt-4">
          <CountdownTimer expiresAt={deal.expiresAt} />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
        <a
          href={dealInquiry(title, locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 min-h-[44px] items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white active:bg-whatsapp-dark"
        >
          <MessageCircle size={18} />
          {t('deals.whatsappNow')}
        </a>
        <a
          href="tel:+91XXXXXXXXXX"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text active:bg-surface"
        >
          <Phone size={16} />
          {t('cta.callUs')}
        </a>
      </div>
    </motion.div>
  );
}
