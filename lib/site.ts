/**
 * Central, typed site configuration.
 *
 * This is the single source of truth for NAP (Name, Address, Phone) data —
 * it MUST be identical everywhere it is rendered for local-SEO consistency.
 * When Sanity is wired up later, a data source can replace these constants
 * without any component needing to change (they only import from here).
 */

export interface SiteAddress {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string; // ISO 3166-1 alpha-2
}

export interface Site {
  name: string;
  tagline: string;
  foundingDate: string;
  phonePrimary: string; // E.164, e.g. +918610728938
  phonePrimaryDisplay: string;
  phoneSecondary: string;
  phoneSecondaryDisplay: string;
  whatsapp: string; // digits only, e.g. 918610728938
  whatsappMessage: string;
  email: string;
  address: SiteAddress;
  hours: string;
  areaServed: string;
  googleProfile: string;
}

export const site: Site = {
  name: "Quadbiz Solar Solutions",
  tagline: "Powering Madurai with Clean Energy",
  foundingDate: "2026",
  phonePrimary: "+918610728938",
  phonePrimaryDisplay: "+91 86107 28938",
  phoneSecondary: "+918015877996",
  phoneSecondaryDisplay: "+91 80158 77996",
  whatsapp: "918610728938",
  whatsappMessage: "Hi Quadbiz, I'd like a free solar quote",
  email: "reception.qbs@gmail.com",
  address: {
    street: "346/A1, Sundar Nagar, Vandiyur",
    locality: "Madurai",
    region: "Tamil Nadu",
    postalCode: "625020",
    country: "IN",
  },
  hours: "Mon–Sat, 9:00 AM – 6:00 PM",
  areaServed: "Tamil Nadu",
  googleProfile: "https://share.google/EvXU3NWH3McB8Ry9W",
};

/** Fully qualified WhatsApp click-to-chat URL with the standard prefilled message. */
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

/** tel: href for the primary line. */
export const telHref = `tel:${site.phonePrimary}`;

/**
 * Canonical site origin, sourced exclusively from the environment.
 * Never hardcode the domain anywhere else — derive from this.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://quadbizsolar.com"
).replace(/\/$/, "");

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

// ---------------------------------------------------------------------------
// Navigation model
// ---------------------------------------------------------------------------

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Residential Rooftop Solar", href: "/services/residential-rooftop-solar" },
      { label: "Commercial Solar", href: "/services/commercial-solar" },
      { label: "Agricultural Solar", href: "/services/agricultural-solar" },
    ],
  },
  { label: "PM Surya Ghar Subsidy", href: "/pm-surya-ghar-subsidy" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/** Right-aligned primary call-to-action shown in the header. */
export const primaryCta = {
  label: "Get Free Quote",
  href: "/contact",
} as const;
