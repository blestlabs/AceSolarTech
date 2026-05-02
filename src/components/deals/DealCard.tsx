'use client';

import Image from 'next/image';
import { CheckCircle, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations, getLocalizedField } from '@/lib/i18n';
import { dealInquiry } from '@/lib/whatsapp';
import CountdownTimer from '@/components/ui/CountdownTimer';

const categoryImages: Record<string, { src: string; alt: string }> = {
  residential: { src: '/images/deal-residential.png', alt: 'Residential solar installation' },
  farm: { src: '/images/deal-farm.png', alt: 'Agricultural solar pump' },
  commercial: { src: '/images/deal-commercial.png', alt: 'Commercial solar array' },
};

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
  image?: string;
  imageAlt?: { en: string; mr: string };
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

  const subsidy = deal.originalPrice - deal.dealPrice;

  const isLimited = deal.expiresAt !== null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
    >
      {/* Deal image (per-deal override falls back to category default) */}
      {(deal.image || categoryImages[deal.category]) && (
        <div className="relative aspect-[16/9]">
          <Image
            src={deal.image ?? categoryImages[deal.category].src}
            alt={deal.imageAlt ? getLocalizedField(deal.imageAlt, locale) : categoryImages[deal.category].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="p-5">
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
      <div className="mt-4 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-text-muted">
            {locale === 'mr' ? 'किंमत GST सह:' : 'Price incl. GST:'}
          </span>
          <span className="text-sm text-text-secondary">
            &#8377;{deal.originalPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-text-muted">
            {locale === 'mr' ? 'सबसिडी:' : 'Subsidy:'}
          </span>
          <span className="text-sm font-medium text-success">
            -&#8377;{subsidy.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">
            {locale === 'mr' ? 'सबसिडी नंतरची किंमत:' : 'After Subsidy:'}
          </span>
          <span className="text-2xl font-bold text-primary">
            &#8377;{deal.dealPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

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
          href="tel:+918411075144"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text active:bg-surface"
        >
          <Phone size={16} />
          {t('cta.callUs')}
        </a>
      </div>
      </div>
    </motion.div>
  );
}
