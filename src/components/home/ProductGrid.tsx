'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations, getLocalizedField } from '@/lib/i18n';
import { productInquiry } from '@/lib/whatsapp';
import productsData from '@/data/products.json';

export default function ProductGrid() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-xl font-bold md:text-2xl"
        >
          {t('products.title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="scrollbar-hide mt-5 flex gap-3 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-4 md:overflow-visible"
        >
          {productsData.products.map((product) => {
            const name = getLocalizedField(product.name, locale);

            return (
              <a
                key={product.id}
                href={productInquiry(name, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-[160px] snap-start flex-col items-center gap-2 rounded-xl border border-border bg-white p-3 shadow-sm transition-shadow active:shadow-md md:min-w-0 md:p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-lg md:h-24 md:w-24">
                  <Image
                    src={product.image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80px, 96px"
                  />
                </div>
                <span className="text-center text-sm font-semibold text-text">
                  {name}
                </span>
                <span className="text-center text-xs text-text-secondary">
                  {t('products.startingFrom', { price: product.startingPrice.toLocaleString('en-IN') })}
                </span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
