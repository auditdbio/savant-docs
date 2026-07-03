import {defineScenario} from '@uilint/cli';
import {blogArticleSpec, blogListSpec} from '../specs/blog.spec';

export default defineScenario('blog', async runtime => {
  await runtime.goto('/blog');
  await runtime.page.waitForLoadState('networkidle');
  await runtime.snapshot('blog-list', blogListSpec);

  await runtime.goto('/blog/building-autonomous-auditor-vulnerability-reference-book');
  await runtime.page.waitForLoadState('networkidle');
  await runtime.snapshot('blog-reference-book', blogArticleSpec);
});
