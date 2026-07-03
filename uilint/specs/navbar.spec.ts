import {
  alignedHorizontally,
  colorDistance,
  defineLayoutSpec,
  eq,
  gte,
  heightIn,
  inside,
  lte,
  singleLineText,
  textDoesNotOverflow,
  visible,
  widthIn,
  widthMatches,
} from '@uilint/core';
import {MIN_TEXT_BG_DISTANCE} from '@uilint/core';

export const navbarSpec = defineLayoutSpec(ctx => {
  const navbar = ctx.el('.navbar', 'navbar');
  const logo = ctx.el('.navbar__logo', 'navbar logo');
  const brand = ctx.el('.navbar__brand', 'navbar brand');
  const brandTitle = ctx.el('.navbar__title', 'navbar brand title');
  const links = ctx.el('.navbar__items', 'navbar links');
  const cta = ctx.el('.navbar-cta', 'navbar CTA');

  ctx.must(
    visible(logo, true, 'navbar/logo-visible'),
    visible(brand, true, 'navbar/brand-visible'),
    visible(brandTitle, true, 'navbar/brand-title-visible'),
    visible(links, true, 'navbar/links-visible'),
    visible(cta, true, 'navbar/cta-visible'),
    inside(logo, navbar, undefined, 'navbar/logo-inside'),
    inside(brand, navbar, undefined, 'navbar/brand-inside'),
    inside(links, navbar, undefined, 'navbar/links-inside'),
    inside(cta, navbar, undefined, 'navbar/cta-inside'),
    alignedHorizontally([logo, links, cta], 2, 'navbar/items-aligned-horizontal'),
    inside(navbar, ctx.view, {top: eq(0), left: gte(0), right: gte(0)}, 'navbar/inside-viewport-top'),
    widthMatches(navbar, ctx.view, {tolerance: 0.01}, 'navbar/spans-viewport-width'),
    heightIn(navbar, gte(56), 'navbar/height-min'),
    heightIn(navbar, lte(80), 'navbar/height-max'),
    widthIn(logo, gte(24), 'navbar/logo-width-min'),
    singleLineText(brandTitle, 'navbar/brand-title-single-line'),
    textDoesNotOverflow(brandTitle, 'navbar/brand-title-no-overflow'),
    colorDistance(cta, navbar, gte(MIN_TEXT_BG_DISTANCE), undefined, 'navbar/cta-contrast'),
  );
});
