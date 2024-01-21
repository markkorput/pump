import { ReactNode, useRef, useState } from "react";
import { sum } from "lodash";
import { useFrame } from "@lib/frames";

const barStyles = {
  display: "block",
  padding: 0,
  margin: 0,
  border: "1px solid black",
  maxWidth: "100%",
  height: "auto",
};

const colors = {
  rest: "#3ed54f",
  active: "#d53e4f",
  progress: "#00000055",
};

interface BarProps {
  durations: number[];
  progress?: number;
  time?: number;
}

const Bar = ({ durations, progress, time }: BarProps) => {
  const ttl = sum(durations);

  const width = 100;
  const height = 3;

  if (time && !progress) {
    progress = time / ttl;
  }

  return (
    <svg
      width="300px"
      viewBox={[0, 0, width, height].map((v) => v.toString()).join(" ")}
      style={barStyles}
    >
      {durations.reduce<ReactNode[]>(
        (acc, dur, idx) => [
          ...acc,
          <rect
            key={`bar-piece-${idx}`}
            x={(sum(durations.slice(0, idx)) / ttl) * width}
            y="0"
            height={height}
            width={(dur / ttl) * width}
            fill={idx % 2 ? colors.active : colors.rest}
          />,
        ],
        [],
      )}
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

export const Workout = () => {
  const [time, setTime] = useState(0);

  const startRef = useRef<number>();

  useFrame((time: number) => {
    if (!startRef.current) startRef.current = time;
    setTime((time - startRef.current) * 0.001);
  });

  return <Bar durations={[7, 3, 7, 3, 7, 60, 7, 3, 7, 3, 7, 60]} time={time} />;
};

export default Workout;
