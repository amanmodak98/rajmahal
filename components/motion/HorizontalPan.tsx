"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP horizontal-pan wrapper.
 * Pin the wrapper, slide the inner track to the left as the user scrolls down.
 * Critical: start: "top top", pin: true, end: "+=${distance}".
 */
export function HorizontalPan({
  children,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.kill();
      };
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={track} className={`flex h-[100dvh] items-center ${trackClassName ?? ""}`}>
        {children}
      </div>
    </section>
  );
}
