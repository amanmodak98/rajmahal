"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubbed text reveal: opacity of every word scrubs from 0.1 to 1 as user scrolls past.
 * Splits text into words (preserves Devanagari/space boundaries).
 */
export function ScrubReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const words = ref.current!.querySelectorAll<HTMLSpanElement>(".scrub-word");
      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce, text]);

  // Split into words by spaces, preserving the spaces
  const parts = text.split(/(\s+)/);

  return (
    <p ref={ref} className={className}>
      {parts.map((part, i) =>
        part.trim() === "" ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i} className="scrub-word inline-block" style={{ marginRight: "0.25ch" }}>
            {part}
          </span>
        )
      )}
    </p>
  );
}
