import { Api } from "./api";

export abstract class ResourceApi extends Api {
  public abstract readonly resourceName: string;

  protected get resource() {
    return this.session.resource(this.resourceName);
  }
}
