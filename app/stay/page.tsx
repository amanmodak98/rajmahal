import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { RoomCard } from "@/components/sections/RoomCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { rooms } from "@/lib/content";

export const metadata = {
  title: "Reserve",
  description: "Four steps. Four hours to a phone call. No card required at this step.",
};

export default function StayPage() {
  return (
    <>
      <section className="relative min-h-[70dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24 w-full">
          <Pill variant="outline-gold" className="mb-8">Reserve</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[14ch] mb-10">
            Four steps.
            <br />
            <span className="italic font-normal text-ember">Four hours</span>
            <br />
            to a phone call.
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            No card required at this step. We hold nothing until the concierge confirms on the phone.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <section className="relative py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <ReservationForm />
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* Room picker */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-7">
              <Pill variant="outline-gold" className="mb-6">Choose a chamber</Pill>
              <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft max-w-[16ch]">
                Four typologies. Tap any card to read more.
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="font-display-serif italic text-ink-muted text-lg max-w-md leading-relaxed">
                On hover, the card turns. Back side: inclusions, view, and the nightly tariff.
              </p>
            </div>
          </div>
          <BentoGrid
            items={rooms.map((room, i) => ({
              span: i === 0 ? "8" : i === 1 ? "4" : i === 2 ? "6" : "6",
              rowSpan: i % 2 === 0 ? "2" : undefined,
              content: <RoomCard room={room} />,
            }))}
          />
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* Policies */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <Pill variant="outline-gold" className="mb-6">House rules</Pill>
          <h2 className="lede-roman text-[clamp(1.75rem,3vw,2.5rem)] text-ink-soft mb-10 max-w-[20ch]">
            Brief. Kind. Not everything is negotiable.
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              ["Check-in", "From twelve. We will hold a chamber from eleven if you arrive early."],
              ["Check-out", "Until eleven. Late check-out on request, free of charge where possible."],
              ["Children", "Up to two children under eight stay without charge."],
              ["Pets", "The grounds hold four pet-friendly rooms. Cat and dog welcome."],
              ["Smoking", "The garden holds a designated clay court. No smoking in chambers."],
              ["Quiet hours", "From 22:00. Posted on the inside of every door."],
            ].map(([term, def], i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="border-t border-gold-rule pt-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-2">{term}</dt>
                  <dd className="font-display-serif text-lg text-ink-soft leading-snug">{def}</dd>
                </div>
              </FadeUp>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
