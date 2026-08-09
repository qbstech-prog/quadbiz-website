import type { Metadata } from "next";
import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import Section from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { categoryAccent, formatPostDate, getAllPosts } from "@/lib/content/blog";

const PATH = "/blog";

export const metadata: Metadata = {
  title: "Solar Blog | Quadbiz Solar Solutions",
  description:
    "Solar guides and insights for Tamil Nadu homeowners, businesses and farmers — costs, subsidies, net metering and more, in plain language.",
  alternates: { canonical: PATH },
};

export default function BlogListPage() {
  const posts = getAllPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      url: absoluteUrl(PATH),
      name: "Quadbiz Solar Blog",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: PATH },
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

      {/* Hero */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-container px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange">
              Resources
            </p>
            <h1 className="mt-4 text-h1 font-bold text-navy">Solar Guides &amp; Insights</h1>
            <p className="mt-5 text-lg leading-body text-grey">
              Plain-language guides on solar costs, subsidies, net metering and more — written for
              Tamil Nadu homeowners, businesses and farmers.
            </p>
          </div>
        </div>
      </section>

      <Section>
        {posts.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-card border border-black/5 bg-bg-soft p-8 text-center sm:p-12">
            <h2 className="text-h3 font-semibold text-navy">New guides coming soon</h2>
            <p className="mt-3 leading-body text-grey">
              We&rsquo;re writing helpful guides on going solar in Tamil Nadu. Check back shortly.
            </p>
          </div>
        ) : (
          <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const accent = categoryAccent(post.category);
              return (
                <RevealItem as="li" key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-black/5 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div
                      className={`flex aspect-[16/9] items-end bg-gradient-to-br ${accent.from} to-white p-4`}
                    >
                      <span
                        className={`rounded-full ${accent.bg} px-2.5 py-1 text-xs font-semibold ${accent.text}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-lg font-semibold text-navy group-hover:text-orange">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-grey">{post.excerpt}</p>
                      <p className="mt-4 text-xs text-grey">{formatPostDate(post.publishedAt)}</p>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}
      </Section>
    </>
  );
}
