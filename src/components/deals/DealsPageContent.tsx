'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n';
import DealFilter from '@/components/deals/DealFilter';
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
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDeals = dealsData.deals.filter((deal) => {
    if (!deal.active) return false;
    if (activeFilter === 'all') return true;
    return deal.category === activeFilter;
  });

  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      {/* Heading */}
      <h1 className="font-display text-2xl font-bold">{t('deals.title')}</h1>

      {/* Filter chips */}
      <div className="mt-5">
        <DealFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Deal cards */}
      <div className="mt-6 space-y-5">
        <AnimatePresence mode="popLayout">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal, idx) => (
              <DealCard key={deal.id} deal={deal} index={idx} />
            ))
          ) : (
            <p className="py-12 text-center text-text-secondary">
              {t('deals.noneFound')}
            </p>
          )}
        </AnimatePresence>
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
