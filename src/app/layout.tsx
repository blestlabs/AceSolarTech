import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { LocaleProvider } from '@/components/providers/LocaleProvider';

const notoSans = Noto_Sans({
  variable: '--font-body',
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: '--font-display',
  subsets: ['devanagari'],
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'AceSolarTech | Solar Solutions in Dhule, Maharashtra',
  description: 'Affordable solar panels, solar pumps, solar lights for homes, farms, and businesses in Dhule and all of Maharashtra. Free site visit. EMI available.',
  keywords: ['solar panels Dhule', 'solar installation Maharashtra', 'solar pump farmer', 'rooftop solar', 'AceSolarTech', 'सोलर पॅनेल धुळे'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FF6B00',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as 'en' | 'mr') || 'en';

  return (
    <html lang={locale}>
      <body className={`${notoSans.variable} ${notoSansDevanagari.variable} font-body antialiased bg-background text-text`}>
        <LocaleProvider initialLocale={locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
