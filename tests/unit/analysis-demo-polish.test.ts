import path from 'node:path';
import {pathToFileURL} from 'node:url';

type PanelLayoutModule = {
  measureAnalysisPanelTextHeight?: (text: string, panelWidth: number) => number;
  getAnalysisPanelLayout?: (messages: Array<{text: string}>, panelWidth: number) => {
    contentHeight: number;
    panelHeight: number;
    clipsText: boolean;
  };
};

const analysisDemoUrl = pathToFileURL(
  path.resolve(process.cwd(), 'src/components/AnalysisDemo/AnalysisDemo.tsx'),
).href;

describe('AnalysisDemo R1 polish layout helpers', () => {
  it('exports panel measurement helpers for clipping-safe layout', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelLayoutModule;

    expect(typeof module.measureAnalysisPanelTextHeight).toBe('function');
    expect(typeof module.getAnalysisPanelLayout).toBe('function');
  });

  it('sizes the full analysis panel so long vulnerability text is not clipped mid-word', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelLayoutModule;
    const layout = module.getAnalysisPanelLayout?.([
      {text: 'Vulnerability: arbitrary external call can grant access to the ERC1967 implementation slot and leak privileged execution paths.'},
      {text: 'Remediation: gate the path, validate caller capabilities, and reject unknown delegatecall targets before execution.'},
    ], 220);

    expect(layout).toBeDefined();
    expect(layout?.clipsText).toBe(false);
    expect(layout?.panelHeight).toBeGreaterThanOrEqual(layout?.contentHeight ?? Number.POSITIVE_INFINITY);
  });
});
