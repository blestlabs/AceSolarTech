const WHATSAPP_NUMBER = '917264075144';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productInquiry(product: string, locale: 'en' | 'mr'): string {
  const messages = {
    en: `Hi! I'm interested in ${product}. Please share details.`,
    mr: `नमस्कार! मला ${product} बद्दल माहिती हवी आहे. कृपया तपशील सांगा.`,
  };
  return whatsappLink(messages[locale]);
}

export function dealInquiry(deal: string, locale: 'en' | 'mr'): string {
  const messages = {
    en: `Hi! I saw the "${deal}" offer on your website. Please share details.`,
    mr: `नमस्कार! मी तुमच्या वेबसाइटवर "${deal}" ऑफर पाहिली. कृपया तपशील सांगा.`,
  };
  return whatsappLink(messages[locale]);
}

export function calculatorInquiry(systemKw: number, district: string, bill: number, locale: 'en' | 'mr'): string {
  const messages = {
    en: `Hi! I need a ${systemKw}kW solar system in ${district}. My monthly bill is ₹${bill.toLocaleString('en-IN')}. Please share a quote.`,
    mr: `नमस्कार! मला ${district} मध्ये ${systemKw}kW सोलर सिस्टम हवी आहे. माझे मासिक बिल ₹${bill.toLocaleString('en-IN')} आहे. कृपया कोट सांगा.`,
  };
  return whatsappLink(messages[locale]);
}

export function generalInquiry(locale: 'en' | 'mr'): string {
  const messages = {
    en: "Hi! I'm interested in solar solutions for my property.",
    mr: 'नमस्कार! मला माझ्या मालमत्तेसाठी सोलर सोल्यूशन्स बद्दल माहिती हवी आहे.',
  };
  return whatsappLink(messages[locale]);
}
