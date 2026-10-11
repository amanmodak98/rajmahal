"use client";

import Link from "next/link";
import { useRef } from "react";
import { brand, navigation } from "@/lib/content";
import { Wordmark } from "@/components/primitives/Wordmark";
import { useParallaxY } from "@/lib/useParallax";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const wordmarkTransform = useParallaxY(ref, 40);

  return (
    <footer
      ref={ref}
      className="relative mt-32 bg-night text-cream overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Site footer</h2>

      <div className="absolute inset-0 jali-night opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(14,9,8,0) 0%, rgba(14,9,8,0.4) 100%)",
      }} aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 pt-32 md:pt-48 pb-12">
        <div
          aria-hidden="true"
          className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none"
          style={{ transform: wordmarkTransform }}
        >
          <span className="font-display-serif text-[clamp(12rem,28vw,28rem)] leading-none text-gold/[0.06] tracking-tighter whitespace-nowrap">
            राज महल
          </span>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 lg:gap-10">
          <div className="md:col-span-4">
            <Wordmark size="lg" tone="gold" />
            <p className="font-display-serif italic text-cream/70 mt-6 max-w-sm text-lg leading-relaxed">
              Three addresses. One welcome. Sixty-two years of doing the same thing slowly, and getting better at it.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
              {brand.hindi} / since {brand.established}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/85 mb-5">
              Walk the palace
            </p>
            <ul className="space-y-3">
              {navigation.slice(0, 6).map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="font-display-serif text-lg text-cream/85 hover:text-gold transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/85 mb-5">
              Continue
            </p>
            <ul className="space-y-3">
              {navigation.slice(6).map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="font-display-serif text-lg text-cream/85 hover:text-gold transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/85 mb-5">
              Concierge
            </p>
            <ul className="space-y-5">
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-1">24h</p>
                <p className="font-display-serif text-xl text-gold">{brand.phone}</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-1">Email</p>
                <p className="font-display-serif text-lg text-cream/85 break-all">{brand.email}</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-1">The walk in</p>
                <p className="font-body text-sm text-cream/85 leading-relaxed">
                  Rampur, on the Delhi-Dehradun highway. From Roorkee, three minutes. From Delhi, a hundred and ninety kilometres. From the river, eleven.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-20 pt-8 border-t border-gold/15 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
            © {new Date().getFullYear()} {brand.latin} {brand.city}. All rites reserved.
          </p>
          <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
            <Link href="/journal" className="hover:text-gold transition-colors">Journal</Link>
            <Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
            Roorkee, Uttarakhand 247667
          </p>
        </div>
      </div>
    </footer>
  );
}
