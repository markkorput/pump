// when using react-query;
// export type ApiQueryResult<T, E extends Error = Error> = UseQueryResult<Text,
// E>;

// export type ApiMutateResult<T, E extends Error = Error, V =
// UseMutationResult<void, Error, string>

export type ApiQueryResult<T, E extends Error = Error> = {
  data: T | undefined;
  error: E | null;
};


type MutateFunction<D = unknown, V = void> = (variables: V) => Promise<D>;

type MutationBase<D = unknown, V = void> = {
  mutate: MutateFunction<D, V>;
  reset: () => void;
}

type MutatationLoadingResult<T, E extends Error = Error> = {
  status: "loading";
  data: undefined;
  error: null;
}

type MutatationErrorResult<T, E extends Error = Error> = {
  status: "error";
  data: undefined;
  error: E;
  
}

type MutatationSuccessResult<T> = {
  status: "success";
  data: T;
  error: null;
}

export type ApiMutateResult<T, E extends Error = Error, V> = 
  mutate: 
  data: T | undefined;
  
  error: E | null;

  // data: TData;
  // error: null;
  isError: false;
  isIdle: false;
  isLoading: false;
  isSuccess: true;
  status: 'success';
};


