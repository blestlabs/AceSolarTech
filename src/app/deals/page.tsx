import type { Metadata } from 'next';
import DealsPageContent from '@/components/deals/DealsPageContent';

export const metadata: Metadata = {
  title: 'Solar Deals & Offers | AceSolarTech',
  description:
    'Current deals on solar panels, pumps, and lights. Limited time offers with free installation and government subsidy assistance.',
  keywords: ['solar deals Dhule', 'solar offers Maharashtra', 'सोलर ऑफर धुळे', 'सोलर डील महाराष्ट्र'],
  openGraph: {
    title: 'Solar Deals & Offers | AceSolarTech',
    description: 'Current deals on solar panels, pumps, and lights. Limited time offers with free installation and government subsidy assistance.',
  },
};

export default function DealsPage() {
  return <DealsPageContent />;
}
