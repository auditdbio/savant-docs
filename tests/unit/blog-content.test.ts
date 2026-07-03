import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';

const blogDir = path.resolve(process.cwd(), 'blog');
const articleDirs = [
  '2025-03-12-howto-load-non-standard-projects-to-savant-chat',
  '2026-02-12-how-ai-detects-smart-contract-vulnerabilities',
  '2026-04-03-building-autonomous-auditor-vulnerability-reference-book',
];
const scaffoldPosts = [
  '2019-05-28-first-blog-post.mdx',
  '2019-05-29-long-blog-post.mdx',
  '2021-08-01-mdx-blog-post.mdx',
  '2021-08-26-welcome',
];

function articlePath(slug: string): string {
  return path.join(blogDir, slug);
}

function articleSource(slug: string): string {
  const filePath = path.join(articlePath(slug), 'index.mdx');

  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

function frontMatter(slug: string): string {
  return articleSource(slug).match(/^---\n(?<frontMatter>[\s\S]*?)\n---/)?.groups?.frontMatter ?? '';
}

describe('savant-docs blog content', () => {
  it('contains exactly the three savant-docs article directories', () => {
    const directories = existsSync(blogDir)
      ? readdirSync(blogDir).filter(entry => statSync(path.join(blogDir, entry)).isDirectory())
      : [];

    expect(directories.sort()).toEqual(articleDirs.sort());
  });

  test.each(articleDirs)('has the %s article directory', slug => {
    expect(existsSync(articlePath(slug))).toBe(true);
  });

  test.each(articleDirs)('has index.mdx for %s', slug => {
    expect(existsSync(path.join(articlePath(slug), 'index.mdx'))).toBe(true);
  });

  test.each(scaffoldPosts)('removes scaffold blog post %s', post => {
    expect(existsSync(path.join(blogDir, post))).toBe(false);
  });

  test.each(articleDirs)('keeps a front-matter title in %s', slug => {
    expect(frontMatter(slug)).toMatch(/^title:\s*.+$/m);
  });

  test.each(articleDirs)('keeps a front-matter date in %s', slug => {
    expect(frontMatter(slug)).toMatch(/^date:\s*\d{4}-\d{2}-\d{2}/m);
  });
});
