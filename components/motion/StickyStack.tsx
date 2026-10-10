"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Card stack: a sequence of full-viewport sticky cards that pile on scroll.
 * Critical: start: "top top", pin: true, scale-up fades driven by next card.
 */
export function StickyStack({
  cards,
  height = "min-h-[80vh] md:min-h-[100dvh]",
}: {
  cards: React.ReactNode[];
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`stack-card sticky top-0 ${height} flex items-center justify-center`}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
