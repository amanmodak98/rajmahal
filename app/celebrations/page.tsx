import Image from "next/image";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { FadeUp } from "@/components/motion/FadeUp";
import { events } from "@/lib/content";
import { JaliPattern } from "@/components/primitives/JaliPattern";

export const metadata = {
  title: "Celebrations",
  description:
    "Weddings, anniversaries, festivals and private soirees held at Hotel Rajmahal, Roorkee.",
};

const STATS = [
  { value: "314", label: "Weddings hosted" },
  { value: "27", label: "Years running" },
  { value: "1,000", label: "Largest seated" },
  { value: "4 halls", label: "Indoor + lawn" },
];

export default function CelebrationsPage() {
  return (
    <>
      <section className="relative min-h-[85dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=2400&auto=format&fit=crop&q=85"
            alt="A royal wedding at Hotel Rajmahal"
            fill
            priority
            sizes="100vw"
            className="cinematic object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-soft/30 via-ink-soft/45 to-parchment" aria-hidden="true" />
          <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
          <JaliPattern tone="paper" className="opacity-15" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">Celebrations</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-cream leading-[0.95] max-w-[14ch] mb-10">
            The night
            <br />
            <span className="italic font-normal text-gold-bright">they remember</span>
            <br />
            in ten years.
          </h1>
          <p className="font-display-serif italic text-cream/85 text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            Five formats, sixteen venues, three hundred and fourteen weddings held without a complaint to the Sarpanch.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* STATS */}
      <section className="relative py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08}>
                <div className="border-t border-gold-rule pt-6">
                  <p className="font-display-serif text-[clamp(3rem,6vw,5rem)] text-ember leading-none">
                    {s.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mt-3">
                    {s.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* EVENT CARDS */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <JaliPattern tone="paper" className="opacity-50" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-7">
              <Pill variant="outline-gold" className="mb-6">Five formats</Pill>
              <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft max-w-[16ch]">
                Pick the night. We assemble the rest.
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="font-display-serif italic text-ink-muted text-lg max-w-md leading-relaxed">
                Each format is a complete package. We can edit any line. We rarely do. The formats have been edited nine times in twenty-seven years.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {events.map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.05}>
                <article className="group grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-[28px] border border-gold-rule bg-cream-warm p-6 lg:p-8 items-center transition-colors duration-500 hover:border-ember hover:bg-cream hover:shadow-warm">
                  <div className="lg:col-span-4 relative aspect-[16/10] rounded-[20px] overflow-hidden">
                    <Image
                      src={e.image}
                      alt={e.name}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="cinematic object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-3">
                      {e.sanskrit}
                    </p>
                    <h3 className="lede-roman text-[clamp(1.75rem,3vw,2.5rem)] text-ink-soft mb-3 group-hover:text-ember transition-colors">
                      {e.name}
                    </h3>
                    <p className="font-body text-ink-muted text-base">{e.setting}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {e.inclusions.slice(0, 2).map((inc) => (
                        <li key={inc} className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted border border-gold-hairline px-3 py-1 rounded-full">
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-3 lg:border-l lg:border-gold-rule lg:pl-6 flex flex-col gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-quiet mb-1">Capacity</p>
                      <p className="font-display-serif text-lg text-ink-soft">{e.capacity}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-quiet mb-1">Tariff</p>
                      <p className="font-display-serif text-lg text-ember">{e.startingPrice}</p>
                    </div>
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
          <Pill variant="outline-gold" className="mb-8">A wedding ledger</Pill>
          <h2 className="lede-roman text-[clamp(2.5rem,6vw,5rem)] text-ink-soft leading-[0.95] mb-10">
            Three hundred and fourteen
            <br />
            <span className="italic font-normal text-ember">weddings.</span>
            <br />
            Zero complaints logged.
          </h2>
          <LanternCTA href="/contact" label="Speak to a planner" />
        </div>
      </section>
    </>
  );
}
