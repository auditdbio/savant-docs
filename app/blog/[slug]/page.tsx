import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Mdx } from "@/components/mdx/Mdx";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/config/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}/`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: post.authors.map((a) => ({ "@type": "Person", name: a.name })),
    publisher: { "@type": "Organization", name: "Savant Chat", url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}/`,
  };

  return (
    <article className="container-max py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-prose">
        <a href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text-strong">
          <Icon name="ArrowLeft" size={15} /> Back to blog
        </a>

        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} tone="plum" size="sm">{t}</Badge>
          ))}
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-strong">{post.title}</h1>

        <div className="mt-5 flex items-center gap-3 border-b border-[var(--border-subtle)] pb-6">
          <div className="flex -space-x-2">
            {post.authors.map((a) => (
              <Avatar key={a.key} src={a.imageUrl} name={a.name} size={40} />
            ))}
          </div>
          <div className="text-sm text-text-muted">
            <div className="font-semibold text-text-body">{post.authors.map((a) => a.name).join(", ")}</div>
            <div>
              <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
              <span className="mx-2">·</span>
              {post.readingMinutes} min read
            </div>
          </div>
        </div>
      </div>

      <div className="prose-savant mt-8">
        <Mdx source={post.content} />
      </div>

      {/* Author bios */}
      <div className="mx-auto mt-12 max-w-prose border-t border-[var(--border-subtle)] pt-8">
        {post.authors.map((a) => (
          <div key={a.key} className="mb-4 flex items-start gap-4">
            <Avatar src={a.imageUrl} name={a.name} size={48} />
            <div>
              <div className="font-semibold text-text-strong">{a.name}</div>
              <div className="text-sm text-text-muted">{a.title}</div>
              <div className="mt-1 flex gap-3 text-sm">
                {a.x && (
                  <a href={`https://x.com/${a.x}`} target="_blank" rel="noopener noreferrer" className="text-text-link hover:underline">
                    @{a.x}
                  </a>
                )}
                {a.github && (
                  <a href={`https://github.com/${a.github}`} target="_blank" rel="noopener noreferrer" className="text-text-link hover:underline">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
