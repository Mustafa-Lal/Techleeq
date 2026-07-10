# TechLeeq — Responsive Design Implementation Prompt
### Version 2.0 | Responsiveness & Adaptive Layout Brief | God Mode Edition

---

## 🎯 MISSION

The TechLeeq website design has already been built at 1440px desktop width using the established design system. **This prompt is exclusively focused on making every page and component fully responsive across all breakpoints.** Do not change colors, typography scale, brand identity, or visual design. Only adapt layout, spacing, sizing, and component behavior for each screen size.

---

## 📐 BREAKPOINT SYSTEM

Apply these five breakpoints consistently across every page and component:

```
--bp-mobile-sm:  320px   (small phones — minimum supported width)
--bp-mobile:     390px   (standard mobile — PRIMARY mobile target)
--bp-mobile-lg:  480px   (large phones)
--bp-tablet:     768px   (tablets portrait)
--bp-tablet-lg:  1024px  (tablets landscape / small laptops)
--bp-desktop:    1280px  (standard desktop)
--bp-desktop-lg: 1440px  (large desktop — original design canvas)
--bp-wide:       1920px  (ultrawide)
```

**Primary design frames to produce for each page:**
- `390px` — mobile (most critical)
- `768px` — tablet
- `1280px` — desktop
- `1440px` — large desktop (existing)

---

## 🧩 COMPONENT-BY-COMPONENT RESPONSIVE RULES

---

### NAVIGATION BAR

**1440px / 1280px (Desktop):**
- Current design unchanged — horizontal nav, full links visible, both CTA buttons

**1024px (Tablet Landscape):**
- Reduce nav link font from 14px to 13px
- Reduce padding from `0 40px` to `0 28px`
- Compress gap between nav links from 32px to 20px
- Keep both CTA buttons but reduce padding: `8px 14px`

**768px (Tablet Portrait):**
- Hide center navigation links completely
- Show hamburger menu icon (right side, replaces nav links area)
- Keep logo (left) + hamburger (right) only
- Keep "Get Started Free" button visible between logo and hamburger
- Hamburger: 44×44px tap target, 3-line → animated X

**< 768px (Mobile):**
- Logo left, hamburger right only — no CTA button in bar
- Bar height reduces to 60px
- Hamburger opens full-screen overlay:
  - Background: `--color-bg-elevated` at 96% opacity
  - All 7 nav links stacked vertically
  - Each link row: 56px height, full-width, border-bottom `--color-bg-border`
  - Font: 18px, weight 500
  - Active page: `--color-primary` color
  - Bottom of overlay: both CTA buttons stacked, full-width, 16px gap
  - Close (X) button: top-right, 44×44px
  - Overlay animates: slide down from top (300ms ease-out)

---

### FOOTER

**1440px / 1280px:**
- 5-column grid unchanged

**1024px:**
- 3-column grid: [Brand + Social] | [Company + Product] | [Support + Newsletter]
- Merge columns 2+3 and 4+5 into single columns

**768px:**
- 2-column grid: [Brand] [Link groups stacked]
- Newsletter moves below both columns, full-width

**< 768px (Mobile):**
- Single column, full-width stacked
- Order: Logo → Tagline → Social icons → Company links → Product links → Support links → Newsletter → Bottom bar
- Each link group: collapsed accordion (tap header to expand/collapse)
- Accordion header: uppercase label row with chevron icon right
- Bottom bar: stack left and right content, center-aligned, 8px gap
- Padding reduces to `48px 20px 32px`

---

### HERO SECTION (Homepage)

**1440px:**
- Current design: centered, 860px max-width column, 180px top padding, large mockup below

**1280px:**
- Reduce hero headline from 80px to 68px
- Top padding: 160px

**1024px:**
- Headline: 56px
- Sub-headline: 17px
- Top padding: 140px
- Hero mockup: scale down to 85% width

**768px:**
- Headline: 44px
- Sub: 16px
- CTA buttons: stack vertically (full-width, 100%), gap 12px
- Helper text below buttons: 12px
- Hero mockup: full-width, aspect-ratio 16/9, no 3D perspective tilt (set rotateX to 0)
- Floating UI chips: hide 2 of 3, keep only 1 (most prominent), reposition below mockup
- Top padding: 120px

**390px (Mobile):**
- Headline: 36px, line-height 1.15
- Sub: 15px, max-width 100%
- Eyebrow badge: 12px
- CTA buttons: full-width stacked, height 52px each
- Hero mockup: full-width, simplified (remove all floating chips)
- Top padding: 100px (accounts for 60px nav)
- Particle layer: reduce particle count by 60% for performance
- Animated background glow: reduce to single static radial gradient (no animation on mobile)

---

### TRUST BAR (Logo Ticker)

**All sizes:**
- Title text: scales with body text (16px desktop → 13px mobile)
- Logo ticker speed: same across breakpoints
- Logo size: 120px wide (desktop) → 80px wide (mobile)
- On mobile: show 4 logos visible at a time vs 6 on desktop

---

### VALUE PROPOSITION SECTION (2-column split)

**1280px+:**
- 50/50 two-column grid, unchanged

**1024px:**
- 55/45 split, reduce right visual size slightly

**768px:**
- Stack to single column: text on top, visual below
- Visual: full-width, max-height 400px, centered
- Floating stats around visual: reposition to a 2×2 grid below the image

**390px:**
- Single column
- Checklist items: 15px font
- Stats: 2×2 grid, compact cards
- CTA text button: full-width centered

---

### CORE FEATURES GRID (6 cards)

**1280px+:**
- 3-column grid

**1024px:**
- 3-column grid, reduce card padding to 20px

**768px:**
- 2-column grid

**480px:**
- 2-column grid, compact (reduce icon container 48px → 40px, reduce title to 16px)

**390px:**
- 1-column grid, full-width cards
- Card padding: 20px
- "Learn more →" link: always visible (not hover-only) since there's no hover on touch

---

### HOW IT WORKS (4-step process)

**1280px+:**
- 4 steps horizontal, connected by horizontal dashed line

**768px:**
- 2×2 grid layout
- Dashed connector: L-shaped path or hidden

**390px:**
- Vertical stack, single column
- Connector: vertical dashed line running down left side
- Step number: reduce from 64px to 48px
- Step title: 18px
- Step body: 14px

---

### PRODUCT SHOWCASE CAROUSEL

**1280px+:**
- 3 cards visible

**1024px:**
- 2.5 cards visible (peek at third card)

**768px:**
- 1.5 cards visible

**390px:**
- 1 card full-width
- Dots indicator: always visible
- Arrows: replace with swipe gesture support (add touch/pointer event handling note in prototype)
- Card padding: 16px

---

### PRICING CARDS (3 tiers)

**1280px+:**
- 3-column horizontal layout, middle card elevated

**1024px:**
- 3-column, reduce padding to 24px per card

**768px:**
- Stack to single column, full-width cards
- "Most Popular" card: place first in DOM order (top)
- Cards: max-width 480px, centered

**390px:**
- Full-width cards, stacked
- Price font: reduce from 48px to 40px
- Feature list items: 14px
- CTA buttons: full-width

**Referral note box:**
- All sizes: full-width, stacked layout
- Mobile: reduce padding to 16px, font 13px

---

### TESTIMONIALS CAROUSEL

**All sizes:**
- Same carousel behavior, adjust card count:
  - 1280px+: show 2 cards
  - 768px: show 1.5 cards
  - 390px: show 1 card full-width

---

### CTA BANNER (Pre-Footer)

**1280px+:**
- Centered column, headline 54px

**768px:**
- Headline: 40px
- Buttons: stacked, full-width (max-width 360px, centered)

**390px:**
- Headline: 32px
- Sub: 15px
- Buttons: full-width stacked

---

### FORM INPUTS (Global)

**All sizes:**
- Input height: 48px (desktop) → 52px (mobile — larger tap target)
- Labels: always above input (never inline/floating on mobile)
- Error messages: below input, 13px, `--color-accent-red`
- On mobile: inputs expand to full width of container
- Touch targets: minimum 44px height for all interactive elements

---

## 📄 PAGE-BY-PAGE RESPONSIVE REQUIREMENTS

---

### PAGE 1: HOMEPAGE
Apply all component rules above. Additional:
- Section vertical padding scales:
  - Desktop: 120px top/bottom
  - Tablet: 80px
  - Mobile: 60px
- Section headers: title scales down 20% on mobile, overline stays same size

---

### PAGE 2: ABOUT US

**Hero:**
- Desktop: 420px height
- Tablet: 320px
- Mobile: 260px, reduce headline to 32px

**Our Story (2-col):**
- Desktop: 50/50 split
- Tablet: 60/40 split
- Mobile: stacked, image first, then text

**Timeline:**
- Desktop: vertical timeline left-aligned
- Mobile: same structure, reduce left margin, smaller dots (12px), smaller year label (12px)

**Team Grid:**
- Desktop: 3-column
- Tablet: 2-column
- Mobile: 2-column (compact), reduce avatar to 80px square

**Stats row:**
- Desktop: 4 horizontal
- Mobile: 2×2 grid

---

### PAGE 3: SERVICES

**Tabbed interface (Desktop 1024px+):**
- Left sidebar tabs: 240px fixed width
- Right content panel: remaining width

**Tablet (768px):**
- Convert tabs to horizontal scrollable pill row above content
- Content panel: full-width below tabs

**Mobile (390px):**
- Convert to full accordion layout (all tabs become expandable sections)
- Each section header: 52px height, full-width, chevron right
- Content expands below header

**Industry filter bar:**
- Desktop: single row of pills
- Mobile: horizontally scrollable pill row (scroll indicator dots or fade edge)

---

### PAGE 4: PRODUCTS / SOFTWARE CATALOGUE

**Search bar:**
- All sizes: full-width

**Filter bar:**
- Desktop: single row
- Mobile: horizontally scrollable, no wrapping

**Product Cards Grid:**
- Desktop: 3-column
- Tablet: 2-column
- Mobile: 1-column

**Product Detail:**
- Desktop: 2-column (screenshots left, info right)
- Mobile: stacked (screenshots top, full-width carousel; info below)

---

### PAGE 5: PRICING PAGE

**Monthly/Annual Toggle:**
- All sizes: centered, pill toggle style
- Mobile: ensure 44px touch target

**Pricing Cards:**
- Apply global pricing card rules above

**Feature Comparison Table:**
- Desktop: full table visible
- Tablet: show 2 columns at a time with horizontal scroll
- Mobile:
  - Convert table to card-per-feature layout, OR
  - Horizontally scrollable table with sticky first column (feature name)
  - Sticky first column: `position: sticky; left: 0; background: --color-bg-base; z-index: 1`
  - Add scroll hint: faded right edge to indicate scrollability

**FAQ Accordion:**
- All sizes: full-width
- Mobile: increase touch target for accordion headers to 52px

---

### PAGE 6: DOWNLOAD PAGE

**Desktop:** Single centered column, max-width 720px
**Mobile:** Full-width, padding `0 20px`

**Step flow:**
- Desktop: vertical steps with left-side number
- Mobile: same, but reduce step number size (40px)

**Platform selection (Windows/Mac):**
- Desktop: side-by-side cards (50/50)
- Mobile: stacked full-width cards

**Referral Code Component:**
- Desktop: inline layout
- Mobile: fully stacked, full-width input

---

### PAGE 7: LOGIN PAGE

**Desktop:** Split screen 60/40 (visual | form)

**Tablet (768px):**
- Reduce visual panel to 40%, form panel to 60%
- Reduce visual panel content (hide floating UI snippet, keep logo + tagline only)

**Mobile (390px):**
- Hide visual panel entirely
- Show only form panel, full-width
- Add TechLeeq logo at top of form (since visual panel is hidden)
- Background: subtle gradient (from `--gradient-hero`) behind form
- Form: white/elevated surface card, rounded, centered, `max-width: 100%`, padding 32px 24px

---

### PAGE 8: CAREERS PAGE

**Hero:** Apply standard hero scaling rules

**Life at TechLeeq (2-col):**
- Mobile: stacked, photo collage grid becomes 2-column 3-row grid

**Perks grid (4-col, 2-row):**
- Tablet: 3-column
- Mobile: 2-column

**Job Listings:**
- Filter bar: horizontally scrollable on mobile
- Job cards: full-width on mobile, reduce to essential info (title, department, location, type, apply button)

**Job Detail:**
- Desktop: 2-col (description left, sidebar right with apply CTA)
- Mobile: single column, sticky "Apply Now" button at bottom of screen (fixed position, full-width)

**Application Form:**
- Desktop: 2-col grid for name fields (First / Last side by side)
- Mobile: all fields full-width, stacked

---

### PAGE 9: CONTACT US

**Desktop:** 2-column (form left, info right)

**Tablet (768px):**
- Stack to single column: form top, info below

**Mobile:**
- Single column
- Map embed: full-width, reduce height to 240px
- Alternate contact options: icon + label stacked, centered
- FAQ teaser: full-width accordion

---

### PAGE 10: BLOG

**Featured Article Card:**
- Desktop: large horizontal card
- Mobile: stacked card (image top, content below), full-width

**Article Grid:**
- Desktop: 3-column
- Tablet: 2-column
- Mobile: 1-column

**Sidebar:**
- Desktop: right sidebar (25% width)
- Mobile: hidden or moved below article grid as a horizontal scroll section

---

### PAGE 11: TERMS / PRIVACY

**Desktop:** Left anchor nav (200px) + right content

**Mobile:**
- Hide sticky sidebar nav
- Replace with a dropdown/select menu at top: "Jump to section" → select → scroll
- Content: full-width, increase line-height to 1.8 for readability

---

### PAGE 12: 404 PAGE

- Desktop: centered, "404" at 180px
- Mobile: "404" at 100px, reduce headline and sub text accordingly
- Button: full-width on mobile

---

### PAGE 13: THANK YOU PAGES

- All sizes: centered column
- Mobile: reduce padding, stack any side-by-side elements

---

## 🧩 GLOBAL RESPONSIVE RULES

### Touch & Interaction
- All tap targets: minimum 44×44px (apply to every button, link, icon, toggle)
- Hover states (like "Learn more →" appearing on hover on feature cards): on mobile, make permanently visible since there is no hover
- Tooltips: replace with tap-to-reveal on mobile
- Carousels: add swipe gesture support annotation in prototype
- All modals: full-screen on mobile (100vw × 100vh), with close button top-right

### Spacing Scale for Mobile
```
Section padding (vertical): 60px top/bottom
Content padding (horizontal): 20px left/right
Card padding: 20px (reduced from 28px desktop)
Grid gap: 12px (reduced from 24px desktop)
```

### Typography Mobile Scale
All headline sizes reduce on mobile. Apply this multiplier:
```
Desktop px × 0.65 = Mobile px (rounded to nearest 2px)

Examples:
Hero headline:    80px → 36px (mobile), 44px (tablet)
Section title:    40px → 28px (mobile), 34px (tablet)
Card title:       18px → 16px (mobile)
Body:             17px → 15px (mobile)
Captions:         13px → 12px (mobile, minimum)
```
Never go below 12px on any visible text.

### Images & Media
- All images: `width: 100%; height: auto` — never fixed pixel width on mobile
- Hero mockup screenshots: `max-width: 100%`, remove 3D tilt on mobile (reduces distortion on small screens)
- Product card thumbnails: fixed aspect-ratio 16/9 with `object-fit: cover`

### Background Effects on Mobile
- Animated mesh gradients: replace with static gradient on mobile (disable `animation`)
- Particle system: disable entirely on mobile (performance)
- Glow effects: reduce `blur` radius by 50% on mobile
- `prefers-reduced-motion`: disable ALL animations and transitions when this media query is active

### Auto Layout Rules (Figma Specific)
Every frame must use Figma Auto Layout:
- **Direction:** Vertical for mobile frames, Horizontal or Grid for desktop
- **Spacing mode:** `Space between` for nav items, `Packed` for stacked content
- **Hug contents:** For buttons and badges (width/height)
- **Fill container:** For inputs, cards in a grid column, full-width elements
- **Fixed size:** Avoid — prefer Fill or Hug
- All components must resize correctly when the parent frame width is changed
- Use **Min/Max width constraints** on containers:
  - Content wrapper: min 320px, max 1280px
  - Hero section: max 1440px (full bleed bg), content max 860px
  - Form panels: min 280px, max 560px

### Constraints & Pinning
- Navigation bar: pin Top + Left + Right (stretches full width)
- Footer: pin Bottom + Left + Right
- CTA buttons: horizontal center, or full-width with left+right fill
- Section backgrounds: Left + Right fill, stretch full width
- Content columns: center with left+right margins (use padding on parent, not position)

---

## 📱 FIGMA FRAME SETUP INSTRUCTIONS

For each page, create frames at these exact sizes in this order:

| Frame Name | Width | Height |
|---|---|---|
| `[Page] — Mobile 390` | 390 | Auto (expand to content) |
| `[Page] — Tablet 768` | 768 | Auto |
| `[Page] — Desktop 1280` | 1280 | Auto |
| `[Page] — Desktop 1440` | 1440 | Auto (existing) |

**Frame settings:**
- Clip content: OFF (allow overflow for backgrounds)
- Auto layout: Vertical, hug height
- Background: `#080C14` (dark mode base)

**Component variants:**
For every component that changes across breakpoints, create a **Variant** in the Component panel:
- Property name: `Breakpoint`
- Values: `Mobile`, `Tablet`, `Desktop`
- Each variant sized and laid out for its breakpoint
- Use the same component name, different variant

---

## 🔁 RESPONSIVE PROTOTYPE FLOWS

In Figma prototype mode, create responsive preview flows:
1. Each page should have a mobile frame linked in the prototype
2. Nav hamburger → overlay open state → close state
3. Accordion open/close states (Services, FAQ, Footer mobile)
4. Pricing toggle (Monthly → Annual) responsive behavior
5. Referral code show/hide animation at all breakpoints
6. Form validation states (error, success) at mobile size
7. Carousel swipe states at mobile size

---

## ✅ RESPONSIVE DESIGN CHECKLIST

Before handoff, verify every page at every breakpoint:

**Layout**
- [ ] No horizontal scroll at 390px
- [ ] No text overflow or clipping at any size
- [ ] No fixed pixel widths on content that should stretch
- [ ] All grid columns collapse correctly at each breakpoint
- [ ] All 2-column splits become single column at mobile

**Navigation**
- [ ] Hamburger menu works at 390px and 768px
- [ ] All nav links accessible from mobile overlay
- [ ] Logo visible at all sizes

**Typography**
- [ ] No text below 12px at any breakpoint
- [ ] Headline sizes follow the mobile scale multiplier
- [ ] Line-height and letter-spacing preserved

**Interactions**
- [ ] All tap targets minimum 44×44px on mobile frames
- [ ] Hover-only elements made permanently visible on mobile
- [ ] Carousels have visible controls on mobile (arrows or dots)
- [ ] Accordions have visible expand/collapse indicators

**Images**
- [ ] No images overflow container at 390px
- [ ] Hero mockup 3D tilt removed at mobile
- [ ] All images use fill container (not fixed size)

**Performance hints (for dev handoff)**
- [ ] Animations marked to disable on mobile
- [ ] Particle system marked to disable on mobile
- [ ] `prefers-reduced-motion` annotation added

**Auto Layout**
- [ ] Every frame uses Auto Layout (no absolute/free positioned frames for content)
- [ ] Components resize correctly when frame width is changed
- [ ] No orphan elements outside Auto Layout containers

**Figma Components**
- [ ] Responsive variants created for: Navbar, Footer, Hero, Feature Cards, Pricing Cards, Product Cards, Forms, Referral Code
- [ ] Each variant labeled: Mobile / Tablet / Desktop

---

*This prompt governs responsive implementation only. All visual design decisions (colors, typography styles, component aesthetics) remain governed by the original TechLeeq Design System Prompt v1.0. When in conflict, the original design system takes precedence for visual decisions; this document takes precedence for layout and responsiveness decisions.*

---
**Document Version:** 2.0
**Supplements:** TechLeeq Design System Prompt v1.0
**Target Design Tool:** Figma
**Primary Mobile Frame:** 390px
**Estimated Additional Design Time:** 30–50 hours