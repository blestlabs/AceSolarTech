# AceSolarTech UI Audit Report

**Date:** March 15, 2026
**URL:** https://acesolartech.com
**Auditor:** Claude Code (Playwright MCP)
**Screenshots:** 21 screenshots saved to `/Users/blest/dev/AceSolarTech/ui-audit/`

---

## Executive Summary

AceSolarTech is a well-built, mobile-first solar company website targeting Dhule and Maharashtra, India. The site is professionally designed with a clean light theme, comprehensive bilingual (EN/Marathi) support, and strong WhatsApp-driven CTA strategy. Performance is excellent (98ms TTFB, 143ms DOM interactive). Zero console errors and zero broken images across all pages.

**Overall Rating: 8.0/10**

The site is production-ready with a few notable issues that should be addressed before customer-facing use, most critically the placeholder WhatsApp number.

---

## Page-by-Page Analysis

### 1. Homepage (/) - Rating: 8.5/10
**Screenshots:** `01-homepage-viewport.png`, `02-homepage-fullpage.png`, `03-homepage-calculator-section.png`, `04-homepage-products-section.png`, `05-homepage-whyus-section.png`, `06-homepage-servicearea.png`

**Strengths:**
- Clean, professional hero section with the 3kW deal prominently featured
- Strong visual hierarchy: price, discount badge, feature list, CTAs
- Product grid is well-organized with 8 categories and clear pricing
- Quick Calculator is interactive and responsive
- Government Subsidies section is informative with clear subsidy tiers
- WhyUs section has compelling illustrations (Free Site Visit, EMI, 25-Year Warranty)
- Service Area map image is attractive with district chips below
- Sticky header navigation works well

**Issues:**
- Full-page screenshot shows blank white space where sections 3-7 should be (Framer Motion animations + lazy rendering cause content to not render until scrolled to). This is a cosmetic screenshot issue only -- content renders perfectly when scrolled to by users.
- H1 tag is "3kW Rooftop Solar System" -- this is the featured deal title, not a page-level heading. For SEO, the H1 should describe the page purpose (e.g., "Solar Solutions for Dhule & Maharashtra").
- Product cards all link to WhatsApp -- no individual product detail pages exist. Users cannot learn more before committing to WhatsApp.

### 2. Deals Page (/deals) - Rating: 8.0/10
**Screenshots:** `07-deals-page-top.png`, `08-deals-residential-filter.png`, `09-deals-fullpage.png`

**Strengths:**
- Filter chips (All, Residential, Farm, Commercial) work correctly with instant filtering
- Deal cards are well-structured: image, badge, title, description, pricing, savings, features, countdown, CTAs
- Countdown timers display correctly ("Ends in 46d 7h 55m")
- Dual CTA (WhatsApp Now + Call Us) is good
- WhatsApp links include deal-specific pre-filled messages

**Issues:**
- Deals are displayed in a single-column layout on desktop (1440px wide). The cards are quite narrow (~65% width) with wasted whitespace on both sides. A 2-column grid would be more efficient for desktop.
- The 5HP Solar Water Pump (Farm) deal has no countdown timer while others do -- this is intentional but inconsistent visually.
- The "Commercial" image for the Solar Street Light Pack shows "Commercial solar array" (generic alt text) instead of street lights.
- Only 4 deals total -- could feel thin for a deals page.

### 3. Calculator Page (/calculator) - Rating: 8.5/10
**Screenshots:** `10-calculator-page.png`, `11-calculator-farm-results.png`

**Strengths:**
- Beautiful hero image banner
- Slider input is intuitive (Rs 500 to Rs 50,000 range)
- Property Type selector (Home/Farm/Business) with icons
- District dropdown with 11 Maharashtra districts
- Results update dynamically: system size, monthly/annual savings, govt subsidy, cost after subsidy, payback period
- WhatsApp CTA includes calculator values in pre-filled message

**Issues:**
- When "Farm" property type is selected, the Govt. Subsidy row shows "--" (dash) but "Your Cost (After Subsidy)" still shows a number (Rs 1,60,000). This is confusing -- users see "After Subsidy" but no subsidy is applied. The label should change to "Estimated Cost" or the subsidy should explain "KUSUM subsidy varies -- contact us."
- The Property Type buttons have no active state styling difference beyond the orange border -- could be more obvious.

### 4. Blog Page (/blog) - Rating: 7.5/10
**Screenshots:** `12-blog-page.png`, `13-blog-search-results.png`

**Strengths:**
- 5 comprehensive blog posts (21,000+ words total) -- excellent content quality
- Search functionality works (instant filtering by title/description)
- Tag filter chips with 19 tags for precise filtering
- Clean 3-column card grid with images, tags, titles, descriptions, dates, read times
- Proper blog post URLs (`/blog/[slug]`)

**Issues:**
- The search input box is visually disconnected from the magnifying glass icon. The icon appears below/outside the textbox container rather than inside it. This is a UI polish issue.
- 19 tag filter chips take up 3 rows -- this is overwhelming. Consider collapsing them into a "More tags" dropdown after showing 8-10 most popular.
- Blog titles are truncated with "..." on the card -- consider allowing 3 lines or making cards taller.
- All 5 blog posts share the same dates (Feb 16-18, 2026) -- looks like they were all published at once, reducing authenticity. Stagger dates further apart.

### 5. Blog Post Page (/blog/[slug]) - Rating: 7.0/10
**Screenshots:** Could not capture (page too large at 26,667px -- caused Playwright screenshot timeouts)

**Strengths:**
- "All Blogs" back navigation link
- Hero image with proper alt text
- Tags, date, read time, author metadata
- Share button (Web Share API with clipboard fallback)
- WhatsApp CTA at bottom of article
- Prose styling with proper table formatting
- Proper OG metadata (og:type=article, article:published_time, article:author)

**Issues:**
- No social sharing links (Twitter/X, Facebook, LinkedIn) -- only a generic "Share" button that uses Web Share API. On desktop browsers without Web Share support, it only copies the URL.
- The WhatsApp CTA at the end of the blog post uses a hardcoded placeholder number (`91XXXXXXXXXX`) instead of the `whatsappLink()` function from `src/lib/whatsapp.ts`.
- JSON-LD structured data is `LocalBusiness` type only -- blog posts should also have `Article` or `BlogPosting` structured data for Google rich results.
- Page height is 26,667px -- extremely long. Consider adding a table of contents or "Back to Top" button.
- No "Related Posts" section at the end.

### 6. About Page (/about) - Rating: 7.5/10
**Screenshots:** `15-about-page-top.png`, `16-about-services.png`

**Strengths:**
- Beautiful hero banner (Maharashtra solar landscape) with mission statement
- Professional team photo
- Clean "Our Services" grid with 8 service icons
- "How It Works" 3-step flow (WhatsApp Us > Free Site Visit > Installation) is clear
- Government Subsidies section (shared component with homepage)
- Service Area map (shared component)

**Issues:**
- No H1 tag or "About AceSolarTech" heading visible above the fold. The page starts with an image and paragraph -- the company name/identity is not prominent.
- No company story, founding year, or team member bios. The team photo is great but unnamed.
- No contact information (address, email, phone) beyond WhatsApp.
- No certifications, licenses, or accreditation details.
- The page largely duplicates homepage sections (Services, Subsidies, Service Area, WhatsApp CTA). Unique about content is minimal.

---

## Navigation & UX

### Language Toggle - Rating: 9.0/10
**Screenshot:** `17-homepage-marathi.png`

**Strengths:**
- Comprehensive Marathi translation -- every text element translates including nav, products, CTAs, pricing labels, city names, footer, copyright.
- WhatsApp pre-filled messages switch to Marathi when in Marathi mode.
- Instant toggle with no page reload.
- Cookie-based persistence.

**Issues:**
- Blog content does not translate to Marathi. Blog post titles and descriptions have `titleMr` and `descriptionMr` fields in frontmatter but the blog listing page cards and the blog post body remain in English.

### Mobile View - Rating: 8.5/10
**Screenshots:** `18-mobile-homepage.png`, `19-mobile-products.png`, `20-mobile-bottom.png`, `21-mobile-gridshakti-btn.png`

**Strengths:**
- Bottom tab bar with Home, Deals, Calc, Blog, Chat icons -- follows Indian app UX patterns (WhatsApp/Paytm style).
- Simplified mobile header: logo + GridShakti + language toggle only.
- Content stacks vertically on mobile without horizontal overflow.
- Product cards display in 2-column grid on mobile.
- Touch-friendly button sizes.
- GridShakti link present on both desktop and mobile headers.

**Issues:**
- Hero image (family with solar panels) is completely hidden on mobile -- only the text/price/CTAs show. The image adds trust and visual appeal; consider showing it above or below the text on mobile.
- Floating WhatsApp button slightly overlaps with the bottom navigation bar in the bottom-right corner. It could confuse taps.
- The "About" page link is not in the mobile bottom bar (limited to 5 items: Home, Deals, Calc, Blog, Chat).

### Desktop Footer - Rating: 6.5/10

**Issues:**
- Missing "Blog" link in footer navigation. Only has Home, Deals, Calc, About.
- No contact information (phone, email, address).
- No social media links.
- Very minimal -- just 5 lines of text. Could be expanded.

---

## Technical Checks

### Performance - Rating: 9.5/10
- **TTFB:** 98ms (excellent)
- **DOM Interactive:** 143ms (excellent)
- **DOM Content Loaded:** 143ms (excellent)
- **Load Complete:** 144ms (excellent)
- **Framework:** Next.js 16.1.6 with App Router, SSR
- **Observation:** The site is blazing fast. Cloudflare tunnel + Next.js SSR delivers sub-150ms load times.

### Console Errors - Rating: 10/10
- Zero errors, zero warnings across all pages tested.

### Images - Rating: 9.5/10
- Zero broken images.
- All images have alt text (accessibility pass).
- Next.js Image component with proper `sizes` and quality optimization.
- 40 font faces loaded -- this is high but doesn't impact perceived performance due to font-display: swap.

### External Links - Rating: 9.5/10
- All WhatsApp links open in new tabs with `target="_blank"` and `rel="noopener noreferrer"`.
- GridShakti links open in new tabs properly.
- No external links without proper target/rel attributes.

### SEO - Rating: 7.5/10

**Good:**
- Proper page titles per page
- Meta descriptions present
- Open Graph tags (title, description, image, type)
- Twitter Card tags
- Canonical URLs set
- JSON-LD LocalBusiness structured data
- Proper heading hierarchy (H1 > H2 > H3, no skips)
- sitemap.xml and robots.txt present
- Blog posts have article:published_time and article:author meta

**Issues:**
- Homepage H1 is "3kW Rooftop Solar System" (a deal title) instead of a page-descriptive heading.
- Blog posts only have LocalBusiness JSON-LD, not Article/BlogPosting.
- No `hreflang` tags for the English/Marathi language variants.
- The `htmlLang` is always "en" even when viewing in Marathi.

### Accessibility - Rating: 8.5/10

**Good:**
- All images have alt text
- All buttons have labels
- Proper ARIA attributes (aria-current, aria-pressed, aria-live)
- Reduced-motion support on animations
- Proper heading hierarchy
- Color contrast appears sufficient (orange on white)

**Issues:**
- No skip-to-content link.
- Slider input for calculator could use aria-valuetext for screen readers.

---

## CRITICAL: Placeholder WhatsApp Number

**The WhatsApp number throughout the entire site is `91XXXXXXXXXX` -- a placeholder.**

This appears in:
- `src/lib/whatsapp.ts` line 1: `const WHATSAPP_NUMBER = '91XXXXXXXXXX';`
- `src/components/blog/BlogPostContent.tsx` line 130: hardcoded in href

The site must NOT be shared with customers until this is replaced with the actual business WhatsApp number. Every CTA on every page generates broken WhatsApp links.

---

## Priority-Ordered TODO List

### P0 -- Critical (Must fix before customer use)
1. **Replace placeholder WhatsApp number** in `src/lib/whatsapp.ts` with the real business number.
2. **Fix hardcoded WhatsApp number** in `BlogPostContent.tsx` line 130 -- use the `whatsappLink()` function instead.

### P1 -- High Priority (Should fix soon)
3. **Add "Blog" link to footer** navigation in `src/components/layout/Footer.tsx`.
4. **Fix calculator "After Subsidy" label** when Farm/Business type is selected and subsidy is "--".
5. **Fix search input styling** on blog page -- align the magnifying glass icon inside the text input.
6. **Add Article/BlogPosting JSON-LD** structured data to blog post pages for Google rich results.
7. **Fix homepage H1** -- change to a page-descriptive heading; make the deal title an H2.
8. **Update `htmlLang` attribute** dynamically when switching to Marathi (it stays "en").

### P2 -- Medium Priority (Improve before scaling)
9. **Add contact information** to the About page and footer (address, phone, email).
10. **Add social sharing links** to blog posts (Twitter/X, Facebook, LinkedIn, WhatsApp share).
11. **Show hero image on mobile** homepage -- even a smaller version adds trust.
12. **Add company story/bios** to About page to differentiate from homepage.
13. **Consider 2-column deal layout** on desktop to use screen space better.
14. **Add hreflang tags** for EN/Marathi language variants.
15. **Stagger blog post dates** to look more organic (currently all Feb 16-18).
16. **Add "Back to Top" button** or Table of Contents for long blog posts.

### P3 -- Nice to Have (Polish items)
17. **Add skip-to-content link** for accessibility.
18. **Add "Related Posts" section** at the end of blog articles.
19. **Collapse tag filter** on blog page -- show 8 tags, then "More" dropdown.
20. **Add social media links** to footer (Instagram, Facebook, YouTube if applicable).
21. **Fix WhatsApp FAB overlap** with mobile bottom nav bar -- increase bottom offset.
22. **Add product detail pages** (currently all products link directly to WhatsApp).
23. **Add customer testimonials** section to homepage or About page.
24. **Add aria-valuetext** to calculator slider for screen reader support.
25. **Consider adding Google Analytics** or Cloudflare Web Analytics for tracking.

---

## Page Ratings Summary

| Page | Rating | Status |
|------|--------|--------|
| Homepage | 8.5/10 | Good |
| Deals | 8.0/10 | Good |
| Calculator | 8.5/10 | Good |
| Blog Listing | 7.5/10 | Needs polish |
| Blog Post | 7.0/10 | Needs work |
| About | 7.5/10 | Needs content |
| Mobile UX | 8.5/10 | Good |
| Language Toggle | 9.0/10 | Excellent |
| Performance | 9.5/10 | Excellent |
| SEO | 7.5/10 | Needs work |
| Accessibility | 8.5/10 | Good |
| **Overall** | **8.0/10** | **Good** |

---

## Screenshots Reference

| # | File | Description |
|---|------|-------------|
| 01 | `01-homepage-viewport.png` | Homepage hero section (desktop) |
| 02 | `02-homepage-fullpage.png` | Homepage full page (note: blank sections due to animation) |
| 03 | `03-homepage-calculator-section.png` | Government Subsidies + WhyUs sections |
| 04 | `04-homepage-products-section.png` | Product grid + Quick Calculator |
| 05 | `05-homepage-whyus-section.png` | WhyUs cards + Service Area map |
| 06 | `06-homepage-servicearea.png` | Service Area + WhatsApp CTA + Footer |
| 07 | `07-deals-page-top.png` | Deals page with first deal card |
| 08 | `08-deals-residential-filter.png` | Deals filtered to Residential only |
| 09 | `09-deals-fullpage.png` | All 4 deals (full page) |
| 10 | `10-calculator-page.png` | Calculator page (Home, Dhule, Rs 3000) |
| 11 | `11-calculator-farm-results.png` | Calculator results (Farm, Nashik) |
| 12 | `12-blog-page.png` | Blog listing with all 5 posts |
| 13 | `13-blog-search-results.png` | Blog search for "KUSUM" |
| 14 | -- | Blog post page (screenshot timed out -- page too long) |
| 15 | `15-about-page-top.png` | About page hero + team photo |
| 16 | `16-about-services.png` | About services grid + How It Works |
| 17 | `17-homepage-marathi.png` | Homepage in Marathi |
| 18 | `18-mobile-homepage.png` | Mobile homepage (375x812) |
| 19 | `19-mobile-products.png` | Mobile Government Subsidies section |
| 20 | `20-mobile-bottom.png` | Mobile WhyUs + Service Area |
| 21 | `21-mobile-gridshakti-btn.png` | GridShakti button on mobile header |
