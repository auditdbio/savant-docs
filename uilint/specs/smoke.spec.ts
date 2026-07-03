import {defineLayoutSpec, gte, inside, visible} from '@uilint/core';

export const homeSmokeSpec = defineLayoutSpec(ctx => {
  const app = ctx.el('#__docusaurus');

  ctx.must(
    visible(app, true),
    inside(app, ctx.view, {top: gte(0), left: gte(0), right: gte(0)}),
  );
});
