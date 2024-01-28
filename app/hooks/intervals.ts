import { IntervalsAPI, CreateIntervalProps } from "@lib/api/intervals";
import { useApi } from "./useApi";
import { useMutation } from "./useMutation";
import { useQuery } from "./useQuery";

export function useIntervals() {
  const intervalsApi = useApi(IntervalsAPI);
  return useQuery(() => intervalsApi.index());
}

export function useCreateInterval() {
  const intervalsApi = useApi(IntervalsAPI);
  return useMutation((props: CreateIntervalProps) =>
    intervalsApi.create(props),
  );
}
