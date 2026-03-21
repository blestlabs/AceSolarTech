import type { Metadata } from 'next';
import Script from 'next/script';
import HeroDeal from '@/components/home/HeroDeal';
import ProductGrid from '@/components/home/ProductGrid';
import QuickCalculator from '@/components/home/QuickCalculator';
import SchemesSection from '@/components/home/SchemesSection';
import WhyUs from '@/components/home/WhyUs';
import ServiceArea from '@/components/home/ServiceArea';
import QuoteForm from '@/components/home/QuoteForm';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'AceSolarTech | Solar Panels, Pumps & Lights in Dhule, Maharashtra',
  description:
    'Best deals on solar panels, solar pumps, street lights for homes, farms, and businesses. Free site visit. EMI available. Serving Dhule and all of Maharashtra.',
  keywords: [
    'solar panels Dhule',
    'solar pump Maharashtra',
    'solar installation Dhule',
    'AceSolarTech',
    'सोलर पॅनेल धुळे',
    'rooftop solar',
  ],
  alternates: {
    canonical: 'https://acesolartech.com',
  },
};

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a solar panel system cost in Dhule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A rooftop solar panel system in Dhule costs between ₹55,000 (1 kW) and ₹5,60,000 (10 kW) before subsidy. After the PM Surya Ghar government subsidy of up to ₹78,000, a popular 3 kW system costs just ₹77,000 to ₹1,02,000. AceSolarTech offers free site visits and detailed quotes for homes and businesses across Dhule and Maharashtra.',
      },
    },
    {
      '@type': 'Question',
      name: 'What subsidy is available under PM Surya Ghar Yojana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under PM Surya Ghar Muft Bijli Yojana, homeowners receive a central subsidy of ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW or larger systems. Maharashtra also offers additional state subsidies under the SMART Solar Scheme for BPL, SC/ST, and EWS families, bringing total coverage up to 90-95% of system cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I save on electricity with solar panels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 3 kW rooftop solar system in Dhule generates 390-450 units per month, saving approximately ₹3,000-3,500 on your MSEDCL electricity bill every month. Over 25 years, total savings exceed ₹9 lakh. With net metering, any surplus power is credited to your account, effectively reducing your bill to near zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does AceSolarTech provide installation in all of Maharashtra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, AceSolarTech is headquartered in Dhule and serves all of Maharashtra. We cover Dhule, Jalgaon, Nandurbar, Nashik, Pune, Mumbai, Nagpur, Aurangabad, Kolhapur, and all other districts. We offer free site visits across the state for residential, commercial, and agricultural solar installations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do solar panels last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modern solar panels come with a 25-year performance warranty guaranteeing at least 80% output at year 25. In practice, panels continue generating electricity for 30-35 years. The panels require minimal maintenance — just periodic cleaning and annual inspection. Inverters typically last 10-15 years.',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(homeFaqSchema)}
      </Script>
      <HeroDeal />
      <ProductGrid />
      <QuickCalculator />
      <SchemesSection />
      <QuoteForm />
      <WhyUs />
      <ServiceArea />
      <WhatsAppCTA />
    </>
  );
}
