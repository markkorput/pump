import { useMemo } from "react";

import { Group, Badge } from "@mantine/core";

import { IntervalDefinition } from "./types";

export interface IntervalDetailsProps {
  interval: IntervalDefinition;
}

export const IntervalDetails = ({ interval }: IntervalDetailsProps) => {
  const badges = useMemo(
    () =>
      [
        { label: "Reps", value: interval.reps.amount },
        { label: "Duration", value: interval.reps.duration },
        { label: "Rest between reps", value: interval.reps.rest },
        { label: "Sets", value: interval.sets.amount },
        { label: "Rest between sets", value: interval.sets.rest },
      ].map(({ label, value }) => (
        <Badge variant="default" key={label}>
          {label}: {value}
        </Badge>
      )),
    [interval],
  );

  return <Group>{badges}</Group>;
};

export default IntervalDetails;
