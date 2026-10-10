import clsx from "clsx";
import { JaliPattern } from "./JaliPattern";

/**
 * Page-section divider. Combines a faint jali strip with a hairline gold rule.
 */
export function PaherDivider({
  tone = "gold",
  withJali = true,
  className,
}: {
  tone?: "gold" | "ember" | "ivory";
  withJali?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("relative my-16 md:my-24", className)}>
      {withJali && (
        <div className="relative h-12 mb-3 overflow-hidden">
          <JaliPattern tone="soft" />
        </div>
      )}
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            "h-px flex-1",
            tone === "gold" && "bg-gradient-to-r from-transparent via-gold/40 to-gold/40",
            tone === "ember" && "bg-gradient-to-r from-transparent via-ember/40 to-ember/40",
            tone === "ivory" && "bg-gradient-to-r from-transparent via-bone/30 to-bone/30"
          )}
        />
        <span
          className={clsx(
            "h-2 w-2 rounded-full",
            tone === "gold" && "bg-gold",
            tone === "ember" && "bg-ember",
            tone === "ivory" && "bg-bone"
          )}
        />
        <span
          className={clsx(
            "h-px flex-1",
            tone === "gold" && "bg-gradient-to-l from-transparent via-gold/40 to-gold/40",
            tone === "ember" && "bg-gradient-to-l from-transparent via-ember/40 to-ember/40",
            tone === "ivory" && "bg-gradient-to-l from-transparent via-bone/30 to-bone/30"
          )}
        />
      </div>
    </div>
  );
}
