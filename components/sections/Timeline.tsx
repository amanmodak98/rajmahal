"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import type { legacy } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Entry = (typeof legacy)[number];

/**
 * Legacy timeline: years on the left, content cards crawl on the right.
 */
export function Timeline({ entries }: { entries: readonly Entry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".tl-item");
      gsap.fromTo(
        items,
        { opacity: 0.2, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: `+=${items.length * 80}%`,
            pin: ".tl-pinned-col",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".tl-pinned-head",
        { y: 60 },
        {
          y: -items.length * 60,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: `+=${items.length * 80}%`,
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce, entries]);

  return (
    <div ref={ref} className="relative min-h-[200vh]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="tl-pinned-col lg:sticky lg:top-0 lg:h-[100dvh] flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-deep mb-6">
              The ledger · in five chapters
            </p>
            <div className="overflow-hidden">
              <div className="tl-pinned-head">
                {entries.map((entry, i) => (
                  <div key={i} className="h-[60px] flex items-baseline gap-4">
                    <span className="font-display-serif text-[clamp(2.5rem,5vw,5rem)] text-ember leading-none">
                      {entry.year}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep/70 self-end pb-3">
                      chapter {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {entries.map((entry, i) => (
            <article
              key={i}
              className="tl-item min-h-[60vh] flex flex-col justify-center gap-6 py-12"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                {entry.year}
              </p>
              <h3 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft max-w-[18ch]">
                {entry.title}
              </h3>
              <p className="font-body text-[17px] text-ink-muted leading-relaxed max-w-2xl">
                {entry.body}
              </p>
              <div className="relative aspect-[16/10] w-full max-w-3xl rounded-[28px] overflow-hidden mt-6">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  className="cinematic object-cover"
                />
                <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
