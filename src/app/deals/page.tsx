import type { Metadata } from 'next';
import Script from 'next/script';
import DealsPageContent from '@/components/deals/DealsPageContent';

export const metadata: Metadata = {
  title: 'Solar Deals & Offers | AceSolarTech',
  description:
    'Current deals on solar panels, pumps, and lights. Limited time offers with free installation and government subsidy assistance.',
  keywords: ['solar deals Dhule', 'solar offers Maharashtra', 'सोलर ऑफर धुळे', 'सोलर डील महाराष्ट्र'],
  alternates: {
    canonical: 'https://acesolartech.com/deals',
  },
  openGraph: {
    title: 'Solar Deals & Offers | AceSolarTech',
    description: 'Current deals on solar panels, pumps, and lights. Limited time offers with free installation and government subsidy assistance.',
  },
};

const dealsFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are solar panel deals available in Dhule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, AceSolarTech regularly offers special deals and discounts on solar panel systems in Dhule and across Maharashtra. Our deals include discounted system prices, free installation, complimentary annual maintenance, and assistance with PM Surya Ghar government subsidy applications. Check this page for current offers or WhatsApp us for the latest pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a solar system installation package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A complete solar installation package from AceSolarTech includes BIS-certified solar panels, a grid-tied inverter, galvanized mounting structure, DC and AC wiring with connectors, professional installation by licensed electricians, system testing and commissioning, MSEDCL net metering application, and PM Surya Ghar subsidy processing. All packages come with manufacturer warranties on panels (25 years) and inverter (5-10 years).',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer EMI/financing for solar panels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, AceSolarTech offers flexible EMI plans through partner banks including SBI, Bank of Maharashtra, HDFC, and Bajaj Finserv. EMI starts as low as ₹1,010 per month for a 3 kW system with a 10-year tenure. We also offer zero down payment options where your monthly EMI is less than your current MSEDCL electricity bill, making you cash-positive from day one.',
      },
    },
  ],
};

export default function DealsPage() {
  return (
    <>
      <Script
        id="deals-faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(dealsFaqSchema)}
      </Script>
      <DealsPageContent />
    </>
  );
}
