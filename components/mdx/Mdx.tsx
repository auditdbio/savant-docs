import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

const components: MDXComponents = {
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props) => <img {...props} loading="lazy" />,
  a: (props) => {
    const href = props.href ?? "";
    const external = /^https?:\/\//.test(href);
    return <a {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} />;
  },
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}

export default Mdx;
