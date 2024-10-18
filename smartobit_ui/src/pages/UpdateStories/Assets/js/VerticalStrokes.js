import React from "react";
import { useTheme } from "@emotion/react";

const VerticalStrokes = ({ width }) => {
  const theme = useTheme();
  const strokeCount = Math.floor(width / 10);


  return (
    <div className="vertical-strokes">
      {Array.from({ length: strokeCount }).map((_, index) => (
        <div key={index} className="stroke" />
      ))}
    </div>
  );
};

export default VerticalStrokes;