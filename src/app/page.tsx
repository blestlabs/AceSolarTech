import type { Metadata } from 'next';
import HeroDeal from '@/components/home/HeroDeal';
import ProductGrid from '@/components/home/ProductGrid';
import QuickCalculator from '@/components/home/QuickCalculator';
import SchemesSection from '@/components/home/SchemesSection';
import WhyUs from '@/components/home/WhyUs';
import ServiceArea from '@/components/home/ServiceArea';
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
};

export default function Home() {
  return (
    <>
      <HeroDeal />
      <ProductGrid />
      <QuickCalculator />
      <SchemesSection />
      <WhyUs />
      <ServiceArea />
      <WhatsAppCTA />
    </>
  );
}
