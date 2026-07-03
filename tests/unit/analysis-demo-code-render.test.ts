import path from 'node:path';
import {pathToFileURL} from 'node:url';

type CodeRenderModule = {
  prepareCanvasCodeLine?: (line: string, maxWidth?: number) => string;
  getCanvasCodeDrawWidth?: (canvasWidth: number, codeX: number) => number;
};

const analysisDemoUrl = pathToFileURL(
  path.resolve(process.cwd(), 'src/components/AnalysisDemo/AnalysisDemo.tsx'),
).href;

describe('AnalysisDemo code canvas rendering helpers', () => {
  it('exports a full-line preparation helper', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as CodeRenderModule;

    expect(typeof module.prepareCanvasCodeLine).toBe('function');
  });

  it('does not add ellipsis to long code lines', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as CodeRenderModule;
    const longLine = 'mapping(address account => mapping(bytes32 role => uint256 nonce)) internal roleNoncesByAccountAndRole;';

    expect(module.prepareCanvasCodeLine?.(longLine, 64)).toBe(longLine);
    expect(module.prepareCanvasCodeLine?.(longLine, 64)).not.toContain('…');
  });

  it('uses the full remaining canvas width for code drawing', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as CodeRenderModule;

    expect(module.getCanvasCodeDrawWidth?.(620, 52)).toBe(568);
  });
});
