import {
  IntervalsAPI,
  CreateIntervalProps,
  UpdateIntervalProps,
} from "@lib/api/intervals";
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

export function useUpdateInterval() {
  const intervalsApi = useApi(IntervalsAPI);
  return useMutation((props: UpdateIntervalProps) =>
    intervalsApi.update(props),
  );
}

export function useDeleteInterval() {
  const intervalsApi = useApi(IntervalsAPI);
  return useMutation((pk: string) => intervalsApi.delete(pk));
}
