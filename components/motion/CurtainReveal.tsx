"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { brand } from "@/lib/content";

/**
 * Palace-Doors curtain reveal — JavaScript scroll-progress edition.
 *
 * Previous version used CSS `animation-timeline: view()`. Beautiful, but
 * not yet supported in Safari < 18, Firefox, or any Android webview that
 * hasn't shipped the feature. The user reported the curtain appeared stuck
 * at the already-open state — the fallback branch was firing.
 *
 * This version reads the section's scroll progress in plain JavaScript
 * (one rAF loop, one rAF per frame) and writes CSS custom properties to the
 * section element. Every layer listens to those variables via `var(...)`
 * expressions and re-evaluates on each frame.
 *
 * Net result: the same look, the same cadence, the same reduced-motion
 * behaviour, on every browser. No `animation-timeline: view()` dependency.
 *
 * The door panels stay open by default (no animation) so the curtain
 * renders correctly even before JavaScript hydrates. Then, on mount, the
 * scroll listener attaches and the panels slide closed for the user to
 * start the experience.
 */

const SCROLL_RANGE_START = 0;     // px from top of section when progress = 0
const SCROLL_RANGE_END = 1200;    // px into the section when progress = 1

// Layered ranges: each layer fades/scales across its own fraction of the
// total progress. Map of CSS variable name -> [start, end].
const LAYER_RANGES: Record<string, [number, number]> = {
  "--curtain-trim": [0.04, 0.18],
  "--curtain-bg": [0.06, 0.30],
  "--curtain-image": [0.10, 0.45],
  "--curtain-polaroid": [0.18, 0.50],
  "--curtain-filigree": [0.08, 0.30],
  "--curtain-inner": [0.30, 0.70],
  "--curtain-reveal-line": [0.35, 0.70],
  "--curtain-lotus": [0.25, 0.60],
  "--curtain-stat": [0.50, 0.80],
};

function ease(t: number) {
  // Cubic ease in-out - the same curve the GSAP version used
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function CurtainReveal({
  children,
}: {
  children?: React.ReactNode;
  height?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduce) return; // Reduced motion: skip the listener; CSS fallback already shows the open state

    let rafId = 0;
    let lastT = 0;

    const tick = () => {
      // Compute progress based on how much of the section has scrolled past
      // the top of the viewport. 0 = section top at viewport top; 1 = section
      // top is 1 viewport above the viewport top.
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Use the section's own scroll range
      const scrolled = clamp(-rect.top + vh * 0.3, 0, SCROLL_RANGE_END);
      const t = clamp(scrolled / SCROLL_RANGE_END, 0, 1);
      const eased = ease(t);

      // Doors
      section.style.setProperty("--curtain-left-x", `${-110 * eased}%`);
      section.style.setProperty("--curtain-right-x", `${110 * eased}%`);
      section.style.setProperty("--curtain-trim-y", `${(1 - eased).toFixed(3)}`);

      // Layer opacities / scales
      for (const [name, [start, end]] of Object.entries(LAYER_RANGES)) {
        const u = clamp((eased - start) / Math.max(0.0001, end - start), 0, 1);
        section.style.setProperty(`${name}-progress`, u.toFixed(3));
      }

      // Lotus extra lift once it's fully revealed
      const lotusLift = clamp((eased - 0.7) / 0.2, 0, 1);
      section.style.setProperty("--curtain-lotus-lift", `${(lotusLift * -8).toFixed(2)}%`);

      lastT = t;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduce]);

  return (
    <div
      ref={sectionRef}
      className="relative h-[230dvh]"
      style={{
        // Default (pre-hydration) state: doors closed
        ["--curtain-left-x" as string]: "0%",
        ["--curtain-right-x" as string]: "0%",
        ["--curtain-trim-y" as string]: "1",
        ["--curtain-bg-progress" as string]: "0",
        ["--curtain-image-progress" as string]: "0",
        ["--curtain-polaroid-progress" as string]: "0",
        ["--curtain-filigree-progress" as string]: "0",
        ["--curtain-inner-progress" as string]: "0",
        ["--curtain-reveal-line-progress" as string]: "0",
        ["--curtain-lotus-progress" as string]: "0",
        ["--curtain-stat-progress" as string]: "0",
        ["--curtain-lotus-lift" as string]: "0%",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
/* === curtain - all transforms driven by inline CSS custom properties === */

.curtain-section {
  position: sticky;
  top: 0;
  height: 100dvh;
  z-index: 5;
  overflow: hidden;
  background: var(--bg-page, #F4ECDC);
}

/* Doors: read the variable written by the scroll listener. */
.curtain-section .curtain-left {
  transform: translateX(var(--curtain-left-x, 0%));
}
.curtain-section .curtain-right {
  transform: translateX(var(--curtain-right-x, 0%));
}
.curtain-section .curtain-trim-left,
.curtain-section .curtain-trim-right {
  transform: scaleY(var(--curtain-trim-y, 1));
}

/* Layered opacities + scales: each is gated by its own progress variable
   so the layers cascade in even with one animation timing. */
.curtain-section .curtain-bg-left,
.curtain-section .curtain-bg-right {
  opacity: calc(0.55 * var(--curtain-bg-progress, 0));
  transform: scale(calc(1.12 - 0.12 * var(--curtain-bg-progress, 0)));
}
.curtain-section .curtain-image-left,
.curtain-section .curtain-image-right {
  opacity: var(--curtain-image-progress, 0);
  transform: scale(calc(0.86 + 0.14 * var(--curtain-image-progress, 0)));
}
.curtain-section .curtain-polaroid-left {
  opacity: calc(0.95 * var(--curtain-polaroid-progress, 0));
  transform: scale(var(--curtain-polaroid-progress, 0)) rotate(-8deg);
}
.curtain-section .curtain-polaroid-right {
  opacity: calc(0.95 * var(--curtain-polaroid-progress, 0));
  transform: scale(var(--curtain-polaroid-progress, 0)) rotate(8deg);
}
.curtain-section .curtain-filigree-left,
.curtain-section .curtain-filigree-right {
  opacity: calc(0.6 * var(--curtain-filigree-progress, 0));
}
.curtain-section .curtain-inner {
  opacity: var(--curtain-inner-progress, 0);
}
.curtain-section .curtain-inner .reveal-line {
  opacity: var(--curtain-reveal-line-progress, 0);
  transform: translateY(calc((1 - var(--curtain-reveal-line-progress, 0)) * 30px));
}
.curtain-section .curtain-lotus {
  opacity: var(--curtain-lotus-progress, 0);
  transform: translateY(var(--curtain-lotus-lift, 0%)) rotate(calc(-8deg + 8deg * var(--curtain-lotus-progress, 0))) scale(calc(0.92 + 0.08 * var(--curtain-lotus-progress, 0)));
}
.curtain-section .curtain-stat > * {
  opacity: var(--curtain-stat-progress, 0);
  transform: translateY(calc((1 - var(--curtain-stat-progress, 0)) * 60px));
}

/* Reduced motion and very old browsers: do not animate at all, just show
   the panels in their closed (initial) state. The user sees the curtain
   closed but still composed, no JS required, no animation. */
@media (prefers-reduced-motion: reduce) {
  .curtain-section .curtain-left,
  .curtain-section .curtain-right {
    transform: none;
  }
  .curtain-section .curtain-trim-left,
  .curtain-section .curtain-trim-right {
    transform: scaleY(1);
  }
  .curtain-section .curtain-image,
  .curtain-section .curtain-bg,
  .curtain-section .curtain-polaroid,
  .curtain-section .curtain-filigree,
  .curtain-section .curtain-lotus {
    opacity: 1;
    transform: none;
  }
  .curtain-section .curtain-inner,
  .curtain-section .curtain-inner .reveal-line,
  .curtain-section .curtain-stat > * {
    opacity: 1;
    transform: none;
  }
}

/* Sticky fallback */
@supports not (position: sticky) {
  .curtain-section { position: relative; height: 100dvh; }
}
          `,
        }}
      />

      <section
        className="curtain-section"
        aria-label="Palace doors opening"
      >
        {/* Centre reveal */}
        <div className="curtain-inner absolute inset-0 flex items-center justify-center px-3 sm:px-6 z-10">
          {children}
        </div>

        {/* =========================================
            LEFT DOOR PANEL
            ========================================= */}
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
              style={{
                mixBlendMode: "multiply",
                filter: "saturate(0.85) brightness(1.05) sepia(0.15)",
              }}
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(232,220,192,0.65) 0%, rgba(232,220,192,0.25) 100%)" }}
            />
          </div>

          <div className="absolute inset-y-0 left-3 sm:left-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute inset-y-0 right-3 sm:right-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-[18%] md:top-[20%] h-px bg-gold/35 hidden sm:block" aria-hidden="true" />
          <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[20%] h-px bg-gold/35 hidden sm:block" aria-hidden="true" />

          <div className="curtain-trim-left absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold-deep/70 to-gold/0 origin-top" aria-hidden="true" />

          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-left absolute top-0 right-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none hidden sm:block"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6 }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
            <path d="M82 0 C66 0, 58 8, 58 22" />
            <circle cx="78" cy="8" r="2" fill="currentColor" />
            <circle cx="68" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-left absolute bottom-0 left-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none hidden sm:block"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6, transform: "rotate(180deg)" }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
          </svg>

          <div className="absolute top-4 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 px-2 z-10">
            <div className="scale-[0.7] sm:scale-100 origin-center">
              <BrandSeal />
            </div>
            <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.22em] md:tracking-[0.32em] text-gold-deep text-center whitespace-nowrap">
              The Maharaja
            </p>
          </div>

          <div className="curtain-image curtain-image-left absolute left-1/2 -translate-x-1/2 top-[20%] sm:top-[28%] md:top-[24%] w-[78%] sm:w-[42%] max-w-[300px] aspect-[4/5] rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-vanta ring-1 ring-gold-rule bg-cream z-10">
            <img
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80"
              alt="Rajasthani palace archway"
              className="w-full h-full object-cover cinematic"
              style={{ filter: "saturate(0.85) contrast(1.06)" }}
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-[10px] sm:rounded-[14px]" aria-hidden="true" />
            <div className="absolute left-1.5 sm:left-2 bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 flex items-end justify-between gap-1.5 sm:gap-2">
              <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-cream bg-ink-soft/65 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Plate I
              </span>
              <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold-bright bg-ink-soft/65 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Heritage
              </span>
            </div>
          </div>

          <div className="curtain-image curtain-polaroid-left hidden sm:block absolute left-[14%] top-[16%] w-[18%] aspect-[3/4] rounded-[10px] overflow-hidden ring-1 ring-cream shadow-warm z-10">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=80"
              alt="Palace interior detail"
              className="w-full h-full object-cover cinematic"
              loading="eager"
              decoding="sync"
            />
            <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]" />
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
            <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]" />
          </div>

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
              ].map((m) => (
                <div key={m.yr} className="flex items-baseline gap-2 justify-center">
                  <span className="font-display-serif text-xl text-gold-deep">{m.yr}</span>
                  <span className="font-display-serif italic text-xs text-ink-soft/75">{m.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-2 w-[92%] sm:w-[90%] z-10">
            <p className="font-display-hindi text-5xl sm:text-5xl md:text-7xl text-ember leading-none">
              {brand.hindi}
            </p>
            <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.22em] md:tracking-[0.32em] text-ink-soft/65 mt-1.5 md:mt-3">
              राज महल · रुड़की
            </p>
          </div>

          <div className="absolute inset-y-0 right-0 w-12 md:w-24 pointer-events-none" style={{
            background: "linear-gradient(90deg, transparent, rgba(194,154,75,0.18))",
          }} aria-hidden="true" />
        </div>

        {/* =========================================
            RIGHT DOOR PANEL
            ========================================= */}
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
              style={{
                mixBlendMode: "multiply",
                filter: "saturate(0.85) brightness(1.05) sepia(0.15)",
              }}
              loading="eager"
              decoding="sync"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(232,220,192,0.65) 0%, rgba(232,220,192,0.25) 100%)" }}
            />
          </div>

          <div className="absolute inset-y-0 left-3 sm:left-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute inset-y-0 right-3 sm:right-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-[18%] md:top-[20%] h-px bg-gold/35 hidden sm:block" aria-hidden="true" />
          <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[20%] h-px bg-gold/35 hidden sm:block" aria-hidden="true" />
          <div className="curtain-trim-right absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold-deep/70 to-gold/0 origin-top" aria-hidden="true" />

          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-right absolute top-0 left-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none hidden sm:block"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6, transform: "scaleX(-1)" }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
            <path d="M82 0 C66 0, 58 8, 58 22" />
            <circle cx="78" cy="8" r="2" fill="currentColor" />
          </svg>
          <svg
            aria-hidden="true"
            className="curtain-filigree curtain-filigree-right absolute bottom-0 right-0 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 text-gold-deep pointer-events-none hidden sm:block"
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6"
            style={{ opacity: 0.6, transform: "scale(-1, -1)" }}
          >
            <path d="M100 0 L100 28 L72 28 M100 8 L92 8 M100 18 L82 18" />
            <path d="M92 0 C70 0, 56 14, 56 36" />
          </svg>

          <div className="absolute top-4 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 text-center px-3 sm:px-6 md:px-8 w-[88%] sm:w-[85%] z-10">
            <p className="font-display-serif italic text-sm sm:text-xl md:text-2xl text-ember leading-tight max-w-md mx-auto">
              “{brand.tagline}”
            </p>
            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.22em] md:tracking-[0.32em] text-ink-soft/60 mt-1.5 sm:mt-2 md:mt-4">
              Hotel mantra · since 1998
            </p>
          </div>

          <div className="curtain-image curtain-image-right absolute left-1/2 -translate-x-1/2 top-[20%] sm:top-[28%] md:top-[24%] w-[78%] sm:w-[42%] max-w-[300px] aspect-[4/5] rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-vanta ring-1 ring-gold-rule bg-cream z-10">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80"
              alt="The Penthouse rooftop restaurant at Hotel Rajmahal"
              className="w-full h-full object-cover cinematic"
              style={{ filter: "saturate(0.85) contrast(1.06)" }}
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-[10px] sm:rounded-[14px]" aria-hidden="true" />
            <div className="absolute left-1.5 sm:left-2 bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 flex items-end justify-between gap-1.5 sm:gap-2">
              <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-cream bg-ink-soft/65 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Plate II
              </span>
              <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold-bright bg-ink-soft/65 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                The Penthouse
              </span>
            </div>
          </div>

          <div className="curtain-image curtain-polaroid-right hidden sm:block absolute right-[14%] top-[16%] w-[18%] aspect-[3/4] rounded-[10px] overflow-hidden ring-1 ring-cream shadow-warm z-10">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=80"
              alt="Kitchen tandoor detail"
              className="w-full h-full object-cover cinematic"
              loading="eager"
              decoding="sync"
            />
            <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]" />
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
            <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-[10px]" />
          </div>

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

          <div className="absolute bottom-4 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-2 w-[92%] sm:w-[90%] z-10">
            <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.22em] md:tracking-[0.32em] text-ink-soft/65 mb-1 md:mb-2">
              Concierge
            </p>
            <p className="font-display-serif text-2xl sm:text-2xl md:text-3xl text-ember leading-none">
              {brand.phone}
            </p>
            <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.22em] md:tracking-[0.32em] text-ink-soft/65 mt-1 md:mt-3">
              Always answered
            </p>
          </div>

          <div className="absolute inset-y-0 left-0 w-12 md:w-24 pointer-events-none" style={{
            background: "linear-gradient(270deg, transparent, rgba(194,154,75,0.18))",
          }} aria-hidden="true" />
        </div>
      </section>
    </div>
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
