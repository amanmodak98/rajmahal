"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Span = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

type Item = {
  span?: Span;
  rowSpan?: Span;
  className?: string;
  content: React.ReactNode;
};

export function BentoGrid({
  items,
  className,
  gap = "gap-5 md:gap-6",
}: {
  items: Item[];
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={clsx(
        "grid grid-flow-dense grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 auto-rows-[minmax(220px,auto)]",
        gap,
        className
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: i * 0.06, ease: [...EASE.parchment] }}
          className={clsx(
            "col-span-1 sm:col-span-full",
            item.span === "2" && "sm:col-span-2",
            item.span === "3" && "sm:col-span-3",
            item.span === "4" && "sm:col-span-4",
            item.span === "5" && "sm:col-span-5",
            item.span === "6" && "sm:col-span-6",
            item.span === "7" && "sm:col-span-7",
            item.span === "8" && "sm:col-span-8",
            item.span === "9" && "sm:col-span-9",
            item.span === "10" && "sm:col-span-10",
            item.span === "11" && "sm:col-span-11",
            item.span === "12" && "sm:col-span-12",
            item.rowSpan === "2" && "sm:row-span-2",
            item.rowSpan === "3" && "sm:row-span-3",
            item.className
          )}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}
