import clsx from "clsx";

/**
 * Big section number with monospace caret, displayed sparingly.
 * Used only on pages where a numeric ledger earns it (legacy timeline, room count, etc).
 */
export function ScrollNumber({
  value,
  label,
  tone = "gold",
  size = "md",
  className,
}: {
  value: string | number;
  label?: string;
  tone?: "gold" | "ivory" | "ink";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span className={clsx("inline-flex items-baseline gap-2 font-mono", className)}>
      <span
        className={clsx(
          "leading-none tracking-tight",
          size === "sm" && "text-2xl",
          size === "md" && "text-5xl",
          size === "lg" && "text-7xl",
          tone === "gold" && "text-gold",
          tone === "ivory" && "text-bone",
          tone === "ink" && "text-ink"
        )}
      >
        {value}
      </span>
      {label && (
        <span
          className={clsx(
            "uppercase tracking-[0.22em] text-[10px] leading-none",
            tone === "gold" && "text-gold/70",
            tone === "ivory" && "text-bone/55",
            tone === "ink" && "text-ink-soft/65"
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
