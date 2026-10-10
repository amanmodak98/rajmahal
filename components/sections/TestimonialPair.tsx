"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import type { Testimonial } from "@/lib/content";

export function TestimonialPair({
  left,
  right,
}: {
  left: Testimonial;
  right: Testimonial;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-[1200px] mx-auto">
      <TestimonialCard t={left} delay={0.05} />
      <TestimonialCard t={right} delay={0.2} />
    </div>
  );
}

function TestimonialCard({ t, delay }: { t: Testimonial; delay: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay, ease: [...EASE.parchment] }}
      className="flex flex-col gap-6"
    >
      <p className="lede text-[clamp(1.25rem,2.4vw,1.85rem)] text-ink-soft leading-[1.25]">
        “{t.quote}”
      </p>
      <figcaption className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-gold-rule">
          <Image src={t.photo} alt={t.name} fill sizes="56px" className="cinematic object-cover" />
        </div>
        <div>
          <p className="font-display-serif text-lg text-ink-soft">{t.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mt-1">
            {t.role}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
