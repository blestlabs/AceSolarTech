export const DISTRICTS: Record<string, { name: { en: string; mr: string }; sunHours: number }> = {
  dhule: { name: { en: 'Dhule', mr: 'धुळे' }, sunHours: 5.2 },
  nashik: { name: { en: 'Nashik', mr: 'नाशिक' }, sunHours: 5.0 },
  jalgaon: { name: { en: 'Jalgaon', mr: 'जळगाव' }, sunHours: 5.3 },
  nandurbar: { name: { en: 'Nandurbar', mr: 'नंदुरबार' }, sunHours: 5.1 },
  ahmednagar: { name: { en: 'Ahmednagar', mr: 'अहमदनगर' }, sunHours: 5.0 },
  pune: { name: { en: 'Pune', mr: 'पुणे' }, sunHours: 4.9 },
  mumbai: { name: { en: 'Mumbai', mr: 'मुंबई' }, sunHours: 4.5 },
  sambhajinagar: { name: { en: 'Chh. Sambhajinagar', mr: 'छत्रपती संभाजीनगर' }, sunHours: 5.1 },
  kolhapur: { name: { en: 'Kolhapur', mr: 'कोल्हापूर' }, sunHours: 4.8 },
  nagpur: { name: { en: 'Nagpur', mr: 'नागपूर' }, sunHours: 5.2 },
  other: { name: { en: 'Other Maharashtra', mr: 'इतर महाराष्ट्र' }, sunHours: 5.0 },
};

const TARIFF_PER_KWH = 8;
const COST_PER_KW = 50000;
const SYSTEM_LOSS = 0.80;

export function calculate(monthlyBill: number, propertyType: string, districtKey: string) {
  const district = DISTRICTS[districtKey] || DISTRICTS.other;
  const monthlyKwh = monthlyBill / TARIFF_PER_KWH;
  const dailyKwh = monthlyKwh / 30;
  const systemSizeKw = Math.ceil((dailyKwh / (district.sunHours * SYSTEM_LOSS)) * 10) / 10;

  const dailyGeneration = systemSizeKw * district.sunHours * SYSTEM_LOSS;
  const monthlyGeneration = dailyGeneration * 30;
  const monthlySavings = Math.round(monthlyGeneration * TARIFF_PER_KWH);
  const annualSavings = monthlySavings * 12;

  const grossCost = Math.round(systemSizeKw * COST_PER_KW);

  let subsidy = 0;
  if (propertyType === 'residential') {
    if (systemSizeKw <= 2) subsidy = Math.round(systemSizeKw * 30000);
    else if (systemSizeKw <= 3) subsidy = Math.round(60000 + (systemSizeKw - 2) * 18000);
    else if (systemSizeKw <= 10) subsidy = 78000;
  }

  const netCost = grossCost - subsidy;
  const paybackYears = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : 0;

  return { systemSizeKw, monthlySavings, annualSavings, grossCost, subsidy, netCost, paybackYears };
}
