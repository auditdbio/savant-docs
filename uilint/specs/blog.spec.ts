import {
  below,
  countIs,
  defineLayoutSpec,
  eq,
  forAll,
  gte,
  inside,
  lte,
  textDoesNotOverflow,
  textLinesAtMost,
  widthIn,
  widthMatches,
} from '@uilint/core';
import type {ElemRef, LayoutConstraint, Violation} from '@uilint/core';

function noHorizontalOverflow(target: ElemRef, name: string): LayoutConstraint {
  return rt => {
    const el = rt.el(target);

    return {
      name,
      check() {
        const violations: Violation[] = [];

        if (el.left < -1 || el.right > rt.view.width + 1) {
          violations.push({
            constraint: name,
            message: `${el.name} overflows horizontally: left ${el.left}, right ${el.right}, viewport ${rt.view.width}`,
          });
        }

        if (el.width > rt.view.width + 1) {
          violations.push({
            constraint: name,
            message: `${el.name} is wider than viewport: got ${el.width}, expected <= ${rt.view.width}`,
          });
        }

        return violations;
      },
    };
  };
}

function navbarAtTop(ctx: Parameters<typeof defineLayoutSpec>[0] extends (ctx: infer C) => unknown ? C : never) {
  const navbar = ctx.el('.navbar', 'navbar');

  return [
    inside(navbar, ctx.view, {top: eq(0), left: gte(0), right: gte(0)}, 'navbar/blog-at-top'),
    widthMatches(navbar, ctx.view, {tolerance: 0.01}, 'navbar/blog-spans-viewport-width'),
  ];
}

export const blogListSpec = defineLayoutSpec(ctx => {
  const main = ctx.el('main', 'blog list main');
  const footer = ctx.el('.footer', 'footer');
  const posts = ctx.group('main article', 'blog list posts');

  ctx.must(
    ...navbarAtTop(ctx),
    countIs(posts, eq(2), 'hero/blog-list-post-count'),
    noHorizontalOverflow(main, 'hero/blog-list-no-horizontal-overflow'),
    below(footer, main, gte(0), 'footer/blog-list-below-content'),
  );
});

export const blogArticleSpec = defineLayoutSpec(ctx => {
  const main = ctx.el('main', 'blog article main');
  const article = ctx.el('main article', 'blog article');
  const title = ctx.el('main article h1', 'blog article title');
  const content = ctx.el('main article .markdown', 'blog article content');
  const firstParagraph = ctx.el('main article .markdown p', 'blog first paragraph');
  const images = ctx.group('main article .markdown img', 'blog article images');
  const footer = ctx.el('.footer', 'footer');

  ctx.must(
    ...navbarAtTop(ctx),
    textDoesNotOverflow(title, 'hero/blog-article-title-no-overflow'),
    textDoesNotOverflow(firstParagraph, 'hero/blog-first-paragraph-no-overflow'),
    forAll(images, image => inside(image, content), 'coverage/blog-images-inside-content-column'),
    noHorizontalOverflow(main, 'hero/blog-article-no-horizontal-overflow'),
    below(footer, main, gte(0), 'footer/blog-article-below-content'),
    rt => (rt.viewportClass === 'desktop'
      ? [
        textLinesAtMost(title, 3, 'hero/blog-article-h1-lines-desktop'),
        widthIn(content, gte(600), 'coverage/blog-content-column-width-min-desktop'),
        widthIn(content, lte(860), 'coverage/blog-content-column-width-max-desktop'),
      ]
      : []),
  );
});
