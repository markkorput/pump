import { ApiSession, ApiResourceSession, PrimaryKey } from "./session";
import { max, cloneDeep } from "lodash";

type Db = Record<string, unknown>;

export class MemorySessionApi implements ApiSession {
  private db: Db | undefined = undefined;

  constructor(
    private opts: {
      save?: (data: Db) => Promise<void>;
      load?: () => Promise<Db>;
    } = {},
  ) {}

  public resource(resourceName: string) {
    return new MemoryResourceApi(this.db || {}, resourceName, {
      afterWrite: () => this.save(),
    });
  }

  public async load(): Promise<void> {
    this.db = this.opts.load ? cloneDeep(await this.opts.load()) : {};
  }

  public async save(): Promise<void> {
    if (this.db) this.opts.save?.(this.db);
  }
}

type DbItem = { id: string };

function isDbItem(item: unknown): item is DbItem {
  return (
    !!item &&
    typeof item === "object" &&
    "id" in item &&
    typeof item.id === "string"
  );
}

/**
 * Resource "session" that reads/writes resource data from/to localStorage
 */
export class MemoryResourceApi implements ApiResourceSession {
  private get data(): unknown[] {
    const data = this.db[this.resourceName];
    if (data) return data as unknown[];
    const newData: unknown[] = [];
    this.db[this.resourceName] = newData;
    return newData;
  }

  constructor(
    private db: Record<string, unknown>,
    public readonly resourceName: string,
    private options: { afterWrite?: () => void } = {},
  ) {}

  public async index() {
    return {
      data: cloneDeep(this.data),
    };
  }

  public async find(pk: PrimaryKey) {
    return {
      data: cloneDeep(
        this.data.find((item) => isDbItem(item) && item.id === pk),
      ),
    };
  }

  public async create(args: Record<string, unknown>) {
    const item = {
      ...args,
      ...("id" in args ? {} : { id: await this.getNextId() }),
    };

    this.data.push(item);
    this.options.afterWrite?.();

    return {
      data: cloneDeep(item),
    };
  }

  public async update(pk: PrimaryKey, args: Record<string, unknown>) {
    const dbItem = this.data.find((item) => isDbItem(item) && item.id === pk);
    if (!dbItem)
      throw new Error(`Record not found: ${pk} (${this.resourceName})`);
    Object.assign(dbItem, args);
    this.options.afterWrite?.();
    return {
      data: cloneDeep(dbItem),
    };
  }

  public async delete(pk: PrimaryKey) {
    const item = this.data.find((it) => isDbItem(it) && it.id === pk);

    if (!item)
      throw new Error(`Record not found: ${pk} (${this.resourceName})`);

    const idx = this.data.indexOf(item);
    this.data.splice(idx, 1);
    this.options.afterWrite?.();

    return {
      data: cloneDeep(item),
    };
  }

  private async getNextId(): Promise<string> {
    const { data } = await this.index();
    const maxId = max(
      data.map((item) => (isDbItem(item) ? parseInt(item.id) : 0)),
    );

    return ((maxId || 0) + 1).toString();
  }
}
