import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/pricing",
    "/how-it-works",
    "/use-cases",
    "/ecosystem",
    "/faq",
    "/blog",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/refund-policy",
    "/imprint",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "daily" as const,
    priority: route === "/" ? 1 : 0.5,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
