"use client";

import clsx from "clsx";
import Link from "next/link";

type Variant = "primary" | "ghost" | "ember" | "ember-solid" | "dark-ghost";
type AsTag = "a" | "button" | "span";

type CommonProps = {
  href?: string;
  label: string;
  variant?: Variant;
  trailingArrow?: boolean;
  className?: string;
};

export function LanternCTA({
  href,
  label,
  variant = "primary",
  trailingArrow = true,
  className,
  onClick,
  type = "button",
}: CommonProps & {
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const Inner = (
    <span
      className={clsx(
        "group relative inline-flex items-center gap-3 rounded-full font-mono text-[12px] uppercase tracking-[0.22em] transition-all duration-500",
        variant === "primary" && "bg-ink-soft text-cream border border-ink-soft px-6 py-3.5 hover:bg-ember hover:border-ember shadow-warm",
        variant === "ghost" && "border border-gold-rule text-gold-deep px-6 py-3 hover:bg-gold hover:border-gold hover:text-ink-soft",
        variant === "ember" && "border border-ember/40 text-ember px-6 py-3 hover:bg-ember hover:text-cream",
        variant === "ember-solid" && "bg-ember text-cream border border-ember px-6 py-3.5 hover:bg-ember-soft",
        variant === "dark-ghost" && "border border-cream/25 text-cream px-6 py-3 hover:bg-cream hover:text-ink-soft",
        className
      )}
    >
      <span className="relative z-10">{label}</span>
      {trailingArrow && (
        <span
          className={clsx(
            "relative z-10 inline-flex w-7 h-7 rounded-full items-center justify-center text-[11px] font-medium",
            "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover:translate-x-0.5 group-hover:-translate-y-[1px]",
            variant === "primary" && "bg-gold text-ink-soft",
            variant === "ghost" && "bg-gold/30 text-ember",
            variant === "ember" && "bg-ember/15 text-ember group-hover:bg-cream group-hover:text-ember",
            variant === "ember-solid" && "bg-ink-soft text-gold",
            variant === "dark-ghost" && "bg-cream/15 text-gold group-hover:bg-gold group-hover:text-ink-soft"
          )}
          aria-hidden="true"
        >
          ↗
        </span>
      )}
    </span>
  );

  if (href) return <Link href={href}>{Inner}</Link>;
  if (onClick) {
    return (
      <button type={type} onClick={onClick}>
        {Inner}
      </button>
    );
  }
  return (
    <button type={type}>
      {Inner}
    </button>
  );
}
