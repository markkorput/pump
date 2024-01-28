import { useMemo } from "react";
import { Api, ApiFactory } from "@lib/api";
import { useApiSession } from "./useApiSession";

export function useApi<A extends Api>(apiType: ApiFactory<A>): A {
  const session = useApiSession();

  return useMemo(() => new apiType(session), [apiType, session]);
}
