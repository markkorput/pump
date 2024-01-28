import { ApiSession } from "./session";

export class Api {
  protected readonly session: ApiSession;

  constructor(session: ApiSession) {
    this.session = session;
  }
}
