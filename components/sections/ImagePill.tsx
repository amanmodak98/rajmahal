"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { useParallaxY } from "@/lib/useParallax";

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
  const transform = useParallaxY(ref, shiftRange);

  return (
    <div
      ref={ref}
      className={clsx("relative overflow-hidden rounded-full shadow-vanta", className)}
    >
      <div style={{ transform, willChange: "transform" }} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="cinematic w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
    </div>
  );
}
