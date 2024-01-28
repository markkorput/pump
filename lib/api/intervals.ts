import { ResourceApi } from "./resource";
import { log as apiLog } from "./api";

const log = apiLog.sub("intervals");

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
  id: string;
  name: string;
  reps: IntervalRepsDef;
  sets: IntervalSetsDef;
};

export type CreateIntervalProps = Omit<IntervalDefinition, "id">;
export type UpdateIntervalProps = Partial<CreateIntervalProps> &
  Pick<IntervalDefinition, "id">;

export class IntervalsAPI extends ResourceApi {
  public readonly resourceName = "intervals";

  public async index(): Promise<IntervalDefinition[]> {
    const result = await this.resource.index();
    // parse
    return result.data as IntervalDefinition[]; // TODO
    // .col(this.collectionName);
    // return this.parseCollection(result.data);
  }

  public async create(props: CreateIntervalProps): Promise<IntervalDefinition> {
    log.debug("create: ", props);
    const result = await this.resource.create(props);
    return result.data as IntervalDefinition; // TODO
  }

  public async update({
    id,
    ...props
  }: UpdateIntervalProps): Promise<IntervalDefinition> {
    log.debug("create: ", props);
    const result = await this.resource.update(id, props);
    return result.data as IntervalDefinition;
  }
}
