import { useCallback, useState } from "react";
import { Stack, TextInput, Button } from "@mantine/core";
import {
  useIntervals,
  useCreateInterval,
  useUpdateInterval,
} from "@hooks/intervals";
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
  const { data: intervals } = useIntervals();
  const { mutate: create } = useCreateInterval();
  const { mutate: update } = useUpdateInterval();

  const [interval, setInterval] = useState<
    IntervalValues & { name?: string; id?: string }
  >(defaultValues);

  const save = useCallback(() => {
    const { name, id, ...values } = interval;

    if (name) {
      if (id) {
        update({ id, name, ...values }).then((res) =>
          log.debug("Interval updated", res),
        );
      } else {
        create({ name, ...values }).then((res) =>
          log.debug("Interval created", res),
        );
      }
    }
  }, [interval, create, update]);

  return (
    <Stack>
      <IntervalSelector intervals={intervals || []} onSelect={setInterval} />
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
