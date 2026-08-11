import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Mail, Clock, MapPin, BadgeCheck } from "lucide-react";

import LazyMap from "@/components/LazyMap";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/motion/RevealImage";
import Section from "@/components/Section";
import Reviews from "@/components/home/Reviews";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl, site, telHref, whatsappUrl } from "@/lib/site";
import { installationImages } from "@/lib/content/projects";

const PATH = "/contact";

const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;
const mapQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);
// TODO: replace with the exact Google Place embed URL once available.
const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export const metadata: Metadata = {
  title: "Contact Quadbiz Solar | Free Solar Quote in Madurai",
  description:
    "Get a free solar quote from Quadbiz Solar Solutions, Madurai. Call, WhatsApp or fill the form — we'll respond within 24 hours. Serving all Tamil Nadu.",
  alternates: { canonical: PATH },
};

export default function ContactLandingPage() {
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

      {/* 1. Top call bar — logo is a plain image (no click-through), phone prominent */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Quadbiz Solar Solutions — home" className="flex items-center">
            <Image
              src="/logo.png"
              alt={site.name}
              width={216}
              height={90}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a href={telHref} className="hidden font-heading text-lg font-bold text-navy sm:block">
              {site.phonePrimaryDisplay}
            </a>
            <a
              href={telHref}
              className="btn-primary px-4 py-2.5 text-sm"
              aria-label={`Call ${site.phonePrimaryDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hidden px-4 py-2.5 text-sm sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* 2 + 3. Headline + lead form, high on the page */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-h1 text-navy">Get Your Free Solar Quote</h1>
            <p className="mt-4 text-lg leading-body text-grey">
              Tell us about your property and we&rsquo;ll call you within 24 hours.
            </p>
          </div>
          <LeadForm source="contact-landing" />
        </div>
      </section>

      {/* 4. Installation gallery — hidden while there are no real photos */}
      {installationImages.length > 0 && (
        <Section>
          <Reveal kind="blur" className="mb-10 text-center">
            <h2 className="text-h2">Our Recent Installations</h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {installationImages.map((img) => (
              <li key={img.src}>
                <RevealImage
                  variant="scale"
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-bg-soft"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </RevealImage>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 5. Reviews — reused server component; hidden until Google Places is wired */}
      <Reviews />

      {/* 6. Contact details + map (information, not navigation) */}
      <Section variant="soft">
        <Reveal className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-h3 font-semibold text-navy">Contact details</h2>
            <div className="rounded-card border border-black/5 bg-white p-6 shadow-card sm:p-8">
              <p className="font-heading text-lg font-bold text-navy">{site.name}</p>
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
                  <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
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
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                  <span>All of Tamil Nadu · HQ Madurai</span>
                </li>
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-xs font-semibold text-navy">
                <BadgeCheck className="h-4 w-4 text-orange" aria-hidden="true" />
                MNRE Registered
              </span>
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

          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-h3 font-semibold text-navy">Find Us in Madurai</h2>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="link-eco">
                Get directions →
              </a>
            </div>
            <LazyMap src={mapSrc} title="Quadbiz Solar Solutions location, Madurai" />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
