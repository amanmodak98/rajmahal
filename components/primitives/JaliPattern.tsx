import clsx from "clsx";

type Props = {
  tone?: "gold" | "paper" | "soft";
  className?: string;
};

/**
 * SVG Mughal octagon + star lattice, exposed as a CSS background.
 * Uses the inline data-URI from globals.css, see .jali* classes.
 */
export function JaliPattern({ tone = "soft", className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0",
        tone === "gold" && "jali",
        tone === "paper" && "jali-paper",
        tone === "soft" && "jali-soft",
        className
      )}
    />
  );
}
