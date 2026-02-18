import type { Metadata } from 'next';
import CalculatorPageContent from '@/components/calculator/CalculatorPageContent';

export const metadata: Metadata = {
  title: 'Solar Savings Calculator | AceSolarTech',
  description:
    'Calculate how much you can save with solar energy. Maharashtra-specific calculator with government subsidy estimates.',
};

export default function CalculatorPage() {
  return <CalculatorPageContent />;
}
