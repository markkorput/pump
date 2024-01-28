import { useCallback } from "react";
import Router from "next/router";
import { Stack } from "@mantine/core";
import { z } from "zod";
import IntervalForm, {
  IntervalFormValues,
} from "@components/intervals/IntervalForm";
import useParsedParams from "@hooks/useParsedParams";
import { useInterval, useUpdateInterval } from "@/app/hooks/intervals";

const paramsSchema = z.object({
  id: z.string(),
  backUrl: z.string().optional(),
});

export const EditInterval = () => {
  const { params } = useParsedParams(paramsSchema.parse);
  const { data: interval } = useInterval(params?.id);
  const { mutate: update } = useUpdateInterval();

  const onSubmit = useCallback(
    async (values: IntervalFormValues) => {
      if (!interval) return;
      await update({ ...values, id: interval.id });
      Router.push(params?.backUrl || "/interval");
    },
    [update, interval, params?.backUrl],
  );

  return (
    <Stack>
      <h1>Edit</h1>
      {interval && <IntervalForm interval={interval} onSubmit={onSubmit} />}
    </Stack>
  );
};

export default EditInterval;
