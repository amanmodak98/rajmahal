"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ImagePill({
  src,
  alt,
  width = 600,
  height = 800,
  shiftRange = 60,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  shiftRange?: number;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [shiftRange, -shiftRange]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={clsx("relative overflow-hidden rounded-full shadow-vanta", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="cinematic w-full h-full object-cover"
      />
      <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
    </motion.div>
  );
}
