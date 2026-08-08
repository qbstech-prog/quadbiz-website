import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * File-based blog content.
 *
 * Posts live as `.mdx` files in `content/blog/` with YAML frontmatter. This is
 * the local equivalent of the planned Sanity `post` model — the same fields —
 * so a Sanity data source can replace these readers later without changing the
 * page components.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string; // ~160 chars — cards + meta description fallback
  category: string;
  author: string; // defaults to "Quadbiz Team"
  publishedAt: string; // ISO date
  coverImage?: string;
  coverImageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Post extends PostMeta {
  body: string; // raw MDX
}

interface RawPost {
  slug: string;
  data: Record<string, unknown>;
  content: string;
}

function readAll(): RawPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: String(data.category ?? "Guides"),
    author: String(data.author ?? "Quadbiz Team"),
    publishedAt: String(data.publishedAt ?? ""),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    coverImageAlt: data.coverImageAlt ? String(data.coverImageAlt) : undefined,
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
  };
}

/** All published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return readAll()
    .map(({ slug, data }) => toMeta(slug, data))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** A single post (with MDX body) by slug, or null if not found. */
export function getPostBySlug(slug: string): Post | null {
  const found = readAll().find((p) => p.slug === slug);
  if (!found) return null;
  return { ...toMeta(slug, found.data), body: found.content };
}

/** Format an ISO date for display, e.g. "6 August 2026". */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/** Brand accent colour per category (Tailwind text/bg utilities). */
export function categoryAccent(category: string): { text: string; bg: string; from: string } {
  switch (category) {
    case "Subsidy":
      return { text: "text-amber", bg: "bg-amber/10", from: "from-amber/25" };
    case "How-To":
      return { text: "text-navy", bg: "bg-navy/10", from: "from-navy/20" };
    case "Agricultural":
      return { text: "text-green", bg: "bg-green/10", from: "from-green/25" };
    case "Cost & Savings":
    default:
      return { text: "text-orange", bg: "bg-orange/10", from: "from-orange/25" };
  }
}
