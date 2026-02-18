import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import MobileHeader from '@/components/layout/MobileHeader';
import DesktopHeader from '@/components/layout/DesktopHeader';
import BottomBar from '@/components/layout/BottomBar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

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
  metadataBase: new URL('https://acesolartech.com'),
  title: 'AceSolarTech | Solar Solutions in Dhule, Maharashtra',
  description: 'Affordable solar panels, solar pumps, solar lights for homes, farms, and businesses in Dhule and all of Maharashtra. Free site visit. EMI available.',
  keywords: ['solar panels Dhule', 'solar installation Maharashtra', 'solar pump farmer', 'rooftop solar', 'AceSolarTech', 'सोलर पॅनेल धुळे'],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://acesolartech.com',
  },
  openGraph: {
    title: 'AceSolarTech | Solar Solutions in Dhule, Maharashtra',
    description: 'Affordable solar panels, solar pumps, solar lights for homes, farms, and businesses in Dhule and all of Maharashtra.',
    images: [{ url: '/images/og-image.png', width: 1792, height: 1024 }],
    type: 'website',
    locale: 'en_IN',
    siteName: 'AceSolarTech',
    url: 'https://acesolartech.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AceSolarTech | Solar Solutions in Dhule, Maharashtra',
    description: 'Affordable solar panels, solar pumps, solar lights for homes, farms, and businesses in Dhule and all of Maharashtra.',
    images: ['/images/og-image.png'],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'AceSolarTech',
              description: 'Solar energy solutions for homes, farms, and businesses in Maharashtra',
              url: 'https://acesolartech.com',
              areaServed: { '@type': 'State', name: 'Maharashtra' },
              address: { '@type': 'PostalAddress', addressLocality: 'Dhule', addressRegion: 'Maharashtra', addressCountry: 'IN' },
              priceRange: '₹₹',
              image: 'https://acesolartech.com/images/logo-icon.png',
            }),
          }}
        />
        <LocaleProvider initialLocale={locale}>
          <MobileHeader />
          <DesktopHeader />
          <main className="pb-16 md:pb-0">{children}</main>
          <BottomBar />
          <FloatingWhatsApp />
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
