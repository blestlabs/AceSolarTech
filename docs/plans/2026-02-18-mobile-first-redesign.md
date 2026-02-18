# AceSolarTech Mobile-First Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete redesign of acesolartech.com as a mobile-first, WhatsApp-driven, bilingual (EN/Marathi) solar deals website targeting Dhule/Maharashtra customers.

**Architecture:** Next.js 16 App Router with `next-intl` for cookie-based i18n (no URL prefixes). Static data in JSON files (deals, products). All CTAs route to WhatsApp via `wa.me` links with pre-filled messages. Bottom tab navigation on mobile, traditional top nav on desktop. Light theme for outdoor readability on budget phones.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, next-intl, Noto Sans + Noto Sans Devanagari fonts.

**Design Doc:** `docs/plans/2026-02-18-mobile-first-redesign-design.md`

---

## Phase 1: Clean Slate & Foundation

### Task 1: Remove Old Code, Install Dependencies

**Files:**
- Delete: All files in `src/app/` (except `favicon.ico`), all files in `src/components/`
- Modify: `package.json`

**Step 1: Remove all old source files**

```bash
rm -rf src/app/about src/app/calculator src/app/contact src/app/gallery src/app/quote src/app/services
rm src/app/page.tsx src/app/layout.tsx src/app/globals.css
rm -rf src/components/*
```

**Step 2: Install next-intl**

```bash
cd /Users/blest/dev/AceSolarTech && npm install next-intl
```

**Step 3: Verify clean state**

```bash
ls src/app/  # Should only contain favicon.ico
ls src/components/  # Should be empty
```

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: clean slate — remove old UI for redesign"
```

---

### Task 2: Data Files — Products & Deals

**Files:**
- Create: `src/data/products.json`
- Create: `src/data/deals.json`

**Step 1: Create products catalog**

Create `src/data/products.json` with 8 product categories:
- Rooftop Solar (residential)
- Farm Solar (agricultural pump systems)
- Solar Motor/Pump
- Solar Street Lights
- Solar Home Lights
- Commercial Solar
- Parking Lot Solar (carport)
- Solar Water Heater

Each product has: `id`, `name: { en, mr }`, `description: { en, mr }`, `icon` (lucide icon name), `startingPrice`, `unit`, `category`.

**Step 2: Create deals data**

Create `src/data/deals.json` with 4 sample deals:
1. 3kW Residential system deal
2. Solar water pump for farmers deal
3. Solar street light bundle deal
4. Commercial 10kW system deal

Each deal has: `id`, `title: { en, mr }`, `description: { en, mr }`, `originalPrice`, `dealPrice`, `category`, `badge: { en, mr }`, `features: { en: string[], mr: string[] }`, `expiresAt` (ISO string or null), `active`.

**Step 3: Commit**

```bash
git add src/data/ && git commit -m "feat: add product catalog and deals data (bilingual EN/MR)"
```

---

### Task 3: i18n Setup — English & Marathi Strings

**Files:**
- Create: `src/i18n/en.json`
- Create: `src/i18n/mr.json`
- Create: `src/i18n/config.ts`

**Step 1: Create i18n config**

Create `src/i18n/config.ts`:
```typescript
export const locales = ['en', 'mr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
```

**Step 2: Create English strings**

Create `src/i18n/en.json` with all UI strings organized by section:
```json
{
  "nav": { "home": "Home", "deals": "Deals", "calculator": "Calc", "chat": "Chat", "about": "About" },
  "hero": { "tagline": "Solar Power for Every Home, Farm & Business", "cta": "Get This Deal", "viewAll": "View All Deals" },
  "products": { "title": "Our Solar Solutions", "startingFrom": "Starting ₹{price}", "enquire": "Enquire on WhatsApp" },
  "calculator": { "title": "How Much Can You Save?", "monthlyBill": "Your Monthly Bill", "propertyType": "Property Type", "district": "Your District", "residential": "Home", "farm": "Farm", "commercial": "Business", "systemSize": "Recommended System", "monthlySavings": "Monthly Savings", "annualSavings": "Annual Savings", "subsidy": "Govt. Subsidy", "netCost": "Your Cost", "payback": "Payback Period", "years": "years", "getQuote": "Get Exact Quote on WhatsApp" },
  "schemes": { "title": "Government Subsidies", "subtitle": "We handle all paperwork for you", "pmSurya": "PM Surya Ghar Muft Bijli Yojana", "subsidyAmount": "Up to ₹78,000 subsidy on 3kW system", "freeProcess": "Free application assistance" },
  "why": { "title": "Why AceSolarTech?", "freeVisit": "Free Site Visit", "freeVisitDesc": "We come to you, assess your site, zero obligation", "emi": "EMI Available", "emiDesc": "Easy monthly payments, start saving from day one", "warranty": "25-Year Warranty", "warrantyDesc": "Long-term performance guaranteed" },
  "serviceArea": { "title": "We Serve All of Maharashtra", "subtitle": "Based in Dhule, serving across the state" },
  "cta": { "whatsappUs": "Talk to Us on WhatsApp", "callUs": "Call Us", "anyQuestion": "Have a question?" },
  "deals": { "title": "Current Deals & Offers", "all": "All", "residential": "Residential", "farm": "Farm", "commercial": "Commercial", "seasonal": "Seasonal", "limitedTime": "LIMITED TIME", "bestSeller": "BEST SELLER", "new": "NEW", "endsIn": "Ends in", "days": "d", "hours": "h", "minutes": "m", "off": "off", "save": "Save", "whatsappNow": "WhatsApp Now", "noneFound": "No deals in this category right now. Check back soon!" },
  "about": { "title": "About AceSolarTech", "mission": "Making solar energy accessible and affordable for every home, farm, and business in Maharashtra.", "services": "Our Services", "howItWorks": "How It Works", "step1": "WhatsApp Us", "step1Desc": "Send us a message with your requirements", "step2": "Free Site Visit", "step2Desc": "Our team visits your location for assessment", "step3": "Installation", "step3Desc": "Professional installation in 5-7 days" },
  "footer": { "tagline": "Solar solutions for Maharashtra", "copyright": "© {year} AceSolarTech. All rights reserved." },
  "lang": { "en": "EN", "mr": "मराठी" }
}
```

**Step 3: Create Marathi strings**

Create `src/i18n/mr.json` with all Marathi translations matching the same structure:
```json
{
  "nav": { "home": "होम", "deals": "ऑफर्स", "calculator": "कॅल्क", "chat": "चॅट", "about": "आमच्याबद्दल" },
  "hero": { "tagline": "प्रत्येक घर, शेत आणि व्यवसायासाठी सौर ऊर्जा", "cta": "ही ऑफर मिळवा", "viewAll": "सर्व ऑफर्स पहा" },
  "products": { "title": "आमचे सोलर सोल्यूशन्स", "startingFrom": "₹{price} पासून", "enquire": "WhatsApp वर चौकशी करा" },
  "calculator": { "title": "तुम्ही किती बचत करू शकता?", "monthlyBill": "तुमचे मासिक बिल", "propertyType": "मालमत्ता प्रकार", "district": "तुमचा जिल्हा", "residential": "घर", "farm": "शेत", "commercial": "व्यवसाय", "systemSize": "शिफारस केलेली सिस्टम", "monthlySavings": "मासिक बचत", "annualSavings": "वार्षिक बचत", "subsidy": "सरकारी अनुदान", "netCost": "तुमचा खर्च", "payback": "परतफेड कालावधी", "years": "वर्षे", "getQuote": "WhatsApp वर अचूक कोट मिळवा" },
  "schemes": { "title": "सरकारी अनुदान", "subtitle": "आम्ही सर्व कागदपत्रे हाताळतो", "pmSurya": "पीएम सूर्य घर मोफत वीज योजना", "subsidyAmount": "3kW सिस्टमवर ₹78,000 पर्यंत अनुदान", "freeProcess": "मोफत अर्ज सहाय्य" },
  "why": { "title": "AceSolarTech का?", "freeVisit": "मोफत साइट भेट", "freeVisitDesc": "आम्ही तुमच्याकडे येतो, कोणतीही बांधिलकी नाही", "emi": "EMI उपलब्ध", "emiDesc": "सोप्या मासिक हप्त्यांवर, पहिल्या दिवसापासून बचत", "warranty": "25-वर्ष वॉरंटी", "warrantyDesc": "दीर्घकालीन कामगिरीची हमी" },
  "serviceArea": { "title": "आम्ही संपूर्ण महाराष्ट्रात सेवा देतो", "subtitle": "धुळे मुख्यालय, संपूर्ण राज्यभर सेवा" },
  "cta": { "whatsappUs": "WhatsApp वर आमच्याशी बोला", "callUs": "आम्हाला कॉल करा", "anyQuestion": "काही प्रश्न आहे?" },
  "deals": { "title": "सध्याच्या ऑफर्स", "all": "सर्व", "residential": "घरगुती", "farm": "शेती", "commercial": "व्यावसायिक", "seasonal": "सीझनल", "limitedTime": "मर्यादित वेळ", "bestSeller": "सर्वाधिक विक्री", "new": "नवीन", "endsIn": "शेवटची तारीख", "days": "दि", "hours": "ता", "minutes": "मि", "off": "सूट", "save": "बचत", "whatsappNow": "आत्ता WhatsApp करा", "noneFound": "या विभागात सध्या कोणत्याही ऑफर नाहीत. लवकरच तपासा!" },
  "about": { "title": "AceSolarTech बद्दल", "mission": "महाराष्ट्रातील प्रत्येक घर, शेत आणि व्यवसायासाठी सौर ऊर्जा सुलभ आणि परवडणारी बनवणे.", "services": "आमच्या सेवा", "howItWorks": "कसे काम करते", "step1": "आम्हाला WhatsApp करा", "step1Desc": "तुमच्या गरजा आम्हाला संदेश पाठवा", "step2": "मोफत साइट भेट", "step2Desc": "आमचा टीम तुमच्या ठिकाणी भेट देतो", "step3": "इंस्टॉलेशन", "step3Desc": "5-7 दिवसांत व्यावसायिक इंस्टॉलेशन" },
  "footer": { "tagline": "महाराष्ट्रासाठी सोलर सोल्यूशन्स", "copyright": "© {year} AceSolarTech. सर्व हक्क राखीव." },
  "lang": { "en": "EN", "mr": "मराठी" }
}
```

**Step 4: Commit**

```bash
git add src/i18n/ && git commit -m "feat: add i18n setup with English and Marathi translations"
```

---

### Task 4: Globals — CSS Design System, Layout, Fonts

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/lib/whatsapp.ts`
- Create: `src/lib/i18n.ts`
- Modify: `next.config.ts` (add next-intl plugin if needed)

**Step 1: Create globals.css**

Light-mode design system with Tailwind v4 `@theme` block:
- Colors: primary (#FF6B00), whatsapp (#25D366), background (#FFFFFF), surface (#F5F5F5), text (#1A1A1A), etc.
- Font families: `--font-body: 'Noto Sans'`, `--font-display: 'Noto Sans Devanagari'`
- Custom utilities: `.card` (rounded-xl, shadow, bg-white), touch-target (min 44px), `.gradient-orange` (orange gradient bg)
- Smooth scroll, custom scrollbar (orange thumb), selection highlight
- Bottom bar safe area: `padding-bottom: env(safe-area-inset-bottom)`

**Step 2: Create lib/whatsapp.ts**

WhatsApp utility:
```typescript
const WHATSAPP_NUMBER = '91XXXXXXXXXX'; // placeholder until real number provided

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
    en: 'Hi! I\'m interested in solar solutions for my property.',
    mr: 'नमस्कार! मला माझ्या मालमत्तेसाठी सोलर सोल्यूशन्स बद्दल माहिती हवी आहे.',
  };
  return whatsappLink(messages[locale]);
}
```

**Step 3: Create lib/i18n.ts**

Simple i18n helper using React context (no next-intl if too heavy — keep it minimal):
```typescript
import { createContext, useContext } from 'react';
import type { Locale } from '@/i18n/config';
import en from '@/i18n/en.json';
import mr from '@/i18n/mr.json';

const messages = { en, mr } as const;

type Messages = typeof en;
type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K) : never }[keyof T]
  : never;

export const LocaleContext = createContext<Locale>('en');

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useTranslations() {
  const locale = useLocale();
  return function t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    let result = typeof value === 'string' ? value : key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v));
      }
    }
    return result;
  };
}
```

**Step 4: Create root layout.tsx**

Root layout with:
- Noto Sans + Noto Sans Devanagari from Google Fonts
- `LocaleProvider` wrapping children (reads locale from cookie, defaults to 'en')
- `<html lang={locale}>` dynamic
- No `className="dark"` (light mode)
- Body: `bg-white text-text font-body antialiased`
- Metadata with Maharashtra/Dhule solar keywords
- Viewport meta with `viewport-fit=cover` for safe areas

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: foundation — globals, layout, i18n helper, whatsapp utils"
```

---

## Phase 2: Navigation & Shell

### Task 5: Mobile Bottom Bar + Header

**Files:**
- Create: `src/components/layout/BottomBar.tsx`
- Create: `src/components/layout/MobileHeader.tsx`
- Create: `src/components/layout/DesktopHeader.tsx`
- Create: `src/components/ui/LangToggle.tsx`

**Step 1: Create LangToggle component**

A compact toggle button:
- Shows `EN | मराठी`
- Active language highlighted in primary color
- On click: sets cookie `locale=en|mr`, calls `router.refresh()`
- Size: compact for mobile header (32px height)

**Step 2: Create MobileHeader**

Slim header (48px height), only visible on mobile (<768px):
- Left: AceSolarTech logo (text, compact)
- Right: LangToggle

No hamburger menu — bottom bar handles all navigation.

**Step 3: Create BottomBar**

Fixed bottom navigation bar (56px + safe-area-inset-bottom):
- 4 tabs: Home (House icon), Deals (Tag icon), Calc (Calculator icon), Chat (MessageCircle icon)
- Home/Deals/Calc use Next.js Link
- Chat opens WhatsApp link directly (`target="_blank"`)
- Active tab: orange icon + bold label
- Inactive: gray icon + label
- Hidden on desktop (md:hidden)
- Z-index above page content
- Background: white with top border

**Step 4: Create DesktopHeader**

Traditional top nav for desktop (hidden on mobile):
- Logo + nav links (Home, Deals, Calculator, About) + LangToggle + WhatsApp CTA button
- Sticky on scroll with subtle shadow

**Step 5: Update layout.tsx**

Add MobileHeader + DesktopHeader above `<main>`, BottomBar below.
Add `pb-16 md:pb-0` to main for bottom bar clearance on mobile.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: navigation shell — bottom bar (mobile) + headers + lang toggle"
```

---

### Task 6: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Create Footer**

Minimal footer:
- Company name + tagline (bilingual)
- Quick links: Home, Deals, Calculator, About
- Contact: WhatsApp button + phone number
- "Serving Dhule & all of Maharashtra"
- Copyright with current year
- **Hidden on mobile** (bottom bar is sufficient) — `hidden md:block`

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: footer component (desktop only)"
```

---

## Phase 3: Home Page

### Task 7: Hero Deal Banner

**Files:**
- Create: `src/components/home/HeroDeal.tsx`

**Step 1: Build HeroDeal component**

Full-width banner showing the top active deal:
- Reads from `deals.json`, picks first active deal (or deal with `featured: true`)
- Orange gradient background (subtle)
- Deal badge ("BEST SELLER" etc.)
- Product title (bilingual)
- Price: original strikethrough → deal price, savings percentage in green
- CountdownTimer if deal has `expiresAt`
- Green WhatsApp button: "Get This Deal" → pre-filled message
- Responsive: stacks vertically on mobile, side-by-side on desktop
- Framer Motion fade-in on mount
- If multiple featured deals: horizontal swipe with dot indicators

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: hero deal banner with countdown and WhatsApp CTA"
```

---

### Task 8: Product Categories Grid

**Files:**
- Create: `src/components/home/ProductGrid.tsx`

**Step 1: Build ProductGrid**

Horizontal scrollable card row on mobile, 4-column grid on desktop:
- Reads from `products.json`
- Each card: icon (using lucide-react or emoji), product name (bilingual), "Starting ₹X"
- Tap → WhatsApp with pre-filled product inquiry
- Cards: white background, subtle shadow, 12px radius
- Horizontal scroll with snap on mobile (scroll-snap-type: x mandatory)
- No scrollbar visible (hide with CSS)
- Section heading: "Our Solar Solutions" (bilingual)

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: product categories grid with horizontal scroll"
```

---

### Task 9: Quick Calculator (Inline)

**Files:**
- Create: `src/components/home/QuickCalculator.tsx`

**Step 1: Build QuickCalculator**

Simplified inline calculator for the home page:
- Single input: monthly bill slider (₹500 – ₹50,000)
- Slider styled with orange track, large thumb (easy to drag on mobile)
- Display current value: "₹{value}/month"
- Instant output below slider:
  - "You save approximately ₹{savings}/month with solar"
  - "That's ₹{annual}/year!"
- Calculation: savings = bill × 0.80 (80% reduction estimate)
- Green CTA button: "Get Exact Quote on WhatsApp" → calculator inquiry
- Link to full calculator: "Want detailed calculation? →"
- Background: surface color (#F5F5F5)

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: inline quick calculator on home page"
```

---

### Task 10: Government Schemes Section

**Files:**
- Create: `src/components/home/SchemesSection.tsx`

**Step 1: Build SchemesSection**

Trust-building section about government subsidies:
- Section heading: "Government Subsidies" (bilingual)
- PM Surya Ghar Muft Bijli Yojana card:
  - Official scheme name
  - "Up to ₹78,000 subsidy on 3kW system"
  - "Up to ₹30,000 subsidy on 2kW system"
  - Subsidy table: 1kW → ₹30,000, 2kW → ₹60,000, 3kW → ₹78,000
- KUSUM Yojana mention (for farmers: solar pump subsidy)
- "We handle all paperwork" badge
- MNRE logo placeholder
- WhatsApp CTA: "Check your eligibility"

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: government schemes section with subsidy details"
```

---

### Task 11: Why AceSolarTech + Service Area + CTA

**Files:**
- Create: `src/components/home/WhyUs.tsx`
- Create: `src/components/home/ServiceArea.tsx`
- Create: `src/components/home/WhatsAppCTA.tsx`

**Step 1: Build WhyUs**

3 cards in a row (stacked on mobile):
- Free Site Visit (MapPin icon) + description
- EMI Available (CreditCard icon) + description
- 25-Year Warranty (Shield icon) + description
- White cards with orange icon accent

**Step 2: Build ServiceArea**

Simple section with:
- Heading: "We Serve All of Maharashtra"
- Subheading: "Based in Dhule, serving across the state"
- List of key districts: Dhule, Nashik, Jalgaon, Nandurbar, Ahmednagar, Pune, Mumbai
- District chips/badges in a flex wrap
- Could later add a simple SVG map of Maharashtra

**Step 3: Build WhatsAppCTA**

Full-width strip at bottom of home page:
- Green background
- "Have a question? Talk to us on WhatsApp"
- Large WhatsApp button (full width on mobile)
- Phone number displayed as text below

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: why-us cards, service area, and WhatsApp CTA sections"
```

---

### Task 12: Assemble Home Page

**Files:**
- Create: `src/app/page.tsx`

**Step 1: Compose home page**

```tsx
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
```

**Step 2: Test on mobile viewport**

Run dev server (`npm run dev`) and test at 375px width in browser DevTools.
Verify: bottom bar visible, all sections scrollable, WhatsApp links work, language toggle switches text.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: assemble home page with all sections"
```

---

## Phase 4: Deals Page

### Task 13: Deal Components

**Files:**
- Create: `src/components/deals/DealCard.tsx`
- Create: `src/components/deals/DealFilter.tsx`
- Create: `src/components/ui/CountdownTimer.tsx`

**Step 1: Build CountdownTimer**

Client component that shows countdown to `expiresAt`:
- Calculates days, hours, minutes remaining
- Updates every minute (setInterval with cleanup)
- Display: "4d 12h 33m" format (bilingual)
- Red text for urgency
- Returns null if no expiry or expired

**Step 2: Build DealCard**

Card component for a single deal:
- Badge (top-left): "LIMITED TIME" / "BEST SELLER" / "NEW"
- Product title (bilingual, large)
- Price row: ₹original (strikethrough, gray) → ₹dealPrice (large, orange) + "33% off" badge
- "Save ₹{diff}" in green
- Features list (3-4 checkmarks)
- CountdownTimer if has expiry
- Two buttons at bottom: "WhatsApp Now" (green, primary) + "Call Us" (outline)
- White card, shadow, 12px radius

**Step 3: Build DealFilter**

Horizontal scrollable chip row:
- Chips: All, Residential, Farm, Commercial, Seasonal
- Active chip: orange bg + white text
- Inactive: white bg + border
- On click: filters deals list
- Bilingual labels

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: deal card, filter chips, and countdown timer components"
```

---

### Task 14: Deals Page

**Files:**
- Create: `src/app/deals/page.tsx`

**Step 1: Build deals page**

```tsx
'use client';
// Read deals from data, filter by category, render DealFilter + DealCard list
// Framer Motion AnimatePresence for filter transitions
// Empty state message if no deals in category
// Page title: "Current Deals & Offers" (bilingual)
```

- Reads deals from `@/data/deals.json`
- useState for active filter category
- Filters deals by category (or show all)
- Maps to DealCard components
- AnimatePresence for smooth filter transitions
- SEO: metadata export with deal-related keywords

**Step 2: Test**

Navigate to /deals, verify filtering works, countdown renders, WhatsApp links have correct pre-filled messages in current language.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: deals page with filtering and animated transitions"
```

---

## Phase 5: Calculator Page

### Task 15: Full Savings Calculator

**Files:**
- Create: `src/app/calculator/page.tsx`
- Create: `src/components/calculator/SavingsCalculator.tsx`
- Create: `src/lib/solar-calc.ts`

**Step 1: Create solar calculation logic**

Create `src/lib/solar-calc.ts`:
```typescript
export const DISTRICTS = {
  dhule: { name: { en: 'Dhule', mr: 'धुळे' }, sunHours: 5.2 },
  nashik: { name: { en: 'Nashik', mr: 'नाशिक' }, sunHours: 5.0 },
  jalgaon: { name: { en: 'Jalgaon', mr: 'जळगाव' }, sunHours: 5.3 },
  nandurbar: { name: { en: 'Nandurbar', mr: 'नंदुरबार' }, sunHours: 5.1 },
  ahmednagar: { name: { en: 'Ahmednagar', mr: 'अहमदनगर' }, sunHours: 5.0 },
  pune: { name: { en: 'Pune', mr: 'पुणे' }, sunHours: 4.9 },
  mumbai: { name: { en: 'Mumbai', mr: 'मुंबई' }, sunHours: 4.5 },
  aurangabad: { name: { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' }, sunHours: 5.1 },
  kolhapur: { name: { en: 'Kolhapur', mr: 'कोल्हापूर' }, sunHours: 4.8 },
  nagpur: { name: { en: 'Nagpur', mr: 'नागपूर' }, sunHours: 5.2 },
  other: { name: { en: 'Other', mr: 'इतर' }, sunHours: 5.0 },
};

const TARIFF_PER_KWH = 8; // ₹ average MSEDCL residential
const COST_PER_KW = 50000; // ₹ installed cost per kW
const SYSTEM_LOSS = 0.80; // 80% efficiency after losses

export function calculate(monthlyBill: number, propertyType: string, districtKey: string) {
  const district = DISTRICTS[districtKey as keyof typeof DISTRICTS] || DISTRICTS.other;
  const monthlyKwh = monthlyBill / TARIFF_PER_KWH;
  const dailyKwh = monthlyKwh / 30;
  const systemSizeKw = Math.ceil((dailyKwh / (district.sunHours * SYSTEM_LOSS)) * 10) / 10;

  const dailyGeneration = systemSizeKw * district.sunHours * SYSTEM_LOSS;
  const monthlyGeneration = dailyGeneration * 30;
  const monthlySavings = Math.round(monthlyGeneration * TARIFF_PER_KWH);
  const annualSavings = monthlySavings * 12;

  const grossCost = Math.round(systemSizeKw * COST_PER_KW);

  // PM Surya Ghar subsidy (residential only)
  let subsidy = 0;
  if (propertyType === 'residential') {
    if (systemSizeKw <= 2) subsidy = systemSizeKw * 30000;
    else if (systemSizeKw <= 3) subsidy = 60000 + (systemSizeKw - 2) * 18000;
    else if (systemSizeKw <= 10) subsidy = 78000;
    // above 10kW: no subsidy
  }
  subsidy = Math.round(subsidy);

  const netCost = grossCost - subsidy;
  const paybackYears = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : 0;

  return { systemSizeKw, monthlySavings, annualSavings, grossCost, subsidy, netCost, paybackYears };
}
```

**Step 2: Build SavingsCalculator component**

3 inputs:
1. Monthly bill: styled range slider (₹500-₹50,000, step ₹500) with displayed value
2. Property type: 3 radio cards (Home, Farm, Business) with icons
3. District: dropdown/select with all Maharashtra districts

Output panel (card below inputs):
- System size, monthly savings, annual savings, subsidy, net cost, payback
- Each as a labeled row with value
- Highlight savings in green, cost in orange
- Large green WhatsApp button at bottom with pre-filled calculator results

**Step 3: Build calculator page**

Page wrapper with metadata, heading, SavingsCalculator component.

**Step 4: Test**

Verify calculations: ₹5,000 bill in Dhule residential should yield ~5kW system, ~₹4,000/month savings, ₹78,000 subsidy.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: full savings calculator with Maharashtra solar data"
```

---

## Phase 6: About Page

### Task 16: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Build about page**

Sections:
1. **Mission** — 2-3 lines, centered, large text
2. **Our Services** — 2×4 grid of service cards (icon + name for each of the 8 product categories)
3. **Service Area** — reuse ServiceArea component from home
4. **Government Schemes** — reuse SchemesSection from home (or simplified version)
5. **How It Works** — 3-step horizontal flow: WhatsApp → Site Visit → Installation
6. **WhatsApp CTA** — reuse WhatsAppCTA from home

All text bilingual using `useTranslations()`.

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: about page with mission, services, schemes, and how-it-works"
```

---

## Phase 7: Polish & Performance

### Task 17: SEO & Metadata

**Files:**
- Modify: `src/app/layout.tsx` (base metadata)
- Modify: `src/app/page.tsx` (home metadata)
- Modify: `src/app/deals/page.tsx` (deals metadata)
- Modify: `src/app/calculator/page.tsx` (calculator metadata)
- Modify: `src/app/about/page.tsx` (about metadata)

**Step 1: Add metadata to all pages**

Each page gets:
- `title`: "AceSolarTech | [Page Name] | Solar Solutions in Dhule, Maharashtra"
- `description`: relevant, keyword-rich, bilingual consideration
- `keywords`: Maharashtra, Dhule, solar, specific page terms
- `viewport`: `width=device-width, initial-scale=1, viewport-fit=cover`
- `themeColor`: `#FF6B00`
- Open Graph tags for social sharing

**Step 2: Add manifest.json for PWA-lite**

Create `public/manifest.json` with app name, icons, theme color. Not full PWA but enables "Add to Home Screen" on Android.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: SEO metadata on all pages + web manifest"
```

---

### Task 18: Animations & Mobile Polish

**Files:**
- Modify: various components

**Step 1: Add scroll animations**

Use Framer Motion `whileInView` on:
- Section headings (fade up)
- Cards (fade up with stagger)
- WhatsApp CTA (fade in)

Keep animations minimal — `duration: 0.4`, `once: true` (don't re-animate).

**Step 2: Mobile touch polish**

- Verify all touch targets ≥ 44px
- Test horizontal scroll snapping on product grid
- Ensure bottom bar doesn't overlap content
- Test on 375px (iPhone SE) and 412px (common Android) viewports
- Check that slider is easy to drag with thumb

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: scroll animations and mobile touch polish"
```

---

### Task 19: Final Build Test & Deploy Verification

**Step 1: Production build**

```bash
cd /Users/blest/dev/AceSolarTech && npm run build
```

Fix any build errors.

**Step 2: Check bundle size**

```bash
ls -la .next/static/chunks/ | sort -k5 -n
```

Target: total JS < 150KB gzipped.

**Step 3: Test production locally**

```bash
npm run start
```

Open on phone (same network) or use DevTools mobile viewport.

**Step 4: Commit any fixes**

```bash
git add -A && git commit -m "fix: production build fixes and optimizations"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Foundation | 1-4 | Clean slate, data files, i18n, globals, layout |
| 2. Navigation | 5-6 | Bottom bar, headers, lang toggle, footer |
| 3. Home Page | 7-12 | Hero deal, products, calculator, schemes, why-us, service area |
| 4. Deals | 13-14 | Deal cards, filters, countdown, deals page |
| 5. Calculator | 15 | Full savings calculator with Maharashtra data |
| 6. About | 16 | About page with services and how-it-works |
| 7. Polish | 17-19 | SEO, animations, mobile polish, build test |

**Total: 19 tasks, ~15 commits**
