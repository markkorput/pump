import { ResourceApi } from "./resource";
import { PrimaryKey } from "./session";
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
    log.warning("TODO: runtime parsing");
    return result.data as IntervalDefinition[]; // TODO
  }

  public async find(pk: PrimaryKey): Promise<IntervalDefinition> {
    const result = await this.resource.find(pk);
    log.warning("TODO: runtime parsing");
    return result.data as IntervalDefinition; // TODO
  }

  public async create(props: CreateIntervalProps): Promise<IntervalDefinition> {
    log.debug("create: ", props);
    const result = await this.resource.create(props);
    log.warning("TODO: runtime parsing");
    return result.data as IntervalDefinition; // TODO
  }

  public async update({
    id,
    ...props
  }: UpdateIntervalProps): Promise<IntervalDefinition> {
    log.debug("create: ", props);
    const result = await this.resource.update(id, props);
    log.warning("TODO: runtime parsing");
    return result.data as IntervalDefinition;
  }

  public async delete(id: PrimaryKey): Promise<IntervalDefinition> {
    log.debug("delete: ", id);
    const result = await this.resource.delete(id);
    log.warning("TODO: runtime parsing");
    return result.data as IntervalDefinition;
  }
}
