import { ResourceApi } from "./resource";
import { PrimaryKey } from "./session";
import { log as apiLog } from "./api";
import { z } from "zod";

const log = apiLog.sub("intervals");

const intervalDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  reps: z.object({
    amount: z.number(),
    duration: z.number(),
    rest: z.number(),
  }),
  sets: z.object({
    amount: z.number(),
    rest: z.number(),
  }),
});

export type IntervalDefinition = z.infer<typeof intervalDefinitionSchema>;

export type CreateIntervalProps = Omit<IntervalDefinition, "id">;
export type UpdateIntervalProps = Partial<CreateIntervalProps> &
  Pick<IntervalDefinition, "id">;

export class IntervalsAPI extends ResourceApi {
  public readonly resourceName = "intervals";

  public async index(): Promise<IntervalDefinition[]> {
    log.debug("index");
    const result = await this.resource.index();
    return z.array(intervalDefinitionSchema).parse(result.data);
  }

  public async find(pk: PrimaryKey): Promise<IntervalDefinition> {
    log.debug("find: ", pk);
    const result = await this.resource.find(pk);
    return intervalDefinitionSchema.parse(result.data);
  }

  public async create(props: CreateIntervalProps): Promise<IntervalDefinition> {
    log.debug("create: ", props);
    const result = await this.resource.create(props);
    return intervalDefinitionSchema.parse(result.data);
  }

  public async update({
    id,
    ...props
  }: UpdateIntervalProps): Promise<IntervalDefinition> {
    log.debug("update: ", id, props);
    const result = await this.resource.update(id, props);
    return intervalDefinitionSchema.parse(result.data);
  }

  public async delete(id: PrimaryKey): Promise<IntervalDefinition> {
    log.debug("delete: ", id);
    const result = await this.resource.delete(id);
    return intervalDefinitionSchema.parse(result.data);
  }
}
