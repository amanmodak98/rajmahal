import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/lib/content";
import { PageShell } from "@/components/shell/PageShell";
import { Grain } from "@/components/shell/Grain";

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
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts so the first paint does not pay the handshake cost. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Single request fetches all four families. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
