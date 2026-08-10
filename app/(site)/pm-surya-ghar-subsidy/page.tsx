import type { Metadata } from "next";
import {
  BadgeCheck,
  ClipboardList,
  FileSignature,
  Wrench,
  PlugZap,
  Banknote,
} from "lucide-react";

import FAQ, { type FaqItem } from "@/components/FAQ";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import SubsidyLeadFlow from "@/components/SubsidyLeadFlow";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const PATH = "/pm-surya-ghar-subsidy";

export const metadata: Metadata = {
  title: "PM Surya Ghar Subsidy in Tamil Nadu | Up to ₹78,000",
  description:
    "Get up to ₹78,000 rooftop solar subsidy under PM Surya Ghar: Muft Bijli Yojana. Quadbiz handles your full application in Madurai & Tamil Nadu. Check eligibility.",
  alternates: { canonical: PATH },
};

// Disclaimer shown near all figures (accuracy guard). See lib/subsidy.ts for rates.
const DISCLAIMER =
  "Subsidy amounts are as per current government guidelines and may change. Final eligibility is confirmed during your application.";

const eligibility = [
  "Indian homeowner with your own roof",
  "Valid electricity connection (TANGEDCO)",
  "Roof with adequate sunlight and space",
  "Not previously availed a rooftop solar subsidy",
];

const process = [
  { icon: BadgeCheck, title: "Eligibility check & consultation" },
  { icon: ClipboardList, title: "Registration on the National Portal" },
  { icon: FileSignature, title: "System design & fixed quote" },
  { icon: Wrench, title: "Installation by our in-house team" },
  { icon: PlugZap, title: "Net metering with TANGEDCO" },
  { icon: Banknote, title: "Subsidy disbursed to your bank account" },
];

const faqs: FaqItem[] = [
  {
    question: "How much subsidy can I get?",
    answer:
      "Up to ₹78,000 for a typical 3 kW home system under current PM Surya Ghar guidelines; the exact amount depends on system size.",
  },
  {
    question: "Who is eligible?",
    answer:
      "Indian homeowners with their own roof and a valid electricity connection who haven't previously taken a rooftop solar subsidy.",
  },
  {
    question: "How is the subsidy paid?",
    answer: "It's credited directly to your bank account after installation and inspection.",
  },
  {
    question: "Do I have to do the paperwork?",
    answer:
      "No — Quadbiz manages registration, application and net metering end-to-end.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Typically a few weeks from application to subsidy credit, depending on approvals and net-metering scheduling.",
  },
];

const subsidyRows = [
  { size: "Up to 2 kW", subsidy: "₹30,000 per kW", strong: false },
  { size: "Additional (2–3 kW)", subsidy: "₹18,000 per kW", strong: false },
  { size: "Above 3 kW", subsidy: "Capped", strong: false },
  { size: "Typical 3 kW home", subsidy: "Up to ₹78,000", strong: true },
];

export default function SubsidyPage() {
  const jsonLd = [
    serviceSchema({
      name: "PM Surya Ghar Subsidy Assistance",
      description:
        "End-to-end PM Surya Ghar: Muft Bijli Yojana rooftop solar subsidy application support across Tamil Nadu.",
      path: PATH,
      serviceType: "Solar Subsidy Assistance (PM Surya Ghar)",
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "PM Surya Ghar Subsidy", path: PATH },
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
      <section className="relative overflow-hidden bg-bg-soft">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-sun-glow" />
        <div className="relative mx-auto max-w-container px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange">
              Government Scheme
            </p>
            <h1 className="mt-4 text-h1 font-bold text-navy">
              PM Surya Ghar Subsidy — Rooftop Solar Support in Tamil Nadu
            </h1>
            <p className="mt-5 text-lg leading-body text-grey">
              The PM Surya Ghar: Muft Bijli Yojana is a central government scheme that helps
              homeowners install rooftop solar with a direct subsidy — making clean power more
              affordable than ever. Quadbiz handles your entire application from start to finish, so
              you get the maximum benefit you&rsquo;re entitled to without the paperwork headache.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="#quote" className="btn-primary">
                Check my eligibility
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Subsidy structure */}
      <Section>
        <Reveal kind="blur" className="mb-8 text-center">
          <h2 className="text-h2 font-bold">How Much Subsidy Can You Get?</h2>
        </Reveal>
        <div className="mx-auto max-w-2xl overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-card border border-black/10 text-left">
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-5 py-3 text-sm font-semibold">
                  System size
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-semibold">
                  Indicative central subsidy
                </th>
              </tr>
            </thead>
            <tbody>
              {subsidyRows.map((row) => (
                <tr
                  key={row.size}
                  className={`border-t border-black/10 ${row.strong ? "bg-orange/10" : "bg-white"}`}
                >
                  <td className={`px-5 py-3 ${row.strong ? "font-bold text-navy" : "text-ink"}`}>
                    {row.size}
                  </td>
                  <td className={`px-5 py-3 ${row.strong ? "font-bold text-orange" : "text-ink"}`}>
                    {row.subsidy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-grey">{DISCLAIMER}</p>
      </Section>

      {/* Sections 3 & 7 (calculator + lead form) wrap sections 4–6 as children */}
      <SubsidyLeadFlow>
        {/* Section 4 — Eligibility */}
        <Section>
          <Reveal kind="blur" className="mb-8 text-center">
            <h2 className="text-h2 font-bold">Who Is Eligible?</h2>
          </Reveal>
          <RevealGroup as="ul" className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {eligibility.map((item) => (
              <RevealItem
                as="li"
                key={item}
                className="flex items-start gap-3 rounded-card border border-black/5 bg-white p-4 shadow-soft"
              >
                <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green" aria-hidden="true" />
                <span className="text-ink">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* Section 5 — How Quadbiz handles it */}
        <Section variant="soft">
          <Reveal kind="blur" className="mb-10 text-center">
            <h2 className="text-h2 font-bold">We Manage the Whole Process</h2>
          </Reveal>
          <ProcessTimeline
            columns={3}
            steps={process.map((step) => ({
              title: step.title,
              icon: <step.icon className="h-4 w-4" aria-hidden="true" />,
            }))}
          />
        </Section>

        {/* Section 6 — FAQ */}
        <Section>
          <Reveal kind="blur" className="mb-10 text-center">
            <h2 className="text-h2 font-bold">PM Surya Ghar — Frequently Asked Questions</h2>
          </Reveal>
          <FAQ items={faqs} />
        </Section>
      </SubsidyLeadFlow>
    </>
  );
}
