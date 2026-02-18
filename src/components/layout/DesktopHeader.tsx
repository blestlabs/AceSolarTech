'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n';
import { generalInquiry } from '@/lib/whatsapp';
import LangToggle from '@/components/ui/LangToggle';

const navLinks = [
  { href: '/', key: 'nav.home' },
  { href: '/deals', key: 'nav.deals' },
  { href: '/calculator', key: 'nav.calculator' },
  { href: '/about', key: 'nav.about' },
];

export default function DesktopHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-border bg-white/95 backdrop-blur md:flex">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-icon.png" alt="AceSolarTech" width={36} height={36} priority />
          <span className="font-display text-xl font-bold text-primary">AceSolarTech</span>
        </Link>

        {/* Center nav */}
        <nav aria-label="Main navigation" className="flex items-center gap-6">
          {navLinks.map(({ href, key }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm transition-colors hover:text-primary ${
                  isActive ? 'font-semibold text-primary' : 'text-text-secondary'
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        {/* Right: LangToggle + WhatsApp CTA */}
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href={generalInquiry(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle size={18} />
            {t('cta.whatsappUs')}
          </a>
        </div>
      </div>
    </header>
  );
}
