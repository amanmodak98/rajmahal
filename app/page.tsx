import { CurtainReveal } from "@/components/motion/CurtainReveal";
import { Marquee } from "@/components/motion/Marquee";
import { FadeUp } from "@/components/motion/FadeUp";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { TestimonialPair } from "@/components/sections/TestimonialPair";
import { ManifestoBlock } from "@/components/sections/ManifestoBlock";
import { MapThree } from "@/components/sections/MapThree";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { JaliPattern } from "@/components/primitives/JaliPattern";
import { brand, rooms, testimonials, hotel } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO  -  Palace Doors */}
      <CurtainReveal height="min-h-[100dvh]">
        <div className="relative text-center max-w-5xl px-4">
          <div className="curtain-lotus absolute left-1/2 -translate-x-1/2 -top-32 md:-top-44 pointer-events-none" aria-hidden="true">
            <LotusMotif />
          </div>

          <Pill variant="outline-gold" className="relative z-10 mb-8">
            <span>The Palace Doors</span>
            <span className="opacity-70">·</span>
            <span className="font-display-hindi">{brand.city}</span>
          </Pill>

          <h1 className="font-display-serif text-ink-soft leading-[0.92] tracking-[-0.04em] text-[clamp(3rem,9vw,8.5rem)] relative z-10">
            <span className="reveal-line block">{brand.hindi}</span>
            <span className="reveal-line block lede-roman italic mt-2 text-[clamp(2rem,5vw,4rem)] font-light text-ember">
              Raj Mahal
            </span>
          </h1>

          <p className="reveal-line font-display-serif italic text-ink-muted text-[clamp(1.125rem,2vw,1.5rem)] mt-10 max-w-2xl mx-auto leading-relaxed">
            A highway hotel at kilometre fifty-eight on NH-73. Heritage wing, rooftop pool, the Penthouse kitchen at sunset.
          </p>

          <div className="reveal-line mt-14 flex flex-wrap items-center justify-center gap-4">
            <LanternCTA href="/stay" label="Reserve a chamber" />
            <LanternCTA href="/legacy" label="Walk the legacy" variant="ghost" />
          </div>

          <ul className="reveal-line curtain-stat mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            {[
              { k: "since", v: "1998" },
              { k: "rooms", v: "54" },
              { k: "km", v: "12 to Haridwar" },
              { k: "rate", v: "from 1,900 / night" },
            ].map((s) => (
              <li key={s.k} className="border-t border-gold-rule pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold-deep">{s.k}</p>
                <p className="font-display-serif text-xl mt-2 text-ink-soft">{s.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </CurtainReveal>

      {/* Three pillars show as a strip, with the brand seal */}
      <section className="relative border-y border-gold-rule bg-cream-warm">
        <Marquee duration={44}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 text-ink-muted font-display-serif text-2xl whitespace-nowrap italic">
              <span>The Penthouse</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Rooftop swimming pool</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Banquet lawns for one thousand</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Concierge, twenty-four hours</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* CHAPTER ONE  -  three "what we are" cards, recomposed from a generic bento */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <JaliPattern tone="paper" className="opacity-60" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6">
              <Pill variant="outline-gold" className="mb-8">Three things the hotel does well</Pill>
              <h2 className="lede-roman text-[clamp(2.5rem,6vw,5.5rem)] text-ink-soft max-w-[12ch]">
                Highway stop.
                <br />
                <span className="italic font-normal text-ember">Heritage linger.</span>
                <br />
                Wedding rally.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] leading-relaxed max-w-xl">
                Three jobs, all done in this one building. A road-stop that does not feel rushed. A heritage stay that remembers the Ganges corridor. A wedding lawn for a thousand.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
            {[
              {
                tag: "I · Highway",
                title: "Stop for the night.",
                body: "Twenty-seven years of taking the Delhi-to-Dehradun traveller. Tea at three, food at midnight, a room for the morning.",
                href: "/rooms",
              },
              {
                tag: "II · Heritage",
                title: "Stay the week.",
                body: "The Heritage Suite has its own butler. The Penthouse opens at sunset. The pool runs warm, even in January.",
                href: "/dining",
              },
              {
                tag: "III · Weddings",
                title: "Host the rally.",
                body: "One thousand seated on the lawns and indoors. Three hundred and fourteen weddings. No complaints logged with the Sarpanch.",
                href: "/celebrations",
              },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <Link
                  href={card.href}
                  className="group block rounded-[28px] border border-gold-rule bg-cream p-8 lg:p-10 h-full transition-all duration-500 hover:border-ember hover:-translate-y-1 shadow-warm"
                  data-cursor="hover"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-12">
                    {card.tag}
                  </p>
                  <h3 className="font-display-serif text-ink-soft text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="font-body text-ink-muted leading-relaxed">
                    {card.body}
                  </p>
                  <div className="mt-12 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
                      Walk in
                    </span>
                    <span className="inline-flex items-center gap-2 text-ember transition-transform duration-500 group-hover:translate-x-1">
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* CHAPTER TWO  -  Editorial split (the Penthouse) */}
      <EditorialSplit
        eyebrow="The Penthouse"
        title={
          <>
            The kitchen runs.
            <br />
            <span className="italic font-normal text-ember">Even at three.</span>
          </>
        }
        body={
          <>
            <p className="mb-6">
              The Penthouse has served its last meal at twenty-three hundred hours, thirteen thousand times in twenty-seven years. The chef has not missed one.
            </p>
            <p>
              We hold the tandoor warm through the night. We hold the espresso from six. The Penthouse is open; the kitchen that lives below is open; the night desk that lives below that is open. The hotel does not sleep.
            </p>
          </>
        }
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=85"
        imageAlt="The Penthouse rooftop restaurant at Hotel Rajmahal"
        pill={
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
            <span>07:00 to 23:00</span>
            <span className="h-px w-10 bg-gold-rule" />
            <span>Ninety-six seats</span>
          </div>
        }
        cta={<LanternCTA href="/dining" label="Read the kitchen" variant="ghost" />}
      />

      {/* CHAPTER THREE  -  Manifesto */}
      <ManifestoBlock
        eyebrow="A note from the desk"
        bg="cream-warm"
        lines={[
          "We do not change the menu.",
          "We make the menu legible.",
          "We do not move the doorman.",
          "We remember what he said.",
          "We do not change the carpools.",
          "We hold the car on the platform.",
        ]}
        caption={<>The concierge desk, twenty-four hours, since 1998.</>}
      />

      <PaherDivider tone="gold" />

      {/* CHAPTER FOUR  -  Testimonials */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-7">
              <Pill variant="outline-gold" className="mb-8">Guest ledger</Pill>
              <h2 className="lede-roman text-[clamp(2rem,5vw,4.5rem)] text-ink-soft">
                What the books remember.
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="font-display-serif italic text-ink-muted text-lg max-w-md">
                We keep a guest ledger at the desk, since the opening year. These four are the ones our staff still quote.
              </p>
            </div>
          </div>
          <TestimonialPair left={testimonials[0]} right={testimonials[1]} />
          <div className="mt-16">
            <TestimonialPair left={testimonials[2]} right={testimonials[3]} />
          </div>
        </div>
      </section>

      {/* CHAPTER FIVE  -  Map */}
      <section className="relative py-32 md:py-40 overflow-hidden border-y border-gold-rule bg-cream-warm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
          <Pill variant="outline-gold" className="mb-8">Where to find us</Pill>
          <h2 className="lede-roman text-[clamp(2rem,5vw,4.5rem)] text-ink-soft mb-12 max-w-3xl">
            Roorkee, twelve kilometres from Haridwar.
          </h2>
          <MapThree />
        </div>
      </section>

      {/* CHAPTER SIX  -  Closing CTA */}
      <section className="relative py-40 md:py-56 overflow-hidden">
        <div className="absolute inset-0 jali-paper opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(138,26,26,0.10) 0%, transparent 60%)" }} aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Pill variant="outline-gold" className="mb-10">The doors are open</Pill>
          <h2 className="lede-roman text-[clamp(2.5rem,7vw,6.5rem)] text-ink-soft leading-[0.95]">
            Come in
            <br />
            <span className="italic font-normal text-ember">as a guest.</span>
            <br />
            Leave as family.
          </h2>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <LanternCTA href="/stay" label="Reserve a chamber" />
            <LanternCTA href="/contact" label="Speak to the concierge" variant="ghost" />
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * A Mughal lotus motif, drawn inline as SVG. Renders behind the hero headline
 * and gently rotates as the doors open.
 */
function LotusMotif() {
  return (
    <svg
      width="640"
      height="640"
      viewBox="0 0 640 640"
      fill="none"
      style={{ width: "min(60vw, 640px)", height: "min(60vw, 640px)" }}
    >
      <defs>
        <radialGradient id="lotusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,154,75,0.18)" />
          <stop offset="100%" stopColor="rgba(194,154,75,0)" />
        </radialGradient>
      </defs>
      <circle cx="320" cy="320" r="280" fill="url(#lotusGrad)" />
      <g stroke="rgba(154,117,48,0.30)" strokeWidth="0.9" fill="none">
        <circle cx="320" cy="320" r="260" />
        <circle cx="320" cy="320" r="200" />
        <circle cx="320" cy="320" r="140" />
        <circle cx="320" cy="320" r="80" />
      </g>
      {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180].map((deg) => (
        <line
          key={deg}
          x1="320"
          y1="60"
          x2="320"
          y2="580"
          transform={`rotate(${deg}, 320, 320)`}
          stroke="rgba(154,117,48,0.18)"
          strokeWidth="0.6"
        />
      ))}
      {/* 16 lotus petal points */}
      {Array.from({ length: 16 }).map((_, i) => {
        const deg = (i * 360) / 16;
        return (
          <path
            key={i}
            d="M320 60 L338 110 L320 160 L302 110 Z"
            transform={`rotate(${deg}, 320, 320)`}
            stroke="rgba(154,117,48,0.28)"
            strokeWidth="0.7"
            fill="rgba(194,154,75,0.08)"
          />
        );
      })}
    </svg>
  );
}
