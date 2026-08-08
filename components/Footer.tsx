import Image from "next/image";
import Link from "next/link";

import { nav, site } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "PM Surya Ghar Subsidy", href: "/pm-surya-ghar-subsidy" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks =
  nav.find((item) => item.label === "Services")?.children ?? [];

const socialPlaceholders = [
  { label: "Facebook", href: "" },
  { label: "Instagram", href: "" },
  { label: "YouTube", href: "" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Image
            src="/logo.png"
            alt={site.name}
            width={216}
            height={90}
            className="mb-4 h-14 w-auto rounded-lg bg-white p-2"
          />
          <p className="font-display text-lg font-semibold text-white">{site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed">
            End-to-end solar installation for homes, businesses and farms across Tamil Nadu — from
            site survey to subsidy paperwork and after-sales service.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-green/50 bg-green/15 px-3 py-1 text-xs font-semibold text-white">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green" />
            MNRE Registered
          </span>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-amber focus-visible:text-amber"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Services
          </h2>
          <ul className="space-y-2 text-sm">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-amber focus-visible:text-amber"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact / NAP */}
        <div>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h2>
          <address className="space-y-3 text-sm not-italic leading-relaxed">
            <p>
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </p>
            <p>{site.hours}</p>
            <p className="space-y-1">
              <a
                href={`tel:${site.phonePrimary}`}
                className="block transition-colors hover:text-amber focus-visible:text-amber"
              >
                {site.phonePrimaryDisplay}
              </a>
              <a
                href={`tel:${site.phoneSecondary}`}
                className="block transition-colors hover:text-amber focus-visible:text-amber"
              >
                {site.phoneSecondaryDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block break-all transition-colors hover:text-amber focus-visible:text-amber"
              >
                {site.email}
              </a>
            </p>
          </address>

          <ul className="mt-5 flex gap-3" aria-label="Social media">
            {socialPlaceholders.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href || "#"}
                  aria-label={social.label}
                  aria-disabled={social.href ? undefined : "true"}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-xs font-semibold transition-colors hover:border-amber hover:text-amber"
                >
                  {social.label.charAt(0)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-container px-4 py-5 text-center text-xs text-white/60 sm:px-6 lg:px-8">
          © {site.foundingDate} {site.name}. All rights reserved. · MNRE Registered · Serving all of
          Tamil Nadu
        </div>
      </div>
    </footer>
  );
}
