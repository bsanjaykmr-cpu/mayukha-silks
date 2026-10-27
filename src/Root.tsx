import React from "react";
import { Composition } from "remotion";
import { TestPreview } from "./TestPreview";
import { MayukhaFullTour } from "./MayukhaFullTour";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="TestPreview"
        component={TestPreview}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="MayukhaFullTour"
        component={MayukhaFullTour}
        durationInFrames={1800}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
