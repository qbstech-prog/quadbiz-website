import type { Metadata } from "next";
import { Inter } from "next/font/google";

import FloatingButtons from "@/components/FloatingButtons";
import { localBusinessSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/lib/site";

import "./globals.css";

// Inter — the single typeface for everything (headings, titles, body, UI).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Solar Company in Madurai | Quadbiz Solar Solutions",
    template: "%s | Quadbiz Solar Solutions",
  },
  description:
    "Quadbiz Solar Solutions installs rooftop, commercial and agricultural solar across Tamil Nadu. MNRE registered, end-to-end in-house. Get a free quote in Madurai.",
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: SITE_URL,
    title: "Solar Company in Madurai | Quadbiz Solar Solutions",
    description:
      "Rooftop, commercial and agricultural solar across Tamil Nadu. MNRE registered, end-to-end in-house. Get a free quote.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Company in Madurai | Quadbiz Solar Solutions",
    description:
      "Rooftop, commercial and agricultural solar across Tamil Nadu. MNRE registered, end-to-end in-house.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body>
        {/* Progressive enhancement: mark JS available so scroll-reveal styles
            only hide content when JS can reveal it (no-JS users see everything). */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {/* Site-wide LocalBusiness structured data. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />

        {/*
          Header/Footer live in the (site) route-group layout so the (landing)
          group (Contact) can be navigation-free. FloatingButtons stay global —
          WhatsApp + call are conversion aids on every page.
        */}
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
