"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { EASE } from "@/lib/motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });
  const dotRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReduced(true);
    if (window.matchMedia("(hover: none)").matches) setEnabled(false);
    else setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = !!(t && (t.closest("a, button, [role='button'], [data-cursor='hover']")));
      setHover(interactive);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled || reduced) return null;

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{ x, y }}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[70] pointer-events-none w-1.5 h-1.5 rounded-full bg-ember -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hover ? 2.4 : 1,
          borderColor: hover ? "rgba(138,26,26,0.85)" : "rgba(154,117,48,0.5)",
        }}
        transition={{ duration: 0.5, ease: EASE.parchment }}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[70] pointer-events-none w-9 h-9 rounded-full border -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
      />
    </>
  );
}
