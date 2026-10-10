import clsx from "clsx";

type Variant = "solid-gold" | "outline-gold" | "outline-ink" | "ember-solid" | "ember-outline" | "dark-soft";

export function Pill({
  children,
  variant = "outline-gold",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]",
        variant === "solid-gold" && "bg-gold text-ink-soft",
        variant === "outline-gold" && "border border-gold-rule text-gold-deep",
        variant === "outline-ink" && "border border-ink-soft/20 text-ink-soft",
        variant === "ember-solid" && "bg-ember text-cream",
        variant === "ember-outline" && "border border-ember/40 text-ember",
        variant === "dark-soft" && "border border-cream/30 text-cream/80",
        className
      )}
    >
      {children}
    </span>
  );
}
