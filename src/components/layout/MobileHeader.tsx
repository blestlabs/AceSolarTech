'use client';

import LangToggle from '@/components/ui/LangToggle';

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-white px-4 md:hidden">
      <span className="font-display font-bold text-primary">AceSolarTech</span>
      <LangToggle />
    </header>
  );
}
