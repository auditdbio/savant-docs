import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const packageJson = JSON.parse(readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')) as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
const configSource = readFileSync(path.resolve(process.cwd(), 'docusaurus.config.ts'), 'utf8');
const customCssPath = path.resolve(process.cwd(), 'src/css/custom.css');
const customCss = existsSync(customCssPath) ? readFileSync(customCssPath, 'utf8') : '';

function hasDependency(name: string): boolean {
  return Boolean(packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name]);
}

describe('blog math configuration', () => {
  test.each(['remark-math', 'rehype-katex', 'katex'])('declares %s as a package dependency', name => {
    expect(hasDependency(name)).toBe(true);
  });

  it('wires remark-math into docs markdown processing', () => {
    expect(configSource).toMatch(/import\s+remarkMath\s+from\s+['"]remark-math['"]/);
    expect(configSource).toMatch(/docs:\s*\{[\s\S]*?remarkPlugins:\s*\[[^\]]*remarkMath[^\]]*\]/);
  });

  it('wires rehype-katex into docs markdown processing', () => {
    expect(configSource).toMatch(/import\s+rehypeKatex\s+from\s+['"]rehype-katex['"]/);
    expect(configSource).toMatch(/docs:\s*\{[\s\S]*?rehypePlugins:\s*\[[^\]]*rehypeKatex[^\]]*\]/);
  });

  it('wires remark-math into blog markdown processing', () => {
    expect(configSource).toMatch(/blog:\s*\{[\s\S]*?remarkPlugins:\s*\[[^\]]*remarkMath[^\]]*\]/);
  });

  it('wires rehype-katex into blog markdown processing', () => {
    expect(configSource).toMatch(/blog:\s*\{[\s\S]*?rehypePlugins:\s*\[[^\]]*rehypeKatex[^\]]*\]/);
  });

  it('links KaTeX CSS locally rather than from a CDN', () => {
    const combinedSource = `${configSource}\n${customCss}`;

    expect(combinedSource).toMatch(/katex(?:\.min)?\.css/);
    expect(combinedSource).not.toMatch(/https?:\/\/[^\s'"]*katex[^\s'"]*\.css/i);
    expect(combinedSource).not.toMatch(/(?:cdn\.jsdelivr|unpkg|cdnjs)/i);
  });

  it('keeps blog authors in authors.yml', () => {
    expect(existsSync(path.resolve(process.cwd(), 'blog/authors.yml'))).toBe(true);
  });
});
