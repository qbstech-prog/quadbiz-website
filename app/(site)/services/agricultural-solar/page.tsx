import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplets,
  BatteryCharging,
  PlugZap,
  Sun,
  Fuel,
  Wrench,
  BadgeIndianRupee,
  ShieldAlert,
  Sprout,
} from "lucide-react";

import FAQ, { type FaqItem } from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const PATH = "/services/agricultural-solar";
const WHATSAPP_URL =
  "https://wa.me/918610728938?text=Hi%20Quadbiz,%20I'd%20like%20a%20solar%20pump%20quote";

export const metadata: Metadata = {
  title: "Solar Water Pumps in Tamil Nadu | Agricultural Solar",
  description:
    "Solar water pumps and farm power for Tamil Nadu farmers. Quadbiz installs reliable agricultural solar with PM-KUSUM subsidy support. Get a free farm survey.",
  alternates: { canonical: PATH },
};

const solutions = [
  {
    icon: Droplets,
    title: "Solar Water Pumps",
    body: "Surface & submersible pumps powered directly by solar; reliable daytime irrigation with no diesel or grid dependence.",
  },
  {
    icon: BatteryCharging,
    title: "Off-Grid Farm Power",
    body: "Power farmhouses, sheds and equipment where the grid is weak or absent.",
  },
  {
    icon: PlugZap,
    title: "Grid-Connected Agricultural Solar",
    body: "Larger farms can offset grid usage and benefit from net metering.",
  },
];

const benefits = [
  { icon: Sun, text: "Zero fuel cost — sunshine is free" },
  { icon: Fuel, text: "No more diesel pump expense" },
  { icon: Droplets, text: "Reliable daytime irrigation" },
  { icon: Wrench, text: "Low maintenance, long life" },
  { icon: BadgeIndianRupee, text: "PM-KUSUM subsidy support" },
  { icon: ShieldAlert, text: "Protects against power-cut losses" },
];

const faqs: FaqItem[] = [
  {
    question: "What size solar pump do I need?",
    answer:
      "It depends on your water source depth, flow needs and acreage; we survey the farm and recommend the right HP and panel capacity.",
  },
  {
    question: "Will the pump run on cloudy days?",
    answer:
      "Output drops in cloud but resumes with sunlight; we can size for typical conditions or add storage where needed.",
  },
  {
    question: "Is there a subsidy for farmers?",
    answer: "Yes, under PM-KUSUM for eligible farmers; we assist with eligibility and application.",
  },
  {
    question: "How much maintenance is needed?",
    answer:
      "Very little — periodic panel cleaning and basic checks; solar pumps have fewer moving parts than diesel.",
  },
];

export default function AgriculturalSolarPage() {
  const jsonLd = [
    serviceSchema({
      name: "Agricultural Solar & Solar Water Pumps",
      description:
        "Solar water pumps and agricultural solar systems with PM-KUSUM subsidy support for farmers across Tamil Nadu.",
      path: PATH,
      serviceType: "Agricultural Solar & Solar Water Pumps",
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Agricultural Solar", path: PATH },
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

      {/* Section 1 — Hero (green eco lean) */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-container px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green">
              Agricultural
            </p>
            <h1 className="mt-4 text-h1 font-bold text-navy">
              Agricultural Solar &amp; Solar Water Pumps in Tamil Nadu
            </h1>
            <p className="mt-5 text-lg leading-body text-grey">
              Free your farm from diesel costs and unreliable grid power. Quadbiz installs solar
              water pumps and agricultural solar systems that run your irrigation on sunlight —
              cutting running costs to near zero and giving you power exactly when the sun (and your
              crops) need it. We also help eligible farmers access subsidies under the PM-KUSUM
              scheme.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#quote" className="btn-primary">
                Get a Free Farm Survey
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Solutions */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">Solar Solutions for Your Farm</h2>
        </Reveal>
        <RevealGroup as="ul" className="grid gap-6 md:grid-cols-3">
          {solutions.map((item) => (
            <RevealItem
              as="li"
              key={item.title}
              className="rounded-card border border-black/5 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-grey">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 3 — Why farmers go solar */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">Why Farmers Choose Solar</h2>
        </Reveal>
        <RevealGroup as="ul" className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <RevealItem
              as="li"
              key={benefit.text}
              className="flex items-center gap-3 rounded-card border border-black/5 bg-white p-5 shadow-soft"
            >
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green/10 text-green">
                <benefit.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-medium text-navy">{benefit.text}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 4 — PM-KUSUM note (green accent band) */}
      {/*
        NOTE: PM-KUSUM eligibility/subsidy rules vary by state and year — keep
        this copy general and verify specifics before making any firm claims.
      */}
      <Section>
        <Reveal
          kind="confident"
          className="overflow-hidden rounded-card border border-green/30 bg-green/10 px-6 py-12 text-center md:px-12"
        >
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green text-white">
            <Sprout className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="text-h2 font-bold">PM-KUSUM Scheme Support</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
            The PM-KUSUM scheme supports farmers with standalone solar pumps and grid-connected
            agricultural solar. Eligibility and subsidy levels vary — Quadbiz helps you check
            eligibility and complete the paperwork.
          </p>
          <a href="#quote" className="btn-primary mt-8">
            Check your eligibility
          </a>
        </Reveal>
      </Section>

      {/* Section 5 — FAQ */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">Agricultural Solar — Frequently Asked Questions</h2>
        </Reveal>
        <FAQ items={faqs} />
      </Section>

      {/* Section 6 — Lead form */}
      <Section id="quote">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-h2 font-bold">Get a Free Farm Site Survey</h2>
            <p className="mt-3 text-grey">
              Tell us about your farm and we&rsquo;ll call you within 24 hours.
            </p>
          </Reveal>
          <LeadForm source="agricultural-page" defaultPropertyType="Agricultural" />
        </div>
      </Section>

      {/* Related services */}
      <Section variant="soft">
        <p className="text-center text-grey">
          Related services:{" "}
          <Link href="/services/residential-rooftop-solar" className="link-eco">
            Residential Rooftop Solar
          </Link>{" "}
          ·{" "}
          <Link href="/services/commercial-solar" className="link-eco">
            Commercial &amp; Industrial Solar
          </Link>
        </p>
      </Section>
    </>
  );
}
