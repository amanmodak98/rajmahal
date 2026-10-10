import Image from "next/image";
import { HorizontalPan } from "@/components/motion/HorizontalPan";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { JaliPattern } from "@/components/primitives/JaliPattern";

export const metadata = {
  title: "Location",
  description:
    "On the Delhi-Dehradun highway, NH-73, at kilometre fifty-eight. Twelve kilometres from Haridwar. The town that holds us.",
};

const WAYPOINTS = [
  {
    year: "8c. AD",
    title: "The first town",
    body: "Roorkee began as the village stop on the pilgrim road to Haridwar. The Grand Trunk road brought its first trade.",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1400&auto=format&fit=crop&q=85",
  },
  {
    year: "1847",
    title: "Thomason College",
    body: "The British build an engineering college on the canal bank. The institution that becomes IIT Roorkee. The town's second trade.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1400&auto=format&fit=crop&q=85",
  },
  {
    year: "1950s",
    title: "NH-73 is laid",
    body: "The Delhi-Dehradun highway is built. The river check-post moves. Roorkee's role as a highway town crystallises.",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1400&auto=format&fit=crop&q=85",
  },
  {
    year: "1998",
    title: "Hotel Rajmahal opens",
    body: "Built for the highway traveller and the wedding host. Twenty-seven years of running the same kitchen.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&auto=format&fit=crop&q=85",
  },
  {
    year: "today",
    title: "The corridor quietens",
    body: "Pilgrim traffic has moved to the four-lane expressway. The hotel stays. The town's relation with the river keeps the kitchen honest.",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=1400&auto=format&fit=crop&q=85",
  },
];

export default function LocationPage() {
  return (
    <>
      <section className="relative min-h-[80dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <JaliPattern tone="paper" className="opacity-50" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24">
          <Pill variant="outline-gold" className="mb-8">The location · on NH-73</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[13ch] mb-10">
            The
            <br />
            <span className="italic font-normal text-ember">sacred mile.</span>
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            A thousand-year-old town on the Ganges corridor, six kilometres from Roorkee, sixty hours by car from Delhi. Scroll through five waypoints of its history.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <HorizontalPan>
        {WAYPOINTS.map((w, i) => (
          <article key={i} className="shrink-0 w-[90vw] lg:w-[60vw] h-[80vh] relative px-6 md:px-12 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1400px] w-full">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-6">
                  Waypoint {String(i + 1).padStart(2, "0")} · {w.year}
                </p>
                <h2 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft mb-6 max-w-[14ch]">
                  {w.title}
                </h2>
                <p className="font-display-serif italic text-ink-muted text-xl leading-relaxed max-w-md">
                  {w.body}
                </p>
              </div>
              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-[28px] overflow-hidden shadow-vanta">
                <Image
                  src={w.image}
                  alt={w.title}
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
            "We belong to the river, and to the road."
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep not-italic block mt-4">
              The desk, since 1998
            </span>
          </p>
        </article>
      </HorizontalPan>

      <PaherDivider tone="gold" />

      <section className="relative py-32 md:py-40 overflow-hidden border-t border-gold-rule bg-cream-warm">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <Pill variant="outline-gold" className="mb-6">From the door</Pill>
          <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft mb-12 max-w-3xl">
            Walk between the hotel and the river in twenty minutes.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              ["to IIT Roorkee", "5 min drive"],
              ["to Roorkee station", "8 min drive"],
              ["to Haridwar", "12 min drive"],
              ["to Dehradun", "70 min drive"],
            ].map(([where, how]) => (
              <div key={where} className="rounded-[24px] border border-gold-rule p-6 bg-cream">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">
                  {where}
                </p>
                <p className="font-display-serif text-2xl text-ink-soft">{how}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Pill variant="outline-gold" className="mb-8">Walk through</Pill>
          <h2 className="lede-roman text-[clamp(2.5rem,6vw,5rem)] text-ink-soft leading-[0.95] mb-10">
            The hotel that walked in.
            <br />
            <span className="italic font-normal text-ember">1998 still open at seven.</span>
          </h2>
          <LanternCTA href="/legacy" label="Read the legacy" />
        </div>
      </section>
    </>
  );
}
