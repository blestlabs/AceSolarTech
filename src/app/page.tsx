import HeroDeal from '@/components/home/HeroDeal';
import ProductGrid from '@/components/home/ProductGrid';
import QuickCalculator from '@/components/home/QuickCalculator';
import SchemesSection from '@/components/home/SchemesSection';
import WhyUs from '@/components/home/WhyUs';
import ServiceArea from '@/components/home/ServiceArea';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';

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
