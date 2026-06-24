import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getAuthor, type BlogAuthor } from "@/config/blog-authors";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  dir: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  authors: BlogAuthor[];
  tags: string[];
  excerpt: string;
  content: string; // cleaned MDX-ready markdown
  readingMinutes: number;
}

function dirDate(dirName: string): string {
  const m = dirName.match(/^(\d{4}-\d{2}-\d{2})-/);
  return m ? m[1] : "1970-01-01";
}

/** Strip Docusaurus-isms MDX can't compile and rewrite relative asset paths. */
function cleanContent(raw: string, dirName: string): string {
  let out = raw;
  // Remove the truncate marker (HTML comments break MDX).
  out = out.replace(/<!--\s*truncate\s*-->/g, "");
  // Rewrite relative image/links (./asset) to the public blog asset path.
  out = out.replace(/\]\(\.\/([^)]+)\)/g, (_m, p) => `](/blog/${dirName}/${p})`);
  // Convert Docusaurus admonitions (:::type ... :::) to GFM blockquotes.
  out = out.replace(
    /^:::(\w+)\s*\n([\s\S]*?)\n:::\s*$/gm,
    (_m, type: string, body: string) => {
      const label = type.charAt(0).toUpperCase() + type.slice(1);
      const quoted = body
        .trim()
        .split("\n")
        .map((l) => `> ${l}`)
        .join("\n");
      return `> **${label}**\n>\n${quoted}`;
    },
  );
  return out;
}

function buildExcerpt(raw: string): string {
  const beforeTruncate = raw.split(/<!--\s*truncate\s*-->/)[0];
  const source = beforeTruncate || raw;
  // First meaningful paragraph that isn't an image or heading.
  const para = source
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith("!["));
  const text = (para ?? "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 220 ? text.slice(0, 217).trimEnd() + "…" : text;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getPostByDir(dirName: string): BlogPost {
  const file = path.join(BLOG_DIR, dirName, "index.mdx");
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const authorsRaw: string[] = Array.isArray(data.authors)
    ? data.authors
    : data.authors
      ? [data.authors]
      : [];
  return {
    slug: (data.slug as string) || dirName.replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    dir: dirName,
    title: (data.title as string) || dirName,
    date: dirDate(dirName),
    authors: authorsRaw.map(getAuthor),
    tags: (data.tags as string[]) || [],
    excerpt: buildExcerpt(content),
    content: cleanContent(content, dirName),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map(getPostByDir)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
