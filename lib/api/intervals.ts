import { ResourceApi } from "./resource";

export type IntervalRepsDef = {
  amount: number;
  duration: number;
  rest: number;
};

export type IntervalSetsDef = {
  amount: number;
  rest: number;
};

export type IntervalDefinition = {
  reps: IntervalRepsDef;
  sets: IntervalSetsDef;
};

export type NamedIntervalDefinition = IntervalDefinition & {
  name: string;
};

export type SavedIntervalDefinition = NamedIntervalDefinition & {
  id: string;
};

export class IntervalsAPI extends ResourceApi {
  public readonly resourceName = "intervals";

  public async index(): Promise<SavedIntervalDefinition[]> {
    const result = this.resource.index();
    // parse
    return result.data;
    // .col(this.collectionName);
    // return this.parseCollection(result.data);
  }

  // public async create(
  //   interval: NamedIntervalDefinition,
  // ): Promise<SavedIntervalDefinition> {}
}
