# AceSolarTech — Mobile-First Redesign Design

**Date:** 2026-02-18
**Status:** Approved
**Approach:** WhatsApp Storefront + Deal-Driven Catalog hybrid

---

## Context

AceSolarTech is a new solar company based in Dhule, Maharashtra. Target market is Dhule and broader Maharashtra. Most customers will visit on mobile (budget phones, 6.5-6.7" screens). WhatsApp is the primary business channel (98% open rate in India, 45-60% CTR).

### Key Decisions
- **Mobile-first** — bottom tab navigation, thumb-friendly, performant on budget phones
- **WhatsApp-driven** — every CTA leads to WhatsApp with pre-filled messages
- **Bilingual** — English (default) + Marathi toggle, cookie-based, no URL changes
- **Deals-focused** — rotating deals board as the primary content driver
- **Light mode** — better readability on cheap LCD screens in bright outdoor conditions
- **No fake content** — new company, no placeholder teams/testimonials/history
- **No backend needed** — deals and products as JSON files, forms go to WhatsApp

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19.2.3 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12.x |
| i18n | next-intl (cookie-based, no route prefixes) |
| Language | TypeScript |
| Port | 3020 |
| Fonts | Noto Sans + Noto Sans Devanagari (Google Fonts) |

---

## Design Language

### Color Palette (Light Mode)

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #FF6B00 (Solar Orange) | CTAs, highlights, brand |
| `primary-dark` | #E55A00 | Hover states |
| `primary-light` | #FFF3E0 | Backgrounds, badges |
| `whatsapp` | #25D366 | WhatsApp buttons |
| `whatsapp-dark` | #1DA851 | WhatsApp hover |
| `background` | #FFFFFF | Page background |
| `surface` | #F5F5F5 | Card backgrounds |
| `surface-elevated` | #FFFFFF | Raised cards (with shadow) |
| `text` | #1A1A1A | Primary text |
| `text-secondary` | #666666 | Subdued text |
| `text-muted` | #999999 | Hints, captions |
| `border` | #E0E0E0 | Borders, dividers |
| `success` | #2E7D32 | Savings, eco messaging |
| `danger` | #D32F2F | Deal urgency, countdown |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Display/Headlines | Noto Sans Devanagari | 600, 700 |
| Body Text | Noto Sans | 400, 500, 600 |

Both fonts support Latin + Devanagari scripts natively.

### Component Style
- Border radius: 12px (cards), 8px (buttons), 24px (chips/badges)
- Shadows: subtle (`0 1px 3px rgba(0,0,0,0.1)`)
- No glassmorphism (performance on budget phones)
- Touch targets: minimum 44px height
- Spacing: 16px page padding on mobile

---

## Site Structure

```
/              → Home (hero deal, products, schemes, trust, calculator)
/deals         → Deals board (filterable, with countdown timers)
/calculator    → Full savings calculator (Maharashtra-specific)
/about         → Company mission, services, service area, schemes
```

---

## Navigation

### Mobile (< 768px): Bottom Tab Bar

Fixed bottom navigation (56px height), 4 tabs:

| Tab | Icon | Label | Action |
|-----|------|-------|--------|
| Home | 🏠 | Home | Navigate to / |
| Deals | 🏷️ | Deals | Navigate to /deals |
| Calculator | 🔢 | Calc | Navigate to /calculator |
| WhatsApp | 💬 | Chat | Open wa.me link |

Active tab: orange icon + label. Inactive: gray.

### Mobile Top Header (40px)
- Left: Logo (compact)
- Right: Language toggle (EN | मराठी)

### Desktop (>= 768px)
- Traditional top nav with logo + links + language toggle + WhatsApp CTA
- No bottom bar

---

## Page Designs

### Home Page (/)

Scroll order (mobile):

1. **Hero Deal Banner**
   - Full-width card with current best offer
   - Large price: "₹89,999" with strikethrough original
   - Countdown timer if deal has expiry
   - Green WhatsApp button: "Get This Deal"
   - Swipeable if multiple hero deals (dots indicator)

2. **Product Categories** (horizontal scroll)
   - 6-8 rounded cards in horizontal scroll
   - Categories: Rooftop Solar, Farm Solar, Solar Motor, Solar Lights, Commercial, Parking Lot
   - Each: icon + name + "Starting ₹X"
   - Tap → WhatsApp with pre-filled inquiry

3. **Quick Calculator** (inline section)
   - Single slider: "Your monthly bill: ₹____"
   - Instant output: "You save ₹X/month with solar"
   - Button: "Get exact quote" → WhatsApp

4. **Government Schemes**
   - PM Surya Ghar Muft Bijli Yojana highlight
   - "Up to ₹78,000 subsidy on 3kW system"
   - "We handle all paperwork"
   - MNRE badge

5. **Why AceSolarTech** (3 cards)
   - "Free site visit" | "EMI available" | "25-year warranty"

6. **Service Area**
   - Illustrated/simple map of North Maharashtra
   - Districts highlighted: Dhule, Nashik, Jalgaon, Nandurbar, Ahmednagar

7. **WhatsApp CTA Strip**
   - "Any question? Talk to us on WhatsApp"
   - Full-width green button

### Deals Page (/deals)

- **Filter chips** at top: All | Residential | Farm | Commercial | Seasonal
- **Vertical card feed** of deal cards
- **Each deal card:**
  - Badge: "LIMITED TIME" or "NEW" or "BEST SELLER"
  - Product name
  - Price: original (strikethrough) → deal price + savings percentage
  - 3-4 feature bullet points
  - Countdown timer (if has expiry)
  - WhatsApp button + Call button
- **Empty state:** "No deals in this category. Check back soon!"
- **Data source:** `data/deals.json`

### Calculator Page (/calculator)

- **3 inputs:**
  1. Monthly bill slider (₹500 – ₹50,000)
  2. Property type: Residential / Farm / Commercial (radio buttons)
  3. District dropdown (Dhule, Nashik, Jalgaon, Nandurbar, Ahmednagar, Pune, Mumbai, Other)
- **Output panel (card):**
  - Recommended system size (kW)
  - Monthly savings (₹)
  - Annual savings (₹)
  - Government subsidy (₹) — PM Surya Ghar rates
  - Net cost after subsidy (₹)
  - Payback period (years)
- **WhatsApp CTA:** Pre-filled with calculator results
- **Calculation logic:**
  - Sun hours by district (Dhule: 5.2, Nashik: 5.0, Jalgaon: 5.3, etc.)
  - MSEDCL tariff: ₹8/kWh average
  - System cost: ₹50,000/kW
  - Subsidy: 40% for ≤3kW, 20% for 3-10kW, 0% above 10kW (PM Surya Ghar)

### About Page (/about)

1. **Mission** — 2-3 lines about making solar accessible in Maharashtra
2. **Our Services** — icon grid of all services offered
3. **Service Area** — map with districts served
4. **Government Schemes** — PM Surya Ghar, KUSUM (farmers), MNRE details
5. **How It Works** — 3 steps: WhatsApp us → Free site visit → Installation
6. **WhatsApp CTA**

---

## Bilingual Implementation (EN/Marathi)

- **Default language:** English
- **Toggle:** `EN | मराठी` in header, saves to cookie
- **Implementation:** `next-intl` with cookie-based locale detection
- **No URL changes** — same URLs for both languages
- **All UI strings** in `i18n/en.json` and `i18n/mr.json`
- **Deal/product data** has bilingual fields: `{ "en": "...", "mr": "..." }`
- **WhatsApp messages** match current language

---

## WhatsApp Integration

Every CTA generates a `wa.me` link:
```
https://wa.me/91XXXXXXXXXX?text=<pre-filled message>
```

### Pre-filled Message Templates

| Context | English | Marathi |
|---------|---------|---------|
| General | Hi! I'm interested in solar solutions. | नमस्कार! मला सोलर सोल्यूशन्स बद्दल माहिती हवी आहे. |
| Product | Hi! I'm interested in [product] for my [type] in [district]. | नमस्कार! मला [district] मधील माझ्या [type] साठी [product] बद्दल माहिती हवी आहे. |
| Deal | Hi! I saw the [deal name] offer. Please share details. | नमस्कार! मी [deal name] ऑफर पाहिली. कृपया तपशील सांगा. |
| Calculator | Hi! I need a [X]kW system in [district]. My bill is ₹[amount]/month. | नमस्कार! मला [district] मध्ये [X]kW सिस्टम हवी आहे. माझे बिल ₹[amount]/महिना आहे. |

---

## Data Files

### data/deals.json
```json
{
  "deals": [
    {
      "id": "summer-3kw-2026",
      "title": { "en": "3kW Rooftop Solar System", "mr": "3kW रूफटॉप सोलर सिस्टम" },
      "description": { "en": "Complete rooftop solution...", "mr": "संपूर्ण रूफटॉप सोल्यूशन..." },
      "originalPrice": 135000,
      "dealPrice": 89999,
      "category": "residential",
      "badge": { "en": "BEST SELLER", "mr": "सर्वाधिक विक्री" },
      "features": {
        "en": ["Free installation", "5-year warranty", "Net metering included", "MNRE approved panels"],
        "mr": ["मोफत इंस्टॉलेशन", "5-वर्ष वॉरंटी", "नेट मीटरिंग समाविष्ट", "MNRE मान्य पॅनेल"]
      },
      "expiresAt": "2026-03-31T23:59:59",
      "active": true
    }
  ]
}
```

### data/products.json
```json
{
  "products": [
    {
      "id": "rooftop-solar",
      "name": { "en": "Rooftop Solar", "mr": "रूफटॉप सोलर" },
      "icon": "sun",
      "startingPrice": 45000,
      "unit": "kW",
      "description": { "en": "For homes and buildings", "mr": "घरे आणि इमारतींसाठी" }
    }
  ]
}
```

---

## Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | Budget phones on 4G |
| Largest Contentful Paint | < 2.5s | Hero deal must load fast |
| Total page weight | < 500KB | Data costs money |
| Images | WebP, lazy loaded | Bandwidth savings |
| Fonts | Subset Noto Sans | Only load needed glyphs |
| JS bundle | < 150KB | Budget phone RAM |
