import type { Metadata } from "next";
import { format } from "date-fns";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Smart Contract Security Insights and Updates from Savant Chat.",
  alternates: { canonical: "/blog/", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="container-max py-12">
      <div className="mb-10 max-w-prose">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-strong">Blog</h1>
        <p className="mt-3 text-lg text-text-muted">Smart contract security insights and updates.</p>
      </div>

      <div className="mx-auto grid max-w-prose gap-6">
        {posts.map((post) => (
          <Card key={post.slug} hoverable>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {post.tags.slice(0, 4).map((t) => (
                <Badge key={t} tone="plum" size="sm">{t}</Badge>
              ))}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-text-strong">
              <a href={`/blog/${post.slug}`} className="hover:text-flame-600">{post.title}</a>
            </h2>
            <p className="mt-2 text-text-muted">{post.excerpt}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {post.authors.map((a) => (
                  <Avatar key={a.key} src={a.imageUrl} name={a.name} size={32} />
                ))}
              </div>
              <div className="text-sm text-text-muted">
                <span className="font-medium text-text-body">
                  {post.authors.map((a) => a.name).join(", ")}
                </span>
                <span className="mx-2">·</span>
                <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
                <span className="mx-2">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>

            <a
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-text-link hover:underline"
            >
              Read more
              <Icon name="ArrowRight" size={15} />
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
