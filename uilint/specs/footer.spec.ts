import {
  alignedHorizontally,
  below,
  countIs,
  defineLayoutSpec,
  eq,
  forAll,
  gte,
  heightIn,
  inside,
  textDoesNotOverflow,
  visible,
  widthMatches,
} from '@uilint/core';

export const footerSpec = defineLayoutSpec(ctx => {
  const footer = ctx.el('.footer', 'footer');
  const main = ctx.el('main', 'main content');
  const columns = ctx.group('.footer__col', 'footer columns');
  const firstColumn = ctx.el('.footer__col:nth-of-type(1)', 'first footer column');
  const secondColumn = ctx.el('.footer__col:nth-of-type(2)', 'second footer column');
  const thirdColumn = ctx.el('.footer__col:nth-of-type(3)', 'third footer column');
  const titles = ctx.group('.footer__title', 'footer titles');
  const links = ctx.group('.footer__link-item', 'footer links');
  const firstTitle = ctx.el('.footer__title', 'first footer title');
  const firstLink = ctx.el('.footer__link-item', 'first footer link');
  const copyright = ctx.el('.footer__copyright', 'footer copyright');

  ctx.must(
    visible(footer, true, 'footer/visible'),
    below(footer, main, gte(0), 'footer/below-main-content'),
    countIs(columns, eq(3), 'footer/column-count'),
    visible(firstColumn, true, 'footer/first-column-visible'),
    visible(secondColumn, true, 'footer/second-column-visible'),
    visible(thirdColumn, true, 'footer/third-column-visible'),
    inside(firstColumn, footer, undefined, 'footer/first-column-inside'),
    inside(secondColumn, footer, undefined, 'footer/second-column-inside'),
    inside(thirdColumn, footer, undefined, 'footer/third-column-inside'),
    textDoesNotOverflow(firstTitle, 'footer/first-title-no-overflow'),
    textDoesNotOverflow(firstLink, 'footer/first-link-no-overflow'),
    forAll(columns, column => inside(column, footer), 'footer/columns-inside'),
    forAll(titles, title => textDoesNotOverflow(title), 'footer/title-text-no-overflow'),
    forAll(links, link => textDoesNotOverflow(link), 'footer/link-text-no-overflow'),
    textDoesNotOverflow(copyright, 'footer/copyright-no-overflow'),
    heightIn(footer, gte(120), 'footer/height-min'),
    rt => (rt.viewportClass === 'desktop'
      ? [
        alignedHorizontally(columns, 2, 'footer/columns-aligned-horizontal'),
        widthMatches(secondColumn, firstColumn, {tolerance: 0.5}, 'footer/second-column-width-compatible'),
        widthMatches(thirdColumn, firstColumn, {tolerance: 0.5}, 'footer/third-column-width-compatible'),
      ]
      : [
        below(secondColumn, firstColumn, gte(0), 'footer/second-column-below-first-mobile'),
        below(thirdColumn, secondColumn, gte(0), 'footer/third-column-below-second-mobile'),
      ]),
  );
});
