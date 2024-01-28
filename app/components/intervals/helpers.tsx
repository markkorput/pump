import type { IntervalDefinition, IntervalSection, SectionType } from "./types";

export function totalDuration(interval: IntervalDefinition): number {
  return (
    (interval.reps.amount * interval.reps.duration +
      (interval.reps.amount - 1) * interval.reps.rest) *
      interval.sets.amount +
    (interval.sets.amount - 1) * interval.sets.rest
  );
}

export function toSections(interval: IntervalDefinition): IntervalSection[] {
  // sets
  return Array.from({ length: interval.sets.amount }).flatMap((_, setIdx) => [
    // unless this is the first set...
    ...(setIdx === 0
      ? []
      : // ...insert a rest
        [{ duration: interval.sets.rest, type: "rest" as SectionType }]),
    // map reps
    ...Array.from({ length: interval.reps.amount }).flatMap((__, idx) => [
      // unless this is the first rep...
      ...(idx === 0
        ? []
        : // insert a rest
          [{ duration: interval.reps.rest, type: "rest" as SectionType }]),
      // rep
      { duration: interval.reps.duration, type: "rep" as SectionType },
    ]),
  ]);
}

export default totalDuration;
