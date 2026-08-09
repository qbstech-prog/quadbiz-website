import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, ShieldCheck, MapPin, Workflow, BadgeCheck } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import StatsStrip from "@/components/StatsStrip";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const PATH = "/about";
const WHATSAPP_URL =
  "https://wa.me/918610728938?text=Hi%20Quadbiz,%20I'd%20like%20a%20free%20solar%20quote";

export const metadata: Metadata = {
  title: "About Quadbiz Solar Solutions | Madurai Solar Company",
  description:
    "Quadbiz Solar Solutions is an MNRE-registered Madurai solar company built by an experienced young team. End-to-end solar across Tamil Nadu. Learn our story.",
  alternates: { canonical: PATH },
};

const values = [
  {
    icon: HeartHandshake,
    title: "Honesty & transparency",
    body: "Clear quotes, no hidden costs, straight answers.",
  },
  {
    icon: ShieldCheck,
    title: "Quality components only",
    body: "Tier-1 panels and reliable inverters, every time.",
  },
  {
    icon: MapPin,
    title: "Local, responsive service",
    body: "A Madurai team that answers the phone and shows up.",
  },
  {
    icon: Workflow,
    title: "End-to-end accountability",
    body: "One team owns the whole job, from paperwork to switch-on.",
  },
];

const services = [
  { label: "Residential Rooftop Solar", href: "/services/residential-rooftop-solar" },
  { label: "Commercial & Industrial Solar", href: "/services/commercial-solar" },
  { label: "Agricultural Solar", href: "/services/agricultural-solar" },
];

const credentials = ["MNRE Registered", "All licences obtained"];

export default function AboutPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#aboutpage`,
      url: absoluteUrl(PATH),
      name: "About Quadbiz Solar Solutions",
      mainEntity: { "@id": `${SITE_URL}/#business` },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: PATH },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Section 1 — Hero */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-container px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange">
              About Us
            </p>
            <h1 className="mt-4 text-h1 font-bold text-navy">About Quadbiz Solar Solutions</h1>
            <p className="mt-5 text-lg leading-body text-grey">
              A Madurai solar company on a simple mission — make going solar honest, affordable, and
              built to last.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Our story */}
      <Section>
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-h2 font-bold">Our Story</h2>
          <p className="mt-5 leading-body text-grey">
            Quadbiz Solar Solutions was founded in 2026 in Madurai by a team of young, driven
            professionals with international and hands-on experience in the solar industry. We
            started Quadbiz with one goal: to give Tamil Nadu homeowners, businesses and farmers
            better solar service — honest advice, quality components, and complete support from the
            first enquiry to the final switch-on.
          </p>
          <p className="mt-4 leading-body text-grey">
            We handle everything under one roof: paperwork, subsidy applications, net metering with
            TANGEDCO, civil work and installation. No middlemen, no runaround. With 25-year
            warranties on panels, 10-year warranties on inverters and competitive local pricing, we
            make going solar simple, affordable and built to last.
          </p>

          {/* What we do — mini row of service links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy shadow-card transition-colors hover:border-navy"
              >
                {service.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Section 3 — Young company, experienced team */}
      <Section variant="soft">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">New Company, Experienced Team</h2>
          <p className="mt-5 text-lg leading-body text-grey">
            We&rsquo;re new as a company, but not new to solar. Our team brings 5+ years of industry
            experience, including international projects — so you get the energy of a fresh local
            business with the know-how of seasoned engineers.
          </p>
        </Reveal>
      </Section>

      {/* Section 4 — Values */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">What We Stand For</h2>
        </Reveal>
        <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <RevealItem
              as="li"
              key={value.title}
              className="rounded-card border border-black/5 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <value.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-navy">{value.title}</h3>
              <p className="mt-2 text-grey">{value.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/*
          TODO: Real team photos can drop in here later (grid of headshots +
          names/roles). Do NOT use stock photos pretending to be the team.
        */}
      </Section>

      {/* Section 5 — Credentials */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-8 text-center">
          <h2 className="text-h2 font-bold">Credentials</h2>
        </Reveal>
        <Reveal className="mx-auto max-w-3xl">
          <ul className="flex flex-wrap justify-center gap-3">
            {credentials.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 py-2 text-sm font-semibold text-navy"
              >
                <BadgeCheck className="h-4 w-4 text-green" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-grey">
            Tier-1 panel &amp; inverter partners: Adani, Waaree, Vikram Solar / Goodwe, Sungrow,
            Polycab.
          </p>
        </Reveal>
      </Section>

      {/* Section 6 — Stats strip (reused from Home) */}
      <Reveal>
        <StatsStrip />
      </Reveal>

      {/* Section 7 — CTA band */}
      <Section>
        <Reveal kind="confident" className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Ready to Go Solar?</h2>
          <p className="mt-4 text-lg leading-body text-grey">
            Get a free site survey and a fixed, transparent quote from a local team you can trust.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Get Free Quote
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
