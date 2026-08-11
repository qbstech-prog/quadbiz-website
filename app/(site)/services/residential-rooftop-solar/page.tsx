import type { Metadata } from "next";
import Link from "next/link";
import {
  PlugZap,
  BatteryCharging,
  Zap,
  ShieldCheck,
  IndianRupee,
  TrendingUp,
  Wrench,
  Clock,
  Check,
} from "lucide-react";

import FAQ, { type FaqItem } from "@/components/FAQ";
import FeatureGrid from "@/components/FeatureGrid";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { formatINR, SUBSIDY_RATES } from "@/lib/subsidy";

const PATH = "/services/residential-rooftop-solar";
const WHATSAPP_URL =
  "https://wa.me/918610728938?text=Hi%20Quadbiz,%20I'd%20like%20a%20rooftop%20solar%20quote";
// ₹78,000 cap sourced centrally — verify before launch (see lib/subsidy.ts).
const SUBSIDY_CAP = formatINR(SUBSIDY_RATES.cap);

export const metadata: Metadata = {
  title: "Rooftop Solar in Madurai | Home Solar Installation",
  description:
    "Install rooftop solar for your Madurai home with Quadbiz. On-grid, off-grid & hybrid systems, full subsidy help, 25-yr warranty. Free site survey — get a quote.",
  alternates: { canonical: PATH },
};

const systemTypes = [
  {
    icon: PlugZap,
    title: "On-Grid",
    body: "Connected to the TANGEDCO grid with net metering. Best for homes with reliable grid power; lowest cost, fastest payback.",
  },
  {
    icon: BatteryCharging,
    title: "Off-Grid",
    body: "Battery-backed and independent of the grid. Ideal where power cuts are frequent or the grid is far.",
  },
  {
    icon: Zap,
    title: "Hybrid",
    body: "Grid-connected and battery-backed. Runs through outages and still exports surplus. Best of both.",
  },
];

const included = [
  "Site survey & shading analysis",
  "System design & sizing",
  "Adani / Waaree / Vikram Solar panels",
  "Goodwe / Sungrow / Polycab inverter",
  "Mounting structure & civil work",
  "Wiring & safety",
  "PM Surya Ghar subsidy application",
  "TANGEDCO net-metering liaison",
  "Commissioning",
  "AMC & cleaning options",
];

const benefits = [
  { icon: Zap, text: "Near-zero electricity bills" },
  { icon: ShieldCheck, text: "25-yr panel / 10-yr inverter warranty" },
  { icon: IndianRupee, text: `Government subsidy up to ${SUBSIDY_CAP}`, href: "/pm-surya-ghar-subsidy" },
  { icon: TrendingUp, text: "Increases property value" },
  { icon: Wrench, text: "Low maintenance" },
  { icon: Clock, text: "3–5 year typical payback" },
];

const sizingRows = [
  { bill: "₹1,500–3,000", size: "1–2 kW", area: "80–160 sq ft" },
  { bill: "₹3,000–6,000", size: "3 kW", area: "~240 sq ft" },
  { bill: "₹6,000–10,000", size: "5 kW", area: "~400 sq ft" },
  { bill: "₹10,000+", size: "5–10 kW", area: "400+ sq ft" },
];

const faqs: FaqItem[] = [
  {
    question: "How much does rooftop solar cost in Madurai?",
    answer:
      "Cost depends on system size and type; after the PM Surya Ghar subsidy a typical 3 kW home system is significantly cheaper. We give a fixed written quote after a free survey.",
  },
  {
    question: "How much can I save?",
    answer:
      "Most homes cut 80–100% of their grid bill; typical payback is 3–5 years, with free power for 20+ years after.",
  },
  {
    question: "Will solar work during power cuts?",
    answer:
      "On-grid systems switch off during cuts for safety; choose hybrid or off-grid with batteries for backup.",
  },
  {
    question: "Do you handle the subsidy and net metering?",
    answer:
      "Yes, end-to-end. We file the PM Surya Ghar application and complete TANGEDCO net metering for you.",
  },
  {
    question: "How long does installation take?",
    answer:
      "A typical home system is installed in 2–4 days after materials arrive; subsidy/net-metering approvals run in parallel.",
  },
];

export default function ResidentialSolarPage() {
  const jsonLd = [
    serviceSchema({
      name: "Residential Rooftop Solar",
      description:
        "Design, supply, installation and subsidy support for on-grid, off-grid and hybrid home rooftop solar systems across Tamil Nadu.",
      path: PATH,
      serviceType: "Rooftop Solar Installation",
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Residential Rooftop Solar", path: PATH },
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
            <p className="text-sm font-semibold font-heading uppercase tracking-[0.15em] text-orange">
              Residential
            </p>
            <h1 className="mt-4 text-h1 text-navy">Rooftop Solar for Homes in Madurai</h1>
            <p className="mt-5 text-lg leading-body text-grey">
              Turn your roof into a power plant. A rooftop solar system from Quadbiz can bring your
              monthly TANGEDCO bill close to zero while adding value to your home — and with the PM
              Surya Ghar subsidy, it&rsquo;s more affordable than ever. We design, supply, install
              and connect the whole system, and handle the subsidy and net-metering paperwork for
              you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#quote" className="btn-primary">
                Get Free Quote
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — System types */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Choose the Right System for Your Home</h2>
        </Reveal>
        <FeatureGrid
          columns={3}
          items={systemTypes.map((type) => ({
            icon: <type.icon className="h-6 w-6" aria-hidden="true" />,
            title: type.title,
            body: type.body,
          }))}
        />
      </Section>

      {/* Section 3 — What's included */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Everything Handled Under One Roof</h2>
        </Reveal>
        <RevealGroup as="ul" className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {included.map((item) => (
            <RevealItem
              as="li"
              key={item}
              className="flex items-start gap-3 rounded-card border border-black/5 bg-white p-4 shadow-soft"
            >
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
              <span className="text-ink">{item}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 4 — Benefits */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Why Homeowners Go Solar</h2>
        </Reveal>
        <RevealGroup as="ul" className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <RevealItem
              as="li"
              key={benefit.text}
              className="flex items-center gap-3 rounded-card border border-black/5 bg-white p-5 shadow-soft"
            >
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-peach-tile text-glow shadow-glow-tile">
                <benefit.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-medium text-navy">
                {benefit.href ? (
                  <Link href={benefit.href} className="link-eco">
                    {benefit.text}
                  </Link>
                ) : (
                  benefit.text
                )}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 5 — Sizing guide */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-8 text-center">
          <h2 className="text-h2">What Size System Do You Need?</h2>
        </Reveal>
        <div className="mx-auto max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-card border border-black/10 text-left">
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-5 py-3 text-sm font-semibold">
                  Monthly bill
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-semibold">
                  Suggested size
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-semibold">
                  Approx. roof area
                </th>
              </tr>
            </thead>
            <tbody>
              {sizingRows.map((row) => (
                <tr key={row.bill} className="border-t border-black/10 bg-white">
                  <td className="px-5 py-3 text-ink">{row.bill}</td>
                  <td className="px-5 py-3 font-semibold text-navy">{row.size}</td>
                  <td className="px-5 py-3 text-ink">{row.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-grey">
          Indicative only — actual sizing after a free site survey.
        </p>
        <p className="mt-4 text-center">
          <Link href="/pm-surya-ghar-subsidy" className="link-eco">
            Estimate your subsidy and savings →
          </Link>
        </p>
      </Section>

      {/* Section 6 — FAQ */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Rooftop Solar — Frequently Asked Questions</h2>
        </Reveal>
        <FAQ items={faqs} />
      </Section>

      {/* Section 7 — Lead form */}
      <Section id="quote" variant="soft">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-h2">Get Your Free Rooftop Solar Quote</h2>
            <p className="mt-3 text-grey">
              Tell us about your home and we&rsquo;ll call you within 24 hours.
            </p>
          </Reveal>
          <LeadForm source="residential-page" defaultPropertyType="Home" />
        </div>
      </Section>

      {/* Related services */}
      <Section>
        <p className="text-center text-grey">
          Related services:{" "}
          <Link href="/services/commercial-solar" className="link-eco">
            Commercial &amp; Industrial Solar
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
