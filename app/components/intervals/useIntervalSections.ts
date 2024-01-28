import { useMemo } from "react";
import { clamp } from "lodash";
import { IntervalValues } from "./types";
import {
  totalDuration,
  toSections,
  toSetSections,
  getSetDuration,
} from "./helpers";

interface IntervalBarProps {
  interval?: IntervalValues;
  time?: number;
  zoomSet?: number;
}

export const useIntervalSection = ({
  interval,
  time,
  zoomSet,
}: IntervalBarProps) => {
  const ttl = useMemo(
    () =>
      zoomSet !== undefined
        ? interval
          ? getSetDuration(interval)
          : 0.0
        : interval
          ? totalDuration(interval)
          : 0.0,
    [interval, zoomSet],
  );

  const percent = useMemo(() => {
    if (!time) return undefined;

    if (zoomSet === undefined) {
      return time / ttl;
    }

    const start = ttl * zoomSet;
    return clamp((time || 0.0) - start, 0.0, ttl) / ttl;
  }, [time, zoomSet, ttl]);

  const sections = useMemo(() => {
    return interval
      ? zoomSet !== undefined
        ? toSetSections(interval)
        : toSections(interval)
      : [];
  }, [interval, zoomSet]);

  return {
    sections,
    progress: percent,
  };
};

export default useIntervalSection;
