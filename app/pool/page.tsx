import Image from "next/image";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { Marquee } from "@/components/motion/Marquee";
import { FadeUp } from "@/components/motion/FadeUp";
import { amenities } from "@/lib/content";

export const metadata = {
  title: "Pool",
  description:
    "The rooftop swimming pool, the most photographed feature of the hotel. Open 06:00 to 21:00.",
};

export default function PoolPage() {
  return (
    <>
      <section className="relative min-h-[90dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540541338227-384006f1a5ed?w=2400&auto=format&fit=crop&q=85"
            alt="Rooftop swimming pool at Hotel Rajmahal"
            fill
            priority
            sizes="100vw"
            className="cinematic object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-soft/30 via-ink-soft/45 to-parchment" aria-hidden="true" />
          <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">The rooftop swimming pool · since 2022</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-cream leading-[0.95] max-w-[14ch] mb-10">
            Thirty degrees.
            <br />
            <span className="italic font-normal text-gold-bright">Even in January.</span>
          </h1>
          <p className="font-display-serif italic text-cream/85 text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            The rooftop pool is the hotel's most photographed feature, often noted as a Roorkee highlight. We hold the water at thirty. We warm the cabanas at sunset. We keep the pool open from six to twenty-one.
          </p>
        </div>
      </section>

      <section className="bg-cream-warm border-y border-gold-rule py-3 overflow-hidden">
        <Marquee duration={32}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 text-ink-muted font-display-serif italic text-2xl whitespace-nowrap">
              <span>06:00 to 21:00</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Heated to 30°C</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Cabanas warmers at sunset</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Twelve metres long</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
            </span>
          ))}
        </Marquee>
      </section>

      <PaherDivider tone="gold" />

      <EditorialSplit
        eyebrow="The brief"
        title={
          <>
            Build a pool that runs
            <br />
            <span className="italic font-normal text-ember">at thirty degrees</span>
            <br />
            in winter.
          </>
        }
        body={
          <>
            <p className="mb-6">
              Most rooftop pools in North India close from November to February. We refuse to. The water runs warm; the cabanas
              wear warmers; the lane line stays. The hotel got many thousand new guests the year the pool opened.
            </p>
            <p>
              We designed it with a single architect from Ahmedabad, and built it over the winter of 2021. The pool opens onto the
              Penthouse kitchen. A swim, then a meal, then a sleep.
            </p>
          </>
        }
        image="https://images.unsplash.com/photo-1572331165260-3596d04ae3ef?w=1800&auto=format&fit=crop&q=85"
        imageAlt="Rooftop pool at sunset"
        pill={
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
            <span>Six metres wide</span>
            <span className="h-px w-10 bg-gold-rule" />
            <span>Twelve metres long</span>
          </div>
        }
        cta={<LanternCTA href="/dining" label="After the swim, the kitchen" variant="ghost" />}
      />

      <PaherDivider tone="gold" />

      {/* AMENITIES ROLL */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-7">
              <Pill variant="outline-gold" className="mb-6">Beyond the pool</Pill>
              <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft max-w-[16ch]">
                The four amenities we run on the property.
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="font-display-serif italic text-ink-muted text-lg max-w-md leading-relaxed">
                Four small things. Each one rebuilt or refreshed within the last four years.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((a, i) => (
              <FadeUp key={a.name} delay={i * 0.06}>
                <article className="group grid grid-cols-12 gap-6 rounded-[28px] border border-gold-rule bg-cream-warm p-6 lg:p-8 h-full transition-colors duration-500 hover:border-ember hover:bg-cream hover:shadow-warm">
                  <div className="col-span-12 md:col-span-5 relative aspect-[5/4] rounded-[20px] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      sizes="(min-width:768px) 40vw, 100vw"
                      className="cinematic object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
                  </div>
                  <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                      {a.sanskrit}
                    </p>
                    <h3 className="lede-roman text-[clamp(1.5rem,3vw,2.25rem)] text-ink-soft leading-tight">
                      {a.name}
                    </h3>
                    <p className="font-body text-ink-muted leading-relaxed">
                      {a.body}
                    </p>
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
          <Pill variant="outline-gold" className="mb-8">The reservation desk</Pill>
          <h2 className="lede-roman text-[clamp(2.5rem,6vw,5rem)] text-ink-soft leading-[0.95] mb-10">
            The pool, the kitchen,
            <br />
            <span className="italic font-normal text-ember">and a chamber for the night.</span>
          </h2>
          <LanternCTA href="/stay" label="Reserve the stay" />
        </div>
      </section>
    </>
  );
}
