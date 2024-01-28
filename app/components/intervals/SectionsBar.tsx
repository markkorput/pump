import { useMemo } from "react";
import { sumBy } from "lodash";
import { IntervalSection } from "./types";

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

interface SectionsBarProps {
  sections: IntervalSection[];
  progress?: number;
  width?: number;
  height?: number;
}

const SectionsBar = ({
  sections,
  progress,
  width = 100,
  height = 3,
}: SectionsBarProps) => {
  const barSections = useMemo(() => {
    const ttl = sumBy(sections, "duration");

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
  }, [sections, width, height]);

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

export default SectionsBar;
