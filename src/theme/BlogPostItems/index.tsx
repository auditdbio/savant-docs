import React from "react";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/BlogPostItems";
import { Card } from "@site/src/components/ui/Card";
import { Badge } from "@site/src/components/ui/Badge";
import { Avatar } from "@site/src/components/ui/Avatar";
import { Icon } from "@site/src/components/ui/Icon";

/**
 * Swizzled blog list — renders each post as a design-system Card
 * (matches the marketing visual): tags, title, excerpt, authors, meta, read more.
 */
export default function BlogPostItems({ items }: Props): React.ReactElement {
  return (
    <div className="savant-page mx-auto grid max-w-prose gap-6">
      {items.map(({ content: BlogPostContent }) => {
        const m = BlogPostContent.metadata as any;
        const authors = (m.authors ?? []) as Array<{
          name?: string;
          imageURL?: string;
          url?: string;
        }>;
        const tags = (m.tags ?? []) as Array<{ label: string; permalink: string }>;
        return (
          <Card key={m.permalink} hoverable>
            {tags.length > 0 && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {tags.slice(0, 4).map((t) => (
                  <Badge key={t.permalink} tone="plum" size="sm">
                    {t.label}
                  </Badge>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold tracking-tight">
              <Link
                to={m.permalink}
                className="text-text-strong no-underline transition-colors hover:text-flame-600 hover:no-underline"
              >
                {m.title}
              </Link>
            </h2>

            {m.description && <p className="mt-2 text-text-muted">{m.description}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {authors.length > 0 && (
                <div className="flex -space-x-2">
                  {authors.map((a, i) => (
                    <Avatar key={a.name ?? i} src={a.imageURL} name={a.name} size={32} />
                  ))}
                </div>
              )}
              <div className="text-sm text-text-muted">
                {authors.length > 0 && (
                  <>
                    <span className="font-medium text-text-body">
                      {authors.map((a) => a.name).filter(Boolean).join(", ")}
                    </span>
                    <span className="mx-2">·</span>
                  </>
                )}
                <time dateTime={m.date}>{m.formattedDate}</time>
                {m.readingTime ? (
                  <>
                    <span className="mx-2">·</span>
                    <span>{Math.ceil(m.readingTime)} min read</span>
                  </>
                ) : null}
              </div>
            </div>

            <Link
              to={m.permalink}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-text-link no-underline hover:underline"
            >
              Read more
              <Icon name="ArrowRight" size={15} />
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
