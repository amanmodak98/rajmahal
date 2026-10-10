"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import type { Room } from "@/lib/content";

export function RoomCard({ room }: { room: Room }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [...EASE.parchment] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
      onClick={() => setFlipped((s) => !s)}
      className={clsx(
        "group relative h-[400px] sm:h-[440px] md:h-[460px] rounded-[28px] overflow-hidden cursor-pointer ring-1 ring-gold-hairline",
        "outline-none focus-visible:ring-2 focus-visible:ring-ember"
      )}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [...EASE.parchment] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(min-width:1024px) 33vw, 100vw"
            className="cinematic object-cover"
          />
          <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: "linear-gradient(180deg, rgba(14,9,8,0) 25%, rgba(14,9,8,0.85) 100%)" }}
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 bottom-0 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-bright mb-2">
              {room.sanskrit}
            </p>
            <h3 className="lede-roman text-2xl md:text-3xl text-cream">{room.name}</h3>
            <p className="font-display-serif italic text-cream/70 mt-1 text-base">
              {room.size} · {room.bed}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-cream-warm border border-gold-rule rounded-[28px] p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-3">
              {room.sanskrit}
            </p>
            <h3 className="lede-roman text-2xl text-ink-soft">{room.name}</h3>
            <p className="font-body text-[15px] text-ink-muted mt-1">{room.view}</p>
            <ul className="mt-5 space-y-2">
              {room.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-[14px] text-ink-soft/85">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-ember shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
              Tariff
            </p>
            <p className="font-display-serif text-2xl text-ember mt-1">{room.rate}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
