import React, { useRef, useState, useEffect, useCallback } from 'react';
import AnalysisSidePanel from './AnalysisSidePanel';
import { codeData, blocksData } from './codeData';
import * as shiki from 'shiki';

export interface CodeBlock {
  id: number;
  startLine: number;
  endLine: number;
  isVulnerable: boolean;
  analysisText: {
    processing: string;
    summary: string;
    vulnerability?: string; // Optional: for vulnerable blocks
    remediation?: string; // Optional: for vulnerable blocks
  };
  analyzedColor?: string; // To store the final color (green/red) of the highlight
}

// Interface for structured AI messages
interface AiMessagePart {
  id: string;
  text: string;
  isTitle?: boolean;
  color?: string;
  isProcessing?: boolean; // True if it's part of the initial "processing..." steps
  isSummary?: boolean;
  isVulnerability?: boolean;
  isRemediation?: boolean;
  requiresNewline?: boolean; // Whether to add a newline after this part if it's not the last of its kind
}

// Interface for props of a panel that remains visible for a vulnerable block
interface PinnedPanelProps {
  blockId: number;
  messages: AiMessagePart[];
  topPx: number;
  heightPx: number;
  panelWidth: number; // Should be the same as ANALYSIS_PANEL_WIDTH
  isNewlyPinned?: boolean; // Flag to trigger animation on first appearance
}

type BlockState =
  | 'idle' // Waiting to start or between blocks
  | 'scrolling_to_block'
  | 'highlighting_initial' // Blue highlight appearing
  | 'analyzing_text_appearing' // AI text typing out
  | 'analysis_pause' // Pause after AI text is fully typed
  | 'transforming_highlight_safe' // Blue to Green
  | 'transforming_highlight_vulnerable' // Blue to Red
  | 'scrolling_with_vulnerability' // Red highlight and AI window scroll to next
  | 'completed_safe_block_scroll_away' // Green highlight scrolls away, AI window hidden
  | 'rewinding_to_top' // State for scrolling up before loop
  | 'preparing_vulnerable_panel_pin' // State for vulnerable panel transformation
  | 'vulnerable_block_pause_before_scroll'; // State for delay before scrolling vulnerable block

// Canvas rendering constants
const LINE_HEIGHT = 16; // px
const FONT_FAMILY = 'monospace';
const PADDING_TOP = 20; // px
const LINE_NUMBER_GUTTER_WIDTH = 42; // px for line numbers an its padding
const LINE_NUMBER_COLOR = '#555555'; // Color for line numbers (darker grey)
const CODE_TEXT_COLOR = '#000000'; // Color for code text (black)
const BACKGROUND_COLOR = '#FFFFFF'; // Canvas background (white)

const DEMO_CONTAINER_HEIGHT = 494; // Height of the main demo container in px
const PANEL_VERTICAL_MARGIN = 265; // Vertical margin for panel from container edges (e.g. top and bottom)
const PANEL_VERTICAL_OFFSET = -4; // Vertical offset for panel from the top of the code block
const MIN_PANEL_HEIGHT = 100; // Minimum height for the analysis panel in px

const HIGHLIGHT_COLOR_INITIAL_RGB = '59, 130, 255'; // Blueish, for initial highlight
const HIGHLIGHT_COLOR_SAFE_RGB = '46, 204, 113'; // Greenish for safe blocks
const HIGHLIGHT_COLOR_VULNERABLE_RGB = '231, 76, 60'; // Reddish for vulnerable blocks
const HIGHLIGHT_TARGET_OPACITY = 0.2;

const HIGHLIGHT_OPACITY_APPEAR_SPEED_PER_FRAME = 0.005; // Speed of highlight opacity appearing (opacity increase per frame)
const HIGHLIGHT_HORIZONTAL_PADDING = 50; // Total horizontal padding for the highlight (e.g., 15px on each side of text)
const HIGHLIGHT_VERTICAL_SHIFT = 0; // Vertical shift of the highlight from the top of the code block
const HIGHLIGHT_HORIZONTAL_SHIFT = -10; // Horizontal shift of the highlight from the left of the code block
const HIGHLIGHT_BORDER_RADIUS = 5; // Radius for rounded corners of the highlight

const TYPING_SPEED_MS = 10; // Milliseconds per character for typing effect

const SCROLL_SPEED = 1.4; // Max pixels per frame during normal code scroll
const MIN_SCROLL_SPEED_PX = 0.2; // Min speed during easing
const SCROLL_EASING_DISTANCE_PX = 100; // Distance from target to start easing scroll

const VISIBLE_LINES_BEFORE_BLOCK = 5; // Number of lines to show above the start of the highlighted block

const ANALYSIS_PAUSE_DURATION_MS = 1000; // Duration to pause after AI text typing completes
const COLOR_TRANSFORM_DURATION_MS = 500; // Duration for the highlight color to change
const REWIND_TO_TOP_DURATION_MS = 600; // Duration for fast scroll to top
const VULNERABLE_BLOCK_SCROLL_DELAY_MS = 1100; // Delay before scrolling a vulnerable block
const LINES_ON_LAST_BLOCK_BEFORE_REWIND = 8; // Lines of the last block to remain visible before rewind

const TARGET_FULL_PANEL_HEIGHT = 125; // Desired fixed height for the main analysis panel

const PANEL_TEXT_FADE_OUT_DURATION_MS = {
  default: 300
};

// Define responsive widths for the analysis panel
const RESPONSIVE_PANEL_WIDTHS = {
  sm: 220,  // For screens < 768px
  md: 300, // For screens < 1024px
  lg: 220, // For screens < 1280px
  xl: 320,   // For screens < 1920px
  xxl: 335,  // For screens < 2560
  xxxl: 310,  // For screens >= 2560
};

// Define breakpoints
const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1920,
  xxxl: 2560,
};

// Helper function to get current panel width based on screen size
const getCurrentPanelWidth = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= BREAKPOINTS.md) {
    return RESPONSIVE_PANEL_WIDTHS.sm;
  } else if (screenWidth <= BREAKPOINTS.lg) {
    return RESPONSIVE_PANEL_WIDTHS.md;
  } else if (screenWidth <= BREAKPOINTS.xl) {
    return RESPONSIVE_PANEL_WIDTHS.lg;
  } else if (screenWidth <= BREAKPOINTS.xxl) {
    return RESPONSIVE_PANEL_WIDTHS.xl;
  } else if (screenWidth <= BREAKPOINTS.xxxl) {
    return RESPONSIVE_PANEL_WIDTHS.xxl;
  } else {
    return RESPONSIVE_PANEL_WIDTHS.xxxl;
  }
};

// Helper function to get current padding left based on screen size
const getCurrentPaddingLeft = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < BREAKPOINTS.sm) {
    return -3;
  }
  return -5;
};

// Helper function to get current demo container height
const getCurrentDemoContainerHeight = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < BREAKPOINTS.lg) {
    return 465;
  }
  return DEMO_CONTAINER_HEIGHT;
};

// Helper function to calculate top position for a panel to be centered vertically with its code block
const calculatePanelCenterAlignedTop = (
  associatedBlock: CodeBlock,
  panelHeight: number, // Current height of the panel (could be min for pinned, or dynamic for full)
  currentScrollY: number,
  paddingTop: number,
  lineHeight: number
): number => {
  const blockHeightPx = (associatedBlock.endLine - associatedBlock.startLine + 1) * lineHeight;
  const blockTopOnCanvas = paddingTop + ((associatedBlock.startLine - 1) * lineHeight) - currentScrollY;
  const blockCenterY = blockTopOnCanvas + (blockHeightPx / 2);
  const panelCenterYRelativeToPanelTop = panelHeight / 2;
  
  return blockCenterY - panelCenterYRelativeToPanelTop;
};

// Helper function to draw a rounded rectangle
function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height - 5, x, y + height, radius);
  ctx.arcTo(x, y + height - 5, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

const AnalysisDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [code, setCode] = useState<string>(codeData); // Use imported codeData
  const [blocks, setBlocks] = useState<CodeBlock[]>(blocksData); // Use imported blocksData
  const [scrollY, setScrollY] = useState<number>(0);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [currentBlockState, setCurrentBlockState] = useState<BlockState>('idle');
  const [highlightOpacity, setHighlightOpacity] = useState<number>(0);
  const [animatedHighlightHeight, setAnimatedHighlightHeight] = useState<number>(0);
  const [currentHighlightColor, setCurrentHighlightColor] = useState<string>(HIGHLIGHT_COLOR_INITIAL_RGB);
  const animationStateRef = useRef({
    colorTransitionStart: 0,
    rewindStartScrollY: 0, // For rewind animation
    rewindStartTime: 0,    // For rewind animation
  });
  const earlyColorTransitionStartRef = useRef<number>(0); // Ref for early color change

  // State for the current panel width
  const [currentPanelWidth, setCurrentPanelWidth] = useState<number>(RESPONSIVE_PANEL_WIDTHS.lg); // Default value
  // State for the current padding left
  const [currentPaddingLeft, setCurrentPaddingLeft] = useState<number>(-5); // Default value
  // State to track if screen is xs or smaller
  const [isScreenXsOrSmaller, setIsScreenXsOrSmaller] = useState<boolean>(false); // Default value

  // State for adaptive font size
  const [currentFontSize, setCurrentFontSize] = useState<number>(13); // Default value (larger size)

  // State for adaptive demo container height
  const [currentDemoContainerHeight, setCurrentDemoContainerHeight] = useState<number>(DEMO_CONTAINER_HEIGHT); // Default value
  // State for adaptive panel vertical offset
  const [currentPanelVerticalOffset, setCurrentPanelVerticalOffset] = useState<number>(PANEL_VERTICAL_OFFSET);

  // State for the globally calculated maximum code line width
  const [maxCodeLineWidthPx, setMaxCodeLineWidthPx] = useState<number>(0);

  // States for Shiki
  const [highlighter, setHighlighter] = useState<shiki.Highlighter | null>(null);
  const [tokenizedLines, setTokenizedLines] = useState<shiki.ThemedToken[][] | null>(null);

  // States for the AnalysisSidePanel
  const [analysisPanelMessages, setAnalysisPanelMessages] = useState<AiMessagePart[]>([]);
  const [panelTypedMessagePartIndex, setPanelTypedMessagePartIndex] = useState<number>(0);
  const [panelTypedCharIndex, setPanelTypedCharIndex] = useState<number>(0);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false); // Initially hidden
  const [panelContentOpacity, setPanelContentOpacity] = useState<number>(1); // Opacity for panel text area
  const [isTypingVulnerability, setIsTypingVulnerability] = useState<boolean>(false);
  const [panelTopPx, setPanelTopPx] = useState<number>(PANEL_VERTICAL_MARGIN);
  const [panelMaxHeightPx, setPanelMaxHeightPx] = useState<number>(currentDemoContainerHeight - (PANEL_VERTICAL_MARGIN * 2)); // Use state here
  const [pinnedVulnerabilityPanels, setPinnedVulnerabilityPanels] = useState<PinnedPanelProps[]>([]);
  const vulnerablePanelTransformTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for panel transformation timeout
  const panelContentFadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for content fade-in

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const panelFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for fade out timeout

  // Ref to store animation frame request ID
  const animationFrameId = useRef<number | null>(null);

  // Resize handler
  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const parent = canvasRef.current.parentElement;
      setCanvasDimensions({
        width: parent.clientWidth,
        height: currentDemoContainerHeight > 500 ? 500 : currentDemoContainerHeight, 
      });
    }
    // Update panel width on resize as well
    setCurrentPanelWidth(getCurrentPanelWidth());
    // Update padding left on resize
    setCurrentPaddingLeft(getCurrentPaddingLeft());
    // Update screen size check
    setIsScreenXsOrSmaller(window.innerWidth < BREAKPOINTS.xs);
    // Update adaptive font size
    setCurrentFontSize(window.innerWidth < BREAKPOINTS.xs ? 10 : 13);
    // Update adaptive height and offset
    setCurrentDemoContainerHeight(getCurrentDemoContainerHeight());
    setCurrentPanelVerticalOffset(PANEL_VERTICAL_OFFSET);
  }, [currentDemoContainerHeight]);

  // Effect to react to changes in imported blocksData (e.g., after HMR)
  useEffect(() => {
    setBlocks(blocksData);
    setCurrentBlockState('idle');
    setScrollY(0); 
    setCurrentBlockIndex(0); 
    setAnalysisPanelMessages([]); 
    setIsTypingVulnerability(false); 
    setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB); 
    setTokenizedLines(null); 
    setIsPanelVisible(false); 
    setPanelContentOpacity(1); 
    setPinnedVulnerabilityPanels([]); // Clear pinned panels on full reset
    resizeCanvas(); // This will correctly set values on client-side
  }, [blocksData, resizeCanvas]);

  // Initial setup for canvas size and on resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  // Effect to draw on canvas when dimensions or scrollY change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas internal resolution to match display size to avoid blurriness
    canvas.width = canvasDimensions.width * window.devicePixelRatio;
    canvas.height = canvasDimensions.height * window.devicePixelRatio;
    // Scale context to match devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    // Use CSS to set the display size
    canvas.style.width = canvasDimensions.width + 'px';
    canvas.style.height = canvasDimensions.height + 'px';

    // Clear canvas
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    // Setup text rendering properties
    ctx.font = `${currentFontSize}px ${FONT_FAMILY}`;
    ctx.textBaseline = 'top'; // Align text to the top for consistent yPos calculations

    if (tokenizedLines) {
      for (let i = 0; i < tokenizedLines.length; i++) {
        const lineTokens = tokenizedLines[i];
        const yPos = PADDING_TOP + (i * LINE_HEIGHT) - scrollY;

        // Culling: Only draw lines that are potentially visible
        if (yPos < -LINE_HEIGHT || yPos > canvasDimensions.height + LINE_HEIGHT) {
          continue;
        }

        // Draw line number
        ctx.fillStyle = LINE_NUMBER_COLOR;
        ctx.textAlign = 'right';
        ctx.fillText(String(i + 1), currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH - 10, yPos);

        // Draw code tokens for the line
        ctx.textAlign = 'left';
        let currentX = currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH;
        for (const token of lineTokens) {
          // Use color from token's htmlStyle, or fallback to default code color
          ctx.fillStyle = token.htmlStyle?.color || CODE_TEXT_COLOR; 
          ctx.fillText(token.content, currentX, yPos);
          currentX += ctx.measureText(token.content).width;
        }
      }
    } else {
      // Fallback to drawing code as plain text if tokenizedLines is not yet available
      const lines = code.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const yPos = PADDING_TOP + (i * LINE_HEIGHT) - scrollY;
        if (yPos < -LINE_HEIGHT || yPos > canvasDimensions.height + LINE_HEIGHT) {
          continue;
        }
        ctx.fillStyle = LINE_NUMBER_COLOR;
        ctx.textAlign = 'right';
        ctx.fillText(String(i + 1), currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH - 10, yPos);
        ctx.fillStyle = CODE_TEXT_COLOR;
        ctx.textAlign = 'left';
        ctx.fillText(line, currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH, yPos);
      }
    }

    // --- Draw HISTORICAL highlights for already analyzed blocks ---
    blocks.forEach(block => {
      if (block.analyzedColor && (currentBlockIndex === -1 || block.id !== blocks[currentBlockIndex]?.id)) {
        const blockTopY = PADDING_TOP + ((block.startLine - 1) * LINE_HEIGHT) - scrollY;
        const blockBottomY = PADDING_TOP + (block.endLine * LINE_HEIGHT) - scrollY;

        // Culling: Only draw if any part of the block is visible
        if (blockBottomY >= 0 && blockTopY <= canvasDimensions.height) {
          const highlightX = currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH - (HIGHLIGHT_HORIZONTAL_PADDING / 2) + HIGHLIGHT_HORIZONTAL_SHIFT;
          const highlightWidth = maxCodeLineWidthPx > 0 ? maxCodeLineWidthPx + HIGHLIGHT_HORIZONTAL_PADDING : canvasDimensions.width - (currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH) - HIGHLIGHT_HORIZONTAL_SHIFT; // Use global max width
          const highlightY = PADDING_TOP + ((block.startLine - 1) * LINE_HEIGHT) - scrollY - (LINE_HEIGHT * 0.25) + HIGHLIGHT_VERTICAL_SHIFT;
          const fullHighlightHeight = (block.endLine - block.startLine + 1) * LINE_HEIGHT + (LINE_HEIGHT * 0.5);

          ctx.fillStyle = `rgba(${block.analyzedColor}, ${HIGHLIGHT_TARGET_OPACITY})`;
          
          drawRoundedRect(ctx, highlightX, highlightY, highlightWidth, fullHighlightHeight, HIGHLIGHT_BORDER_RADIUS);
        }
      }
    });
    // --- END Draw HISTORICAL highlights ---

    // Draw CURRENT ACTIVE highlight if a block is active 
    if (currentBlockIndex !== -1 && currentBlockIndex < blocks.length && highlightOpacity > 0 && animatedHighlightHeight > 0 &&
        (currentBlockState === 'highlighting_initial' || 
         currentBlockState === 'analyzing_text_appearing' || 
         currentBlockState === 'analysis_pause' || 
         currentBlockState === 'transforming_highlight_safe' || 
         currentBlockState === 'transforming_highlight_vulnerable' || 
         currentBlockState === 'scrolling_with_vulnerability' ||
         currentBlockState === 'completed_safe_block_scroll_away' ||
         currentBlockState === 'rewinding_to_top' ||
         currentBlockState === 'preparing_vulnerable_panel_pin' ||
         currentBlockState === 'vulnerable_block_pause_before_scroll')) {
      const activeBlock = blocks[currentBlockIndex];

      const highlightX = currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH - (HIGHLIGHT_HORIZONTAL_PADDING / 2) + HIGHLIGHT_HORIZONTAL_SHIFT;
      const highlightWidth = maxCodeLineWidthPx > 0 ? maxCodeLineWidthPx + HIGHLIGHT_HORIZONTAL_PADDING : canvasDimensions.width - (currentPaddingLeft + LINE_NUMBER_GUTTER_WIDTH) - HIGHLIGHT_HORIZONTAL_SHIFT; 
      
      const highlightY = PADDING_TOP + ((activeBlock.startLine -1) * LINE_HEIGHT) - scrollY - (LINE_HEIGHT * 0.25) + HIGHLIGHT_VERTICAL_SHIFT;

      ctx.fillStyle = `rgba(${currentHighlightColor}, ${highlightOpacity})`;

      drawRoundedRect(ctx, highlightX, highlightY, highlightWidth, animatedHighlightHeight, HIGHLIGHT_BORDER_RADIUS);
    }

    // Placeholder for current state
    ctx.fillStyle = 'yellow';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
  }, [canvasDimensions, scrollY, currentBlockIndex, currentBlockState, code, blocks, highlightOpacity, animatedHighlightHeight, currentHighlightColor, tokenizedLines, maxCodeLineWidthPx, currentPaddingLeft, currentFontSize]);

  // Effect to calculate the maximum code line width globally
  useEffect(() => {
    if (tokenizedLines && canvasRef.current && currentFontSize && FONT_FAMILY) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.font = `${currentFontSize}px ${FONT_FAMILY}`;
      let currentMax = 0;
      for (const lineTokens of tokenizedLines) {
        const lineText = lineTokens.map(token => token.content).join('');
        const lineWidth = ctx.measureText(lineText).width;
        if (lineWidth > currentMax) {
          currentMax = lineWidth;
        }
      }
      setMaxCodeLineWidthPx(currentMax);
    }
  }, [tokenizedLines, canvasDimensions.width, canvasDimensions.height, currentFontSize, FONT_FAMILY]);

  // Initialize Shiki highlighter
  useEffect(() => {
    const initializeHighlighter = async () => {
      try {
        const shikiHighlighter = await shiki.createHighlighter({
          themes: ['light-plus'],
          langs: ['typescript', 'javascript', 'tsx', 'jsx', 'solidity'],
        });
        setHighlighter(shikiHighlighter);
      } catch (error) {}
    };
    initializeHighlighter();
  }, []);

  // Tokenize code when highlighter is ready and code changes
  useEffect(() => {
    if (highlighter && code) {
      try {
        const options: any = { 
          lang: 'solidity',
          themes: { light: 'light-plus', dark: 'light-plus' }
        };
        const themedTokensResult = highlighter.codeToTokens(code, options);
        
        if (themedTokensResult && themedTokensResult.tokens && Array.isArray(themedTokensResult.tokens)) {
           setTokenizedLines(themedTokensResult.tokens);
        } else {
            const lines = code.split('\n');
            setTokenizedLines(
              lines.map(line => ([{ content: line, color: CODE_TEXT_COLOR, htmlStyle: { color: CODE_TEXT_COLOR }, offset: 0 }])) // ensure fallback matches expected structure
            );
        }
      } catch (error) {
        const lines = code.split('\n');
        setTokenizedLines(
          lines.map(line => ([{ content: line, color: CODE_TEXT_COLOR, htmlStyle: { color: CODE_TEXT_COLOR }, offset: 0 }])) // ensure fallback matches expected structure
        );
      }
    }
  }, [highlighter, code]);

  // Main animation loop
  useEffect(() => {
    const loop = () => {
      if (currentBlockState === 'scrolling_to_block') {
        if (currentBlockIndex >= blocks.length) {
          setCurrentBlockIndex(0); // Simple loop
          setScrollY(0);
          setCurrentBlockState('scrolling_to_block'); 
          return; 
        }

        const targetBlock = blocks[currentBlockIndex];
        if (!targetBlock) {
          animationFrameId.current = requestAnimationFrame(loop); 
          return;
        }

        // Define targetFullHighlightHeight once for the current targetBlock
        const targetFullHighlightHeight = (targetBlock.endLine - targetBlock.startLine + 1) * LINE_HEIGHT + (LINE_HEIGHT * 0.5);

        const targetBlockTopYCanvas = PADDING_TOP + (VISIBLE_LINES_BEFORE_BLOCK * LINE_HEIGHT);
        const currentBlockTopYCanvas = PADDING_TOP + ((targetBlock.startLine - 1) * LINE_HEIGHT) - scrollY;
        const difference = targetBlockTopYCanvas - currentBlockTopYCanvas;

        // Predictive snapping logic
        const sTarget = scrollY - difference; // scrollY that would place block at target

        let effectiveScrollSpeed = SCROLL_SPEED;
        if (Math.abs(difference) < SCROLL_EASING_DISTANCE_PX) {
          const progressInEasingZone = Math.abs(difference) / SCROLL_EASING_DISTANCE_PX;
          effectiveScrollSpeed = MIN_SCROLL_SPEED_PX + (SCROLL_SPEED - MIN_SCROLL_SPEED_PX) * progressInEasingZone;
          effectiveScrollSpeed = Math.max(effectiveScrollSpeed, MIN_SCROLL_SPEED_PX); // Ensure it doesn't go below min
        }

        if (difference < 0) { // Block is too low, needs to move UP screen (currentY decreases)
          // Check if the next step (with current effective speed) would overshoot or reach target
          if (currentBlockTopYCanvas - effectiveScrollSpeed <= targetBlockTopYCanvas) {
            setScrollY(sTarget);
            setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB); 
            setCurrentBlockState('highlighting_initial');
            setHighlightOpacity(0); 
            setAnimatedHighlightHeight(targetFullHighlightHeight); 
          } else {
            setScrollY(prevScrollY => prevScrollY + effectiveScrollSpeed);
            animationFrameId.current = requestAnimationFrame(loop);
          }
        } else if (difference > 0) { // Block is too high, needs to move DOWN screen (currentY increases)
          // Check if the next step (with current effective speed) would overshoot or reach target
          if (currentBlockTopYCanvas + effectiveScrollSpeed >= targetBlockTopYCanvas) {
            setScrollY(sTarget);
            setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB);
            setCurrentBlockState('highlighting_initial');
            setHighlightOpacity(0); 
            setAnimatedHighlightHeight(targetFullHighlightHeight); 
          } else {
            setScrollY(prevScrollY => prevScrollY - effectiveScrollSpeed);
            animationFrameId.current = requestAnimationFrame(loop);
          }
        } else { // difference is 0, already at target
          setScrollY(sTarget); 
          setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB);
          setCurrentBlockState('highlighting_initial');
          setHighlightOpacity(0); 
          setAnimatedHighlightHeight(targetFullHighlightHeight); 
        }
      } else if (currentBlockState === 'highlighting_initial') {
        const activeBlock = blocks[currentBlockIndex];
        if (!activeBlock) { // Should not happen if currentBlockIndex is valid
            animationFrameId.current = requestAnimationFrame(loop);
            return;
        }
        // Animate opacity instead of height
        if (highlightOpacity < HIGHLIGHT_TARGET_OPACITY) {
          setHighlightOpacity(prev => Math.min(prev + HIGHLIGHT_OPACITY_APPEAR_SPEED_PER_FRAME, HIGHLIGHT_TARGET_OPACITY));
          animationFrameId.current = requestAnimationFrame(loop); // Continue highlighting animation
        } else {
          setHighlightOpacity(HIGHLIGHT_TARGET_OPACITY); // Ensure opacity is set to target
          
          const blockToAnalyze = blocks[currentBlockIndex];
          if (blockToAnalyze) {
            const newParts: AiMessagePart[] = [];
            let partIdCounter = 0;

            if (blockToAnalyze.analysisText.processing) {
              newParts.push({
                id: `proc-${partIdCounter++}`,
                text: blockToAnalyze.analysisText.processing,
                isProcessing: true,
              });
            }
            if (blockToAnalyze.analysisText.summary) {
              newParts.push({ id: `sum-title-${partIdCounter++}`, text: "Summary:", isTitle: true, isSummary: true, requiresNewline: true, color: 'rgb(82, 23, 109)' });
              newParts.push({ id: `sum-text-${partIdCounter++}`, text: blockToAnalyze.analysisText.summary, isSummary: true });
            }
            if (blockToAnalyze.isVulnerable) {
              if (blockToAnalyze.analysisText.vulnerability) {
                newParts.push({ id: `vuln-title-${partIdCounter++}`, text: "Vulnerability:", isTitle: true, isVulnerability: true, color: '#FF6B00', requiresNewline: true });
                newParts.push({ id: `vuln-text-${partIdCounter++}`, text: blockToAnalyze.analysisText.vulnerability, isVulnerability: true, color: '#FF6B00' });
              }
              if (blockToAnalyze.analysisText.remediation) {
                newParts.push({ id: `fix-title-${partIdCounter++}`, text: "Remediation:", isTitle: true, isRemediation: true, color: 'rgb(82, 23, 109)', requiresNewline: true });
                newParts.push({ id: `fix-text-${partIdCounter++}`, text: blockToAnalyze.analysisText.remediation, isRemediation: true, color: 'rgb(82, 23, 109)' });
              }
            }
            setAnalysisPanelMessages(newParts);
            setPanelTypedMessagePartIndex(0);
            setPanelTypedCharIndex(0);
            
            // Panel becomes visible now that messages are ready and it can be positioned correctly
            setIsPanelVisible(true);
            setPanelContentOpacity(1);
          }
          setCurrentBlockState('analyzing_text_appearing');
        }
      } else if (currentBlockState === 'analyzing_text_appearing') {
        const activeBlock = blocks[currentBlockIndex];
        
        if (activeBlock && activeBlock.isVulnerable && isTypingVulnerability && currentHighlightColor !== HIGHLIGHT_COLOR_VULNERABLE_RGB) {
          const now = Date.now();
          const elapsedTime = now - earlyColorTransitionStartRef.current;
          const progress = Math.min(elapsedTime / COLOR_TRANSFORM_DURATION_MS, 1);

          const startColorRGB = HIGHLIGHT_COLOR_INITIAL_RGB.split(',').map(Number);
          const targetColor = HIGHLIGHT_COLOR_VULNERABLE_RGB.split(',').map(Number);
          
          const r = Math.round(startColorRGB[0] + (targetColor[0] - startColorRGB[0]) * progress);
          const g = Math.round(startColorRGB[1] + (targetColor[1] - startColorRGB[1]) * progress);
          const b = Math.round(startColorRGB[2] + (targetColor[2] - startColorRGB[2]) * progress);
          setCurrentHighlightColor(`${r},${g},${b}`);

          if (progress < 1) {
            // Explicitly request next frame for this color animation
            animationFrameId.current = requestAnimationFrame(loop);
          } else {
            setCurrentHighlightColor(HIGHLIGHT_COLOR_VULNERABLE_RGB); // Ensure final color
          }
        } else if (animationFrameId.current && currentBlockState === 'analyzing_text_appearing') {}

      } else if (currentBlockState === 'transforming_highlight_safe' || currentBlockState === 'transforming_highlight_vulnerable') {
        const now = Date.now();
        
        // If vulnerable and ALREADY RED from early transition, skip color animation.
        if (currentBlockState === 'transforming_highlight_vulnerable' && currentHighlightColor === HIGHLIGHT_COLOR_VULNERABLE_RGB) {
          const activeBlock = blocks[currentBlockIndex];
          if (activeBlock) {
            setBlocks(prevBlocks => prevBlocks.map(b => b.id === activeBlock.id ? { ...b, analyzedColor: HIGHLIGHT_COLOR_VULNERABLE_RGB } : b));
            // Pin the panel
            if (analysisPanelMessages.length > 0) { // Ensure there are messages to pin (should be vulnerability text)
              const blockHeightPx = (activeBlock.endLine - activeBlock.startLine + 1) * LINE_HEIGHT;
              // Calculate initial top position using the new helper function
              const initialPanelTopForPinned = calculatePanelCenterAlignedTop(
                activeBlock,
                MIN_PANEL_HEIGHT, // Pinned panel always uses min height
                scrollY,
                PADDING_TOP,
                LINE_HEIGHT
              );

              const newPinnedPanel: PinnedPanelProps = {
                blockId: activeBlock.id,
                messages: [...analysisPanelMessages], // Create a shallow copy of messages
                topPx: initialPanelTopForPinned, // Use calculated initial top
                heightPx: MIN_PANEL_HEIGHT, // Ensure pinned panel has a fixed compact height
                panelWidth: currentPanelWidth,
                isNewlyPinned: true, // Mark for animation
              };
              setPinnedVulnerabilityPanels(prev => [...prev, newPinnedPanel]);
            }
            setIsPanelVisible(false);      // Hide the main interactive panel as it's now pinned.
            setAnalysisPanelMessages([]);  // Clear main panel messages for next block.
            setPanelTypedMessagePartIndex(0);
            setPanelTypedCharIndex(0);
          }
          setCurrentBlockState('vulnerable_block_pause_before_scroll'); // Go to pause state
          return; 
        }

        const elapsedTime = now - animationStateRef.current.colorTransitionStart;
        const progress = Math.min(elapsedTime / COLOR_TRANSFORM_DURATION_MS, 1);

        const startColor = HIGHLIGHT_COLOR_INITIAL_RGB.split(',').map(Number); 
        const targetColorRgbString = currentBlockState === 'transforming_highlight_safe' ? HIGHLIGHT_COLOR_SAFE_RGB : HIGHLIGHT_COLOR_VULNERABLE_RGB;
        const targetColor = targetColorRgbString.split(',').map(Number);

        const r = Math.round(startColor[0] + (targetColor[0] - startColor[0]) * progress);
        const g = Math.round(startColor[1] + (targetColor[1] - startColor[1]) * progress);
        const b = Math.round(startColor[2] + (targetColor[2] - startColor[2]) * progress);
        setCurrentHighlightColor(`${r},${g},${b}`);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(loop);
        } else {
          setCurrentHighlightColor(targetColorRgbString); // Ensure final color is set
          const activeBlock = blocks[currentBlockIndex];
          if (activeBlock) {
            setBlocks(prevBlocks => prevBlocks.map(b => b.id === activeBlock.id ? { ...b, analyzedColor: targetColorRgbString } : b));
          }

          if (currentBlockState === 'transforming_highlight_safe') {
            setPanelContentOpacity(0); // Start fading out panel text
            setIsPanelVisible(false);   // Start fading out the panel itself simultaneously
            
            if (panelFadeTimeoutRef.current) clearTimeout(panelFadeTimeoutRef.current);
            panelFadeTimeoutRef.current = setTimeout(() => {
              // These actions happen after the panel and its content have faded out
              setAnalysisPanelMessages([]); 
              setPanelTypedMessagePartIndex(0);
              setPanelTypedCharIndex(0);
              setPanelContentOpacity(1); // Reset opacity for next content
            }, PANEL_TEXT_FADE_OUT_DURATION_MS.default);
            setCurrentBlockState('completed_safe_block_scroll_away');
          } else { // transforming_highlight_vulnerable
            if (activeBlock) {
              const blockHeightPx = (activeBlock.endLine - activeBlock.startLine + 1) * LINE_HEIGHT;
              
              // Recalculate top position based on current scrollY for accuracy before setting height relative to it.
              const blockFirstLineCanvasY = PADDING_TOP + ((activeBlock.startLine - 1) * LINE_HEIGHT) - scrollY;
              const currentPanelTop = Math.max(PADDING_TOP, blockFirstLineCanvasY);
              setPanelTopPx(currentPanelTop + currentPanelVerticalOffset);

              const newMaxHeightForVulnerableBlock = Math.max(MIN_PANEL_HEIGHT, blockHeightPx);
              setPanelMaxHeightPx(newMaxHeightForVulnerableBlock);
            }
            // Add the current panel to pinnedVulnerabilityPanels ONLY if screen is large enough
            if (window.innerWidth >= BREAKPOINTS.xs) {
                if (activeBlock && analysisPanelMessages.length > 0) {
                  const initialPanelTop = calculatePanelCenterAlignedTop(
                    activeBlock,
                    MIN_PANEL_HEIGHT, // Pinned panel always uses MIN_PANEL_HEIGHT
                    scrollY,
                    PADDING_TOP,
                    LINE_HEIGHT
                  );
                  const newPinnedPanel: PinnedPanelProps = {
                    blockId: activeBlock.id,
                    messages: [...analysisPanelMessages], 
                    topPx: initialPanelTop, 
                    heightPx: MIN_PANEL_HEIGHT,
                    panelWidth: currentPanelWidth,
                    isNewlyPinned: true, // Mark for animation
                  };
                  setPinnedVulnerabilityPanels(prev => [...prev, newPinnedPanel]);
                }
            }
            
            // Hide and clear the main interactive panel, as it's now "pinned"
            // This should happen even if not pinned due to small screen, to ensure main panel disappears
            setIsPanelVisible(false);
            setAnalysisPanelMessages([]);
            setPanelTypedMessagePartIndex(0);
            setPanelTypedCharIndex(0);

            setCurrentBlockState('vulnerable_block_pause_before_scroll'); // Go to pause state
          }
          animationFrameId.current = requestAnimationFrame(loop);
        }
      } else if (currentBlockState === 'completed_safe_block_scroll_away' || currentBlockState === 'scrolling_with_vulnerability') {
        const activeBlock = blocks[currentBlockIndex];
        if (!activeBlock) {
          setCurrentBlockIndex(0); setScrollY(0); setCurrentBlockState('idle');
          return;
        }
        
        const isLastBlockBeingProcessed = currentBlockIndex === blocks.length - 1;

        if (isLastBlockBeingProcessed) {
          // Current block is the last block. Check if it's time to rewind.
          const rewindTriggerLineAbsolute = Math.max(
            activeBlock.startLine,
            activeBlock.endLine - LINES_ON_LAST_BLOCK_BEFORE_REWIND + 1
          );
          const yPosOfRewindTriggerLineOnCanvas = PADDING_TOP + 
            ((rewindTriggerLineAbsolute - 1) * LINE_HEIGHT) - scrollY;

          // Start rewind if the trigger line is at or above the PADDING_TOP (i.e., scrolling off)
          if (yPosOfRewindTriggerLineOnCanvas <= PADDING_TOP) { 
            animationStateRef.current.rewindStartScrollY = scrollY;
            animationStateRef.current.rewindStartTime = Date.now();
            setIsPanelVisible(false);
            setAnalysisPanelMessages([]);
            setPanelTypedMessagePartIndex(0);
            setPanelTypedCharIndex(0);
            setPinnedVulnerabilityPanels([]); // Clear pinned panels before rewind
            setCurrentBlockState('rewinding_to_top');
            return; // State change will re-trigger loop via useEffect
          }
        } else {
          // Not the last block. Check if the *next* block is in position.
          const nextBlockIndex = currentBlockIndex + 1; // Safe because not the last block
          const nextBlock = blocks[nextBlockIndex];
          if (nextBlock) {
            const currentNextBlockTopY_onCanvas = PADDING_TOP + 
              ((nextBlock.startLine - 1) * LINE_HEIGHT) - scrollY;
            const targetNextBlockTopY_onCanvas = PADDING_TOP + 
              (VISIBLE_LINES_BEFORE_BLOCK * LINE_HEIGHT);

            const triggerDecisionPointY_onCanvas = targetNextBlockTopY_onCanvas + SCROLL_EASING_DISTANCE_PX;

            if (currentNextBlockTopY_onCanvas <= triggerDecisionPointY_onCanvas) {
              
              // Common logic for transitioning to the next block
              setIsPanelVisible(false); 
              setAnalysisPanelMessages([]); 
              setPanelTypedMessagePartIndex(0);
              setPanelTypedCharIndex(0);
              setCurrentBlockIndex(nextBlockIndex);
              setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB); 
              setIsTypingVulnerability(false); 
              // Always go to scrolling_to_block. If snapped, it will be a quick transition to highlighting_initial.
              setCurrentBlockState('scrolling_to_block'); 
              return; 
            }
          }
        }

        setScrollY(prevScrollY => prevScrollY + SCROLL_SPEED);
        animationFrameId.current = requestAnimationFrame(loop);
        
      } else if (currentBlockState === 'rewinding_to_top') {
        const elapsedTime = Date.now() - animationStateRef.current.rewindStartTime;
        const progress = Math.min(elapsedTime / REWIND_TO_TOP_DURATION_MS, 1);
        const newScrollY = animationStateRef.current.rewindStartScrollY * (1 - progress);
        
        setScrollY(newScrollY);

        if (progress >= 1) {
          setScrollY(0); // Ensure it's exactly 0
          setBlocks(prevBlocks => prevBlocks.map(b => ({ ...b, analyzedColor: undefined })));
          setPinnedVulnerabilityPanels([]); // Clear pinned panels before restarting
          setCurrentBlockIndex(0);
          setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB); // Reset for the new first block
          setHighlightOpacity(0); // Reset for new first block
          setCurrentBlockState('scrolling_to_block');
          setPanelContentOpacity(1); 
          setIsTypingVulnerability(false); 
          setIsPanelVisible(false); 
          setPinnedVulnerabilityPanels([]); // Clear pinned panels on reset to idle
        } else {
          animationFrameId.current = requestAnimationFrame(loop);
        }
      }
    };

    const shouldAnimate =
      currentBlockState === 'scrolling_to_block' ||
      currentBlockState === 'highlighting_initial' ||
      currentBlockState === 'analyzing_text_appearing' ||
      currentBlockState === 'transforming_highlight_safe' ||
      currentBlockState === 'transforming_highlight_vulnerable' ||
      currentBlockState === 'completed_safe_block_scroll_away' ||
      currentBlockState === 'scrolling_with_vulnerability' ||
      currentBlockState === 'rewinding_to_top' ||
      currentBlockState === 'preparing_vulnerable_panel_pin' ||
      currentBlockState === 'vulnerable_block_pause_before_scroll'; // Ensure this state is animated for continuous highlight rendering

    if (shouldAnimate && canvasDimensions.width > 0 && canvasDimensions.height > 0) {
      animationFrameId.current = requestAnimationFrame(loop);
    } else {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    };
  }, [currentBlockState, currentBlockIndex, blocks, canvasDimensions, scrollY, highlightOpacity, code, animatedHighlightHeight, analysisPanelMessages, isTypingVulnerability, currentHighlightColor, tokenizedLines, currentFontSize]);

  useEffect(() => {
    if (blocks.length > 0 && currentBlockState === 'idle') {
      setBlocks(prevBlocks => prevBlocks.map(b => ({...b, analyzedColor: undefined}))); 
      setAnalysisPanelMessages([]); // Clear panel messages on reset
      setPanelTypedMessagePartIndex(0);
      setPanelTypedCharIndex(0);
      setCurrentBlockIndex(0);
      setScrollY(0);
      setCurrentHighlightColor(HIGHLIGHT_COLOR_INITIAL_RGB);
      setCurrentBlockState('scrolling_to_block');
      setPanelContentOpacity(1); // Ensure panel is opaque on reset
      setIsTypingVulnerability(false); // Reset new flag
      setIsPanelVisible(false); // Ensure panel is hidden on reset to idle
    }
  }, [blocks, currentBlockState]);

  // Effect for AI text typing animation - NOW FOR THE PANEL
  useEffect(() => {
    if (currentBlockState === 'analyzing_text_appearing' && analysisPanelMessages.length > 0) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      if (panelTypedMessagePartIndex < analysisPanelMessages.length) {
        const currentPart = analysisPanelMessages[panelTypedMessagePartIndex];
        
        // Check if we are starting to type a vulnerability part
        if (currentPart.isVulnerability && panelTypedCharIndex === 0 && !isTypingVulnerability) {
          const currentBlock = blocks[currentBlockIndex];
          if (currentBlock && currentBlock.isVulnerable) {
            setIsTypingVulnerability(true);
            earlyColorTransitionStartRef.current = Date.now();
          }
        }

        if (panelTypedCharIndex < currentPart.text.length) {
          typingTimeoutRef.current = setTimeout(() => {
            setPanelTypedCharIndex(prev => prev + 1);
          }, TYPING_SPEED_MS);
        } else {
          if (panelTypedMessagePartIndex < analysisPanelMessages.length - 1) {
            setPanelTypedMessagePartIndex(prev => prev + 1);
            setPanelTypedCharIndex(0);
          } else {
            setCurrentBlockState('analysis_pause');
          }
        }
      }
    }
    return () => { if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current); };
  }, [currentBlockState, analysisPanelMessages, panelTypedMessagePartIndex, panelTypedCharIndex, isTypingVulnerability]);

  // Effect for handling state transitions after analysis_pause and color transformation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentBlockState === 'analysis_pause') {
      timeoutId = setTimeout(() => {
        if (currentBlockIndex < blocks.length) {
          const activeBlock = blocks[currentBlockIndex];
          if (activeBlock.isVulnerable) {
            setIsPanelVisible(false); // Start fading out the panel itself
            setCurrentBlockState('preparing_vulnerable_panel_pin');
          } else {
            // For safe blocks, panel fading is handled in transforming_highlight_safe
            setCurrentBlockState('transforming_highlight_safe');
            animationStateRef.current.colorTransitionStart = Date.now();
          }
        }
      }, ANALYSIS_PAUSE_DURATION_MS);
    }
    return () => clearTimeout(timeoutId);
  }, [currentBlockState, currentBlockIndex, blocks]);

  // Effect to calculate and set panel position and max height for ACTIVE panel
  useEffect(() => {
    if (isPanelVisible && currentBlockIndex !== -1 && currentBlockIndex < blocks.length) {
      const activeBlock = blocks[currentBlockIndex];
      
      if (
        currentBlockState === 'analyzing_text_appearing' ||
        currentBlockState === 'analysis_pause'
      ) {
        // 1. Calculate top for the panel so its center aligns with the code block's center.
        //    Use TARGET_FULL_PANEL_HEIGHT as the panel height for this calculation.
        const newPanelTop = calculatePanelCenterAlignedTop(
          activeBlock,
          TARGET_FULL_PANEL_HEIGHT, // The panel will have this height
          scrollY,
          PADDING_TOP,
          LINE_HEIGHT
        );
        
        setPanelTopPx(newPanelTop);
        // Set the panel's max height to TARGET_FULL_PANEL_HEIGHT.
        // The AnalysisSidePanel component is responsible for internal scrolling if content overflows.
        setPanelMaxHeightPx(TARGET_FULL_PANEL_HEIGHT);
      } 
    } 
  }, [
    isPanelVisible, 
    currentBlockIndex, 
    blocks, 
    scrollY, 
    currentBlockState, 
    PADDING_TOP, // Still needed for calculatePanelCenterAlignedTop
    LINE_HEIGHT, // Still needed for calculatePanelCenterAlignedTop
    TARGET_FULL_PANEL_HEIGHT // Now a direct input to height and centering logic
  ]);

  // Effect to update topPx for pinned panels on scrollY change
  useEffect(() => {
    if (pinnedVulnerabilityPanels.length > 0) {
      setPinnedVulnerabilityPanels(prevPanels =>
        prevPanels.map(panel => {
          const associatedBlock = blocks.find(b => b.id === panel.blockId);
          if (associatedBlock) {
            const newTopPx = calculatePanelCenterAlignedTop( // Use new unified function
              associatedBlock,
              panel.heightPx, // This is MIN_PANEL_HEIGHT for pinned panels
              scrollY,
              PADDING_TOP,
              LINE_HEIGHT
            );
            return { ...panel, topPx: newTopPx };
          }
          return panel; 
        })
      );
    }
  }, [scrollY, blocks, PADDING_TOP, LINE_HEIGHT, pinnedVulnerabilityPanels]); 

  // Effect for handling vulnerable panel transformation (fade out, resize/re-content, fade in)
  useEffect(() => {
    if (currentBlockState === 'preparing_vulnerable_panel_pin') {
      if (vulnerablePanelTransformTimeoutRef.current) clearTimeout(vulnerablePanelTransformTimeoutRef.current);
      vulnerablePanelTransformTimeoutRef.current = setTimeout(() => {
        const activeBlock = blocks[currentBlockIndex];
        if (activeBlock && activeBlock.isVulnerable && activeBlock.analysisText.vulnerability) {
          // 1. Calculate and SET new dimensions and position WHILE PANEL IS STILL HIDDEN
          const blockHeightPx = (activeBlock.endLine - activeBlock.startLine + 1) * LINE_HEIGHT;
          const panelTopForNewSize = PADDING_TOP + ((activeBlock.startLine - 1) * LINE_HEIGHT) - scrollY + currentPanelVerticalOffset;
          setPanelTopPx(panelTopForNewSize); 
          setPanelMaxHeightPx(Math.max(MIN_PANEL_HEIGHT, blockHeightPx));

          // 2. Change content
          const vulnerabilityOnlyMessages: AiMessagePart[] = [{
            id: `vuln-text-pinned-${activeBlock.id}`,
            text: activeBlock.analysisText.summary,
            isVulnerability: true, 
            color: 'rgb(82, 23, 109)' 
          }];
          setAnalysisPanelMessages(vulnerabilityOnlyMessages);
          setPanelTypedMessagePartIndex(vulnerabilityOnlyMessages.length); 
          setPanelTypedCharIndex(vulnerabilityOnlyMessages.length > 0 ? vulnerabilityOnlyMessages[0].text.length : 0); 

          setPanelContentOpacity(0); 

          requestAnimationFrame(() => {
            setIsPanelVisible(true); 

            if (panelContentFadeInTimeoutRef.current) clearTimeout(panelContentFadeInTimeoutRef.current);
            panelContentFadeInTimeoutRef.current = setTimeout(() => {
              setPanelContentOpacity(1);
              setCurrentBlockState('transforming_highlight_vulnerable');
            }, 50);
          });
        }
      }, PANEL_TEXT_FADE_OUT_DURATION_MS.default); 
    }
    return () => {
      if (vulnerablePanelTransformTimeoutRef.current) clearTimeout(vulnerablePanelTransformTimeoutRef.current);
      if (panelContentFadeInTimeoutRef.current) clearTimeout(panelContentFadeInTimeoutRef.current); // Clear new timeout
    };
  }, [currentBlockState, blocks, currentBlockIndex, scrollY, currentPanelVerticalOffset]);  // Added currentPanelVerticalOffset to dependencies

  // useEffect for delaying scroll after vulnerable block analysis
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentBlockState === 'vulnerable_block_pause_before_scroll') {
      timeoutId = setTimeout(() => {
        setCurrentBlockState('scrolling_with_vulnerability');
      }, VULNERABLE_BLOCK_SCROLL_DELAY_MS);
    }
    return () => clearTimeout(timeoutId);
  }, [currentBlockState]);

  // Effect to reset isNewlyPinned flag for pinned panels after animation
  useEffect(() => {
    const newTimers: NodeJS.Timeout[] = [];
    pinnedVulnerabilityPanels.forEach(panel => {
      if (panel.isNewlyPinned) {
        const timeoutId = setTimeout(() => {
          setPinnedVulnerabilityPanels(prevPanels =>
            prevPanels.map(p =>
              p.blockId === panel.blockId ? { ...p, isNewlyPinned: false } : p
            )
          );
        }, 350); // Duration should be slightly longer than the CSS animation
        newTimers.push(timeoutId);
      }
    });
    return () => {
      newTimers.forEach(clearTimeout);
    }; // Cleanup all timers created in this effect run
  }, [pinnedVulnerabilityPanels]);

  return (
    <div className={`w-full max-w-[1536px] h-[${currentDemoContainerHeight}px] mx-auto relative overflow-hidden 3xl:pl-4`}>
      <div style={{ flexGrow: 1, position: 'relative', height: '100%' }}> {/* Canvas Container */} 
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
      {/* Render the new AnalysisSidePanel */}
      <AnalysisSidePanel 
        isVisible={isPanelVisible}
        currentAnalysisMessages={analysisPanelMessages}
        typedMessagePartIndex={panelTypedMessagePartIndex}
        typedCharIndex={panelTypedCharIndex}
        panelWidth={currentPanelWidth}
        contentOpacity={panelContentOpacity} // Pass the opacity to the panel
        topPositionPx={panelTopPx}
        maxPanelHeightPx={panelMaxHeightPx}
        panelMode="full"
      />
      {/* Render pinned vulnerability panels */}
      {pinnedVulnerabilityPanels.map(pinnedPanel => (
        <AnalysisSidePanel
          key={`pinned-${pinnedPanel.blockId}`}
          isVisible={true} // Pinned panels are always visible once created
          currentAnalysisMessages={pinnedPanel.messages}
          typedMessagePartIndex={pinnedPanel.messages.length} // Show full text, no typing
          typedCharIndex={pinnedPanel.messages.length > 0 ? pinnedPanel.messages[pinnedPanel.messages.length -1].text.length : 0} // Show full text
          panelWidth={pinnedPanel.panelWidth}
          contentOpacity={1} // Pinned panels are fully opaque
          topPositionPx={pinnedPanel.topPx} // Now dynamically updated by the new useEffect
          maxPanelHeightPx={pinnedPanel.heightPx}
          isNewlyPinned={pinnedPanel.isNewlyPinned} // Pass the flag for animation
          panelMode='compact'
        />
      ))}
    </div>
  );
};

export default AnalysisDemo;
