import { useMemo, useState } from "react";
import { QueryResult } from "./useQuery";

export type MutationResult<T, V> = QueryResult<T> & {
  mutate: (variables: V) => Promise<T>;
};

export function useMutation<T, V>(
  action: (variables: V) => Promise<T>,
): MutationResult<T, V> {
  const [result, setResult] = useState<T>();

  return useMemo(
    () => ({
      status: result ? "success" : "loading",
      data: result,
      mutate: async (vars: V) => {
        const r = await action(vars);
        setResult(r);
        return r;
      },
    }),
    [result, action],
  );
}
