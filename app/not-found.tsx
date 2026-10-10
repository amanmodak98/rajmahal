import Link from "next/link";
import { JaliPattern } from "@/components/primitives/JaliPattern";
import { LanternCTA } from "@/components/primitives/LanternCTA";

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-parchment">
      <JaliPattern tone="paper" className="opacity-50" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(194,154,75,0.16) 0%, transparent 60%)",
      }} aria-hidden="true" />
      <div className="relative max-w-xl mx-auto px-6 text-center py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember mb-6">
          The Maharaja regrets
        </p>
        <p className="font-display-hindi text-[clamp(8rem,28vw,16rem)] text-ember/35 leading-none mb-2 block">
          चार
        </p>
        <h1 className="lede-roman text-[clamp(2rem,5vw,3.5rem)] text-ink-soft mb-6">
          The chamber is on another floor.
        </h1>
        <p className="font-display-serif italic text-ink-muted text-xl leading-relaxed mb-10">
          You have wandered off the road. The Penthouse, the pool, and the chambers are all still here. Come back through the front doors.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LanternCTA href="/" label="Walk to the front doors" />
          <LanternCTA href="/contact" label="Phone the concierge" variant="ghost" />
        </div>
      </div>
    </div>
  );
}
