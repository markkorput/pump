import { useMemo } from "react";
import { sumBy } from "lodash";
import { IntervalValues } from "./types";
import { totalDuration, toSections } from "./helpers";

const barStyles = {
  display: "block",
  padding: 0,
  margin: 0,
  // border: "1px solid black",
  width: "100%",
};

const colors = {
  rest: "#3ed54f",
  active: "#d53e4f",
  progress: "#00000055",
};

interface IntervalBarProps {
  interval: IntervalValues;
  progress?: number;
  time?: number;
  width?: number;
  height?: number;
}

const IntervalBar = ({
  interval,
  time,
  progress,
  width = 100,
  height = 3,
}: IntervalBarProps) => {
  const ttl = totalDuration(interval);

  if (time && !progress) {
    progress = time / ttl;
  }

  const barSections = useMemo(() => {
    const sections = toSections(interval);

    return sections.map((section, idx) => (
      <rect
        key={`interval-bar-section-${idx}`}
        x={(sumBy(sections.slice(0, idx), "duration") / ttl) * width}
        y="0"
        height={height}
        width={(section.duration / ttl) * width}
        fill={idx % 2 ? colors.active : colors.rest}
      />
    ));
  }, [interval, ttl, width, height]);

  return (
    <svg
      width="300px"
      viewBox={[0, 0, width, height].map((v) => v.toString()).join(" ")}
      style={barStyles}
    >
      {barSections}
      {progress && (
        <rect
          x="0"
          y="0"
          height={height}
          width={progress * width}
          fill={colors.progress}
        />
      )}
    </svg>
  );
};

export default IntervalBar;
