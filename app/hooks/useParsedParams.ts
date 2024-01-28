import { useRouter } from "next/router";
import { useMemo } from "react";
import { ParsedUrlQuery } from "querystring";

export interface ParsedParams<P> {
  query: ParsedUrlQuery;
  params?: P;
  error?: unknown;
}

export function useParsedParams<P>(parse: (v: unknown) => P): ParsedParams<P> {
  const { query } = useRouter();

  return useMemo(() => {
    try {
      return {
        params: parse(query),
        query: query,
      };
    } catch (e) {
      return {
        error: e,
        query: query,
      };
    }
  }, [query, parse]);
}

export default useParsedParams;
