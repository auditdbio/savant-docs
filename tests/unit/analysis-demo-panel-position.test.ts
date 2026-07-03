import path from 'node:path';
import {pathToFileURL} from 'node:url';

type DemoBlock = {
  startLine: number;
  endLine: number;
};

type PanelPositionModule = {
  calculateInitialActivePanelTop?: (
    associatedBlock: DemoBlock,
    anchorPanelHeight: number,
    currentScrollY: number,
    paddingTop: number,
    lineHeight: number,
    containerHeight: number,
    topMargin?: number,
    minVisible?: number,
  ) => number;
  calculateActivePanelTopWithInitialOffset?: (
    associatedBlock: DemoBlock,
    anchorPanelHeight: number,
    currentScrollY: number,
    paddingTop: number,
    lineHeight: number,
    initialOffset: number,
  ) => number;
  calculateActiveTypingPanelTop?: (
    associatedBlock: DemoBlock,
    panelHeight: number,
    currentScrollY: number,
    paddingTop: number,
    lineHeight: number,
    containerHeight: number,
    edgeMargin?: number,
  ) => number;
  calculatePanelTopWithinContainer?: (
    associatedBlock: DemoBlock,
    panelHeight: number,
    currentScrollY: number,
    paddingTop: number,
    lineHeight: number,
    containerHeight: number,
    verticalOffset?: number,
  ) => number;
};

const analysisDemoUrl = pathToFileURL(
  path.resolve(process.cwd(), 'src/components/AnalysisDemo/AnalysisDemo.tsx'),
).href;

function legacyCenterAlignedTop(
  associatedBlock: DemoBlock,
  panelHeight: number,
  currentScrollY: number,
  paddingTop: number,
  lineHeight: number,
): number {
  const blockHeightPx = (associatedBlock.endLine - associatedBlock.startLine + 1) * lineHeight;
  const blockTopOnCanvas = paddingTop + ((associatedBlock.startLine - 1) * lineHeight) - currentScrollY;
  const blockCenterY = blockTopOnCanvas + (blockHeightPx / 2);

  return blockCenterY - (panelHeight / 2);
}

describe('AnalysisDemo panel vertical positioning', () => {
  const loadModule = async () => {
    return await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
  };

  function initialActiveTop(
    module: PanelPositionModule,
    block: DemoBlock,
    anchorPanelHeight: number,
    scrollY: number,
    paddingTop: number,
    lineHeight: number,
    containerHeight: number,
    topMargin: number,
    minVisible: number,
  ): number {
    if (module.calculateInitialActivePanelTop) {
      return module.calculateInitialActivePanelTop(
        block,
        anchorPanelHeight,
        scrollY,
        paddingTop,
        lineHeight,
        containerHeight,
        topMargin,
        minVisible,
      );
    }

    if (module.calculateActiveTypingPanelTop) {
      return module.calculateActiveTypingPanelTop(
        block,
        anchorPanelHeight,
        scrollY,
        paddingTop,
        lineHeight,
        containerHeight,
        topMargin,
      );
    }

    return legacyCenterAlignedTop(block, anchorPanelHeight, scrollY, paddingTop, lineHeight);
  }

  function topAfterAppearance(
    module: PanelPositionModule,
    block: DemoBlock,
    anchorPanelHeight: number,
    scrollY: number,
    paddingTop: number,
    lineHeight: number,
    initialOffset: number,
    containerHeight: number,
    topMargin: number,
  ): number {
    if (module.calculateActivePanelTopWithInitialOffset) {
      return module.calculateActivePanelTopWithInitialOffset(
        block,
        anchorPanelHeight,
        scrollY,
        paddingTop,
        lineHeight,
        initialOffset,
      );
    }

    if (module.calculateActiveTypingPanelTop) {
      return module.calculateActiveTypingPanelTop(
        block,
        anchorPanelHeight,
        scrollY,
        paddingTop,
        lineHeight,
        containerHeight,
        topMargin,
      );
    }

    return legacyCenterAlignedTop(block, anchorPanelHeight, scrollY, paddingTop, lineHeight);
  }

  describe('active panel initial clamp and offset', () => {
    it('clamps the first visible top for a block above the container', async () => {
      const module = await loadModule();
      const block = {startLine: 2, endLine: 3};
      const topMargin = 12;
      const minVisible = 40;
      const topPx = initialActiveTop(module, block, 125, 140, 20, 16, 494, topMargin, minVisible);

      expect(topPx).toBe(topMargin);
      expect(topPx).toBeGreaterThanOrEqual(topMargin);
    });

    it('lets the active panel scroll away after appearance using the remembered offset', async () => {
      const module = await loadModule();
      const block = {startLine: 2, endLine: 3};
      const topMargin = 12;
      const minVisible = 40;
      const anchorPanelHeight = 125;
      const initialScrollY = 140;
      const initialTop = initialActiveTop(module, block, anchorPanelHeight, initialScrollY, 20, 16, 494, topMargin, minVisible);
      const anchoredAtAppearance = legacyCenterAlignedTop(block, anchorPanelHeight, initialScrollY, 20, 16);
      const initialOffset = initialTop - anchoredAtAppearance;
      const nextScrollY = 340;
      const topPx = topAfterAppearance(module, block, anchorPanelHeight, nextScrollY, 20, 16, initialOffset, 494, topMargin);

      expect(topPx).toBe(legacyCenterAlignedTop(block, anchorPanelHeight, nextScrollY, 20, 16) + initialOffset);
      expect(topPx).toBeLessThan(0);
    });

    it('keeps the active panel top fixed when panel height grows after appearance', async () => {
      const module = await loadModule();
      const block = {startLine: 16, endLine: 19};
      const topMargin = 12;
      const minVisible = 40;
      const anchorPanelHeight = 125;
      const initialTop = initialActiveTop(module, block, anchorPanelHeight, 0, 20, 16, 494, topMargin, minVisible);
      const initialOffset = initialTop - legacyCenterAlignedTop(block, anchorPanelHeight, 0, 20, 16);
      const grownPanelTop = topAfterAppearance(module, block, anchorPanelHeight, 0, 20, 16, initialOffset, 494, topMargin);

      expect(grownPanelTop).toBe(initialTop);
    });

    it('uses zero offset for a normal middle block so behavior matches legacy', async () => {
      const module = await loadModule();
      const block = {startLine: 16, endLine: 19};
      const topMargin = 12;
      const minVisible = 40;
      const anchorPanelHeight = 125;
      const initialTop = initialActiveTop(module, block, anchorPanelHeight, 0, 20, 16, 494, topMargin, minVisible);
      const anchoredTop = legacyCenterAlignedTop(block, anchorPanelHeight, 0, 20, 16);
      const initialOffset = initialTop - anchoredTop;
      const nextTop = topAfterAppearance(module, block, anchorPanelHeight, 32, 20, 16, initialOffset, 494, topMargin);

      expect(initialOffset).toBe(0);
      expect(nextTop).toBe(legacyCenterAlignedTop(block, anchorPanelHeight, 32, 20, 16));
    });
  });

  it('centers the panel on a block in the middle of the canvas', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
    const calculate = module.calculatePanelTopWithinContainer;
    const block = {startLine: 16, endLine: 19};
    const topPx = calculate?.(
      block,
      125,
      0,
      20,
      16,
      494,
    );

    expect(topPx).toBe(legacyCenterAlignedTop(block, 125, 0, 20, 16));
  });

  it('allows a negative top when scroll moves the associated block above the container', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
    const calculate = module.calculatePanelTopWithinContainer;
    const block = {startLine: 2, endLine: 3};
    const topPx = calculate?.(
      block,
      125,
      140,
      20,
      16,
      494,
    );

    expect(topPx).toBe(legacyCenterAlignedTop(block, 125, 140, 20, 16));
    expect(topPx).toBeLessThan(0);
  });

  it('allows a top below the container when the associated block is below the viewport', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
    const calculate = module.calculatePanelTopWithinContainer;
    const panelHeight = 125;
    const containerHeight = 494;
    const block = {startLine: 55, endLine: 56};
    const topPx = calculate?.(
      block,
      panelHeight,
      0,
      20,
      16,
      containerHeight,
    );

    expect(topPx).toBe(legacyCenterAlignedTop(block, panelHeight, 0, 20, 16));
    expect(topPx).toBeGreaterThan(containerHeight);
  });

  it('positions pinned panels with the same scroll-dependent center formula', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
    const calculate = module.calculatePanelTopWithinContainer;
    const pinnedPanelHeight = 100;
    const block = {startLine: 10, endLine: 13};
    const topPx = calculate?.(
      block,
      pinnedPanelHeight,
      300,
      20,
      16,
      494,
    );

    expect(topPx).toBe(legacyCenterAlignedTop(block, pinnedPanelHeight, 300, 20, 16));
  });

  it('keeps pinned panels unclamped for the same near-top block that active typing clamps', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
    const calculate = module.calculatePanelTopWithinContainer;
    const block = {startLine: 2, endLine: 3};
    const topPx = calculate?.(
      block,
      125,
      140,
      20,
      16,
      494,
    );

    expect(topPx).toBe(legacyCenterAlignedTop(block, 125, 140, 20, 16));
    expect(topPx).toBeLessThan(0);
  });

  it('ignores container height when calculating legacy panel top', async () => {
    const module = await import(/* @vite-ignore */ analysisDemoUrl) as PanelPositionModule;
    const calculate = module.calculatePanelTopWithinContainer;
    const block = {startLine: 28, endLine: 30};
    const expected = legacyCenterAlignedTop(block, 125, 20, 20, 16);

    expect(calculate?.(block, 125, 20, 20, 16, 320)).toBe(expected);
    expect(calculate?.(block, 125, 20, 20, 16, 900)).toBe(expected);
  });
});
