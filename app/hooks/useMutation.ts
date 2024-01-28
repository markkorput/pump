import { useMemo, useState, useRef } from "react";
import { QueryResult } from "./useQuery";

export type MutationResult<T, V> = QueryResult<T> & {
  mutate: (variables: V) => Promise<T>;
};

export function useMutation<T, V>(
  action: (variables: V) => Promise<T>,
): MutationResult<T, V> {
  const [result, setResult] = useState<T>();
  const ref = useRef<(variables: V) => Promise<T>>(action);

  return useMemo(
    () => ({
      status: result ? "success" : "loading",
      data: result,
      mutate: async (vars: V) => {
        const r = await ref.current(vars);
        setResult(r);
        return r;
      },
    }),
    [result, ref],
  );
}
