import { useCallback } from "react";
import Router from "next/router";
import { Stack } from "@mantine/core";
import { z } from "zod";
import IntervalForm, {
  IntervalFormValues,
} from "@components/intervals/IntervalForm";
import useParsedParams from "@hooks/useParsedParams";
import { useCreateInterval } from "@/app/hooks/intervals";

const paramsSchema = z.object({
  backUrl: z.string().optional(),
});

export const NewInterval = () => {
  const { params } = useParsedParams(paramsSchema.parse);
  const { mutate: create } = useCreateInterval();

  const onSubmit = useCallback(
    async (values: IntervalFormValues) => {
      await create(values);
      Router.push(params?.backUrl || "/interval");
    },
    [create, params?.backUrl],
  );

  return (
    <Stack>
      <h1>New Interval</h1>
      <IntervalForm onSubmit={onSubmit} />
    </Stack>
  );
};

export default NewInterval;
