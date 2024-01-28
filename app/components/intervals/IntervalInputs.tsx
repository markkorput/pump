import { useEffect, useState } from "react";
import { NumberInput, Group } from "@mantine/core";
import { IntervalValues } from "./types";

export interface IntervalInputsProps {
  values?: IntervalValues;
  onChange?: (values: IntervalValues) => void;
}

export const IntervalInputs = ({ values, onChange }: IntervalInputsProps) => {
  const [reps, setReps] = useState<number>();
  const [repsDur, setRepsDur] = useState<number>();
  const [repsRest, setRepsRest] = useState<number>();
  const [sets, setSets] = useState<number>();
  const [setsRest, setSetsRest] = useState<number>();

  useEffect(() => {
    onChange?.({
      reps: {
        amount: reps || 1,
        duration: repsDur || 1,
        rest: repsRest || 10,
      },
      sets: {
        amount: sets || 1,
        rest: setsRest || 30,
      },
    });
  }, [onChange, reps, repsDur, repsRest, sets, setsRest]);

  return (
    <Group>
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Amount of reps"
        defaultValue={values?.reps.amount || 1}
        onChange={(v) => setReps(typeof v === "number" ? v : parseInt(v))}
        label="Reps"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Duration of a rep in seconds"
        defaultValue={values?.reps.duration || 10.0}
        onChange={(v) => setRepsDur(typeof v === "number" ? v : parseInt(v))}
        label="Reps Dur"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Rest in seconds"
        defaultValue={values?.reps.rest || 30.0}
        onChange={(v) => setRepsRest(typeof v === "number" ? v : parseInt(v))}
        label="Reps Rest"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Number of sets"
        defaultValue={values?.sets.amount || 3}
        onChange={(v) => setSets(typeof v === "number" ? v : parseInt(v))}
        label="Sets"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Rest between sets"
        defaultValue={values?.sets.rest || 90.0}
        onChange={(v) => setSetsRest(typeof v === "number" ? v : parseInt(v))}
        label="Set Rest"
      />
    </Group>
  );
};

export default IntervalInputs;
