import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  IndianRupee,
  ShieldCheck,
  MapPin,
  Home as HomeIcon,
  Building2,
  Sprout,
  ClipboardCheck,
  FileText,
  Wrench,
  Zap,
  Phone,
  BadgeCheck,
  Check,
} from "lucide-react";

import BrandMarquee from "@/components/BrandMarquee";
import FeatureGrid from "@/components/FeatureGrid";
import LeadForm from "@/components/LeadForm";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import StatsStrip from "@/components/StatsStrip";
import ReviewsSection from "@/components/ReviewsSection";
import { SITE_URL, absoluteUrl, site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Solar Company in Madurai | Quadbiz Solar Solutions" },
  description:
    "MNRE-registered solar installer in Madurai. End-to-end rooftop, commercial & agricultural solar across Tamil Nadu. 25-yr panel warranty. Get a free quote.",
  alternates: { canonical: "/" },
};

// WebSite schema (LocalBusiness lives once in the root layout — not duplicated here).
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: site.name,
  url: absoluteUrl("/"),
};

const whyChoose = [
  {
    icon: Handshake,
    title: "All Under One Roof",
    body: "Paperwork to civil work to installation, handled fully in-house. No middlemen, no runaround.",
  },
  {
    icon: IndianRupee,
    title: "Competitive Local Pricing",
    body: "Fair, transparent Madurai pricing with no hidden costs.",
  },
  {
    icon: ShieldCheck,
    title: "Long Warranties",
    body: "25 years on panels, 10 years on inverters. Built to last decades.",
  },
  {
    icon: MapPin,
    title: "Local Service",
    body: "A Madurai team that answers the phone and shows up. Fast support, always nearby.",
  },
];

const services = [
  {
    icon: HomeIcon,
    title: "Residential Rooftop Solar",
    body: "Cut your home electricity bill to near-zero. On-grid, off-grid & hybrid systems.",
    href: "/services/residential-rooftop-solar",
  },
  {
    icon: Building2,
    title: "Commercial & Industrial Solar",
    body: "Slash operating costs and power your business with clean energy.",
    href: "/services/commercial-solar",
  },
  {
    icon: Sprout,
    title: "Agricultural Solar",
    body: "Solar water pumps and farm power under PM-KUSUM.",
    href: "/services/agricultural-solar",
  },
];

const steps = [
  {
    icon: ClipboardCheck,
    title: "Free Site Survey",
    body: "We assess your roof/site, shading and consumption.",
  },
  {
    icon: FileText,
    title: "Custom Proposal & Subsidy",
    body: "System design, savings estimate, and subsidy paperwork.",
  },
  {
    icon: Wrench,
    title: "Installation & Civil Work",
    body: "Our in-house team installs everything, cleanly and safely.",
  },
  {
    icon: Zap,
    title: "Net Metering & Switch-On",
    body: "We handle TANGEDCO net metering and hand you a running system.",
  },
];


export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Section 1 — Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-navy md:min-h-[640px]">
        {/* Full-bleed hero photo — the LCP element, eager (priority), object-cover.
            Crop biased toward the roof so the text column sits over darker pixels.
            next/image serves an optimized AVIF/WebP. */}
        <Image
          src="/hero/hero-solar-installation.png"
          alt="Solar panel installation on a rooftop in Madurai by Quadbiz"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_88%]"
        />
        {/* Directional dark overlay: strong on the left behind the text, fading
            right so the panels/house stay visible. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.68) 45%, rgba(0,0,0,0.34) 70%, rgba(0,0,0,0.08) 100%)",
          }}
        />
        {/* Overall darken — much stronger on mobile (full-width text) so every hero
            string keeps AA contrast; light on desktop where the gradient carries it. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/60 sm:bg-black/14" />

        <div className="relative z-10 mx-auto w-full max-w-container px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="max-w-2xl">
            {/*
              SAVINGS-CLAIM NOTE: "up to 90%" is a bold savings claim — confirm it
              is defensible (real customer data / a typical commercial case) before
              publishing; otherwise soften (e.g. "significantly cut your bills").
            */}
            <h1 className="text-h1 font-semibold text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Solar Panel Installation in Madurai —{" "}
              <span className="text-glow">Cut Your Electricity Bills by up to 90%</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg font-medium text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
              Free site survey in Madurai · MNRE assistance · 25-year panel warranty
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={telHref} className="btn-primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 px-7 py-3 font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                Get Free Quote
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
              <li className="inline-flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 flex-shrink-0 text-glow" aria-hidden="true" />
                MNRE Registered
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-glow" aria-hidden="true" />
                25-Year Warranty
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 text-glow" aria-hidden="true" />
                Headquartered: Madurai, TN
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 2 — Why Quadbiz */}
      {/* ---------------------------------------------------------------- */}
      <Section surface="grey">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Why Choose Quadbiz</h2>
        </Reveal>
        <FeatureGrid
          columns={4}
          items={whyChoose.map((item) => ({
            icon: <item.icon className="h-6 w-6" aria-hidden="true" />,
            title: item.title,
            body: item.body,
          }))}
        />
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 3 — Stats strip */}
      {/* ---------------------------------------------------------------- */}
      <Reveal>
        <StatsStrip />
      </Reveal>

      {/* ---------------------------------------------------------------- */}
      {/* Section 4 — Services overview */}
      {/* ---------------------------------------------------------------- */}
      <Section surface="white">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">What We Do</h2>
        </Reveal>
        <RevealGroup as="ul" className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <RevealItem as="li" key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-card border border-black/5 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-peach-tile text-glow shadow-glow-tile">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-grey">{service.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold text-orange">
                  Learn more
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mx-auto mt-8 max-w-3xl text-center text-grey">
          We also handle subsidy assistance (
          <Link href="/pm-surya-ghar-subsidy" className="link-eco">
            PM Surya Ghar
          </Link>
          ), net metering &amp; TANGEDCO liaison, and AMC &amp; panel cleaning.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 5 — How it works */}
      {/* ---------------------------------------------------------------- */}
      <Section surface="grey">
        <Reveal kind="blur" className="mb-12 text-center">
          <h2 className="text-h2">How Going Solar Works</h2>
        </Reveal>
        <ProcessTimeline
          steps={steps.map((s) => ({
            title: s.title,
            body: s.body,
            icon: <s.icon className="h-4 w-4" aria-hidden="true" />,
          }))}
        />
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 6 — Brands we install */}
      {/* ---------------------------------------------------------------- */}
      <Section surface="white">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Trusted Components</h2>
        </Reveal>
        <BrandMarquee />
        <p className="mx-auto mt-8 max-w-2xl text-center text-grey">
          We use only tier-1 panels and reliable inverters — the components we&rsquo;d put on our own
          roofs.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 7 — Subsidy teaser (bottom padding tightened toward the reviews) */}
      {/* ---------------------------------------------------------------- */}
      <Section surface="grey" innerClassName="!pb-10 md:!pb-14">
        <Reveal kind="confident" className="overflow-hidden rounded-card bg-cta-gradient px-6 py-12 text-center text-white shadow-card md:px-12 md:py-16">
          {/*
            NOTE: The ₹78,000 figure must be verified against current government
            guidelines (PM Surya Ghar: Muft Bijli Yojana) before launch.
            Kept here as a single editable string for easy updating.
          */}
          <h2 className="text-h2 text-white">Get Up to ₹78,000 in Government Subsidy</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Homeowners can claim a rooftop solar subsidy under the PM Surya Ghar: Muft Bijli Yojana.
            Quadbiz handles the entire application for you.
          </p>
          <Link
            href="/pm-surya-ghar-subsidy"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy shadow-card transition-transform duration-200 hover:-translate-y-0.5"
          >
            See if you qualify
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 8 — Reviews (renders null until Google Places is wired).
          Top padding tightened so it sits closer to the CTA band above. */}
      {/* ---------------------------------------------------------------- */}
      <ReviewsSection innerClassName="!pt-10 md:!pt-14" />

      {/* ---------------------------------------------------------------- */}
      {/* Section 9 — Lead form (two-column: form left, installation photo right) */}
      {/* ---------------------------------------------------------------- */}
      <Section id="quote" surface="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left — heading, existing form (unchanged), trust cues. */}
          <div>
            <Reveal className="mb-6">
              <h2 className="text-h2">Get Your Free Solar Quote</h2>
              <p className="mt-3 text-grey">Get a personalized solar quote in minutes.</p>
            </Reveal>
            <LeadForm source="home-quote" />
            {/* Trust cues (orange checks). No rating/customer-count line — Quadbiz
                has no verified rating yet; any rating must come from real Google data. */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-grey">
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 flex-shrink-0 text-orange" aria-hidden="true" />
                No spam, ever
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 flex-shrink-0 text-orange" aria-hidden="true" />
                100% Free consultation
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 flex-shrink-0 text-orange" aria-hidden="true" />
                Govt. subsidy help
              </li>
            </ul>
          </div>

          {/* Right — real installation photo. Hidden on mobile so the form stays
              fast and above the fold. Sized container → no layout shift. */}
          <div className="hidden lg:block">
            <div className="relative h-full min-h-[440px] overflow-hidden rounded-card shadow-card">
              {/* Real installation photo. NOTE: public/installations/*.jpg are
                  placeholder graphics, so we use the hero photo here (per brief). */}
              <Image
                src="/hero/hero-solar-installation.png"
                alt="Rooftop solar panel installation by Quadbiz in Madurai, Tamil Nadu"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 42vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
