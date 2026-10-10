# Raj Mahal Roorkee — Cinematic Scroll Website

A $1M-tier cinematic scroll website for **Hotel Rajmahal** — the highway transit & event hotel on the Delhi-Dehradun Highway (NH-73), Rampur, Roorkee, Uttarakhand. Heritage wing, rooftop swimming pool, The Penthouse restaurant.

Built with Next.js 15 (App Router), Tailwind v4, GSAP, and Motion. The aesthetic is **Mewar / Royal Rajasthani heritage**, set on a warm parchment palette.

## Pages (12 routes + custom 404)

| Route | Chapter | Motion paradigm |
|-------|---------|------------------|
| `/` | The Palace Doors — brand intro | Curtain-reveal GSAP timeline (rich content in both door panels) |
| `/legacy` | Twenty-seven years, six chapters | Sticky pinned year-scrubber |
| `/rooms` | Executive, Deluxe, Family, Heritage Suite | Bento grid of four room typologies |
| `/dining` | The Penthouse, multi-cuisine | Magnetic-tab menu across six cuisines |
| `/pool` | Rooftop swimming pool + amenities | Bento of four amenity cards |
| `/celebrations` | Five wedding/event formats | Scrolling event cards + stats |
| `/experiences` | Eight small hours inside one stay | Horizontal scroll-hijack over 8 stops |
| `/location` | The town (Roorkee / Haridwar corridor) | Horizontal scroll-hijack 5 waypoints |
| `/gallery` | Visual archive, six categories | Cursor-hover masonry |
| `/stay` | Reservation | 4-step reveal form + room picker |
| `/journal` | Field notes | Editorial typography + kinetic articles |
| `/contact` | The concierge desk | Single hotel card + form + map |
| 404 | Royal-themed | Cinematic radial backdrop |

## Real Hotel Rajmahal Roorkee — sourced content

- **Address:** Delhi-Dehradun Road (NH-73), Rampur, Roorkee, Haridwar District, Uttarakhand 247667
- **Phone:** +91 70557 05692
- **Check-in:** 12:00 PM to 1:00 PM
- **Check-out:** 11:00 AM to 12:00 PM
- **Rooms:** 54 across 4 typologies — Executive, Deluxe, Family, Heritage Suite
- **Dining:** The Penthouse (multi-cuisine, 96 seats) + The Café (24-hour)
- **Recreation:** Rooftop swimming pool (heated to 30°C), fitness centre, garden, banquet/lawn spaces
- **Founded:** 1998

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000 (or 3001, 3002 if those are occupied)
npm run build    # production build
npm run start    # serve the production build
npm run lint
npm run typecheck
```

## Architecture

```
app/                          # Next.js App Router routes (12 + 404)
components/
  shell/                      # PageShell, Nav, Footer, Cursor, Grain,
                              # ScrollProgress, ErrorBoundary, FormBoundary
  primitives/                 # Wordmark, Pill, LanternCTA, JaliPattern,
                              # PaherDivider, ScrollNumber
  motion/                     # CurtainReveal, StickyPin, HorizontalPan,
                              # StickyStack, ScrubReveal, MagneticButton,
                              # ParallaxFloat, Marquee, FadeUp
  sections/                   # BentoGrid, EditorialSplit, TestimonialPair,
                              # Timeline, RoomCard, MenuPanel,
                              # ReservationForm, MapThree, ManifestoBlock,
                              # ImagePill
lib/
  content.ts                  # ALL site copy lives here
  motion.ts                   # Easing curves + motion tokens
```

### Design system

- **Palette:** warm parchment `#F4ECDC` ground, cream `#FAF6EC` cards, ink-soft `#1B1410` text, gold-deep `#9A7530` accents, crimson `#8A1A1A` brand, dark `#0E0908` footer band.
- **Type:** Noto Serif Devanagari (Hindi wordmark), Cormorant Garamond (display), Plus Jakarta Sans (body), JetBrains Mono (labels).
- **Effects:** layered jali SVG lattice, Mughal-inspired lotus motifs, hairline gold rules, gold-to-cream radial vignettes.

### Animation stack (rules)

- **GSAP + ScrollTrigger** drives pinned sections, horizontal scroll-hijack, sticky-stack, year-scrubber.
- **Motion (motion/react)** drives entrance fades, magnetic hover, hover-physics.
- **Never mix GSAP and Motion in the same component tree.** They fight for the same frame budget.
- All GSAP timelines clean up via `gsap.context(..., scope).revert()` in `useEffect`.
- All components guard reduced-motion with `useReducedMotion() === true` (handles the `null` first render).
- Global CSS overrides also gate non-Motion animations.

### Mobile

- All asymmetric layouts collapse to single-column below 768 px.
- All hero sections use `min-h-[100dvh]`, never `h-screen`.
- Touch targets ≥ 44×44.
- Body has `overflow-x-clip` to prevent horizontal scroll.

### Performance

- First-load JS: 154–208 kB per route (well under 350 kB target).
- All routes statically prerendered.
- Images via `next/image` from `images.unsplash.com` (declared in `next.config.ts`).

### Brand discipline (locked)

- **Zero em-dashes.** Hyphens only. Programmatic grep on commit.
- **One accent color.** Gold everywhere; crimson in nav + brand moments only.
- **One corner-radius scale.** Cards/images 28 px, buttons pill, inputs 16 px.
- **Marquee max once per page.** Reserved for transitions between sections.
- **No meta-labels** (no "Section 01", "Question 05", "Stage 1"). Numbers only where they earn it.
- **No eyebrow above more than `ceil(sectionCount / 3)` sections per page.**

## Adding a new page

1. Create `app/<route>/page.tsx`.
2. Compose from primitives in `components/{shell,primitives,motion,sections}`.
3. Animation: pick one of the existing 9 motion paradigms — never invent a new one.
4. Add any new copy to `lib/content.ts` (single source of truth).
5. Run `npm run typecheck && npm run build`.

## Self-hosting external assets

Currently `/` subscribes to `images.unsplash.com` photo IDs. To self-host and remove that runtime dependency:

1. Download the photos locally to `public/assets/`.
2. Replace external URLs with `/assets/...` paths.
3. Drop `images.unsplash.com` and `picsum.photos` from `next.config.ts > images.remotePatterns`.

## Accessibility

- Skip-to-main-content link as the first child of `<body>`.
- Visible gold-deep focus rings on all interactive elements.
- All decorative SVG patterns use `aria-hidden="true"`.
- The whole site is wrapped in an `ErrorBoundary` so a single client glitch does not tear down the page.
- Forms guard against default-reload with `FormBoundary` (a thin wrapper that calls `preventDefault`).
- Reduced-motion mode disables pinning, hijack, marquee, parallax, magnetic.

## Known dev-mode behaviour

`next dev` occasionally returns a transient 404 when modules are recompiled in quick succession, especially after multiple files have been touched across several seconds. The fix is to either touch the file (`touch app/<route>/page.tsx`) once or restart `next dev`. The production build (`npm run build && npx next start`) does not have this behaviour — every route serves stably.

## Notes

- Single accent crimson (`#8A1A1A`) and gold (`#C29A4B` / `#9A7530`) hold their place across all pages. Replacing either requires re-auditing contrast on every page.
- The brand wordmark in Hindi (राज महल) uses Noto Serif Devanagari via `next/font/google` — fully self-hosted, zero CDN.
