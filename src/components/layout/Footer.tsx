'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';

const footerLinks = [
  { href: '/', key: 'nav.home' },
  { href: '/deals', key: 'nav.deals' },
  { href: '/calculator', key: 'nav.calculator' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/about', key: 'nav.about' },
];

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="hidden bg-surface py-8 md:block">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Company name + tagline */}
        <p className="font-display text-lg font-bold text-primary">AceSolarTech</p>
        <p className="mt-1 text-sm text-text-secondary">{t('footer.tagline')}</p>

        {/* Address */}
        <p className="mt-2 text-xs text-text-muted">{t('address.line1')}</p>
        <p className="text-xs text-text-muted">{t('address.line2')}</p>

        {/* Contact & Hours */}
        <p className="mt-2 text-xs text-text-muted">
          <a href="mailto:info@acesolartech.com" className="transition-colors hover:text-primary">info@acesolartech.com</a>
          {' · '}
          {t('footer.hours')}
        </p>

        {/* Links */}
        <nav aria-label="Footer navigation" className="mt-4 flex items-center justify-center gap-6">
          {footerLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Service area */}
        <p className="mt-4 text-sm text-text-muted">{t('footer.serviceArea')}</p>

        {/* Copyright */}
        <p className="mt-2 text-xs text-text-muted">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
