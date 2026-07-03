import {render, screen} from '@testing-library/react';
import type {ComponentType} from 'react';

type AnalysisDemoModule = {
  default?: ComponentType;
  getDemoColors?: (mode: 'light' | 'dark') => Record<string, string>;
  codeData?: string;
  blocksData?: Array<{
    isVulnerable?: boolean;
  }>;
};

async function loadAnalysisDemo(): Promise<{loaded: boolean; mod?: AnalysisDemoModule}> {
  try {
    const path = '../../src/components/AnalysisDemo';
    const mod = await import(/* @vite-ignore */ path) as AnalysisDemoModule;

    return {loaded: true, mod};
  } catch {
    return {loaded: false};
  }
}

describe('AnalysisDemo module contract', () => {
  test.each([
    ['light', 'bg', '#FFFFFF'],
    ['light', 'code', '#111827'],
    ['light', 'gutter', '#6b7280'],
    ['light', 'shikiTheme', 'github-light'],
    ['dark', 'bg', '#0C0810'],
    ['dark', 'code', '#E5E7EB'],
    ['dark', 'gutter', '#877C93'],
    ['dark', 'shikiTheme', 'github-dark'],
  ] as const)('getDemoColors(%s).%s is %s', async (mode, key, expected) => {
    const {loaded, mod} = await loadAnalysisDemo();

    expect(loaded).toBe(true);
    if (!loaded) return;

    expect(mod?.getDemoColors?.(mode)?.[key]).toBe(expected);
  });

  it('exports Solidity code data', async () => {
    const {loaded, mod} = await loadAnalysisDemo();

    expect(loaded).toBe(true);
    if (!loaded) return;

    expect(mod?.codeData).toContain('pragma solidity');
  });

  it('exports at least one vulnerable analysis block', async () => {
    const {loaded, mod} = await loadAnalysisDemo();

    expect(loaded).toBe(true);
    if (!loaded) return;

    expect(mod?.blocksData?.some(block => block.isVulnerable === true)).toBe(true);
  });

  it('exports at least one safe analysis block', async () => {
    const {loaded, mod} = await loadAnalysisDemo();

    expect(loaded).toBe(true);
    if (!loaded) return;

    expect(mod?.blocksData?.some(block => block.isVulnerable === false)).toBe(true);
  });

  it('renders an SSR-safe fallback container', async () => {
    const {loaded, mod} = await loadAnalysisDemo();

    expect(loaded).toBe(true);
    if (!loaded || !mod?.default) return;

    const Demo = mod.default;
    render(<Demo />);

    expect(screen.getByTestId('analysis-demo')).toBeInTheDocument();
  });
});
