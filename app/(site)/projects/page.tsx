// To add a project: add a block to lib/content/projects.ts and drop the
// matching image in public/installations/. The grid and the Contact landing
// page gallery both read from that single source.
import type { Metadata } from "next";
import Link from "next/link";
import { Home as HomeIcon, Building2, Sprout } from "lucide-react";

import LeadForm from "@/components/LeadForm";
import ProjectsGrid from "@/components/ProjectsGrid";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { projects } from "@/lib/content/projects";

const PATH = "/projects";
const WHATSAPP_REFERENCES =
  "https://wa.me/918610728938?text=Hi%20Quadbiz,%20can%20you%20share%20project%20references";

export const metadata: Metadata = {
  title: "Our Solar Projects | Quadbiz Solar Madurai",
  description:
    "See rooftop, commercial and agricultural solar installations by Quadbiz across Madurai and Tamil Nadu. Real projects, real savings. Start yours today.",
  alternates: { canonical: PATH },
};

const categories = [
  { icon: HomeIcon, label: "Residential Rooftop Solar", href: "/services/residential-rooftop-solar" },
  { icon: Building2, label: "Commercial & Industrial", href: "/services/commercial-solar" },
  { icon: Sprout, label: "Agricultural", href: "/services/agricultural-solar" },
];

export default function ProjectsPage() {
  const hasProjects = projects.length > 0;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/projects#collection`,
      url: absoluteUrl(PATH),
      name: "Our Solar Projects",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: PATH },
    ]),
  ];

  // Only add an ItemList when real projects exist.
  if (hasProjects) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        image: absoluteUrl(project.image),
      })),
    });
  }

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
              Our Work
            </p>
            <h1 className="mt-4 text-h1 text-navy">
              Our Solar Projects Across Tamil Nadu
            </h1>
            <p className="mt-5 text-lg leading-body text-grey">
              A look at some of the homes, businesses and farms we&rsquo;ve powered with clean
              energy. We&rsquo;ve completed 15+ installations across Tamil Nadu — from rooftop
              systems in Madurai to farm solar in the districts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Projects grid OR honest empty state */}
      <Section>
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Featured Installations</h2>
        </Reveal>

        {hasProjects ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <div className="mx-auto max-w-2xl rounded-card border border-black/5 bg-bg-soft p-8 text-center sm:p-12">
            <h3 className="text-h3 font-semibold text-navy">Project gallery coming soon</h3>
            <p className="mt-3 leading-body text-grey">
              We&rsquo;re documenting our latest installations. In the meantime, see what we can do
              for your home, business or farm — or ask us for references directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Get Free Quote
              </Link>
              <a
                href={WHATSAPP_REFERENCES}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </Section>

      {/* Section 3 — Categories mini-links (always show) */}
      <Section variant="soft">
        <Reveal kind="blur" className="mb-10 text-center">
          <h2 className="text-h2">Explore What We Install</h2>
        </Reveal>
        <RevealGroup as="ul" className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <RevealItem as="li" key={category.href}>
              <Link
                href={category.href}
                className="group flex h-full items-center gap-4 rounded-card border border-black/5 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-peach-tile text-glow shadow-glow-tile">
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-semibold text-navy">{category.label}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-orange transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 4 — CTA / lead form */}
      <Section id="quote">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-h2">Want Results Like These?</h2>
            <p className="mt-3 text-grey">
              Get a free site survey and a fixed quote — we&rsquo;ll call you within 24 hours.
            </p>
          </Reveal>
          <LeadForm source="projects-page" />
        </div>
      </Section>
    </>
  );
}
