import Image from "next/image";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { FormBoundary } from "@/components/shell/FormBoundary";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { JaliPattern } from "@/components/primitives/JaliPattern";
import { journal } from "@/lib/content";

export const metadata = {
  title: "Journal",
  description: "Field notes from the highway, the kitchen, the laundry. Four dispatches, written slowly.",
};

export default function JournalPage() {
  return (
    <>
      <section className="relative min-h-[70dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <JaliPattern tone="paper" className="opacity-50" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(180deg, rgba(244,236,220,0.5) 0%, var(--bg-page) 100%)",
        }} aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24 w-full">
          <Pill variant="outline-gold" className="mb-8">Field notes</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[14ch] mb-10">
            Four dispatches,
            <br />
            <span className="italic font-normal text-ember">written slowly.</span>
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            From the kitchen, the highway, the laundry. We write when there is something to say, not on a calendar.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* LEAD ESSAY */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-6">
            The lead essay · {journal[0].date} · {journal[0].readMinutes} minute read
          </p>
          <h2 className="lede-roman text-[clamp(2.5rem,6vw,5rem)] text-ink-soft mb-10 max-w-[18ch] leading-[0.95]">
            {journal[0].title}
          </h2>
          <ScrubReveal
            text={journal[0].body}
            className="font-display-serif text-ink-soft text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed mb-12"
          />
          <FadeUp>
            <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden shadow-vanta">
              <Image
                src={journal[0].image}
                alt={journal[0].title}
                fill
                sizes="(min-width:1024px) 70vw, 100vw"
                className="cinematic object-cover"
              />
              <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
            </div>
          </FadeUp>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* SHORT ENTRIES */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10">
          <div className="space-y-20">
            {journal.slice(1).map((entry) => (
              <FadeUp key={entry.slug}>
                <article className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-5 relative aspect-[5/4] rounded-[24px] overflow-hidden shadow-warm">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      sizes="(min-width:1024px) 42vw, 100vw"
                      className="cinematic object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
                  </div>
                  <div className="lg:col-span-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-4">
                      {entry.date} · {entry.readMinutes} minute read
                    </p>
                    <h3 className="lede-roman text-[clamp(1.75rem,4vw,3rem)] text-ink-soft mb-4 group-hover:text-ember transition-colors leading-tight">
                      {entry.title}
                    </h3>
                    <p className="font-display-serif italic text-ink-muted text-xl leading-relaxed mb-6">
                      {entry.excerpt}
                    </p>
                    <p className="font-body text-ink-muted leading-relaxed">{entry.body}</p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <section className="relative py-32 md:py-48 overflow-hidden border-t border-gold-rule bg-cream-warm">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Pill variant="outline-gold" className="mb-8">Subscribe, in the old way</Pill>
          <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft leading-[0.95] mb-10">
            We mail a folded letter twice a year.
          </h2>
          <p className="font-display-serif italic text-ink-muted text-lg leading-relaxed max-w-lg mx-auto mb-10">
            Drop your email below and we will add you. We do not write to you more than twice a year. We do not share.
          </p>
          <FormBoundary className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="you@your-letter.com"
              className="flex-1 bg-cream border border-gold-rule rounded-full px-6 py-4 font-body text-base text-ink-soft placeholder:text-ink-quiet focus:border-ember focus:outline-none transition-colors"
              aria-label="Email address"
            />
            <LanternCTA type="submit" label="Subscribe" />
          </FormBoundary>
        </div>
      </section>
    </>
  );
}
