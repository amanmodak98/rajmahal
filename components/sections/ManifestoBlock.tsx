"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { EASE } from "@/lib/motion";

export function ManifestoBlock({
  eyebrow,
  lines,
  caption,
  className,
  align = "center",
  bg = "parchment",
}: {
  eyebrow?: string;
  lines: string[];
  caption?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
  bg?: "parchment" | "cream" | "deep" | "cream-warm";
}) {
  return (
    <section className={clsx(
      "relative py-32 md:py-56",
      bg === "parchment" && "bg-parchment",
      bg === "cream" && "bg-cream",
      bg === "deep" && "bg-deep",
      bg === "cream-warm" && "bg-cream-warm",
      className
    )}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [...EASE.parchment] }}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember mb-12 text-center"
          >
            {eyebrow}
          </motion.p>
        )}
        <div className={clsx(align === "center" ? "text-center" : "text-left")}>
          {lines.map((line, i) => (
            <ScrubReveal
              key={i}
              text={line}
              className={clsx(
                "font-display-serif text-ink-soft",
                "text-[clamp(1.75rem,4.5vw,4rem)] leading-[1.1] tracking-tight mb-8"
              )}
            />
          ))}
          {caption && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [...EASE.parchment] }}
              className="font-body italic text-[16px] text-ink-muted mt-10 max-w-xl mx-auto leading-relaxed"
            >
              {caption}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
