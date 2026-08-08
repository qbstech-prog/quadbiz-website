import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import { localBusinessSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
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
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {/* Site-wide LocalBusiness structured data. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />

        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
