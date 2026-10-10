import Image from "next/image";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { RoomCard } from "@/components/sections/RoomCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { JaliPattern } from "@/components/primitives/JaliPattern";
import { rooms, hotel } from "@/lib/content";

export const metadata = {
  title: "Rooms",
  description:
    "Fifty-four rooms across four typologies. Heritage Suite, Executive, Deluxe, Family. The hotel's quietest addresses.",
};

export default function RoomsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0">
          <Image
            src={hotel.hero}
            alt="Hotel Rajmahal, NH-73 Rampur, Roorkee"
            fill
            sizes="100vw"
            priority
            className="cinematic object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-soft/30 via-ink-soft/45 to-parchment" aria-hidden="true" />
          <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">Fifty-four chambers · since 1998</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-cream leading-[0.95] max-w-[14ch] mb-10">
            Four typologies.
            <br />
            <span className="italic font-normal text-gold-bright">One welcome.</span>
          </h1>
          <p className="font-display-serif italic text-cream/85 text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            National Highway 73, six kilometres from Roorkee. Forty-eight rooms held every night, on average.
            Twenty-three hours before you arrive, we dial your number to confirm.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* BENTO  -  rooms */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-7">
              <Pill variant="outline-gold" className="mb-6">Six rooms in play</Pill>
              <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft max-w-[16ch]">
                A chamber for the way you travel.
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="font-display-serif italic text-ink-muted text-lg max-w-md leading-relaxed">
                Hover any card to read its character. Click for tariff, the view it opens onto, and the inclusions.
              </p>
            </div>
          </div>
          <BentoGrid
            items={rooms.map((room, i) => {
              const sizes = [
                { span: "8" as const, rowSpan: "2" as const },
                { span: "4" as const },
                { span: "6" as const },
                { span: "6" as const },
                { span: "4" as const },
                { span: "8" as const },
              ];
              return {
                span: sizes[i].span,
                rowSpan: sizes[i].rowSpan,
                content: <RoomCard room={room} />,
              };
            })}
          />
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* INCLUSIONS */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <JaliPattern tone="paper" className="opacity-50" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Pill variant="outline-gold" className="mb-6">Included in every chamber</Pill>
              <h2 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft max-w-[14ch]">
                The small things that earn five stars without us asking.
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                ["Air-conditioning throughout", "Climate-controlled in every room, even the coldest January night."],
                ["Flat-screen television", "Multi-channel satellite, eighty-seven channels in seven languages."],
                ["Complimentary Wi-Fi", "Fibre to every room, no cap. The doorman remembers the password."],
                ["Cotton dhurries", "Hand-loomed by the district cooperative. The same ones for twenty-seven years."],
                ["Marble bathrooms", "Quarried in Rajsamand. Cool in summer, warm underfoot in winter."],
                ["Complimentary breakfast", "A four-bowl thali. Served between seven and ten."],
              ].map(([title, body], i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <h3 className="font-display-serif text-2xl text-ember mb-2">{title}</h3>
                  <p className="font-body text-ink-muted leading-relaxed">{body}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* CHECK IN */}
      <section className="relative py-32 md:py-40 overflow-hidden border-t border-gold-rule bg-cream-warm">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Pill variant="outline-gold" className="mb-8">House convenience</Pill>
          <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft leading-[0.95] mb-10">
            Check-in from twelve.
            <br />
            <span className="italic font-normal text-ember">Check-out at eleven.</span>
          </h2>
          <p className="font-display-serif italic text-ink-muted text-xl leading-relaxed max-w-xl mx-auto mb-12">
            Early arrivals are welcome. Late departures on request, free of charge where possible. The desk is open for both.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LanternCTA href="/stay" label="Reserve a chamber" />
            <LanternCTA href="/contact" label="Speak to the concierge" variant="ghost" />
          </div>
        </div>
      </section>
    </>
  );
}
