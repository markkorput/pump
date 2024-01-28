import { ApiSession } from "./session";
import { createLogger } from "@/lib/logging";

export const log = createLogger("api");

export class Api {
  protected readonly session: ApiSession;

  constructor(session: ApiSession) {
    this.session = session;
  }
}

export type ApiFactory<A extends Api> = new (session: ApiSession) => A;
