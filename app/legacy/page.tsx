import { Timeline } from "@/components/sections/Timeline";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { FadeUp } from "@/components/motion/FadeUp";
import { ManifestoBlock } from "@/components/sections/ManifestoBlock";
import { legacy, brand } from "@/lib/content";

export const metadata = {
  title: "Legacy",
  description:
    "Twenty-seven years on the highway. The story of Hotel Rajmahal, told chapter by chapter.",
};

export default function LegacyPage() {
  return (
    <>
      <section className="relative min-h-[80dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0 jali-paper opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">The ledger · in five chapters</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[14ch] mb-10">
            Twenty-seven years
            <br />
            <span className="italic font-normal text-ember">on the highway.</span>
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            The Rajmahal name is older than any building that wears it. It survives across the subcontinent because the formula is unhurried: a room, a meal, a welcome. We have run the same kitchen for twenty-seven years.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <Timeline entries={legacy} />

      <PaherDivider tone="gold" />

      <ManifestoBlock
        eyebrow="A note on staying still"
        bg="cream-warm"
        lines={[
          "We have not changed the cabinetry since opening.",
          "The lobby floor is the same quarry from Rajasthan.",
          "The menu has not lost a dish in twenty-seven years.",
          "The doorman has not changed in nineteen.",
        ]}
      />

      <section className="relative py-32 md:py-48 overflow-hidden border-t border-gold-rule bg-cream-warm">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember mb-8">
              Continue the walk
            </p>
            <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft mb-10">
              The town that holds us.
            </h2>
            <LanternCTA href="/location" label="Walk through Roorkee" />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
