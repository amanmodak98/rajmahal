"use client";

import Link from "next/link";
import clsx from "clsx";
import { brand } from "@/lib/content";

type Tone = "ink" | "gold" | "gold-deep" | "cream" | "ember";

type Props = {
  size?: "sm" | "md" | "lg";
  tone?: Tone;
  href?: string;
  align?: "left" | "center";
  className?: string;
};

export function Wordmark({ size = "md", tone = "ink", href, align = "left", className }: Props) {
  const sizeClass = clsx(
    size === "sm" && "text-xl",
    size === "md" && "text-2xl",
    size === "lg" && "text-[clamp(2.5rem,5vw,4rem)]"
  );
  const subSizeClass = clsx(
    size === "sm" && "text-[15px]",
    size === "md" && "text-lg",
    size === "lg" && "text-[clamp(1.5rem,3vw,2.5rem)]"
  );
  const mainToneClass = clsx(
    tone === "ink" && "text-ink-soft",
    tone === "gold" && "text-gold-bright",
    tone === "gold-deep" && "text-gold-deep",
    tone === "cream" && "text-cream",
    tone === "ember" && "text-ember"
  );
  const subToneClass = clsx(
    tone === "ink" && "text-ink-soft/75",
    tone === "gold" && "text-gold-bright/75",
    tone === "gold-deep" && "text-gold-deep/75",
    tone === "cream" && "text-cream/75",
    tone === "ember" && "text-ember/75"
  );

  const content = (
    <>
      <span className={clsx("font-display-serif font-medium leading-none", sizeClass, mainToneClass)}>
        {brand.latin}
      </span>
      <span className={clsx("font-display-hindi leading-none", subSizeClass, subToneClass)}>
        · {brand.city}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          "inline-flex items-baseline gap-2 select-none",
          align === "center" && "justify-center",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-baseline gap-2 select-none",
        align === "center" && "justify-center",
        className
      )}
    >
      {content}
    </span>
  );
}
