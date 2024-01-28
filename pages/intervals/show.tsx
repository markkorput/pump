import { Stack } from "@mantine/core";
import { z } from "zod";

import useParsedParams from "@hooks/useParsedParams";
import { useInterval } from "@/app/hooks/intervals";

const paramsSchema = z.object({
  id: z.string(),
  backUrl: z.string().optional(),
});

export const ShowInterval = () => {
  const { params } = useParsedParams(paramsSchema.parse);
  const { data: interval } = useInterval(params?.id);

  return (
    <Stack>
      <h1>TODO: show {interval?.name}</h1>
    </Stack>
  );
};

export default ShowInterval;
