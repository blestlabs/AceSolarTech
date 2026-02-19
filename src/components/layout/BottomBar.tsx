'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Tag, Calculator, BookOpen, MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n';
import { generalInquiry } from '@/lib/whatsapp';

const tabs = [
  { href: '/', icon: House, key: 'nav.home' },
  { href: '/deals', icon: Tag, key: 'nav.deals' },
  { href: '/calculator', icon: Calculator, key: 'nav.calculator' },
  { href: '/blog', icon: BookOpen, key: 'nav.blog' },
] as const;

export default function BottomBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <nav aria-label="Main navigation" className="fixed bottom-0 left-0 right-0 z-50 flex min-h-14 items-center border-t border-border bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      {tabs.map(({ href, icon: Icon, key }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 min-h-[44px] ${
              isActive ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{t(key)}</span>
          </Link>
        );
      })}

      {/* WhatsApp tab — external link */}
      <a
        href={generalInquiry(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 min-h-[44px] text-text-secondary"
      >
        <MessageCircle size={20} />
        <span className="text-xs">{t('nav.chat')}</span>
      </a>
    </nav>
  );
}
