import React, { useEffect, useRef } from 'react';

interface AiMessagePart {
  id: string;
  text: string;
  isTitle?: boolean;
  color?: string;
  isProcessing?: boolean;
  isSummary?: boolean;
  isVulnerability?: boolean;
  isRemediation?: boolean;
  requiresNewline?: boolean;
}

interface AnalysisSidePanelProps {
  isVisible: boolean;
  currentAnalysisMessages: AiMessagePart[]; // For the main detailed view
  typedMessagePartIndex: number;
  typedCharIndex: number;
  panelWidth: number; // Width of the panel
  contentOpacity: number; // Text area opacity
  topPositionPx: number; // Panel top position
  maxPanelHeightPx: number; // Represents height for 'full', maxHeight for 'compact'
  panelMode?: 'full' | 'compact'; // Height behavior
  isNewlyPinned?: boolean; // For animation of pinned panels
}

const SCROLL_TRIGGER_OFFSET_PX = 60; // Pixels from bottom to trigger scroll
const SMOOTH_SCROLL_INCREMENT_PX = 0.5; // Pixels to scroll per frame

const AnalysisSidePanel = React.memo(React.forwardRef<HTMLDivElement, AnalysisSidePanelProps>((
  {
  isVisible,
  currentAnalysisMessages,
  typedMessagePartIndex,
  typedCharIndex,
  panelWidth,
  contentOpacity,
  topPositionPx,
  maxPanelHeightPx,
  panelMode = 'full', // Default to 'full'
  isNewlyPinned, // Destructure the new prop
}, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollModeRef = useRef<'inactive' | 'pending_trigger' | 'active'>('inactive');
  const scrollAnimationIdRef = useRef<number | null>(null);
  const desiredScrollTopRef = useRef<number | null>(null); // For accumulating fractional scroll

  // State for animation of pinned panel
  const [currentOpacity, setCurrentOpacity] = React.useState(0);
  const [currentTransform, setCurrentTransform] = React.useState('scale(0.95) translateY(10px)');

  useEffect(() => {
    if (panelMode === 'compact' && isVisible) { // Only animate compact (pinned) panels that are visible
      if (isNewlyPinned) {
        setCurrentOpacity(0);
        setCurrentTransform('scale(0.95) translateY(10px)');
        const timer = setTimeout(() => {
          setCurrentOpacity(1);
          setCurrentTransform('scale(1) translateY(0)');
        }, 20); // Short delay for browser to apply initial state
        return () => clearTimeout(timer);
      } else {
        // If it's not newly pinned but visible and compact, ensure it's in the final state
        setCurrentOpacity(1);
        setCurrentTransform('scale(1) translateY(0)');
      }
    } else if (!isVisible) {
        // Reset if panel becomes not visible (applies to full panel fade out too)
        setCurrentOpacity(0);
        // For full panel, transform is not used, so no need to reset it here
        // but for compact, if it were to hide/reshow without isNewlyPinned, this would reset it.
        if (panelMode === 'compact') {
            setCurrentTransform('scale(0.95) translateY(10px)');
        }
    }
  }, [isVisible, isNewlyPinned, panelMode]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) {
      if (scrollAnimationIdRef.current) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
      }
      desiredScrollTopRef.current = null; 
      return;
    }

    let isTypingDoneForBlock = false;
    if (!currentAnalysisMessages || currentAnalysisMessages.length === 0) {
      isTypingDoneForBlock = true;
      scrollModeRef.current = 'inactive'; 
      desiredScrollTopRef.current = null; 
    } else {
      const lastPart = currentAnalysisMessages[currentAnalysisMessages.length - 1];
      isTypingDoneForBlock = typedMessagePartIndex >= currentAnalysisMessages.length - 1 &&
                             typedCharIndex >= (lastPart?.text?.length ?? 0);
    }

    if (typedMessagePartIndex === 0 && typedCharIndex === 0 && currentAnalysisMessages && currentAnalysisMessages.length > 0) {
      scrollModeRef.current = 'pending_trigger';
      contentElement.scrollTop = 0; 
      desiredScrollTopRef.current = 0; 
      if (scrollAnimationIdRef.current) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
      }
    } else if (currentAnalysisMessages && currentAnalysisMessages.length === 0) { 
        scrollModeRef.current = 'inactive';
        desiredScrollTopRef.current = null;
         if (scrollAnimationIdRef.current) {
            cancelAnimationFrame(scrollAnimationIdRef.current);
            scrollAnimationIdRef.current = null;
        }
    }

    const { scrollTop, scrollHeight, clientHeight } = contentElement;
    const currentScrollTarget = Math.max(0, scrollHeight - clientHeight);

    if (scrollModeRef.current === 'pending_trigger' && scrollHeight > clientHeight) {
      let triggerScroll = false;
      const cursorSpan = contentElement.querySelector('span[style*="animation: blinker"]');
      if (cursorSpan) {
        const cursorBottom = (cursorSpan as HTMLElement).offsetTop + (cursorSpan as HTMLElement).offsetHeight;
        if (cursorBottom > (scrollTop + clientHeight - SCROLL_TRIGGER_OFFSET_PX)) {
          triggerScroll = true;
        }
      } else if (scrollTop < currentScrollTarget && !isTypingDoneForBlock) {
        triggerScroll = true;
      } else if (scrollTop < currentScrollTarget && isTypingDoneForBlock) {
         triggerScroll = true;
      }

      if (triggerScroll) {
        scrollModeRef.current = 'active';
        if (desiredScrollTopRef.current === null || Math.abs(desiredScrollTopRef.current - scrollTop) > 1) {
            desiredScrollTopRef.current = scrollTop;
        }
      }
    }

    const scrollStep = () => {
      if (!contentElement || scrollModeRef.current !== 'active') {
        if (scrollAnimationIdRef.current) cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
        return;
      }

      const liveScrollTop = contentElement.scrollTop;
      const liveScrollHeight = contentElement.scrollHeight;
      const liveClientHeight = contentElement.clientHeight;
      const dynamicTarget = Math.max(0, liveScrollHeight - liveClientHeight);

      if (desiredScrollTopRef.current === null) {
        desiredScrollTopRef.current = liveScrollTop;
      }
      
      let isTypingCurrentlyDone = false; 
      if (!currentAnalysisMessages || currentAnalysisMessages.length === 0) {
        isTypingCurrentlyDone = true;
      } else {
        const lastPart = currentAnalysisMessages[currentAnalysisMessages.length - 1];
        const isLastPart = typedMessagePartIndex >= currentAnalysisMessages.length - 1;
        const isLastChar = typedCharIndex >= (lastPart?.text?.length ?? 0);
        if (isLastPart && isLastChar) {
            isTypingCurrentlyDone = true;
        }
      }

      const currentDesired = desiredScrollTopRef.current;
      let nextDesired = currentDesired;

      if (currentDesired < dynamicTarget) {
        nextDesired = Math.min(dynamicTarget, currentDesired + SMOOTH_SCROLL_INCREMENT_PX);
      } else if (currentDesired > dynamicTarget) { 
        nextDesired = Math.max(dynamicTarget, currentDesired - SMOOTH_SCROLL_INCREMENT_PX);
      }
      
      desiredScrollTopRef.current = nextDesired;
      const newScrollTopInt = Math.floor(nextDesired);

      if (contentElement.scrollTop !== newScrollTopInt) {
        contentElement.scrollTop = newScrollTopInt;
      }

      const effectivelyAtTarget = Math.floor(desiredScrollTopRef.current) >= dynamicTarget;

      if (effectivelyAtTarget && isTypingCurrentlyDone) {
        scrollModeRef.current = 'inactive'; 
        contentElement.scrollTop = dynamicTarget; 
        if (scrollAnimationIdRef.current) cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
        return;
      }

      if (scrollModeRef.current === 'active') {
        scrollAnimationIdRef.current = requestAnimationFrame(scrollStep);
      } else {
        if (scrollAnimationIdRef.current) cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
      }
    };

    if (scrollModeRef.current === 'active') {
      if (!scrollAnimationIdRef.current && contentElement.scrollTop < currentScrollTarget) { 
        if (desiredScrollTopRef.current === null || Math.abs(desiredScrollTopRef.current - contentElement.scrollTop) > 1) {
             desiredScrollTopRef.current = contentElement.scrollTop;
        }
        scrollAnimationIdRef.current = requestAnimationFrame(scrollStep);
      } else if (contentElement.scrollTop >= currentScrollTarget && isTypingDoneForBlock) {
        scrollModeRef.current = 'inactive'; 
      }
    } else { 
      if (scrollAnimationIdRef.current) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
      }
      if (isTypingDoneForBlock && scrollTop < currentScrollTarget) {
        contentElement.scrollTop = currentScrollTarget;
        desiredScrollTopRef.current = currentScrollTarget;
      }
    }

    return () => {
      if (scrollAnimationIdRef.current) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
      }
    };
  }, [currentAnalysisMessages, typedMessagePartIndex, typedCharIndex, maxPanelHeightPx]);

  const panelStyle: React.CSSProperties = {
    position: 'absolute', // Make it float
    top: `${topPositionPx}px`,
    right: '20px',
    width: `${panelWidth}px`,
    backgroundColor: '#FFFFFF', // White background
    border: '1px solid #DDE2E7', // Softer border
    borderRadius: '6px',         // Slightly more rounded corners
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Softer shadow for floating effect
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'SF Pro Text', 'Helvetica Neue', 'Arial', sans-serif", // Common UI font stack
    lineHeight: '1.3',
    color: '#333333',      // Softer text color
    transition: 'opacity 0.3s ease-in-out', // Keep panel fade if isVisible changes
    opacity: isVisible ? 1 : 0,
    overflowY: 'hidden', // The panel itself manages overflow via internal scrolling areas
    zIndex: 20, // Ensure it's above canvas highlights if necessary
    pointerEvents: 'none', // Ensure the panel doesn't interfere with canvas interactions
  };

  // Apply animation styles for compact (pinned) panels
  if (panelMode === 'compact') {
    panelStyle.opacity = currentOpacity;
    panelStyle.transform = currentTransform;
    panelStyle.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
  } else {
    // For full panel, only use the isVisible prop for opacity (already doing this)
    panelStyle.opacity = isVisible ? 1 : 0;
    panelStyle.transition = 'opacity 0.3s ease-in-out'; // Keep panel fade if isVisible changes
  }

  if (panelMode === 'full') {
    panelStyle.height = `${maxPanelHeightPx}px`;
  } else { // compact mode
    panelStyle.maxHeight = `${maxPanelHeightPx - 5}px`;
  }

  const analysisContentStyle: React.CSSProperties = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '8px 6px', // Adjusted padding
    opacity: contentOpacity,
    transition: 'opacity 0.3s ease-in-out',
    scrollbarWidth: 'none',  // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };

  const webkitScrollbarStyle = `
    .analysis-content-scrollable::-webkit-scrollbar {
      display: none;
    }
  `;

  const elementsToRender: React.ReactNode[] = [];
  if (currentAnalysisMessages) {
    currentAnalysisMessages.forEach((part, index) => {
      let textToShow = "";
      let showCursor = false;

      if (index < typedMessagePartIndex) {
        textToShow = part.text;
      } else if (index === typedMessagePartIndex) {
        textToShow = part.text.substring(0, typedCharIndex);
        if (typedCharIndex < part.text.length || typedMessagePartIndex < currentAnalysisMessages.length - 1) {
          showCursor = true;
        }
        // Ensure cursor disappears when all text in the very last part of all messages is typed
        if (typedMessagePartIndex === currentAnalysisMessages.length -1 && typedCharIndex >= (part?.text?.length ?? 0) ) {
          showCursor = false;
        }
      } else {
        return;
      }

      // Render part if it has text or if it's the current typing part (even if empty and waiting for cursor)
      if (textToShow || (index === typedMessagePartIndex && showCursor)) { 
        const partStyleDef: React.CSSProperties = {
          fontWeight: part.isTitle ? 'bold' : 'normal',
          color: part.color || 'inherit',
          display: 'block',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          marginBottom: '0.1em',
        };

        if (part.isTitle && index > 0) {
           const prevPart = currentAnalysisMessages[index-1];
           if (!prevPart.isProcessing || !part.isProcessing) {
                elementsToRender.push(<hr key={`hr-${part.id}`} style={{ border: 'none', borderTop: '1px solid #EEEEEE', margin: '4px 0'}} />);
           }
        }

        elementsToRender.push(
          <span key={part.id} style={partStyleDef}>
            {textToShow}
            {showCursor && (
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '1em',
                backgroundColor: 'rgba(82, 23, 109, 1)',
                animation: 'blinker 1s linear infinite',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
              }}></span>
            )}
          </span>
        );
      }
    });
  }

  return (
    <div style={panelStyle} ref={ref} className="text-[9px] xs:text-[10px]">
      <style>
        {webkitScrollbarStyle}
        {`
          @keyframes blinker {
            50% { opacity: 0; }
          }
        `}
      </style>
      <div ref={contentRef} className="analysis-content-scrollable" style={analysisContentStyle}>
        {elementsToRender}
      </div>
    </div>
  );
}));

export default AnalysisSidePanel;
