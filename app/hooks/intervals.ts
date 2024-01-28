import { useCallback } from "react";
import {
  IntervalsAPI,
  CreateIntervalProps,
  UpdateIntervalProps,
} from "@lib/api/intervals";
import { useApi } from "./useApi";
import { useMutation } from "./useMutation";
import { useQuery } from "./useQuery";
import { PrimaryKey } from "@/lib/api/session";

export function useIntervals() {
  const intervalsApi = useApi(IntervalsAPI);
  const action = useCallback(() => intervalsApi.index(), [intervalsApi]);
  return useQuery(action);
}

export function useInterval(pk: PrimaryKey | undefined) {
  const intervalsApi = useApi(IntervalsAPI);

  const action = useCallback(
    async () => (pk ? intervalsApi.find(pk) : undefined),
    [pk, intervalsApi],
  );

  return useQuery(action);
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
