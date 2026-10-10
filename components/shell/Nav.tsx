"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navigation, brand } from "@/lib/content";
import { Wordmark } from "@/components/primitives/Wordmark";
import { EASE } from "@/lib/motion";

/**
 * Simple top-of-page glass-pill nav. All transforms are CSS-only.
 * Drawer uses AnimatePresence with an always-mounted children pattern to
 * avoid the `open && <X />` removeChild trap in React 19 strict mode.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-4 md:top-6 z-[60] px-4">
        <div className="mx-auto max-w-fit">
          <nav
            data-scrolled={scrolled ? "1" : "0"}
            className="
              nav-pill flex items-center gap-6 px-5 py-3 md:px-7 md:py-3.5
              rounded-full md:rounded-[22px]
              border bg-[rgba(244,236,220,0.62)]
              transition-[background-color,border-color,box-shadow,border-radius,padding] duration-500
            "
            style={{
              borderColor: scrolled ? "rgba(140,110,51,0.32)" : "rgba(140,110,51,0.20)",
              backgroundColor: scrolled ? "rgba(244,236,220,0.86)" : "rgba(244,236,220,0.62)",
              boxShadow: scrolled
                ? "0 18px 60px -20px rgba(14,9,8,0.20), inset 0 1px 0 rgba(255,255,255,0.6)"
                : "0 8px 30px -10px rgba(14,9,8,0.12)",
            }}
          >
            <Link href="/" className="flex items-center gap-3" aria-label={`${brand.latin} ${brand.city}, home`}>
              <Wordmark size="sm" tone="ink" />
            </Link>

            <ul className="hidden lg:flex items-center gap-1 ml-2">
              {navigation.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
                        active ? "text-gold-deep" : "text-ink-soft/70 hover:text-ink-soft",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-gold-deep" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/contact"
                className={[
                  "hidden md:inline-flex items-center gap-2 rounded-full border border-gold-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-deep",
                  "hover:bg-gold hover:border-gold hover:text-ink-soft transition-colors duration-500",
                ].join(" ")}
              >
                Concierge
                <span aria-hidden="true">→</span>
              </Link>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
                className="lg:hidden relative w-10 h-10 rounded-full border border-gold-rule flex items-center justify-center"
              >
                <span aria-hidden="true" className="relative w-4 h-3 block">
                  <motion.span
                    className="absolute left-0 right-0 h-px bg-gold-deep block"
                    animate={{ top: open ? "50%" : "0%", rotate: open ? 45 : 0, y: open ? -1 : 0 }}
                    transition={{ duration: 0.45, ease: EASE.imperial }}
                  />
                  <motion.span
                    className="absolute left-0 right-0 h-px bg-gold-deep block"
                    animate={{ top: open ? "50%" : "100%", rotate: open ? -45 : 0, y: open ? -1 : 0 }}
                    transition={{ duration: 0.45, ease: EASE.imperial }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="nav-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.parchment }}
            className="fixed inset-0 z-[55] bg-parchment/95 backdrop-blur-3xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              key="nav-drawer-card"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE.parchment }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-4 top-24 rounded-[28px] border border-gold-rule bg-cream-warm/90 backdrop-blur-3xl overflow-hidden"
            >
              <div className="absolute inset-0 jali-soft opacity-60 pointer-events-none" aria-hidden="true" />
              <div className="relative p-8 flex flex-col h-full">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-deep mb-6">
                  The Maharaja, a chamber menu
                </p>
                <ul className="flex flex-col gap-3">
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.55, ease: EASE.parchment }}
                    >
                      <Link
                        href={item.href}
                        className="block font-display-serif text-3xl text-ink-soft hover:text-gold-deep transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 border-t border-gold-hairline">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft/45 mb-2">
                    Concierge
                  </p>
                  <p className="font-display-serif text-lg text-gold-deep">
                    {brand.phone}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
