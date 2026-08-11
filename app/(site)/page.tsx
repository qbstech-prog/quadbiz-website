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
} from "lucide-react";

import BrandMarquee from "@/components/BrandMarquee";
import FeatureGrid from "@/components/FeatureGrid";
import LeadForm from "@/components/LeadForm";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import StatsStrip from "@/components/StatsStrip";
import TrustBar from "@/components/TrustBar";
import Reviews from "@/components/home/Reviews";
import { SITE_URL, absoluteUrl, site, whatsappUrl } from "@/lib/site";

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
      <section className="relative isolate overflow-hidden bg-white">
        {/* Full-bleed hero photo — the LCP element, so it loads eagerly (priority)
            and is never lazy-loaded. next/image serves an optimized AVIF/WebP. */}
        <Image
          src="/hero/hero-solar-installation.png"
          alt="Quadbiz solar panel installation on a rooftop in Madurai"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_62%]"
        />
        {/* Readability scrim: strong white behind the centred text column, fading
            to transparent at the edges so the photo still reads there. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 95% at 50% 44%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.35) 78%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* Slight overall veil — strengthened on mobile where text sits tighter. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/30 sm:bg-white/15" />
        {/* Signature sun glow, layered above the photo for warmth (static). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-sun-glow" />
        <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-12 pt-24 text-center sm:px-6 md:pb-16 md:pt-32 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-orange">
            MNRE Registered · Serving All of Tamil Nadu
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-h1 text-navy">
            Solar Power for Homes, Businesses &amp; Farms in <span className="text-orange">Madurai</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-body text-grey">
            Quadbiz Solar Solutions handles everything under one roof — from paperwork and subsidy
            approvals to civil work and installation. Quality panels, competitive pricing, and local
            service you can trust.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/contact" className="btn-primary">
              Get Free Quote
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp Us
            </a>
          </div>

          {/* Quiet stats row — opaque hairline card, readable over the hero photo. */}
          <dl className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-4 rounded-2xl border border-line bg-white px-6 py-5 shadow-card">
            {[
              { value: "15+", label: "Installations" },
              { value: "50 kW+", label: "Installed" },
              { value: "25-Yr", label: "Panel Warranty" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-xs text-grey">{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Trust chips — last element of the hero, frosted over the photo. */}
          <TrustBar className="mt-10 sm:mt-12" />
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
      {/* Section 7 — Subsidy teaser */}
      {/* ---------------------------------------------------------------- */}
      <Section surface="grey">
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
      {/* Section 8 — Reviews (renders null until Google Places is wired) */}
      {/* ---------------------------------------------------------------- */}
      <Reviews />

      {/* ---------------------------------------------------------------- */}
      {/* Section 9 — Lead form */}
      {/* ---------------------------------------------------------------- */}
      <Section id="quote" surface="white">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-h2">Get Your Free Solar Quote</h2>
            <p className="mt-3 text-grey">
              Tell us a bit about your property and we&rsquo;ll call you within 24 hours.
            </p>
          </Reveal>
          <LeadForm source="home-quote" />
        </div>
      </Section>
    </>
  );
}
