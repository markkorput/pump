import { useEffect, useState } from "react";
import { NumberInput, Group, Stack } from "@mantine/core";
import { IntervalDefinition } from "./types";
import IntervalBar from "./IntervalBar";

export interface IntervalInputsProps {
  onChange?: (intervalDef: IntervalDefinition) => void;
}

export const IntervalInputs = ({ onChange }: IntervalInputsProps) => {
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
        onChange={(v) => setReps(typeof v === "number" ? v : parseInt(v))}
        label="Reps"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Duration of a rep in seconds"
        onChange={(v) => setRepsDur(typeof v === "number" ? v : parseInt(v))}
        label="Reps Dur"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Rest in seconds"
        onChange={(v) => setRepsRest(typeof v === "number" ? v : parseInt(v))}
        label="Reps Rest"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Number of sets"
        onChange={(v) => setSets(typeof v === "number" ? v : parseInt(v))}
        label="Sets"
      />
      <NumberInput
        min={0}
        style={{ width: 100 }}
        placeholder="Rest between sets"
        onChange={(v) => setSetsRest(typeof v === "number" ? v : parseInt(v))}
        label="Set Rest"
      />
    </Group>
  );
};

export const IntervalEditor = () => {
  const [def, setDef] = useState<IntervalDefinition>();

  return (
    <Stack>
      <IntervalInputs onChange={setDef} />
      {def && <IntervalBar interval={def} width={1000} height={20} />}
    </Stack>
  );
};

export default IntervalEditor;
