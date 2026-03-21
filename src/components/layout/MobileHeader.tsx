'use client';

import Image from 'next/image';
import { BarChart3 } from 'lucide-react';
import LangToggle from '@/components/ui/LangToggle';

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-white px-4 md:hidden">
      <div className="flex items-center gap-2">
        <Image src="/images/logo-icon.png" alt="AceSolarTech" width={28} height={28} priority />
        <span className="font-display font-bold text-primary">AceSolarTech</span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://grid.acesolartech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-full border border-primary/30 px-2 py-1 text-xs font-medium text-primary"
        >
          <BarChart3 size={14} />
          GridShakti
        </a>
        <LangToggle />
      </div>
    </header>
  );
}
