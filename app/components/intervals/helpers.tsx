import type { IntervalValues, IntervalSection, SectionType } from "./types";

export function totalDuration(interval: IntervalValues): number {
  return (
    (interval.reps.amount * interval.reps.duration +
      (interval.reps.amount - 1) * interval.reps.rest) *
      interval.sets.amount +
    (interval.sets.amount - 1) * interval.sets.rest
  );
}

export function toSetSections(interval: IntervalValues): IntervalSection[] {
  // map reps
  return Array.from({ length: interval.reps.amount }).flatMap((__, idx) => [
    // unless this is the first rep...
    ...(idx === 0
      ? []
      : // insert a rest
        [{ duration: interval.reps.rest, type: "rest" as SectionType }]),
    // rep
    { duration: interval.reps.duration, type: "rep" as SectionType },
  ]);
}

export function toSections(interval: IntervalValues): IntervalSection[] {
  const setSections = toSetSections(interval);

  // sets
  return Array.from({ length: interval.sets.amount }).flatMap((_, setIdx) => [
    // unless this is the first set...
    ...(setIdx === 0
      ? []
      : // ...insert a rest
        [{ duration: interval.sets.rest, type: "rest" as SectionType }]),
    ...setSections,
  ]);
}

export function getSetDuration(interval: IntervalValues): number {
  return (
    interval.reps.amount * (interval.reps.duration + interval.reps.rest) -
    interval.reps.rest
  );
}

export function getCurrentSet(interval: IntervalValues, time: number): number {
  let start = 0.0;
  const setDuration = getSetDuration(interval);

  for (let idx = 0; idx < interval.sets.amount; idx++) {
    if (start > time) return idx - 1;
    if (start + setDuration > time) return idx;
    start += setDuration + interval.sets.rest;
  }

  return interval.sets.amount - 1;
}

export function getCurrentRep(interval: IntervalValues, time: number): number {
  let start =
    (getSetDuration(interval) + interval.sets.rest) *
    getCurrentSet(interval, time);

  for (let idx = 0; idx < interval.reps.amount; idx++) {
    if (start > time) return idx - 1;
    if (start + interval.reps.duration > time) return idx;
    start += interval.reps.duration + interval.reps.rest;
  }

  return interval.sets.amount - 1;
}

export default totalDuration;
