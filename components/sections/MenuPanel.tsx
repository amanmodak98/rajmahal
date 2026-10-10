"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { dining } from "@/lib/content";
import { EASE } from "@/lib/motion";

type TabKey = "signatures" | "northIndian" | "chinese" | "continental" | "breads" | "sweets";

const TABS: { key: TabKey; label: string; sub: string }[] = [
  { key: "signatures", label: "Signatures", sub: "Most asked for" },
  { key: "northIndian", label: "North Indian", sub: "From the tandoor" },
  { key: "chinese", label: "Chin., in our register", sub: "Indo-Chinese, made honestly" },
  { key: "continental", label: "Continental", sub: "European technique" },
  { key: "breads", label: "Breads", sub: "From the clay oven" },
  { key: "sweets", label: "Sweets", sub: "From the dessert counter" },
];

export function MenuPanel() {
  const [active, setActive] = useState<TabKey>("signatures");
  const data = useMemo(() => dining[active], [active]);

  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-12 -mx-6 px-6">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={clsx(
                "shrink-0 text-left rounded-[20px] border transition-all duration-500",
                "px-5 py-3.5",
                isActive
                  ? "border-ember bg-cream-warm text-ink-soft shadow-warm"
                  : "border-gold-hairline bg-cream text-ink-muted hover:border-gold-rule hover:text-ink-soft"
              )}
              aria-pressed={isActive}
            >
              <p className="font-display-serif text-lg leading-none">{tab.label}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mt-1.5">
                {tab.sub}
              </p>
            </button>
          );
        })}
      </div>

      <motion.ul
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [...EASE.parchment] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-12"
      >
        {data.map((item, i) => (
          <li
            key={`${active}-${i}`}
            className="group flex items-start justify-between gap-6 border-b border-gold-hairline py-6"
          >
            <div className="flex-1">
              <h4 className="font-display-serif text-2xl text-ink-soft leading-tight group-hover:text-ember transition-colors duration-500">
                {item.name}
              </h4>
              {"note" in item && item.note && (
                <p className="font-body italic text-[15px] text-ink-muted mt-2 max-w-md">
                  {item.note}
                </p>
              )}
            </div>
            <p className="font-display-serif text-xl text-ember tabular-nums whitespace-nowrap">
              ₹{item.price}
            </p>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
