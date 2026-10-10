"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "motion/react";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { gallery as galleryData } from "@/lib/content";
import { EASE } from "@/lib/motion";

type Category = "all" | "kitchen" | "rooms" | "weddings" | "pool" | "property" | "roorkee";
const CATS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "kitchen", label: "Kitchen" },
  { key: "rooms", label: "Rooms" },
  { key: "weddings", label: "Weddings" },
  { key: "pool", label: "Pool" },
  { key: "property", label: "Property" },
  { key: "roorkee", label: "Roorkee" },
];

export default function GalleryPage() {
  const [cat, setCat] = useState<Category>("all");

  const filtered = useMemo(
    () => (cat === "all" ? galleryData : galleryData.filter((g) => g.category === cat)),
    [cat]
  );

  return (
    <>
      <section className="relative min-h-[70dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24 w-full">
          <Pill variant="outline-gold" className="mb-8">The visual archive</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[14ch] mb-10">
            Twenty-seven years
            <br />
            <span className="italic font-normal text-ember">in motion.</span>
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            The archive is divided into six chambers. Choose one to step into.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* TAB FILTERS */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 mb-12 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCat(c.key)}
            className={clsx(
              "rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] border transition-all duration-300",
              cat === c.key
                ? "bg-ember border-ember text-cream"
                : "border-gold-rule text-ink-muted hover:border-gold-deep hover:text-ink-soft"
            )}
            aria-pressed={cat === c.key}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* MASONRY - plain div + keyed remount; NO motion layout props (racing Next/Image lazy-load) */}
      <section className="relative pb-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div
            key={cat}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 motion-reduce:animate-none"
          >
            {filtered.map((g, i) => (
              <motion.figure
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: Math.min(i, 8) * 0.04, ease: [...EASE.parchment] }}
                className="group relative break-inside-avoid mb-6 overflow-hidden rounded-[20px] cursor-pointer ring-1 ring-gold-hairline"
                data-cursor="hover"
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  width={900}
                  height={1200}
                  sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 100vw"
                  className="cinematic w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-soft/85 via-ink-soft/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-bright mb-1">
                    {g.category}
                  </p>
                  <p className="font-display-serif italic text-cream leading-snug">
                    {g.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Pill variant="outline-gold" className="mb-8">From the archive</Pill>
          <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft leading-[0.95] mb-10">
            The hotel that walked the long road.
          </h2>
          <LanternCTA href="/legacy" label="Read the legacy" />
        </div>
      </section>
    </>
  );
}
