import { useCallback, useState } from "react";
import { Stack, TextInput, Button } from "@mantine/core";
import { useIntervals, useCreateInterval } from "@hooks/intervals";
import { IntervalValues } from "./types";
import IntervalBar from "./IntervalBar";
import IntervalInputs from "./IntervalInputs";
import IntervalSelector from "./IntervalSelector";
import { createLogger } from "@lib/logging";

const log = createLogger("interval-editor");

const defaultValues: IntervalValues = {
  reps: { amount: 3, duration: 3.0, rest: 10.0 },
  sets: { amount: 1, rest: 30.0 },
};

export const IntervalEditor = () => {
  // const { data: intervals } = useIntervals();
  const { mutate: create } = useCreateInterval();

  const [interval, setInterval] = useState<
    IntervalValues & { name?: string; id?: string }
  >(defaultValues);

  // const doSave = (interval: IntervalDefinition & { name: string }) => {};

  const save = useCallback(() => {
    // if (interval) doSave({ ...interval, name });
    const { name, ...values } = interval;

    if (name) {
      create({ name, ...values }).then((res) =>
        log.debug("Interval saved", res),
      );
    }
  }, [interval, create]);

  return (
    <Stack>
      {/* <IntervalSelector intervals={intervals || []} onSelect={setInterval} /> */}
      <IntervalInputs values={interval} onChange={setInterval} />
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
