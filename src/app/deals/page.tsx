'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';
import DealFilter from '@/components/deals/DealFilter';
import DealCard from '@/components/deals/DealCard';
import dealsData from '@/data/deals.json';

export default function DealsPage() {
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
    </section>
  );
}
