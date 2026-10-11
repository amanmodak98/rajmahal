"use client";

import { brand } from "@/lib/content";

/**
 * Palace-Doors curtain reveal — CSS-only rewrite.
 *
 * Previous build used GSAP ScrollTrigger with `pin: true`. GSAP creates a
 * `pin-spacer` wrapper <div> outside React's reconciliation tree, which
 * fights React 19's commit-deletion phase and throws `removeChild: not a
 * child of this node` on every navigation.
 *
 * This rewrite uses native CSS:
 *  - `position: sticky; top: 0; height: 100dvh` to hold the curtain in view.
 *  - `@keyframes` + `animation-timeline: view()` (CSS scroll-driven
 *    animations) to open the doors as the user scrolls. No JavaScript touches
 *    the DOM during commit. No `pin-spacer` wrapper. No race.
 *  - `IntersectionObserver` only as a soft fallback for browsers without
 *    `animation-timeline` support.
 *
 * The reveal feels identical: doors swing apart and fade the inner centre
 * into view as the user scrolls past.
 */

function openLeftAnimation(offsetParent: boolean): string {
  if (offsetParent) {
    return `
@keyframes curtainOpenLeft {
      from { transform: translateX(0); }
      to   { transform: translateX(-110%); }
    }
@keyframes curtainCenterFade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
.curtain-left {
      animation: curtainOpenLeft linear both;
      animation-timeline: view();
      animation-range-start: 0%;
      animation-range-end: 70%;
    }
.curtain-right {
      animation-name: curtainOpenLeft;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-direction: reverse;
      animation-timeline: view();
      animation-range-start: 0%;
      animation-range-end: 70%;
    }
.curtain-inner {
      animation: curtainCenterFade linear both;
      animation-timeline: view();
      animation-range-start: 30%;
      animation-range-end: 80%;
    }
`;
  }
  return "";
}

export function CurtainReveal({
  children,
  height = "min-h-[100dvh]",
}: {
  children?: React.ReactNode;
  height?: string;
}) {
  return (
    <>
      {/* CSS-only animations. Inlined so we don't need a styled-jsx dep. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes curtainOpenLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-110%); }
}
@keyframes curtainOpenRight {
  from { transform: translateX(0); }
  to   { transform: translateX(110%); }
}
@keyframes curtainTrimCollapse {
  from { transform: scaleY(1); }
  to   { transform: scaleY(0); }
}
@keyframes curtainImageReveal {
  from { transform: scale(0.86); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
@keyframes curtainImagePolaroid {
  from { transform: scale(0.7) rotate(-12deg); opacity: 0; }
  to   { transform: scale(1)   rotate(-8deg);  opacity: 0.95; }
}
@keyframes curtainPolaroidRight {
  from { transform: scale(0.7) rotate(12deg); opacity: 0; }
  to   { transform: scale(1)   rotate(8deg);  opacity: 0.95; }
}
@keyframes curtainFiligree {
  from { opacity: 0; }
  to   { opacity: 0.6; }
}
@keyframes curtainCenterFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes curtainLotusSpin {
  from { transform: rotate(-8deg) scale(0.92); opacity: 0; }
  to   { transform: rotate(0deg) scale(1); opacity: 1; }
}
@keyframes curtainStatRise {
  from { transform: translateY(60px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes curtainRevealLine {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

@keyframes curtainAlternateLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-110%); }
}
@keyframes curtainAlternateRight {
  from { transform: translateX(0); }
  to   { transform: translateX(110%); }
}

.curtain-section {
  position: sticky;
  top: 0;
  ${height === "min-h-[100dvh]" ? "height: 100dvh;" : `height: ${height.includes("[") ? "100dvh" : height};`}
  z-index: 5;
  overflow: hidden;
  background: var(--bg-page, #F4ECDC);
}

.curtain-left {
  animation: curtainOpenLeft linear both;
  animation-timeline: view();
  animation-range: 0% 65%;
}
.curtain-right {
  animation: curtainOpenRight linear both;
  animation-timeline: view();
  animation-range: 0% 65%;
}
.curtain-trim-left, .curtain-trim-right {
  animation: curtainTrimCollapse linear both;
  animation-timeline: view();
  animation-range: 5% 25%;
}
.curtain-bg-left, .curtain-bg-right {
  animation: curtainImageReveal linear both;
  animation-timeline: view();
  animation-range: 5% 30%;
}
.curtain-image-left, .curtain-image-right {
  animation: curtainImageReveal linear both;
  animation-timeline: view();
  animation-range: 10% 45%;
}
.curtain-polaroid-left {
  animation: curtainImagePolaroid linear both;
  animation-timeline: view();
  animation-range: 18% 50%;
}
.curtain-polaroid-right {
  animation: curtainPolaroidRight linear both;
  animation-timeline: view();
  animation-range: 18% 50%;
}
.curtain-filigree-left, .curtain-filigree-right {
  animation: curtainFiligree linear both;
  animation-timeline: view();
  animation-range: 8% 30%;
}
.curtain-inner {
  animation: curtainCenterFade linear both;
  animation-timeline: view();
  animation-range: 30% 70%;
}
.curtain-inner .reveal-line {
  animation: curtainRevealLine linear both;
  animation-timeline: view();
  animation-range: 35% 70%;
}
.curtain-lotus {
  animation: curtainLotusSpin linear both;
  animation-timeline: view();
  animation-range: 25% 60%;
}
.curtain-stat > * {
  animation: curtainStatRise linear both;
  animation-timeline: view();
  animation-range: 50% 80%;
}

/* Fallback for browsers without animation-timeline - just open on mount */
@media (prefers-reduced-motion: reduce), (not (timeline-scope: view())) {
  .curtain-left  { transform: translateX(-110%); }
  .curtain-right { transform: translateX(110%); }
  .curtain-trim-left, .curtain-trim-right { transform: scaleY(0); }
  .curtain-inner { opacity: 1; }
  .curtain-image-left, .curtain-image-right,
  .curtain-bg-left, .curtain-bg-right,
  .curtain-polaroid-left, .curtain-polaroid-right,
  .curtain-filigree-left, .curtain-filigree-right {
    opacity: 1;
    transform: none;
  }
}

/* Sticky fallback for browsers without sticky support - everything scroll in flow */
@supports not (position: sticky) {
  .curtain-section { position: relative; height: 100dvh; }
}
          `,
        }}
      />

      <div
        className="relative h-[230dvh]"
        style={{ position: "relative" }}
      >
        <section
          className="curtain-section"
          aria-label="Palace doors opening"
        >
        {/* Centre reveal */}
        <div className="curtain-inner absolute inset-0 flex items-center justify-center px-4 sm:px-6 z-10">
          {children}
        </div>

        {/* LEFT DOOR PANEL */}
        <div
          className="curtain-left absolute top-0 bottom-0 left-0 w-1/2 bg-cream-warm z-20 overflow-hidden"
          style={{ transformOrigin: "left center" }}
        >
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg, #FAF6EC 0%, #F4ECDC 60%, rgba(232,220,192,0.55) 100%)",
          }} aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(255,240,210,0.55) 0%, rgba(244,236,220,0) 60%)",
            }}
          />
          <div className="absolute inset-0 jali opacity-40" aria-hidden="true" />

          {/* Faded background photograph */}
          <div className="curtain-bg curtain-bg-left absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80"
              alt="Heritage palace, archival still"
              className="w-full h-full object-cover cinematic"
              style={{ mixBlendMode: "multiply", filter: "saturate(0.85) brightness(1.05) sepia(0.15)" }}
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(232,220,192,0.65) 0%, rgba(232,220,192,0.25) 100%)" }}
            />
          </div>

          <div className="absolute inset-y-0 left-3 sm:left-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute inset-y-0 right-3 sm:right-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-[18%] md:top-[20%] h-px bg-gold/35" aria-hidden="true" />
          <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[20%] h-px bg-gold/35" aria-hidden="true" />
          <div className="curtain-trim-left absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold-deep/70 to-gold/0 origin-top" aria-hidden="true" />

          {/* Corner filigree SVG - top right */}
          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-left absolute top-0 right-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6 }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
            <path d="M82 0 C66 0, 58 8, 58 22" />
            <circle cx="78" cy="8" r="2" fill="currentColor" />
            <circle cx="68" cy="20" r="1.5" fill="currentColor" />
          </svg>

          {/* Corner filigree SVG - bottom left */}
          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-left absolute bottom-0 left-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6, transform: "rotate(180deg)" }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
          </svg>

          {/* Brand seal at top */}
          <div className="absolute top-6 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 px-2 z-10">
            <div className="scale-[0.55] sm:scale-[0.7] md:scale-100 origin-center">
              <BrandSeal />
            </div>
            <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-gold-deep text-center whitespace-nowrap">
              The Maharaja
            </p>
          </div>

          {/* Featured framed image */}
          <div className="curtain-image curtain-image-left absolute left-1/2 -translate-x-1/2 top-[28%] md:top-[24%] w-[42%] max-w-[260px] md:max-w-[300px] aspect-[4/5] rounded-[14px] overflow-hidden shadow-vanta ring-1 ring-gold-rule bg-cream z-10">
            <img
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80"
              alt="Rajasthani palace archway"
              className="w-full h-full object-cover cinematic"
              style={{ filter: "saturate(0.85) contrast(1.06)" }}
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-[14px]" aria-hidden="true" />
            <div className="absolute left-2 bottom-2 right-2 flex items-end justify-between gap-2">
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.22em] text-cream bg-ink-soft/65 backdrop-blur-sm px-2 py-1 rounded-full">
                Plate I
              </span>
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.22em] text-gold-bright bg-ink-soft/65 backdrop-blur-sm px-2 py-1 rounded-full">
                Heritage
              </span>
            </div>
          </div>

          {/* Polaroid accents - hidden on mobile */}
          <div className="curtain-image curtain-polaroid-left hidden md:block absolute left-[14%] top-[16%] w-[18%] aspect-[3/4] rounded-[10px] overflow-hidden ring-1 ring-cream shadow-warm z-10">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=80"
              alt="Palace interior detail"
              className="w-full h-full object-cover cinematic"
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]"
            />
          </div>

          <div className="curtain-image curtain-polaroid-left hidden lg:block absolute right-[16%] top-[44%] w-[18%] aspect-[3/4] rounded-[10px] overflow-hidden ring-1 ring-cream shadow-warm z-10">
            <img
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&auto=format&fit=crop&q=80&sat=-20"
              alt="Palace archway detail"
              className="w-full h-full object-cover cinematic"
              style={{ filter: "saturate(0.65)" }}
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]"
            />
          </div>

          {/* Heritage ledger - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 w-full px-4 z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft/70 text-center mb-3">
              Chapter, since
            </p>
            <div className="space-y-1.5 text-center">
              {[
                { yr: "1998", note: "Opens" },
                { yr: "2009", note: "Lawns" },
                { yr: "2017", note: "Penthouse" },
                { yr: "2022", note: "Pool" },
                { yr: "2025", note: "Twenty-seven years" },
              ].map((m, i) => (
                <div key={i} className="flex items-baseline gap-2 justify-center">
                  <span className="font-display-serif text-xl text-gold-deep">{m.yr}</span>
                  <span className="font-display-serif italic text-xs text-ink-soft/75">{m.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hindi wordmark at bottom */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-2 z-10">
            <p className="font-display-hindi text-3xl sm:text-5xl md:text-7xl text-ember leading-none">
              {brand.hindi}
            </p>
            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/65 mt-2 md:mt-3">
              राज महल · रुड़की
            </p>
          </div>

          <div className="absolute inset-y-0 right-0 w-12 md:w-24 pointer-events-none" style={{
            background: "linear-gradient(90deg, transparent, rgba(194,154,75,0.18))",
          }} aria-hidden="true" />
        </div>

        {/* RIGHT DOOR PANEL */}
        <div
          className="curtain-right absolute top-0 bottom-0 right-0 w-1/2 bg-cream-warm z-20 overflow-hidden"
          style={{ transformOrigin: "right center" }}
        >
          <div className="absolute inset-0" style={{
            background: "linear-gradient(270deg, #FAF6EC 0%, #F4ECDC 60%, rgba(232,220,192,0.55) 100%)",
          }} aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(255,240,210,0.55) 0%, rgba(244,236,220,0) 60%)",
            }}
          />
          <div className="absolute inset-0 jali opacity-40" aria-hidden="true" />

          <div className="curtain-bg curtain-bg-right absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=80"
              alt="The Penthouse restaurant, archival still"
              className="w-full h-full object-cover cinematic"
              style={{ mixBlendMode: "multiply", filter: "saturate(0.85) brightness(1.05) sepia(0.15)" }}
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(270deg, rgba(232,220,192,0.65) 0%, rgba(232,220,192,0.25) 100%)" }}
            />
          </div>

          <div className="absolute inset-y-0 left-3 sm:left-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute inset-y-0 right-3 sm:right-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-[18%] md:top-[20%] h-px bg-gold/35" aria-hidden="true" />
          <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[20%] h-px bg-gold/35" aria-hidden="true" />
          <div className="curtain-trim-right absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold-deep/70 to-gold/0 origin-top" aria-hidden="true" />

          {/* Top-left corner filigree */}
          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-right absolute top-0 left-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6, transform: "scaleX(-1)" }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
            <path d="M82 0 C66 0, 58 8, 58 22" />
            <circle cx="78" cy="8" r="2" fill="currentColor" />
          </svg>

          {/* Bottom-right corner filigree */}
          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-right absolute bottom-0 right-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6, transform: "scale(-1, -1)" }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
          </svg>

          {/* Motto at top */}
          <div className="absolute top-6 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 text-center px-3 sm:px-6 md:px-8 w-[85%] z-10">
            <p className="font-display-serif italic text-base sm:text-xl md:text-2xl text-ember leading-tight max-w-md mx-auto">
              “{brand.tagline}”
            </p>
            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/60 mt-2 md:mt-4">
              Hotel mantra · since 1998
            </p>
          </div>

          {/* Featured framed image */}
          <div className="curtain-image curtain-image-right absolute left-1/2 -translate-x-1/2 top-[28%] md:top-[24%] w-[42%] max-w-[260px] md:max-w-[300px] aspect-[4/5] rounded-[14px] overflow-hidden shadow-vanta ring-1 ring-gold-rule bg-cream z-10">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80"
              alt="The Penthouse rooftop restaurant at Hotel Rajmahal"
              className="w-full h-full object-cover cinematic"
              style={{ filter: "saturate(0.85) contrast(1.06)" }}
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-[14px]" aria-hidden="true" />
            <div className="absolute left-2 bottom-2 right-2 flex items-end justify-between gap-2">
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.22em] text-cream bg-ink-soft/65 backdrop-blur-sm px-2 py-1 rounded-full">
                Plate II
              </span>
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.22em] text-gold-bright bg-ink-soft/65 backdrop-blur-sm px-2 py-1 rounded-full">
                The Penthouse
              </span>
            </div>
          </div>

          {/* Polaroid accents - hidden on mobile */}
          <div className="curtain-image curtain-polaroid-right hidden md:block absolute right-[14%] top-[16%] w-[18%] aspect-[3/4] rounded-[10px] overflow-hidden ring-1 ring-cream shadow-warm z-10">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=80"
              alt="Kitchen tandoor detail"
              className="w-full h-full object-cover cinematic"
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]"
            />
          </div>

          <div className="curtain-image curtain-polaroid-right hidden lg:block absolute left-[16%] top-[44%] w-[18%] aspect-[3/4] rounded-[10px] overflow-hidden ring-1 ring-cream shadow-warm z-10">
            <img
              src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&auto=format&fit=crop&q=80"
              alt="Saffron and brass"
              className="w-full h-full object-cover cinematic"
              style={{ filter: "saturate(0.7)" }}
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]"
            />
          </div>

          {/* Three pillars - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 w-full px-4 z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft/70 text-center mb-3">
              The Maharaja's three pillars
            </p>
            <div className="space-y-2 text-left">
              {[
                { n: "I", t: "Highway", note: "NH-73 · km 58" },
                { n: "II", t: "Heritage", note: "Twenty-seven years" },
                { n: "III", t: "Hospitality", note: "Round the clock" },
              ].map((p) => (
                <div key={p.n} className="flex items-center gap-3 justify-center">
                  <span className="font-display-serif text-xl text-gold-deep">{p.n}.</span>
                  <div className="text-left">
                    <p className="font-display-serif text-base text-ink-soft leading-tight">{p.t}</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.32em] text-ink-soft/55 mt-0.5">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concierge at the bottom */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-2 w-[90%] z-10">
            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/65 mb-1 md:mb-2">
              The concierge desk
            </p>
            <p className="font-display-serif text-xl sm:text-2xl md:text-3xl text-ember leading-none">
              {brand.phone}
            </p>
            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/65 mt-1 md:mt-3">
              Always answered
            </p>
          </div>

          <div className="absolute inset-y-0 left-0 w-12 md:w-24 pointer-events-none" style={{
            background: "linear-gradient(270deg, transparent, rgba(194,154,75,0.18))",
          }} aria-hidden="true" />
        </div>
        </section>
      </div>
    </>
  );
}

function BrandSeal() {
  return (
    <svg width="86" height="86" viewBox="0 0 86 86" aria-hidden="true">
      <defs>
        <radialGradient id="sealGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E2C071" />
          <stop offset="100%" stopColor="#9A7530" />
        </radialGradient>
      </defs>
      <circle cx="43" cy="43" r="38" fill="none" stroke="url(#sealGrad)" strokeWidth="1.4" />
      <circle cx="43" cy="43" r="34" fill="none" stroke="#C29A4B" strokeWidth="0.6" strokeDasharray="2 4" />
      <path d="M43 14 L52 27 L52 38 L60 47 L52 56 L52 67 L43 76 L34 67 L34 56 L26 47 L34 38 L34 27 Z"
            fill="none" stroke="#9A7530" strokeWidth="1" opacity="0.7" />
      <path d="M43 21 L48 30 L48 38 L43 47 L38 38 L38 30 Z" fill="#8A1A1A" opacity="0.9" />
      <circle cx="43" cy="43" r="2.5" fill="#C29A4B" />
      <text x="43" y="9" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#9A7530" letterSpacing="2">EST · MMVIII</text>
    </svg>
  );
}
