export type ApiReadResult<T = unknown> = {
  data: T;
};

export type ApiWriteResult<T = unknown> = {
  data: T;
};

export abstract class ApiSession {
  public abstract resource(resourceName: string): ApiResourceSession;
}

export type PrimaryKey = string;

export abstract class ApiResourceSession {
  public abstract index(): Promise<ApiReadResult<unknown[]>>;
  public abstract find(pk: PrimaryKey): Promise<ApiReadResult>;
  public abstract create(
    args: Record<string, unknown>,
  ): Promise<ApiWriteResult>;
  public abstract update(
    pk: PrimaryKey,
    args: Record<string, unknown>,
  ): Promise<ApiWriteResult>;
  public abstract delete(pk: PrimaryKey): Promise<ApiWriteResult>;
}
