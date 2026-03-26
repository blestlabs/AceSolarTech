'use client';

import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n';
import DealCard from '@/components/deals/DealCard';
import dealsData from '@/data/deals.json';

const relatedPosts = [
  { slug: 'pm-surya-ghar-yojana-2026-complete-guide', en: 'PM Surya Ghar Yojana Complete Guide', mr: 'PM सूर्य घर योजना संपूर्ण मार्गदर्शक' },
  { slug: 'solar-panel-price-dhule-2026-complete-guide', en: 'Solar Panel Price in Dhule 2026', mr: 'धुळे मध्ये सोलर पॅनेल किंमत 2026' },
  { slug: 'net-metering-maharashtra-msedcl-guide', en: 'Net Metering Maharashtra Guide', mr: 'नेट मीटरिंग महाराष्ट्र मार्गदर्शक' },
];

export default function DealsPageContent() {
  const locale = useLocale();
  const t = useTranslations();
  const activeDeals = dealsData.deals.filter((deal) => deal.active);

  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      {/* Heading */}
      <h1 className="font-display text-2xl font-bold">{t('deals.title')}</h1>

      {/* Deal cards */}
      <div className="mt-6 space-y-5">
        <AnimatePresence mode="popLayout">
          {activeDeals.map((deal, idx) => (
            <DealCard key={deal.id} deal={deal} index={idx} />
          ))}
        </AnimatePresence>
      </div>

      {/* Contact for other sizes */}
      <div className="mt-6 rounded-xl border border-primary/20 bg-primary-light p-5 text-center">
        <p className="text-sm font-medium text-text">
          {locale === 'mr'
            ? 'इतर सिस्टम साइझ (1kW, 2kW, 6kW, 10kW+) आणि व्यावसायिक सोलरसाठी संपर्क करा'
            : 'For other system sizes (1kW, 2kW, 6kW, 10kW+) and commercial solar, contact us'}
        </p>
        <div className="mt-3 flex justify-center gap-3">
          <a
            href="tel:+918411075144"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-text active:bg-surface"
          >
            📞 8411075144
          </a>
        </div>
      </div>

      {/* Learn More — related blog posts */}
      <div className="mt-10 rounded-xl border border-border bg-surface p-5">
        <h2 className="flex items-center gap-2 font-display text-base font-bold">
          <BookOpen size={18} className="text-primary" />
          {locale === 'mr' ? 'अधिक जाणून घ्या' : 'Learn More'}
        </h2>
        <ul className="mt-3 space-y-2">
          {relatedPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowRight size={14} className="shrink-0" />
                {locale === 'mr' ? post.mr : post.en}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
