import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import StatsCounter from "@/components/home/StatsCounter";
import ProcessSteps from "@/components/home/ProcessSteps";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <StatsCounter />
      <ProcessSteps />
      <WhyChooseUs />
      <FeaturedProjects />
      <TestimonialsCarousel />
      <CTASection />
    </>
  );
}
