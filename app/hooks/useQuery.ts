import { useEffect, useRef, useMemo, useState } from "react";
import { createLogger } from "@/lib/logging";

const log = createLogger("useQuery");

export type QueryResult<T> = {
  status: "loading" | "success";
  data?: T;
};

export function useQuery<T>(action: () => Promise<T>): QueryResult<T> {
  const [result, setResult] = useState<T>();

  const ref = useRef<() => Promise<T>>(action);

  useEffect(() => {
    ref.current().then((res) => {
      log.debug("result", res);
      setResult(res);
    });
  }, [ref]);

  return useMemo(
    () => ({
      status: result ? "success" : "loading",
      data: result,
    }),
    [result],
  );
}
