import { type CreateIntervalProps } from "@lib/api/intervals";

export type {
  IntervalDefinition,
  CreateIntervalProps,
} from "@lib/api/intervals";

export type IntervalValues = Omit<CreateIntervalProps, "name">;

export type SectionType = "rep" | "rest";

export type IntervalSection = {
  duration: number;
  type: SectionType;
};
