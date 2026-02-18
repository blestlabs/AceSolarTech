'use client';

import { MessageCircle } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { generalInquiry } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  const locale = useLocale();

  return (
    <a
      href={generalInquiry(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg transition-transform hover:scale-110 active:scale-95 md:bottom-6 md:right-6"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
}
