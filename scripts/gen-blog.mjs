#!/usr/bin/env node
/**
 * Build-time blog helper:
 *  1) copies blog post assets (images) from content/blog/<dir>/ to public/blog/<dir>/
 *  2) generates an RSS feed at public/blog/rss.xml
 * Run before `next build` (and `next dev`) via the prebuild/predev hooks.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const PUBLIC_BLOG = path.join(ROOT, "public", "blog");
const SITE_URL = "https://savant.chat";
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function dirDate(name) {
  const m = name.match(/^(\d{4}-\d{2}-\d{2})-/);
  return m ? m[1] : "1970-01-01";
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log("No blog directory found, skipping.");
    return;
  }
  fs.mkdirSync(PUBLIC_BLOG, { recursive: true });

  const dirs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const posts = [];
  for (const dir of dirs) {
    const src = path.join(BLOG_DIR, dir);
    // Copy assets
    const destDir = path.join(PUBLIC_BLOG, dir);
    for (const f of fs.readdirSync(src)) {
      if (IMG_EXT.has(path.extname(f).toLowerCase())) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(path.join(src, f), path.join(destDir, f));
      }
    }
    // Read frontmatter for RSS
    const mdxPath = path.join(src, "index.mdx");
    if (fs.existsSync(mdxPath)) {
      const { data, content } = matter(fs.readFileSync(mdxPath, "utf8"));
      const slug = data.slug || dir.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const firstPara =
        content
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .find((p) => p && !p.startsWith("#") && !p.startsWith("![")) || "";
      const excerpt = firstPara
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`>#]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 280);
      posts.push({ slug, title: data.title || dir, date: dirDate(dir), excerpt });
    }
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}/</link>
      <guid>${SITE_URL}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Savant Chat Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Smart Contract Security Insights and Updates</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  fs.writeFileSync(path.join(PUBLIC_BLOG, "rss.xml"), rss, "utf8");
  console.log(`✅ Blog: copied assets for ${dirs.length} posts, generated rss.xml (${posts.length} items)`);
}

main();
