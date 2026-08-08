/**
 * JSON-LD structured-data helpers.
 *
 * All URLs and @ids derive from SITE_URL — nothing here hardcodes the domain.
 * The site-wide LocalBusiness object is injected once in the root layout;
 * per-page helpers (service/faq/breadcrumb) are used by later steps.
 */

import { SITE_URL, absoluteUrl, site } from "@/lib/site";

/** Loose JSON-LD type — good enough for typing our builders without ceremony. */
export type JsonLd = Record<string, unknown>;

const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Site-wide LocalBusiness (SolarEnergyContractor) schema.
 * Do NOT add aggregateRating here — only introduce it once real Google
 * review data exists.
 */
export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SolarEnergyContractor",
    "@id": BUSINESS_ID,
    name: site.name,
    image: absoluteUrl("/logo.png"),
    url: absoluteUrl("/"),
    telephone: site.phonePrimary,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: {
      "@type": "State",
      name: site.areaServed,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    foundingDate: site.foundingDate,
    sameAs: [site.googleProfile],
  };
}

// ---------------------------------------------------------------------------
// Per-page helpers (used from later steps)
// ---------------------------------------------------------------------------

export interface ServiceSchemaInput {
  name: string;
  description: string;
  /** Site-relative path, e.g. /services/residential-rooftop-solar */
  path: string;
  serviceType?: string;
}

/** Schema.org Service tied back to the LocalBusiness as the provider. */
export function serviceSchema(input: ServiceSchemaInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType ?? input.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "State", name: site.areaServed },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage schema from a list of Q&A pairs. */
export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface Breadcrumb {
  name: string;
  /** Site-relative path. */
  path: string;
}

/** BreadcrumbList schema from an ordered list of crumbs. */
export function breadcrumbSchema(crumbs: Breadcrumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
