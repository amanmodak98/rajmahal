"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { brand, hotel } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Palace-Doors curtain reveal.
 *
 * Desktop (lg+): two ornate side panels with rich content + a centred reveal.
 * Mobile (default): same animation, but only the brand seal, a small Hindi
 * wordmark, and the concierge line remain in the panels; the dense ledger and
 * pillar list drop out so the visible panels are not crammed.
 *
 * Reduced motion: skip GSAP, just unhide the centre.
 */
export function CurtainReveal({
  children,
  height = "min-h-[100dvh]",
}: {
  children?: React.ReactNode;
  height?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    if (reduce) {
      const center = sectionRef.current?.querySelector<HTMLElement>(".curtain-inner");
      if (center) center.style.opacity = "1";
      const doors = sectionRef.current?.querySelectorAll<HTMLElement>(".curtain-left, .curtain-right");
      doors?.forEach((d) => (d.style.opacity = "0"));
      return;
    }
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 1.1,
          pin: true,
        },
      });

      tl.fromTo(".curtain-left", { xPercent: 0 }, { xPercent: -110, ease: "power4.inOut" }, 0)
        .fromTo(".curtain-right", { xPercent: 0 }, { xPercent: 110, ease: "power4.inOut" }, 0)
        .to(".curtain-trim-left", { scaleY: 0, ease: "power4.inOut", duration: 0.5 }, 0)
        .to(".curtain-trim-right", { scaleY: 0, ease: "power4.inOut", duration: 0.5 }, 0)
        .to(".curtain-inner", { opacity: 1, duration: 0.5, ease: "expo.out" }, 0.18)
        .from(".curtain-inner .reveal-line", { y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ease: "expo.out" }, 0.32)
        .fromTo(".curtain-lotus", { opacity: 0, rotate: -8, scale: 0.92 }, { opacity: 1, rotate: 0, scale: 1, duration: 0.9, ease: "expo.out" }, 0.2)
        .from(".curtain-stat > *", { y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: "expo.out" }, 0.45)
        .to(".curtain-lotus", { yPercent: -8, duration: 0.4, ease: "power3.out" }, 0.75);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className={`relative ${height} w-full overflow-hidden bg-parchment`}
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
          background:
            "linear-gradient(90deg, #FAF6EC 0%, #F4ECDC 60%, rgba(232,220,192,0.55) 100%)",
        }} aria-hidden="true" />
        <div className="absolute inset-0 jali opacity-50" aria-hidden="true" />

        {/* Brass verticals - hidden on very small screens */}
        <div className="absolute inset-y-0 left-3 sm:left-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
        <div className="absolute inset-y-0 right-3 sm:right-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
        <div className="absolute left-0 right-0 top-[18%] md:top-[20%] h-px bg-gold/35" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[20%] h-px bg-gold/35" aria-hidden="true" />

        <div className="curtain-trim-left absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold-deep/70 to-gold/0 origin-top" aria-hidden="true" />

        {/* Brand seal - scales on mobile */}
        <div className="absolute top-6 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 px-2">
          <div className="scale-[0.55] sm:scale-[0.7] md:scale-100 origin-center">
            <BrandSeal />
          </div>
          <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-gold-deep text-center whitespace-nowrap">
            The Maharaja
          </p>
        </div>

        {/* Heritage ledger - hidden on mobile, shown on md+ */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft/55 text-center mb-4">
            Chapter, since
          </p>
          <div className="space-y-3 text-center">
            {[
              { yr: "1998", note: "Opens" },
              { yr: "2009", note: "Banquet lawns" },
              { yr: "2017", note: "Penthouse" },
              { yr: "2022", note: "Rooftop pool" },
              { yr: "2025", note: "Twenty-seven years" },
            ].map((m, i) => (
              <div key={i} className="flex items-baseline gap-2 justify-center">
                <span className="font-display-serif text-xl md:text-2xl text-gold-deep">{m.yr}</span>
                <span className="font-display-serif italic text-xs md:text-sm text-ink-soft/65">{m.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hindi wordmark at bottom - scales with viewport */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-2">
          <p className="font-display-hindi text-3xl sm:text-5xl md:text-7xl text-ember leading-none">
            {brand.hindi}
          </p>
          <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/55 mt-2 md:mt-3">
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
          background:
            "linear-gradient(270deg, #FAF6EC 0%, #F4ECDC 60%, rgba(232,220,192,0.55) 100%)",
        }} aria-hidden="true" />
        <div className="absolute inset-0 jali opacity-50" aria-hidden="true" />

        <div className="absolute inset-y-0 left-3 sm:left-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
        <div className="absolute inset-y-0 right-3 sm:right-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent hidden sm:block" aria-hidden="true" />
        <div className="absolute left-0 right-0 top-[18%] md:top-[20%] h-px bg-gold/35" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[20%] h-px bg-gold/35" aria-hidden="true" />

        <div className="curtain-trim-right absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold-deep/70 to-gold/0 origin-top" aria-hidden="true" />

        {/* Big motto - scales */}
        <div className="absolute top-6 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 text-center px-3 sm:px-6 md:px-8 w-[85%]">
          <p className="font-display-serif italic text-base sm:text-xl md:text-2xl text-ember leading-tight max-w-md mx-auto">
            “{brand.tagline}”
          </p>
          <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/50 mt-2 md:mt-4">
            Hotel mantra · since 1998
          </p>
        </div>

        {/* Three pillars - hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft/55 text-center mb-4">
            The Maharaja's three pillars
          </p>
          <div className="space-y-3 text-left">
            {[
              { n: "I", t: "Highway", note: "NH-73 · km 58" },
              { n: "II", t: "Heritage", note: "Twenty-seven years" },
              { n: "III", t: "Hospitality", note: "Round the clock" },
            ].map((p) => (
              <div key={p.n} className="flex items-center gap-3">
                <span className="font-display-serif text-xl md:text-2xl text-gold-deep">{p.n}.</span>
                <div className="text-left">
                  <p className="font-display-serif text-base md:text-xl text-ink-soft leading-tight">{p.t}</p>
                  <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/50 mt-0.5 md:mt-1">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concierge at the bottom */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-2 w-[90%]">
          <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/55 mb-1 md:mb-2">
            The concierge desk
          </p>
          <p className="font-display-serif text-xl sm:text-2xl md:text-3xl text-ember leading-none">
            {brand.phone}
          </p>
          <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-ink-soft/55 mt-1 md:mt-3">
            Always answered
          </p>
        </div>

        <div className="absolute inset-y-0 left-0 w-12 md:w-24 pointer-events-none" style={{
          background: "linear-gradient(270deg, transparent, rgba(194,154,75,0.18))",
        }} aria-hidden="true" />
      </div>
    </section>
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
