import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, Clock, MapPin, BadgeCheck } from "lucide-react";

import LazyMap from "@/components/LazyMap";
import LeadForm from "@/components/LeadForm";
import Section from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl, site, telHref, whatsappUrl } from "@/lib/site";

const PATH = "/contact";

export const metadata: Metadata = {
  title: "Contact Quadbiz Solar | Free Solar Quote in Madurai",
  description:
    "Get a free solar quote from Quadbiz Solar Solutions, Madurai. Call, WhatsApp or fill the form — we'll respond within 24 hours. Serving all Tamil Nadu.",
  alternates: { canonical: PATH },
};

// Full address string (matches lib/site.ts NAP) used for display + map query.
const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;
const mapQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);
// TODO: replace with the exact Google Place embed URL once available.
// For now this uses an address query (no fabricated coordinates, no API key).
const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#contactpage`,
      url: absoluteUrl(PATH),
      name: "Contact Quadbiz Solar Solutions",
      mainEntity: { "@id": `${SITE_URL}/#business` },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: PATH },
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

      {/* Section 1 — Hero (compact) */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-container px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange">Contact</p>
            <h1 className="mt-4 text-h1 font-bold text-navy">Get Your Free Solar Quote</h1>
            <p className="mt-5 text-lg leading-body text-grey">
              Tell us about your property and we&rsquo;ll call you within 24 hours. Prefer to talk
              now? Call or WhatsApp us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Two-column: form + contact details */}
      <Section id="quote">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — lead form (stacks on top on mobile) */}
          <div>
            <h2 className="mb-6 text-h3 font-semibold text-navy">Request a callback</h2>
            <LeadForm source="contact-page" />
          </div>

          {/* Right — contact details */}
          <div>
            <h2 className="mb-6 text-h3 font-semibold text-navy">Contact details</h2>
            <div className="rounded-card border border-black/5 bg-white p-6 shadow-card sm:p-8">
              <p className="font-display text-lg font-bold text-navy">{site.name}</p>

              <ul className="mt-5 space-y-4 text-ink">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                  <span>{fullAddress}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                  <span className="flex flex-col">
                    <a href={telHref} className="hover:text-orange">
                      {site.phonePrimaryDisplay}
                    </a>
                    <a href={`tel:${site.phoneSecondary}`} className="hover:text-orange">
                      {site.phoneSecondaryDisplay}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange"
                    aria-hidden="true"
                  />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange">
                    WhatsApp: {site.phonePrimaryDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="break-all hover:text-orange">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                  <span>{site.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-green" aria-hidden="true" />
                  <span>All of Tamil Nadu · HQ Madurai</span>
                </li>
              </ul>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-3 py-1 text-xs font-semibold text-navy">
                <BadgeCheck className="h-4 w-4 text-green" aria-hidden="true" />
                MNRE Registered
              </span>

              {/* Quick-action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={telHref} className="btn-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Now
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3 — Map */}
      <Section variant="soft">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-h2 font-bold">Find Us in Madurai</h2>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="link-eco">
            Get directions →
          </a>
        </div>
        <LazyMap src={mapSrc} title="Quadbiz Solar Solutions location, Madurai" />
      </Section>
    </>
  );
}
