import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/content";
import { PageShell } from "@/components/shell/PageShell";
import { Grain } from "@/components/shell/Grain";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

// Self-host Tiro Devanagari via Google CSS.
// To stay compliant with `next/font` we use a Devanagari serif here for the brand lockup:
//   Noto Serif Devanagari via next/font, used as the heritage Hindi display face.
import { Noto_Serif_Devanagari } from "next/font/google";
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajmahalroorkee.in"),
  title: {
    default: `${brand.latin} ${brand.city} - ${brand.tagline}`,
    template: `%s | ${brand.latin} ${brand.city}`,
  },
  description:
    `${brand.latin} ${brand.city} is a sixty-two-year hospitality family ` +
    `of three addresses: a heritage highway hotel, a Clarks Inn business sanctuary, ` +
    `and eight acres of banquet grounds. A kitchen that does not bend to a deadline.`,
  keywords: [
    "Raj Mahal Roorkee",
    "Hotel Rajmahal Civil Lines",
    "Rajmahal Clarks Inn Ramnagar",
    "Rajmahal Farm House Shanthipuram",
    "Roorkee wedding venue",
    "Roorkee banquet hall",
    "Mughlai restaurant Roorkee",
    "Rajasthani food Roorkee",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${brand.latin} ${brand.city}`,
    description: brand.tagline,
    siteName: `${brand.latin} ${brand.city}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cormorant.variable} ${jetbrainsMono.variable} ${notoSerifDevanagari.variable}`}
    >
      <body
        className="min-h-[100dvh] bg-parchment text-ink antialiased overflow-x-clip"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-ember focus:text-cream focus:px-4 focus:py-2 focus:rounded-full focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.18em]"
        >
          Skip to main content
        </a>
        <PageShell>
          <main id="main" className="relative">
            {children}
          </main>
        </PageShell>
        <Grain />
      </body>
    </html>
  );
}
