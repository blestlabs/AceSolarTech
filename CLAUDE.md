# AceSolarTech — Project Documentation

**Last Updated:** February 19, 2026
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
| gray-matter | 4.x | Blog markdown frontmatter parsing |
| remark + remark-html | 15.x | Markdown → HTML rendering |
| @tailwindcss/typography | 4.x | Blog prose styling |
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
│   ├── blog/page.tsx           # Blog listing (search + tag filter)
│   ├── blog/[slug]/page.tsx   # Dynamic blog post (SEO metadata, generateStaticParams)
│   ├── about/page.tsx          # Company info + schemes
│   ├── error.tsx               # Error boundary with retry
│   ├── not-found.tsx           # Branded 404 page
│   ├── robots.ts               # /robots.txt generator
│   └── sitemap.ts              # /sitemap.xml generator (dynamic, includes blog slugs)
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
│   ├── blog/
│   │   ├── BlogListContent.tsx   # Grid layout, search, tag filter, image cards
│   │   └── BlogPostContent.tsx   # Article layout, prose styling, share, WhatsApp CTA
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
│   ├── deals.json              # 4 bilingual deals (edit to update)
│   └── blog/                   # Markdown blog posts (frontmatter + content)
│       ├── pm-surya-ghar-yojana-2026-complete-guide.md
│       ├── kusum-yojana-solar-pumps-maharashtra-farmers.md
│       ├── complete-guide-rooftop-solar-installation-india.md
│       ├── net-metering-maharashtra-msedcl-guide.md
│       └── solar-panel-maintenance-guide-25-year-lifespan.md
├── i18n/
│   ├── config.ts               # Locale types
│   ├── en.json                 # English UI strings
│   └── mr.json                 # Marathi UI strings
└── lib/
    ├── i18n.ts                 # useLocale(), useTranslations(), getLocalizedField()
    ├── whatsapp.ts             # WhatsApp link generators (pre-filled messages)
    ├── solar-calc.ts           # Maharashtra solar calculation engine (bilingual districts)
    └── blog.ts                 # Blog utilities (getAllBlogMeta, getBlogPost, markdown parsing)
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

**Blog images** (22 images in `public/images/blog/`, generated via gpt-image-1):
Hero images (5): `pm-surya-ghar-guide.png`, `kusum-yojana-solar-pump.png`, `rooftop-solar-installation-guide.png`, `net-metering-maharashtra.png`, `solar-panel-maintenance-cleaning.png`
In-content (17): subsidy tables, application processes, before/after comparisons, diagrams, infographics

**Stock images** (15 images in `public/images/stock/`, generated via gpt-image-1):
`happy-family-solar-home.png`, `solar-team-installation.png`, `commercial-solar-factory.png`, `solar-street-lights-village.png`, `solar-water-heater-rooftop.png`, `farmer-solar-pump-irrigation.png`, `solar-carport-parking.png`, `solar-home-lights-interior.png`, `maharashtra-solar-landscape.png`, `emi-solar-financing.png`, `government-subsidy-filing.png`, `solar-panel-warranty-25year.png`, `dhule-city-solar.png`, `social-media-banner-solar.png`, `whatsapp-status-solar-offer.png`

To regenerate images: use `python3 scripts/generate-blog-images.py` (uses gpt-image-1 via OpenAI API, key in `~/.secrets/credentials.json` → `api_keys.openai`).

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
| Add/edit blog posts | `src/data/blog/*.md` (frontmatter + markdown, bilingual title/desc) |
| Regenerate blog images | `python3 scripts/generate-blog-images.py` |

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

## Blog System

Markdown-powered blog at `/blog` with bilingual support. Posts are `.md` files in `src/data/blog/` with YAML frontmatter.

**Frontmatter fields:** `title`, `titleMr`, `description`, `descriptionMr`, `date`, `author`, `tags[]`, `image`, `imageAlt`, `readTime`

**Pages:** `/blog` (listing with search + tag filter), `/blog/[slug]` (article with prose styling + WhatsApp CTA)

**Current posts (5, ~21,000 words total):**

| Post | Slug | Words | Tags |
|------|------|-------|------|
| PM Surya Ghar Yojana 2026 Guide | `pm-surya-ghar-yojana-2026-complete-guide` | 3,515 | Government Subsidy, PM Surya Ghar, Rooftop Solar, Maharashtra |
| KUSUM Yojana Solar Pumps | `kusum-yojana-solar-pumps-maharashtra-farmers` | 3,698 | KUSUM Yojana, Solar Pump, Farmers, Agriculture, Maharashtra |
| Rooftop Solar Installation Guide | `complete-guide-rooftop-solar-installation-india` | 5,599 | Rooftop Solar, Solar Installation, Solar Panels, India, Guide |
| Net Metering Maharashtra MSEDCL | `net-metering-maharashtra-msedcl-guide` | 3,939 | Net Metering, MSEDCL, Maharashtra, Electricity Bill, Solar Savings |
| Solar Panel Maintenance 25-Year | `solar-panel-maintenance-guide-25-year-lifespan` | 4,194 | Solar Maintenance, Solar Panels, Tips, Cleaning, Maharashtra |

**To add a new blog post:**
1. Create `src/data/blog/your-slug.md` with frontmatter + markdown content
2. Add hero image to `public/images/blog/`
3. Rebuild (`npm run build`) — sitemap auto-updates

## Changelog

| Date | Change |
|------|--------|
| 2026-02-19 | **BLOG SYSTEM + 37 IMAGES** - Full blog infrastructure: markdown pipeline (gray-matter + remark), /blog listing with search + tag filtering, /blog/[slug] dynamic route with SEO metadata, Tailwind Typography prose styling, navigation updated (BottomBar + DesktopHeader + EN/MR translations), sitemap dynamically includes blog slugs. 5 researched blog posts (~21,000 words): PM Surya Ghar guide, KUSUM Yojana farmers guide, Rooftop Solar installation guide, Net Metering MSEDCL guide, Solar Panel Maintenance guide. 37 images generated via OpenAI gpt-image-1 (22 blog + 15 stock). Image generation script at `scripts/generate-blog-images.py`. |
| 2026-02-18 | **AUDIT FIXES** - 3 parallel agents: (1) SEO — robots.ts, sitemap.ts, error.tsx, not-found.tsx, per-page OG metadata, JSON-LD LocalBusiness, AVIF image optimization, removed next-intl dependency. (2) i18n — Fixed translation keys, QuickCalculator uses solar-calc.ts instead of hardcoded math, bilingual district names, SavingsCalculator label/id pairs + fieldset. (3) A11Y — FloatingWhatsApp FAB, prefers-reduced-motion on all animations, aria-current/aria-pressed/aria-live across nav + filters + countdown, dynamic aria-labels. Repo made public. |
| 2026-02-18 | **IMAGES & ASSETS** - DALL-E 3 generated logo, OG social banner, 8 product illustrations, favicon, apple-touch-icon, PWA icons (192/512px). Integrated into headers (logo), product grid (illustrations replace lucide icons), manifest, OpenGraph metadata. Added metadataBase for acesolartech.com. |
| 2026-02-18 | **COMPLETE REDESIGN** - Mobile-first, WhatsApp-driven, bilingual EN/Marathi. Light theme for outdoor readability. Bottom tab nav, deals board with countdown timers, solar calculator with Maharashtra data + PM Surya Ghar subsidy, government schemes section, 8 product categories, service area (Dhule HQ + 10 Maharashtra districts). 35 source files from scratch. |
| 2026-02-18 | **Initial site** - Dark theme premium design (replaced by redesign above) |
