import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from "remotion";
import { SiteStyles } from "./components/SiteStyles";
import { StorefrontView } from "./components/StorefrontView";
import { VirtualCursor } from "./components/VirtualCursor";

export const MayukhaFullTour: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. DETERMINISTIC VIRTUAL SCROLL (translateY)
  // =========================================================================
  // Keyframe Journey:
  // 0 - 180: Hero view (0px)
  // 180 - 360: Bento Grid (840px)
  // 360 - 540: Heritage Arches (1420px)
  // 540 - 720: Catalog Grid (1980px)
  // 720 - 1200: Stop on catalog for interactions (1980px)
  // 1200 - 1350: Dealer Lounge unlocked at catalog (1980px)
  // 1350 - 1550: Client Diaries & Footer (2820px)
  // 1550 - 1800: Deceleration back to Hero (0px)

  const translateY = interpolate(
    frame,
    [0, 180, 260, 360, 440, 540, 620, 720, 1200, 1350, 1430, 1550, 1630, 1800],
    [0, 0, 840, 840, 1420, 1420, 1980, 1980, 1980, 1980, 2820, 2820, 0, 0],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    }
  );

  // Continuous Marquee ticker driven by frame clock
  const marqueeOffset = frame * 2.8;

  // =========================================================================
  // 2. MICRO-INTERACTIONS (Hover, Modal, Dealer Lounge)
  // =========================================================================

  // Card 1 hover crossfade: active between frames 770 and 875
  const activeHoverCardId = frame >= 770 && frame < 875 ? "MYK-MS-01" : null;

  // Quick View Modal: active between frames 870 and 1120
  const quickViewOpen = frame >= 870 && frame < 1130;

  const quickViewModalProgress = quickViewOpen
    ? spring({
        frame: frame - 870,
        fps,
        config: { damping: 14, stiffness: 120 }
      })
    : 0;

  // Quick View thumbnail 2 selected after frame 970
  const quickViewSelectedImageIndex = frame >= 970 ? 1 : 0;

  // Add to Royal Bag button hover/click inside modal
  const onQuickViewAddToCartHover = frame >= 1010 && frame < 1060;
  const cartCounterValue = frame >= 1030 ? 1 : 0;

  // Dealer Wholesale Mode unlocked at Frame 1250
  const isDealerMode = frame >= 1250;

  // =========================================================================
  // 3. VIRTUAL CURSOR COORDINATES & CLICKS
  // =========================================================================
  let cursorX = 1400;
  let cursorY = 280;
  let isClicking = false;
  let cursorLabel = "Royal Heritage Boutique";

  if (frame < 180) {
    // Hero: glides to CTA button
    cursorX = interpolate(frame, [0, 120], [1400, 420]);
    cursorY = interpolate(frame, [0, 120], [280, 480]);
    cursorLabel = "Explore Bridal Looms";
  } else if (frame < 360) {
    // Bento Grid: inspecting Sacred Vivah card
    cursorX = interpolate(frame, [180, 270], [420, 650]);
    cursorY = interpolate(frame, [180, 270], [480, 520]);
    cursorLabel = "Sacred Vivah Bento";
  } else if (frame < 540) {
    // Heritage Arches: inspecting Mashru Crepe & Munga Kalamkari
    cursorX = interpolate(frame, [360, 450], [650, 480]);
    cursorY = interpolate(frame, [360, 450], [520, 500]);
    cursorLabel = "Varanasi Heritage Weave";
  } else if (frame < 770) {
    // Moving into Catalog
    cursorX = interpolate(frame, [540, 720], [480, 310]);
    cursorY = interpolate(frame, [540, 720], [500, 490]);
    cursorLabel = "Browsing Masterpieces";
  } else if (frame < 870) {
    // Card 1 hover & move to Quick View button
    cursorX = interpolate(frame, [770, 840], [310, 270]);
    cursorY = interpolate(frame, [770, 840], [490, 530]);
    isClicking = frame >= 860 && frame <= 870;
    cursorLabel = isClicking ? "Opening Quick View" : "Hovering Saree Crossfade";
  } else if (frame < 970) {
    // Inside Quick View modal: moving to Thumbnail 2
    cursorX = interpolate(frame, [880, 960], [270, 620]);
    cursorY = interpolate(frame, [880, 960], [530, 770]);
    isClicking = frame >= 960 && frame <= 970;
    cursorLabel = isClicking ? "Selecting Pallu View" : "Inspecting Pallu Thumbnail";
  } else if (frame < 1060) {
    // Moving to Add to Royal Bag button
    cursorX = interpolate(frame, [980, 1030], [620, 1140]);
    cursorY = interpolate(frame, [980, 1030], [770, 770]);
    isClicking = frame >= 1030 && frame <= 1040;
    cursorLabel = isClicking ? "Added to Bridal Bag!" : "Hovering Add to Bag";
  } else if (frame < 1140) {
    // Moving to Close (X) button of modal
    cursorX = interpolate(frame, [1060, 1100], [1140, 1420]);
    cursorY = interpolate(frame, [1060, 1100], [770, 140]);
    isClicking = frame >= 1100 && frame <= 1110;
    cursorLabel = "Closing Quick View";
  } else if (frame < 1300) {
    // Moving to Header Dealer Lounge button & clicking (PIN 2026 unlock)
    cursorX = interpolate(frame, [1140, 1230], [1420, 1640]);
    cursorY = interpolate(frame, [1140, 1230], [140, 60]);
    isClicking = frame >= 1235 && frame <= 1245;
    cursorLabel = isClicking ? "Authenticating PIN 2026..." : "Unlocking Dealer Lounge";
  } else if (frame < 1350) {
    // Admiring wholesale unlocked rates & margin pills
    cursorX = interpolate(frame, [1300, 1340], [1640, 450]);
    cursorY = interpolate(frame, [1300, 1340], [60, 560]);
    cursorLabel = "Wholesale Rates Unlocked!";
  } else if (frame < 1550) {
    // Scrolling to Client Diaries & Footer
    cursorX = interpolate(frame, [1350, 1480], [450, 960]);
    cursorY = interpolate(frame, [1350, 1480], [560, 680]);
    cursorLabel = "5-Star Client Diaries";
  } else {
    // Decelerating back to Hero logo
    cursorX = interpolate(frame, [1550, 1720], [960, 960]);
    cursorY = interpolate(frame, [1550, 1720], [680, 70]);
    cursorLabel = "Mayukha Silks & Couture";
  }

  return (
    <>
      <SiteStyles />
      <StorefrontView
        translateY={translateY}
        marqueeOffset={marqueeOffset}
        activeHoverCardId={activeHoverCardId}
        quickViewOpen={quickViewOpen}
        quickViewProductId="MYK-MS-01"
        quickViewSelectedImageIndex={quickViewSelectedImageIndex}
        quickViewModalProgress={quickViewModalProgress}
        isDealerMode={isDealerMode}
        cartCounterValue={cartCounterValue}
        onQuickViewAddToCartHover={onQuickViewAddToCartHover}
      />
      <VirtualCursor x={cursorX} y={cursorY} isClicking={isClicking} label={cursorLabel} />
    </>
  );
};
