import { describe, expect, test, vi, beforeEach } from "vitest";
import { MemoryApiSession } from "../memory";

function getMocks(initialData: Record<string, unknown[]> = {}) {
  const saveSpy = vi.fn();
  const loadSpy = vi
    .fn()
    .mockImplementation(() => Promise.resolve(initialData));

  const session = new MemoryApiSession({
    save: saveSpy,
    load: loadSpy,
  });

  session.load();

  return {
    session,
    saveSpy,
    loadSpy,
  };
}
describe("api", () => {
  const initialData = {
    items: [{ id: "1", name: "Item 1" }],
  };

  let mocks: ReturnType<typeof getMocks>;

  beforeEach(async () => {
    mocks = getMocks(initialData);
  });

  describe("memory", () => {
    describe("resource", () => {
      describe("index", () => {
        test("return entire collection", async () => {
          const { data } = await mocks.session.resource("items").index();
          expect(data).toEqual(initialData.items);
        });

        test("returns empty array", async () => {
          const { data } = await mocks.session.resource("foobar").index();
          expect(data).toEqual([]);
        });
      });

      describe("find", () => {
        test("returns single item", async () => {
          const { data } = await mocks.session.resource("items").find("1");
          expect(data).toEqual(initialData.items[0]);
        });

        test("returns undefined", async () => {
          const { data } = await mocks.session.resource("items").find("2");
          expect(data).toEqual(undefined);
        });
      });

      describe("create", () => {
        test("adds item", async () => {
          const newItem = { id: "3", name: "Two" };
          const { data } = await mocks.session
            .resource("items")
            .create(newItem);

          // returns created item
          expect(data).toEqual(newItem);

          // fetch updated collection
          const { data: all } = await mocks.session.resource("items").index();
          expect(all).toEqual([...initialData.items, newItem]);
        });

        test("adds id to item", async () => {
          const newItem = { name: "Two" };

          const { data } = await mocks.session
            .resource("items")
            .create(newItem);

          // returns created item
          expect(data).toEqual({ ...newItem, id: "2" });

          // fetch updated collection
          const { data: all } = await mocks.session.resource("items").index();
          expect(all).toEqual([...initialData.items, data]);
        });

        test("saves collection", async () => {
          const { data } = await mocks.session
            .resource("items")
            .create({ name: "Two" });

          expect(mocks.saveSpy).toHaveBeenCalledWith({
            ...initialData,
            items: [...initialData.items, data],
          });
        });
      });

      describe("update", () => {
        test("updates item", async () => {
          const updates = { name: "One one" };
          const pk = "1";

          const { data } = await mocks.session
            .resource("items")
            .update(pk, updates);

          // returns updated item
          expect(data).toEqual({ id: pk, ...updates });

          // fetch updated collection
          const { data: all } = await mocks.session.resource("items").index();
          expect(all).toEqual([data]);
        });

        test("throw when not found", async () => {
          expect(() =>
            mocks.session.resource("items").update("foo", { name: "Foo" }),
          ).rejects.toThrowError();
        });

        test("saves collection", async () => {
          const { data } = await mocks.session
            .resource("items")
            .update("1", { name: "Two" });

          expect(mocks.saveSpy).toHaveBeenCalledWith({
            ...initialData,
            items: [data],
          });
        });
      });

      describe("delete", () => {
        test("removes item", async () => {
          const { data } = await mocks.session
            .resource("items")
            .delete(initialData.items[0].id);

          // returns updated item
          expect(data).toEqual(initialData.items[0]);

          // fetch updated collection
          const { data: all } = await mocks.session.resource("items").index();
          expect(all).toEqual([]);
        });

        test("throw when not found", async () => {
          expect(() =>
            mocks.session.resource("items").delete("foo"),
          ).rejects.toThrowError();
        });

        test("saves collection", async () => {
          await mocks.session.resource("items").delete("1");

          expect(mocks.saveSpy).toHaveBeenCalledWith({
            ...initialData,
            items: [],
          });
        });
      });
    });
  });
});
