export type IntervalRepsDef = {
  amount: number;
  duration: number;
  rest: number;
};

export type IntervalSetsDef = {
  amount: number;
  rest: number;
};

export type IntervalDefinition = {
  reps: IntervalRepsDef;
  sets: IntervalSetsDef;
};

export type NamedIntervalDefinition = IntervalDefinition & {
  name: string;
};

export type SavedIntervalDefinition = NamedIntervalDefinition & {
  id: string;
};

export type SectionType = "rep" | "rest";

export type IntervalSection = {
  duration: number;
  type: SectionType;
};
