# AceSolarTech Image Generation Plan

**Started:** 2026-04-20
**Generator:** Higgsfield Nano Banana Pro
**Status:** Phase 1 (hero drip)

---

## Locked decisions (Apr 20, 2026)

1. **Style:** Full photorealistic across all 27 images (unify — no more cartoon/photo mix)
2. **Hero archetype:** Installation-in-progress (installer on roof, trust-building)
3. **Location signaling:** Maharashtra-specific (Sahyadri hills, flat RCC roofs, regional architecture, Marathi signage OK)
4. **People:** Keep family archetype in deal-residential. No reference conditioning — fresh AI characters via prose character bible.
5. **Workflow:** Drip (one at a time, review, iterate) — not batch.

---

## Shared style system

```
STYLE: Photorealistic documentary photography, 35mm lens, f/4,
natural golden-hour or soft-daylight lighting, Kodak Portra 400
film aesthetic, warm color grade, slight atmospheric haze,
visible film grain, not over-sharpened. Documentary realism,
not commercial glamour.

LOCATION: Dhule district, Maharashtra, India. Flat-roofed Indian
residential/commercial architecture, painted cement exteriors
(cream, ochre, saffron, terracotta — not white villa). Sahyadri
hills silhouette in far distance when outdoors. Hazy warm sky.

SOLAR STRUCTURAL ACCURACY: Panels on galvanized steel MMS frame
at 10–15° south-facing tilt, raised 600mm–1m above flat RCC roof
surface. Clear air gap / walk-space visible beneath array.
Parapet wall borders roof edge. Never pitched / gabled / tile roof.

BRAND: AceSolarTech orange (#FF6B00) uniforms, orange-and-white
color story.

NEGATIVE: no pitched roof, no tile shingles, no Spanish colonial
architecture, no palm trees, no suburban lawn, no white picket
fence, no over-glossy 3D render look, no cartoon or illustration,
no Caucasian features, no American suburbia.
```

---

## Character bible

### The Installer — "Rahul"
Appears in: hero, product-rooftop, product-commercial, product-parking, product-water-heater, calculator-hero

- 28-year-old Maharashtrian man
- Medium-brown skin
- Trimmed black beard stubble
- Close-cropped black hair
- Warm dark-brown eyes, genuine focused expression (not model smile)
- Lean, 5'9", athletic but not gym-built
- Wardrobe: Bright orange (#FF6B00) polo t-shirt with small white sun-logo on left chest, yellow safety hardhat (lightly scuffed), beige cargo pants, brown leather work boots, tool belt

### The Family
Appears in: deal-residential, product-home-light

- **Father:** Mid-30s Maharashtrian, medium build, trimmed moustache, warm smile. Saffron/orange kurta over beige trousers.
- **Mother:** Early 30s, orange-and-green cotton saree (middle-class everyday, not silk), hair in low bun, small bindi, warm expression.
- **Son:** 8–10 years old, yellow t-shirt, dark shorts, curious expression.
- **Daughter:** 5–6 years old, pink frock, pigtails, holding mother's hand.

---

## Shot list — 12 images

| # | File | Phase | Status |
|---|------|-------|--------|
| 1 | hero-solar-home.png | 1 | **🟡 drafting prompt** |
| 2 | hero-solar-home-mobile.png | 1 | pending |
| 3 | deal-residential.png | 1 | pending |
| 4 | product-rooftop.png | 2 | pending |
| 5 | product-farm.png | 2 | pending |
| 6 | product-motor.png | 2 | pending |
| 7 | product-street-light.png | 2 | pending |
| 8 | product-home-light.png | 2 | pending |
| 9 | product-commercial.png | 2 | pending |
| 10 | product-parking.png | 2 | pending |
| 11 | product-water-heater.png | 2 | pending |
| 12 | calculator-hero.png | 3 | pending |

**Keep as-is (no regeneration):** deal-commercial, deal-farm, about-mission, about-team (activate in code), logo-icon, og-image, favicons.

**Output scratch dir:** `/Users/blest/dev/AceSolarTech/tmp/image-replacements/` (variations staged here before promotion to `public/images/`)

---

## Prompt 1 — `hero-solar-home.png`

```
Photorealistic documentary photograph, 35mm lens, f/4, ISO 200,
golden hour at 6:40 AM.

SUBJECT: Rahul, a 28-year-old Maharashtrian man with medium-brown
skin, trimmed black beard stubble, close-cropped black hair, warm
focused expression. Wearing a bright orange (#FF6B00) polo t-shirt
with small white sun-logo on left chest, yellow safety hardhat
(lightly scuffed), beige cargo pants, brown work boots, tool belt.
Kneeling on the far-left edge of a flat RCC rooftop, holding a
cordless drill, tightening a bolt that secures a 540W
monocrystalline solar panel (dark blue, 144 half-cut cells visible)
to a galvanized steel MMS frame. The frame tilts the panel 13°
south. Panel is raised ~800mm above the roof surface — a clear air
gap is visible between the back of the panel and the concrete roof.

FOREGROUND: Rahul + the panel he's installing, crisp focus.

MIDGROUND: Three more panels already installed in a row to Rahul's
right, connected by visible DC cabling clipped to the MMS frame.
A concrete parapet wall (painted cream, 4ft tall) runs around the
roof perimeter.

BACKGROUND: On the far side of the rooftop, a black Sintex PVC
water tank. Beyond the parapet, the rooftops of neighbouring
painted-cement homes (cream, ochre, terracotta) with satellite
dishes, clotheslines, and one visible saffron temple spire in
mid-distance. Far distance: hazy Sahyadri hill silhouette under
warm pale-orange sky fading to dusty blue.

ATMOSPHERE: Slight atmospheric haze typical of Maharashtra morning
air (dust + warmth). Kodak Portra 400 color grade, visible film
grain, not over-sharpened. Gentle depth-of-field falloff on the
background. Documentary realism, not commercial glamour.

COMPOSITION: 16:9 wide, Rahul in left third of frame, panel array
stretching diagonally toward mid-right, hills in upper-right.

NEGATIVE: no pitched roof, no tile shingles, no Spanish colonial
architecture, no palm trees, no suburban lawn, no white picket
fence, no over-glossy 3D render look, no cartoon or illustration,
no Caucasian features, no American style.

MODEL: Nano Banana Pro
ASPECT: 16:9
VARIATIONS: 4
```

**Generation target:** `/Users/blest/dev/AceSolarTech/tmp/image-replacements/hero-v1/{v1,v2,v3,v4}.png`

**Review checklist after generation:**
- [ ] Roof is flat RCC, not pitched
- [ ] MMS structure visible with clear air gap
- [ ] Parapet wall present
- [ ] Installer's face reads as Indian/Maharashtrian, not generic Asian/Latino
- [ ] Orange uniform color matches #FF6B00 (not red, not yellow)
- [ ] Sahyadri hill backdrop present
- [ ] Warm hazy atmosphere, not crystalline Miami blue
- [ ] No palm trees / lush lawn
- [ ] Composition supports text overlay on right third (for home page hero text)

---

## Workflow notes

**Generation path A (preferred):** Fresh Claude Code session → spawn `higgsfield` agent → agent navigates to higgsfield.ai with persistent Playwright profile → generates 4 variations with prompt above → downloads to scratch dir → returns paths for review.

**Generation path B (fallback):** User manually pastes prompt into higgsfield.ai, downloads 4 variations to scratch dir.

**After review:** best variation → rename to `hero-solar-home.png` → move to `public/images/` → `npm run build` → `pm2 restart acesolartech-frontend`.

**Current session blocker:** Playwright MCP killed earlier in this session (pkill during CiC debug). Path A requires a fresh Claude Code session. Path B works now.
