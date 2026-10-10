"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Generic sticky pin wrapper. Pin the first child while next child scrolls past.
 * Standard start: "top top".
 */
export function StickyPin({
  children,
  endTrigger,
  end = "+=80%",
  className,
}: {
  children: React.ReactNode;
  endTrigger?: HTMLElement | null;
  end?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        endTrigger: endTrigger ?? undefined,
        end,
        pin: true,
        pinSpacing: true,
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce, endTrigger, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
