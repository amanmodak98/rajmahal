import Image from "next/image";
import { HorizontalPan } from "@/components/motion/HorizontalPan";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { FadeUp } from "@/components/motion/FadeUp";
import { experiences } from "@/lib/content";

export const metadata = {
  title: "Experiences",
  description:
    "Eight small things the hotel does well. Coffee at dawn, a long dinner under the courtyard, a wedding-day breakfast.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative min-h-[80dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0 jali-paper opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(180deg, rgba(244,236,220,0.6) 0%, var(--bg-page) 100%)",
        }} aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">Experiences · eight rooms inside one stay</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[14ch] mb-10">
            The eight
            <br />
            <span className="italic font-normal text-ember">small hours.</span>
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            A list of things you can do inside a stay. Booked for you, on request. Scroll through, sideways, for each one.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <HorizontalPan>
        {experiences.map((e, i) => (
          <article key={e.title} className="shrink-0 w-[88vw] lg:w-[55vw] h-[80vh] relative px-6 md:px-12 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1300px] w-full">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-6">
                  Room {String(i + 1).padStart(2, "0")} · {e.sanskrit}
                </p>
                <h2 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft mb-6 max-w-[14ch] leading-[1.05]">
                  {e.title}
                </h2>
                <p className="font-display-serif italic text-ink-muted text-xl leading-relaxed max-w-md">
                  {e.body}
                </p>
              </div>
              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-[28px] overflow-hidden shadow-vanta">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="cinematic object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
              </div>
            </div>
          </article>
        ))}
        <article className="shrink-0 w-[50vw] h-[80vh] flex items-end px-12 pb-20">
          <p className="font-display-serif italic text-ink-quiet text-2xl leading-relaxed max-w-md">
            "The hotel is the stay; the stay is what you do inside it."
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep not-italic block mt-4">
              The concierge, paraphrased
            </span>
          </p>
        </article>
      </HorizontalPan>

      <PaherDivider tone="gold" />

      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <FadeUp>
            <Pill variant="outline-gold" className="mb-6">For the planner</Pill>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7">
              <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft max-w-[16ch]">
                Most of these we can set up in the time it takes you to read this page.
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="font-display-serif italic text-ink-muted text-lg max-w-md leading-relaxed">
                Pick the experience; the concierge confirms; we hold a slot and a table.
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <LanternCTA href="/contact" label="Ask the concierge to set one up" />
            <LanternCTA href="/stay" label="Or just reserve a chamber" variant="ghost" />
          </div>
        </div>
      </section>
    </>
  );
}
