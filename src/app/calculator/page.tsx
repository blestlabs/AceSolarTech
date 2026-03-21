import type { Metadata } from 'next';
import Script from 'next/script';
import CalculatorPageContent from '@/components/calculator/CalculatorPageContent';

export const metadata: Metadata = {
  title: 'Solar Savings Calculator | AceSolarTech',
  description:
    'Calculate how much you can save with solar energy. Maharashtra-specific calculator with government subsidy estimates.',
  keywords: ['solar calculator', 'solar savings Maharashtra', 'solar subsidy calculator', 'सोलर कॅल्क्युलेटर', 'सोलर बचत महाराष्ट्र'],
  alternates: {
    canonical: 'https://acesolartech.com/calculator',
  },
  openGraph: {
    title: 'Solar Savings Calculator | AceSolarTech',
    description: 'Calculate how much you can save with solar energy. Maharashtra-specific calculator with government subsidy estimates.',
  },
};

const calculatorFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate the right solar system size for my home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To calculate the right solar system size, divide your monthly electricity consumption (in units/kWh) by 120-130 (the average monthly generation per kW in Maharashtra). For example, if you consume 400 units per month, you need approximately a 3-3.5 kW system. Use our solar calculator above for a precise estimate based on your Dhule or Maharashtra district, MSEDCL bill amount, and roof area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the payback period for solar panels in Maharashtra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The payback period for rooftop solar panels in Maharashtra is typically 2.5 to 4 years after government subsidy. In Dhule, with 5.0-5.2 average sun hours per day, a 3 kW system costing ₹87,000 after subsidy saves approximately ₹37,000 per year — paying for itself in under 2.5 years. After payback, you enjoy free electricity for the remaining 22+ years of panel life.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does MSEDCL support net metering for rooftop solar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, MSEDCL (Maharashtra State Electricity Distribution Company Limited) fully supports net metering for grid-connected rooftop solar systems up to 10 kW for residential consumers. With net metering, surplus solar power is exported to the grid and credited to your electricity bill. AceSolarTech handles the complete MSEDCL net metering application process for all customers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a loan/EMI for solar panel installation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, solar panel installations can be financed through bank loans and EMI plans. SBI offers solar loans at 7-7.5% interest for up to 10 years, making the EMI as low as ₹1,010/month for a 3 kW system. AceSolarTech also offers zero down payment EMI plans through partner banks and NBFCs, so your monthly EMI is often less than your current electricity bill.',
      },
    },
  ],
};

export default function CalculatorPage() {
  return (
    <>
      <Script
        id="calculator-faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(calculatorFaqSchema)}
      </Script>
      <CalculatorPageContent />
    </>
  );
}
