"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

export function FadeUp({
  children,
  delay = 0,
  duration = 0.9,
  y = 24,
  blur = 8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  className?: string;
}) {
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [...EASE.parchment] }}
    >
      {children}
    </motion.div>
  );
}
