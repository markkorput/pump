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

export type IntervalSection = {
  duration: number;
  type: "rep" | "rest";
};
