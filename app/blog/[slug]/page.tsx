import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import MdxLink from "@/components/mdx/MdxLink";
import PostCTA from "@/components/PostCTA";
import Section from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import {
  categoryAccent,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
} from "@/lib/content/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const path = `/blog/${slug}`;
  const ogImage = post.coverImage ?? "/logo.png";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title,
      description,
      publishedTime: post.publishedAt,
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const accent = categoryAccent(post.category);
  const { content } = await compileMDX({
    source: post.body,
    components: { a: MdxLink },
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${slug}`)}#post`,
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.coverImage ?? "/logo.png"),
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@id": `${SITE_URL}/#business` },
      mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
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

      {/* Header */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-sm">
            <Link href="/blog" className="font-medium text-green hover:underline">
              ← All guides
            </Link>
          </p>
          <span
            className={`mt-4 inline-block rounded-full ${accent.bg} px-2.5 py-1 text-xs font-semibold ${accent.text}`}
          >
            {post.category}
          </span>
          <h1 className="mt-4 text-h1 font-bold text-navy">{post.title}</h1>
          <p className="mt-4 text-sm text-grey">
            By {post.author} · {formatPostDate(post.publishedAt)}
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          {post.coverImage && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-card bg-bg-soft">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <article className="prose">{content}</article>

          <PostCTA />
        </div>
      </Section>
    </>
  );
}
