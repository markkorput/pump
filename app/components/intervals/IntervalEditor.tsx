import { useCallback, useState } from "react";
import { Stack, TextInput, Button } from "@mantine/core";
import {
  useIntervals,
  useCreateInterval,
  useUpdateInterval,
  useDeleteInterval,
} from "@hooks/intervals";
import { IntervalDefinition } from "./types";
import IntervalBar from "./IntervalBar";
import IntervalForm, { IntervalFormValues } from "./IntervalForm";
import IntervalSelector from "./IntervalSelector";
import { createLogger } from "@lib/logging";

const log = createLogger("interval-editor");

export const IntervalEditor = () => {
  const { data: intervals } = useIntervals();
  // const { mutate: create } = useCreateInterval();
  const { mutate: update } = useUpdateInterval();
  const { mutate: deleteInterval } = useDeleteInterval();

  const [interval, setInterval] = useState<IntervalDefinition | undefined>();
  const [editInterval, setEditInterval] = useState<
    IntervalDefinition | undefined
  >();

  const submitEditForm = useCallback(
    (vals: IntervalFormValues) => {
      if (!editInterval) return;
      update({ ...vals, id: editInterval.id }).then((res) => {
        log.debug("Interval updated", res);
        // setEditInterval(undefined);
      });
    },
    [update, editInterval],
  );

  // const save = useCallback(() => {
  //   if (!name) return;

  //   if (selected?.id) {
  //     update({ id: selected.id, name: name, ...values }).then((res) =>
  //       log.debug("Interval updated", res),
  //     );
  //     return;
  //   }

  //   create({ name: name, ...values }).then((res) =>
  //     log.debug("Interval created", res),
  //   );
  // }, [create, update, selected, name, values]);

  return (
    <Stack>
      <IntervalSelector
        intervals={intervals || []}
        onSelect={(selected) => {
          setEditInterval(undefined);
          setInterval(selected);
        }}
        onEdit={(int) => {
          setEditInterval(int);
        }}
        onDelete={({ id }: IntervalDefinition) => deleteInterval(id)}
      />
      {editInterval && (
        <IntervalForm interval={editInterval} onSubmit={submitEditForm} />
      )}
      {interval && !editInterval && (
        <IntervalBar interval={interval} width={1000} height={20} />
      )}
    </Stack>
  );
};

export default IntervalEditor;
