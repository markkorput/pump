import { useEffect, useMemo, useState } from "react";
// import { createLogger } from "@/lib/logging";

// const log = createLogger("useQuery");

export type QueryResult<T> = {
  status: "loading" | "success";
  data?: T;
};

export function useQuery<T>(action: () => Promise<T>): QueryResult<T> {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    action().then((res) => {
      setResult(res);
    });
  }, [action]);

  return useMemo(
    () => ({
      status: result ? "success" : "loading",
      data: result,
    }),
    [result],
  );
}
