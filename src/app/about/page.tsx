import type { Metadata } from 'next';
import AboutPageContent from '@/components/about/AboutPageContent';

export const metadata: Metadata = {
  title: 'About AceSolarTech | Solar Solutions in Maharashtra',
  description:
    'Making solar energy accessible in Dhule and Maharashtra. Residential, commercial, and farm solar solutions with government subsidy assistance.',
  keywords: ['about AceSolarTech', 'solar company Dhule', 'solar Maharashtra', 'सोलर कंपनी धुळे', 'सोलर महाराष्ट्र'],
  openGraph: {
    title: 'About AceSolarTech | Solar Solutions in Maharashtra',
    description: 'Making solar energy accessible in Dhule and Maharashtra. Residential, commercial, and farm solar solutions with government subsidy assistance.',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
