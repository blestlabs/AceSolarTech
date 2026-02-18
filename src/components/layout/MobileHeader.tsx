'use client';

import Image from 'next/image';
import LangToggle from '@/components/ui/LangToggle';

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-white px-4 md:hidden">
      <div className="flex items-center gap-2">
        <Image src="/images/logo-icon.png" alt="AceSolarTech" width={28} height={28} priority />
        <span className="font-display font-bold text-primary">AceSolarTech</span>
      </div>
      <LangToggle />
    </header>
  );
}
