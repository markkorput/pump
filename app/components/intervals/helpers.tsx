import { IntervalDefinition } from "./types";

export const totalDuration = (interval: IntervalDefinition) =>
  (interval.reps.amount * interval.reps.duration +
    (interval.reps.amount - 1) * interval.reps.rest) *
    interval.sets.amount +
  (interval.sets.amount - 1) * interval.sets.rest;

export const toSections = (interval: IntervalDefinition) => {
  return Array.from({ length: interval.sets.amount }).flatMap((_, setIdx) => [
    ...(setIdx === 0 ? [] : [{ duration: interval.sets.rest, type: "rest" }]),
    ...Array.from({ length: interval.reps.amount }).flatMap((__, idx) => [
      ...(idx === 0 ? [] : [{ duration: interval.reps.rest, type: "rest" }]),
      { duration: interval.reps.duration, type: "rep" },
    ]),
  ]);
};

export default totalDuration;
