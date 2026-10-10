"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * One-per-page kinetic text strip.
 * Doubles up content for seamless loop. Respects reduced-motion.
 */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      {reduce ? (
        <div className="whitespace-nowrap py-4">{children}</div>
      ) : (
        <motion.div
          animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 py-6 will-change-transform"
          aria-hidden="false"
          role="marquee"
        >
          <div className="flex shrink-0 gap-12 items-center">{children}</div>
          <div className="flex shrink-0 gap-12 items-center">{children}</div>
        </motion.div>
      )}
    </div>
  );
}
