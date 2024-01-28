import { useState } from "react";
import { Stack, TextInput, Button } from "@mantine/core";
import { IntervalDefinition } from "./types";
import IntervalBar from "./IntervalBar";
import IntervalInputs from "./IntervalInputs";
import IntervalSelector from "./IntervalSelector";

const defaultValues = {
  reps: { amount: 3, duration: 3.0, rest: 10.0 },
  sets: { amount: 1, rest: 30.0 },
};

export const IntervalEditor = () => {
  const [interval, setInterval] = useState<
    IntervalDefinition & { name?: string; id?: string }
  >(defaultValues);

  // const doSave = (interval: IntervalDefinition & { name: string }) => {};

  const save = () => {
    // if (interval) doSave({ ...interval, name });
  };

  return (
    <Stack>
      <IntervalSelector intervals={[]} onSelect={setInterval} />
      <IntervalInputs interval={interval} onChange={setInterval} />
      <TextInput
        label="Interval Name"
        defaultValue={interval?.name}
        onChange={(e) => setInterval({ ...interval, name: e.target.value })}
      />
      <Button onClick={save}>Save Interval</Button>
      {interval && <IntervalBar interval={interval} width={1000} height={20} />}
    </Stack>
  );
};

export default IntervalEditor;
