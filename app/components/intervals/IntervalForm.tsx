import { useEffect, useState } from "react";
import { NumberInput, Group, Stack, TextInput, Button } from "@mantine/core";
import { merge, cloneDeep } from "lodash";
import { IntervalDefinition } from "./types";
import IntervalBar from "./IntervalBar";

export type IntervalFormValues = Omit<IntervalDefinition, "id">;

export interface IntervalFormProps {
  interval?: Partial<IntervalFormValues>;
  onChange?: (values: IntervalFormValues) => void;
  onSubmit?: (values: IntervalFormValues) => void;
  bar?: boolean;
}

export const IntervalForm = ({
  bar = true,
  interval,
  onChange,
  onSubmit,
}: IntervalFormProps) => {
  const [current, setCurrent] = useState<IntervalFormValues>(
    merge(
      {
        reps: {
          amount: 1,
          duration: 1,
          rest: 10,
        },
        sets: {
          amount: 1,
          rest: 30,
        },
        name: "",
      },
      interval,
    ),
  );

  // trigger onChange option when current changes
  useEffect(() => {
    onChange?.(current);
  }, [onChange, current]);

  const onChanger =
    (transformer: (v: number) => Record<string, unknown>) =>
    (v: string | number) =>
      setCurrent((cur) => {
        const transformed = transformer(
          typeof v === "number" ? v : parseInt(v),
        );
        return merge(cloneDeep(cur), transformed);
      });

  return (
    <Stack>
      <Group>
        <NumberInput
          min={0}
          style={{ width: 100 }}
          placeholder="Amount of reps"
          defaultValue={current.reps.amount || 1}
          onChange={onChanger((v) => ({ reps: { amount: v } }))}
          label="Reps"
        />
        <NumberInput
          min={0}
          style={{ width: 100 }}
          placeholder="Duration of a rep in seconds"
          defaultValue={current.reps.duration || 10.0}
          onChange={onChanger((v) => ({ reps: { duration: v } }))}
          label="Reps Dur"
        />
        <NumberInput
          min={0}
          style={{ width: 100 }}
          placeholder="Rest in seconds"
          defaultValue={current.reps.rest || 30.0}
          onChange={onChanger((v) => ({ reps: { rest: v } }))}
          label="Reps Rest"
        />
        <NumberInput
          min={0}
          style={{ width: 100 }}
          placeholder="Number of sets"
          defaultValue={current.sets.amount || 3}
          onChange={onChanger((v) => ({ sets: { amount: v } }))}
          label="Sets"
        />
        <NumberInput
          min={0}
          style={{ width: 100 }}
          placeholder="Rest between sets"
          defaultValue={current.sets.rest || 90.0}
          onChange={onChanger((v) => ({ reps: { rest: v } }))}
          label="Set Rest"
        />
      </Group>

      <TextInput
        label="Interval Name"
        defaultValue={current.name}
        onChange={(e) =>
          setCurrent((cur) => merge(cur, { name: e.target.value }))
        }
      />
      <Button
        onClick={() => onSubmit?.(current)}
        disabled={current.name !== ""}
      >
        Save Interval
      </Button>
      {bar && <IntervalBar interval={current} width={1000} height={20} />}
    </Stack>
  );
};

export default IntervalForm;
