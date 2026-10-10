import Image from "next/image";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { MenuPanel } from "@/components/sections/MenuPanel";
import { FadeUp } from "@/components/motion/FadeUp";
import { Marquee } from "@/components/motion/Marquee";
import { JaliPattern } from "@/components/primitives/JaliPattern";
import { dining } from "@/lib/content";

export const metadata = {
  title: "The Penthouse",
  description:
    "The rooftop restaurant at Hotel Rajmahal. Multi-cuisine, ninety-six seats, the closest seat to the foothills on the corridor.",
};

export default function DiningPage() {
  return (
    <>
      <section className="relative min-h-[85dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&auto=format&fit=crop&q=85"
            alt="The Penthouse rooftop restaurant, Hotel Rajmahal"
            fill
            priority
            sizes="100vw"
            className="cinematic object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-soft/40 via-ink-soft/55 to-parchment" aria-hidden="true" />
          <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">The Penthouse · since 2009</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-cream leading-[0.95] max-w-[14ch] mb-10">
            Roof.
            <br />
            <span className="italic font-normal text-gold-bright">Kitchen.</span>
            <br />
            Sky.
          </h1>
          <p className="font-display-serif italic text-cream/85 text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            Ninety-six seats on the hotel roof. Multi-cuisine. North Indian, Chinese, Continental.
            The only open kitchen in town with a sight-line to the foothills.
          </p>
        </div>
      </section>

      <section className="bg-cream-warm border-y border-gold-rule py-3 overflow-hidden">
        <Marquee duration={36}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 text-ink-muted font-display-serif italic text-2xl whitespace-nowrap">
              <span>Dal-e-Maa · smoked overnight</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Bezawada biryani · single-dum</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Hakka chilli chicken · wok-tossed</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
              <span>Saffron risotto · Persian saffron</span>
              <span className="h-1 w-1 rounded-full bg-ember inline-block" />
            </span>
          ))}
        </Marquee>
      </section>

      <PaherDivider tone="gold" />

      {/* MENU PANEL */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1300px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <FadeUp>
            <Pill variant="outline-gold" className="mb-6">The menu, by chapter</Pill>
          </FadeUp>
          <FadeUp>
            <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft mb-16 max-w-[14ch]">
              Six chapters. Most diners read three.
            </h2>
          </FadeUp>
          <MenuPanel />
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* TWO ROOMS  -  the Penthouse and the Café */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[dining.penthouse, dining.cafe].map((d) => (
              <FadeUp key={d.name}>
                <article className="rounded-[28px] border border-gold-rule bg-cream-warm p-10 h-full flex flex-col gap-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                    {d.hours === "Always" ? "Open 24 hours" : d.hours}
                  </p>
                  <h3 className="lede-roman text-[clamp(2rem,4vw,3rem)] text-ink-soft">
                    {d.name}
                  </h3>
                  <p className="font-display-serif italic text-gold-deep text-2xl">
                    {d.tagline}
                  </p>
                  <p className="font-body text-ink-muted leading-relaxed flex-1">
                    {d.concept}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
                    {d.seats} seats
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* KITCHEN STORY */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <JaliPattern tone="paper" className="opacity-50" />
        <div className="relative max-w-[1300px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Pill variant="outline-gold" className="mb-6">The kitchen door</Pill>
              <h2 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft mb-6 max-w-[14ch]">
                Where the head chef has spent eighteen of his years.
              </h2>
              <p className="font-display-serif italic text-ink-muted text-lg leading-relaxed max-w-md mb-6">
                The Penthouse kitchen is open to guests who ask to be shown around. We do this often. The kitchen is honest in a way that a menu is not.
              </p>
              <LanternCTA href="/contact" label="Book a kitchen tour" variant="ghost" />
            </div>
            <div className="lg:col-span-7 relative aspect-[5/4] rounded-[28px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1800&auto=format&fit=crop&q=85"
                alt="A chef plating a slow-cooked dish at The Penthouse"
                fill
                sizes="(min-width:1024px) 60vw, 100vw"
                className="cinematic object-cover"
              />
              <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
