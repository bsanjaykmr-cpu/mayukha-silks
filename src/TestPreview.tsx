import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { SiteStyles } from "./components/SiteStyles";
import { StorefrontView } from "./components/StorefrontView";
import { VirtualCursor } from "./components/VirtualCursor";

export const TestPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Virtual Page Scroll: positioned directly at catalog grid
  const translateY = 1850;

  // Frame milestones for 300 frames (5 sec @ 60fps)
  // 0 - 60: Cursor floats into Card 1
  // 60 - 120: Card 1 hovered -> crossfade & quick view button elevation
  // 120 - 140: Cursor clicks Quick View button
  // 140 - 200: Quick View modal pops open
  // 200 - 240: Cursor moves to thumbnail 2 & clicks
  // 240 - 300: Cursor hovers "Add to Shopping Bag"

  const activeHoverCardId = frame >= 50 && frame < 140 ? "MYK-MS-01" : null;

  const quickViewOpen = frame >= 135;

  const quickViewModalProgress = quickViewOpen
    ? spring({
        frame: frame - 135,
        fps,
        config: { damping: 14, stiffness: 120 }
      })
    : 0;

  const quickViewSelectedImageIndex = frame >= 220 ? 1 : 0;
  const onQuickViewAddToCartHover = frame >= 250;

  // Cursor Coordinates Interpolation
  let cursorX = 1100;
  let cursorY = 550;
  let isClicking = false;
  let cursorLabel = "Browsing Catalog";

  if (frame < 60) {
    cursorX = interpolate(frame, [0, 60], [1100, 310]);
    cursorY = interpolate(frame, [0, 60], [550, 480]);
  } else if (frame < 120) {
    cursorX = interpolate(frame, [60, 110], [310, 260]);
    cursorY = interpolate(frame, [60, 110], [480, 520]);
    cursorLabel = "Hovering Saree Card";
  } else if (frame < 140) {
    cursorX = 260;
    cursorY = 520;
    isClicking = frame >= 125 && frame <= 135;
    cursorLabel = isClicking ? "Opening Quick View" : "Clicking Quick View";
  } else if (frame < 220) {
    // Inside modal, moving to thumbnail 2
    cursorX = interpolate(frame, [140, 210], [260, 620]);
    cursorY = interpolate(frame, [140, 210], [520, 770]);
    cursorLabel = "Inspecting Pallu Details";
  } else if (frame < 250) {
    // Clicking thumbnail 2
    cursorX = 620;
    cursorY = 770;
    isClicking = frame >= 220 && frame <= 230;
    cursorLabel = "Inspecting Pallu Weave";
  } else {
    // Moving to Add to Shopping Bag button
    cursorX = interpolate(frame, [250, 280], [620, 1150]);
    cursorY = interpolate(frame, [250, 280], [770, 770]);
    cursorLabel = "Add to Royal Bag";
  }

  return (
    <>
      <SiteStyles />
      <StorefrontView
        translateY={translateY}
        marqueeOffset={frame * 2}
        activeHoverCardId={activeHoverCardId}
        quickViewOpen={quickViewOpen}
        quickViewProductId="MYK-MS-01"
        quickViewSelectedImageIndex={quickViewSelectedImageIndex}
        quickViewModalProgress={quickViewModalProgress}
        isDealerMode={false}
        cartCounterValue={frame >= 285 ? 1 : 0}
        onQuickViewAddToCartHover={onQuickViewAddToCartHover}
      />
      <VirtualCursor x={cursorX} y={cursorY} isClicking={isClicking} label={cursorLabel} />
    </>
  );
};
