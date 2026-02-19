# AceSolarTech — Project Documentation

**Last Updated:** February 18, 2026
**Status:** Active Production
**URL:** https://acesolartech.com
**Port:** 3020
**Repo:** https://github.com/blestlabs/AceSolarTech

---

## Overview

Mobile-first solar company website targeting Dhule and Maharashtra, India. WhatsApp-driven lead generation with bilingual English/Marathi support. Light theme optimized for outdoor readability on budget phones.

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | App Router, SSR |
| React | 19.2.3 | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4 | Styling (light theme) |
| Framer Motion | 12.x | Animations |
| lucide-react | 0.574+ | Icons |
| (no external i18n) | — | Custom lightweight impl (cookie-based) |

## Design Decisions

- **Light theme** — budget LCD screens in bright sunlight need white backgrounds
- **Bottom tab navigation** (mobile) — matches WhatsApp/PhonePe/Paytm UX patterns
- **WhatsApp-first** — every CTA generates a `wa.me` link with pre-filled bilingual messages
- **No backend** — deals and products stored as JSON files, forms go to WhatsApp
- **Cookie-based i18n** — no URL prefixes, instant toggle between EN/Marathi
- **Default language: English** — switchable to Marathi

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Noto Sans fonts, LocaleProvider, JSON-LD)
│   ├── page.tsx                # Home (7 sections)
│   ├── deals/page.tsx          # Deals board (filterable)
│   ├── calculator/page.tsx     # Solar savings calculator
│   ├── about/page.tsx          # Company info + schemes
│   ├── error.tsx               # Error boundary with retry
│   ├── not-found.tsx           # Branded 404 page
│   ├── robots.ts               # /robots.txt generator
│   └── sitemap.ts              # /sitemap.xml generator (4 pages)
├── components/
│   ├── home/
│   │   ├── HeroDeal.tsx        # Featured deal banner (reduced-motion aware)
│   │   ├── ProductGrid.tsx     # 8 product categories (horizontal scroll)
│   │   ├── QuickCalculator.tsx # Inline savings preview (uses solar-calc.ts)
│   │   ├── SchemesSection.tsx  # PM Surya Ghar + KUSUM info
│   │   ├── WhyUs.tsx           # 3 trust cards (reduced-motion aware)
│   │   ├── ServiceArea.tsx     # Maharashtra district chips (bilingual)
│   │   └── WhatsAppCTA.tsx     # Green CTA strip (reduced-motion aware)
│   ├── deals/
│   │   ├── DealCard.tsx        # Deal with pricing + countdown
│   │   ├── DealFilter.tsx      # Category filter chips (aria-pressed)
│   │   └── DealsPageContent.tsx
│   ├── calculator/
│   │   ├── SavingsCalculator.tsx # Full calculator (fieldset/legend, label/id pairs)
│   │   └── CalculatorPageContent.tsx
│   ├── about/
│   │   └── AboutPageContent.tsx  # (reduced-motion aware)
│   ├── layout/
│   │   ├── BottomBar.tsx       # Mobile bottom tabs (aria-current, min-h-14)
│   │   ├── MobileHeader.tsx    # Slim header with lang toggle
│   │   ├── DesktopHeader.tsx   # Traditional nav (aria-current, aria-label)
│   │   └── Footer.tsx          # Desktop only (aria-label)
│   ├── ui/
│   │   ├── LangToggle.tsx      # EN/मराठी switch (dynamic aria-label)
│   │   ├── CountdownTimer.tsx  # Deal expiry countdown (aria-live)
│   │   └── FloatingWhatsApp.tsx # Fixed WhatsApp FAB button
│   └── providers/
│       └── LocaleProvider.tsx  # Locale context + cookie (SameSite=Lax) + html lang update
├── data/
│   ├── products.json           # 8 bilingual product categories
│   └── deals.json              # 4 bilingual deals (edit to update)
├── i18n/
│   ├── config.ts               # Locale types
│   ├── en.json                 # English UI strings
│   └── mr.json                 # Marathi UI strings
└── lib/
    ├── i18n.ts                 # useLocale(), useTranslations(), getLocalizedField()
    ├── whatsapp.ts             # WhatsApp link generators (pre-filled messages)
    └── solar-calc.ts           # Maharashtra solar calculation engine (bilingual districts)
```

## Image Assets

All images generated via DALL-E 3 (OpenAI API), stored in `public/`:

| Asset | File | Size |
|-------|------|------|
| Logo icon | `images/logo-icon.png` | 1024x1024 |
| OG social banner | `images/og-image.png` | 1792x1024 |
| Favicon | `favicon.ico` | 32x32 |
| Apple touch icon | `apple-touch-icon.png` | 180x180 |
| PWA icon (small) | `icon-192.png` | 192x192 |
| PWA icon (large) | `icon-512.png` | 512x512 |

**Product illustrations** (8 images in `public/images/`):
`product-rooftop.png`, `product-farm.png`, `product-motor.png`, `product-street-light.png`, `product-home-light.png`, `product-commercial.png`, `product-parking.png`, `product-water-heater.png`

To regenerate images: use DALL-E 3 via OpenAI API (key in `~/.secrets/credentials.json` → `api_keys.openai`).

## Key Files to Edit

| Task | File |
|------|------|
| Add/remove deals | `src/data/deals.json` |
| Add/remove products | `src/data/products.json` (includes `image` field for illustration path) |
| Change WhatsApp number | `src/lib/whatsapp.ts` (line 1: `WHATSAPP_NUMBER`) |
| Update translations | `src/i18n/en.json` + `src/i18n/mr.json` |
| Modify solar calculations | `src/lib/solar-calc.ts` |
| Add Maharashtra districts | `src/lib/solar-calc.ts` (DISTRICTS object) |
| Replace product images | `public/images/product-*.png` (update `src/data/products.json` `image` field) |

## Color Palette (Light Theme)

| Token | Value | Usage |
|-------|-------|-------|
| primary | #FF6B00 | Solar orange — CTAs, highlights |
| primary-light | #FFF3E0 | Badge backgrounds |
| whatsapp | #25D366 | WhatsApp buttons |
| background | #FFFFFF | Page background |
| surface | #F5F5F5 | Section backgrounds |
| text | #1A1A1A | Primary text |
| success | #2E7D32 | Savings, eco messaging |
| danger | #D32F2F | Countdown urgency |

## Typography

| Role | Font |
|------|------|
| Body | Noto Sans (latin + devanagari) |
| Display/Headlines | Noto Sans Devanagari |

## WhatsApp Integration

Every CTA generates `wa.me` links with pre-filled messages (bilingual):
- `generalInquiry(locale)` — generic solar inquiry
- `productInquiry(productName, locale)` — specific product
- `dealInquiry(dealTitle, locale)` — specific deal
- `calculatorInquiry(kw, district, bill, locale)` — calculator results

**IMPORTANT:** Update `WHATSAPP_NUMBER` in `src/lib/whatsapp.ts` with the real business number before sharing with customers.

## Solar Calculator Data

Maharashtra-specific values in `src/lib/solar-calc.ts`:
- 11 districts with sun hours (4.5–5.3 hrs/day)
- MSEDCL tariff: ₹8/kWh average
- System cost: ₹50,000/kW
- PM Surya Ghar subsidy: 40% for ≤2kW, tiered for 2-3kW, capped ₹78K for 3-10kW

## Quick Commands

```bash
npm run dev          # Dev server on port 3020
npm run build        # Production build
pm2 restart acesolartech-frontend  # Restart production
pm2 logs acesolartech-frontend     # View logs
```

## Changelog

| Date | Change |
|------|--------|
| 2026-02-18 | **AUDIT FIXES** - 3 parallel agents: (1) SEO — robots.ts, sitemap.ts, error.tsx, not-found.tsx, per-page OG metadata, JSON-LD LocalBusiness, AVIF image optimization, removed next-intl dependency. (2) i18n — Fixed translation keys, QuickCalculator uses solar-calc.ts instead of hardcoded math, bilingual district names, SavingsCalculator label/id pairs + fieldset. (3) A11Y — FloatingWhatsApp FAB, prefers-reduced-motion on all animations, aria-current/aria-pressed/aria-live across nav + filters + countdown, dynamic aria-labels. Repo made public. |
| 2026-02-18 | **IMAGES & ASSETS** - DALL-E 3 generated logo, OG social banner, 8 product illustrations, favicon, apple-touch-icon, PWA icons (192/512px). Integrated into headers (logo), product grid (illustrations replace lucide icons), manifest, OpenGraph metadata. Added metadataBase for acesolartech.com. |
| 2026-02-18 | **COMPLETE REDESIGN** - Mobile-first, WhatsApp-driven, bilingual EN/Marathi. Light theme for outdoor readability. Bottom tab nav, deals board with countdown timers, solar calculator with Maharashtra data + PM Surya Ghar subsidy, government schemes section, 8 product categories, service area (Dhule HQ + 10 Maharashtra districts). 35 source files from scratch. |
| 2026-02-18 | **Initial site** - Dark theme premium design (replaced by redesign above) |
