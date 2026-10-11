"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRef } from "react";
import { Pill } from "@/components/primitives/Pill";
import { useParallaxY } from "@/lib/useParallax";

export function EditorialSplit({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  reversed = false,
  cta,
  pill,
  className,
  bg = "parchment",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  cta?: React.ReactNode;
  pill?: React.ReactNode;
  className?: string;
  bg?: "parchment" | "cream" | "deep";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgTransform = useParallaxY(ref, 40);

  const bgClass = clsx(
    bg === "parchment" && "bg-parchment",
    bg === "cream" && "bg-cream",
    bg === "deep" && "bg-deep"
  );

  return (
    <section
      ref={ref}
      className={clsx(
        "relative py-24 md:py-40 overflow-hidden",
        bgClass,
        className
      )}
    >
      <div
        className={clsx(
          "relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center",
          reversed && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div className="lg:col-span-5">
          {eyebrow && (
            <Pill variant="outline-gold" className="mb-6">
              {eyebrow}
            </Pill>
          )}
          <h2 className="lede-roman text-[clamp(2.5rem,5vw,5rem)] mb-6 text-ink-soft">
            {title}
          </h2>
          <div className="font-body text-[17px] leading-relaxed max-w-xl text-ink-muted">
            {body}
          </div>
          {pill && <div className="mt-6">{pill}</div>}
          {cta && <div className="mt-10">{cta}</div>}
        </div>

        <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[6/7] rounded-[28px] overflow-hidden">
          <div
            style={{ transform: imgTransform, position: "absolute", inset: "-48px 0" }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width:1024px) 60vw, 100vw"
              className="cinematic object-cover"
            />
          </div>
          <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold-rule rounded-[28px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
