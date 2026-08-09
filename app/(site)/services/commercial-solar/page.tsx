import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingDown,
  Clock,
  Receipt,
  Leaf,
  PlugZap,
  ClipboardList,
  DraftingCompass,
  HardHat,
  Cpu,
  ShieldCheck,
  Activity,
  Brush,
} from "lucide-react";

import FAQ, { type FaqItem } from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const PATH = "/services/commercial-solar";
const WHATSAPP_URL =
  "https://wa.me/918610728938?text=Hi%20Quadbiz,%20I'd%20like%20a%20commercial%20solar%20assessment";

export const metadata: Metadata = {
  title: "Commercial Solar in Tamil Nadu | Industrial Solar Power",
  description:
    "Cut business energy costs with commercial & industrial solar from Quadbiz. Rooftop & ground-mount, net metering, AMC. Serving Madurai & all Tamil Nadu.",
  alternates: { canonical: PATH },
};

const idealFor = [
  "Factories & manufacturing",
  "Warehouses & cold storage",
  "Schools & colleges",
  "Hospitals & clinics",
  "Hotels & kalyana mandapams",
  "Retail & showrooms",
  "Office buildings",
  "Petrol pumps",
];

// "Up to 90%" savings and "3–4 year payback" are framed as TYPICAL ranges,
// not guarantees — keep the wording as written.
const benefits = [
  {
    icon: TrendingDown,
    title: "Lower operating costs",
    body: "Cut energy bills up to 90% and protect against tariff hikes.",
  },
  {
    icon: Clock,
    title: "Fast ROI",
    body: "Typical payback of 3–4 years, then 25+ years of generation.",
  },
  {
    icon: Receipt,
    title: "Tax benefits",
    body: "Accelerated depreciation available for businesses.",
  },
  {
    icon: Leaf,
    title: "Green credentials",
    body: "Meet sustainability goals and reduce your carbon footprint.",
  },
  {
    icon: PlugZap,
    title: "Net metering",
    body: "Export surplus power to the grid for credits.",
  },
];

const process = [
  { icon: ClipboardList, title: "Energy audit & load analysis" },
  { icon: DraftingCompass, title: "Custom system design (rooftop or ground-mount)" },
  { icon: HardHat, title: "Structural & civil work" },
  { icon: Cpu, title: "Tier-1 panels + string/central inverters" },
  { icon: ShieldCheck, title: "Installation & safety compliance" },
  { icon: PlugZap, title: "Net metering with TANGEDCO" },
  { icon: Activity, title: "Monitoring" },
  { icon: Brush, title: "AMC & scheduled cleaning" },
];

const faqs: FaqItem[] = [
  {
    question: "What size system does my business need?",
    answer:
      "It depends on your connected load and consumption; we run a free energy audit and size the system to your bills and available area.",
  },
  {
    question: "What is the payback period?",
    answer:
      "Most commercial systems pay back in 3–4 years, helped by savings plus accelerated depreciation.",
  },
  {
    question: "Can you install on the ground if my roof is small?",
    answer:
      "Yes, we design ground-mount and shed-mount systems where roof space is limited.",
  },
  {
    question: "Do you offer maintenance contracts?",
    answer:
      "Yes — AMC with scheduled cleaning and performance monitoring to keep output high.",
  },
];

export default function CommercialSolarPage() {
  const jsonLd = [
    serviceSchema({
      name: "Commercial & Industrial Solar",
      description:
        "Turnkey rooftop and ground-mount commercial and industrial solar systems with net metering and AMC across Tamil Nadu.",
      path: PATH,
      serviceType: "Commercial Solar Installation",
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Commercial Solar", path: PATH },
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
              Commercial &amp; Industrial
            </p>
            <h1 className="mt-4 text-h1 font-bold text-navy">
              Commercial &amp; Industrial Solar in Tamil Nadu
            </h1>
            <p className="mt-5 text-lg leading-body text-grey">
              Electricity is one of the biggest recurring costs for any business. A commercial solar
              system from Quadbiz turns that cost into a fixed, predictable investment — cutting your
              bills by up to 90% and paying for itself in a few years while you generate clean power
              for decades. We deliver turnkey rooftop and ground-mount systems for factories, shops,
              schools, hospitals, warehouses and offices across Tamil Nadu.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#quote" className="btn-primary">
                Request a Site Assessment
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Ideal for */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">Built for Every Kind of Business</h2>
        </Reveal>
        <RevealGroup as="ul" className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {idealFor.map((item) => (
            <RevealItem
              as="li"
              key={item}
              className="rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy shadow-soft"
            >
              {item}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 3 — Why commercial solar */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">Why Businesses Switch to Solar</h2>
        </Reveal>
        <RevealGroup as="ul" className="mx-auto flex max-w-5xl flex-wrap justify-center gap-6">
          {benefits.map((benefit) => (
            <RevealItem
              as="li"
              key={benefit.title}
              className="w-full rounded-card border border-black/5 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <benefit.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-navy">{benefit.title}</h3>
              </div>
              <p className="mt-3 text-grey">{benefit.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 4 — Turnkey process */}
      <Section>
        <Reveal kind="blur" className="mb-12 text-center">
          <h2 className="text-h2 font-bold">Our Turnkey Process</h2>
        </Reveal>
        {/* Two connected timeline rows (01–04, 05–08) so 8 steps read as one
            sequence. Desktop: two horizontal rows; mobile: vertical per row. */}
        <div className="space-y-12 md:space-y-16">
          <Timeline
            startNumber={1}
            steps={process.slice(0, 4).map((step) => ({
              title: step.title,
              icon: <step.icon className="h-4 w-4" aria-hidden="true" />,
            }))}
          />
          <Timeline
            startNumber={5}
            steps={process.slice(4).map((step) => ({
              title: step.title,
              icon: <step.icon className="h-4 w-4" aria-hidden="true" />,
            }))}
          />
        </div>
      </Section>

      {/* Section 5 — FAQ */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2 font-bold">Commercial Solar — Frequently Asked Questions</h2>
        </Reveal>
        <FAQ items={faqs} />
      </Section>

      {/* Section 6 — Lead form */}
      <Section id="quote">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-h2 font-bold">Request a Commercial Solar Assessment</h2>
            <p className="mt-3 text-grey">
              Tell us about your business and we&rsquo;ll call you within 24 hours.
            </p>
          </Reveal>
          <LeadForm source="commercial-page" defaultPropertyType="Commercial" />
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
          <Link href="/services/agricultural-solar" className="link-eco">
            Agricultural Solar
          </Link>
        </p>
      </Section>
    </>
  );
}
