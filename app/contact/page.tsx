import Image from "next/image";
import Link from "next/link";
import { PaherDivider } from "@/components/primitives/PaherDivider";
import { Pill } from "@/components/primitives/Pill";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { FormBoundary } from "@/components/shell/FormBoundary";
import { FadeUp } from "@/components/motion/FadeUp";
import { JaliPattern } from "@/components/primitives/JaliPattern";
import { hotel, brand } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Concierge hours: twenty-four hours. Average reply: twelve minutes.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[70dvh] flex items-end overflow-hidden pt-24 md:pt-32">
        <JaliPattern tone="paper" className="opacity-50" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pb-16 pt-20 md:pb-20 md:pt-24 w-full">
          <Pill variant="outline-gold" className="mb-8">The concierge desk</Pill>
          <h1 className="lede-roman text-[clamp(3rem,9vw,8rem)] text-ink-soft leading-[0.95] max-w-[14ch] mb-10">
            Speak to
            <br />
            <span className="italic font-normal text-ember">a real person.</span>
          </h1>
          <p className="font-display-serif italic text-ink-muted text-[clamp(1.25rem,2vw,1.5rem)] max-w-2xl leading-relaxed">
            Concierge hours: twenty-four hours. Average reply: twelve minutes.
          </p>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* Single hotel card */}
      <section className="relative py-16 md:py-32">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <FadeUp>
            <article className="group relative rounded-[28px] border border-gold-rule bg-cream-warm overflow-hidden">
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image
                  src={hotel.hero}
                  alt={hotel.name}
                  fill
                  sizes="(min-width:768px) 80vw, 100vw"
                  className="cinematic object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream-warm to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 vignette-warm" aria-hidden="true" />
                <div className="absolute top-6 left-6 rounded-full bg-cream/85 backdrop-blur-md border border-gold-rule px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
                  Hotel · since {hotel.founded}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 lg:p-12">
                <div className="md:col-span-7">
                  <h2 className="lede-roman text-4xl lg:text-5xl text-ink-soft mb-3">{hotel.name}</h2>
                  <p className="font-display-serif italic text-gold-deep text-xl mb-6">{hotel.star}</p>
                  <p className="font-body text-ink-muted max-w-xl leading-relaxed">
                    On the Delhi-Dehradun highway, NH-73, at Rampur. Twenty-seven years of running the kitchen for the highway traveller and the wedding host.
                  </p>
                </div>
                <div className="md:col-span-5 lg:border-l lg:border-gold-rule lg:pl-8 grid grid-cols-1 gap-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold-deep mb-1">Phone</p>
                    <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="font-display-serif text-xl text-ember hover:text-gold-deep transition-colors">
                      {brand.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold-deep mb-1">Email</p>
                    <a href={`mailto:${brand.email}`} className="font-body text-sm text-ink-soft hover:text-ember transition-colors break-all">
                      {brand.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold-deep mb-1">Address</p>
                    <p className="font-body text-sm text-ink-soft">{hotel.address}, {hotel.cityLine}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold-deep mb-1">Hours</p>
                    <p className="font-body text-sm text-ink-soft">Check-in {hotel.checkIn} · Check-out {hotel.checkOut}</p>
                  </div>
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* Contact form */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Pill variant="outline-gold" className="mb-6">Or write here</Pill>
              <h2 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft mb-6 max-w-[14ch]">
                The concierge replies. Always.
              </h2>
              <p className="font-display-serif italic text-ink-muted text-lg leading-relaxed max-w-md">
                We reply within four hours during the day. We reply within twelve at night. We are not a chatbot.
              </p>
              <div className="mt-10 pt-8 border-t border-gold-rule">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-2">Direct concierge</p>
                <p className="font-display-serif text-3xl text-ink-soft">{brand.phone}</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <FormBoundary className="space-y-5 rounded-[28px] border border-gold-rule bg-cream-warm p-8 md:p-10 shadow-warm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">First name</span>
                    <input className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-display-serif text-lg text-ink-soft focus:border-ember focus:outline-none transition-colors" type="text" name="firstName" required />
                  </label>
                  <label>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">Last name</span>
                    <input className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-display-serif text-lg text-ink-soft focus:border-ember focus:outline-none transition-colors" type="text" name="lastName" required />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">Phone</span>
                    <input className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-display-serif text-lg text-ink-soft focus:border-ember focus:outline-none transition-colors" type="tel" name="phone" />
                  </label>
                  <label>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">Email</span>
                    <input className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-display-serif text-lg text-ink-soft focus:border-ember focus:outline-none transition-colors" type="email" name="email" required />
                  </label>
                </div>
                <label>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">Subject</span>
                  <select className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-display-serif text-lg text-ink-soft focus:border-ember focus:outline-none transition-colors" name="subject" defaultValue="reservation">
                    <option value="reservation">A reservation</option>
                    <option value="wedding">A wedding or event</option>
                    <option value="dining">A meal at the Penthouse</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">Tell us, plainly</span>
                  <textarea
                    className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-body text-base text-ink-soft focus:border-ember focus:outline-none transition-colors resize-none"
                    name="message"
                    rows={5}
                    placeholder="What are you planning? Dates, guests, dietary notes, anything."
                  />
                </label>
                <div className="flex justify-end">
                  <LanternCTA type="submit" label="Send to the concierge" />
                </div>
              </FormBoundary>
            </div>
          </div>
        </div>
      </section>

      <PaherDivider tone="gold" />

      {/* Map */}
      <section className="relative py-20 md:py-32 overflow-hidden border-t border-gold-rule bg-cream-warm">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
          <Pill variant="outline-gold" className="mb-6">Walk between</Pill>
          <h2 className="lede-roman text-[clamp(2rem,5vw,4rem)] text-ink-soft mb-12 max-w-3xl">
            The hotel, twelve kilometres from Haridwar.
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
    </>
  );
}
