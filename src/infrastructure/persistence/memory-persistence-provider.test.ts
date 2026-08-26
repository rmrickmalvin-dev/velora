import {
  describe,
  expect,
  it,
} from "vitest";

import {
  MemoryPersistenceProvider,
} from "./memory-persistence-provider";

describe(
  "MemoryPersistenceProvider",
  () => {
    it("puts and gets a cloned record", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const record = {
        id: "product-1",
        name: "Original",
      };

      await provider.put(
        "products",
        record,
      );

      record.name =
        "Changed outside";

      expect(
        await provider.get<
          typeof record
        >(
          "products",
          "product-1",
        ),
      ).toEqual({
        id: "product-1",
        name: "Original",
      });
    });

    it("uses put as upsert", async () => {
      const provider =
        new MemoryPersistenceProvider();

      await provider.put(
        "products",
        {
          id: "product-1",
          name: "One",
        },
      );

      await provider.put(
        "products",
        {
          id: "product-1",
          name: "Two",
        },
      );

      expect(
        await provider.get<{
          id: string;
          name: string;
        }>(
          "products",
          "product-1",
        ),
      ).toEqual({
        id: "product-1",
        name: "Two",
      });
    });

    it("rejects duplicate add", async () => {
      const provider =
        new MemoryPersistenceProvider();

      await provider.add(
        "inventoryMovements",
        {
          id: "movement-1",
        },
      );

      await expect(
        provider.add(
          "inventoryMovements",
          {
            id: "movement-1",
          },
        ),
      ).rejects.toMatchObject({
        code:
          "PERSISTENCE_DUPLICATE_ID",
      });
    });

    it("returns frozen getAll snapshots", async () => {
      const provider =
        new MemoryPersistenceProvider();

      await provider.put(
        "products",
        {
          id: "product-1",
        },
      );

      const result =
        await provider.getAll(
          "products",
        );

      expect(
        Object.isFrozen(result),
      ).toBe(true);

      expect(result).toHaveLength(
        1,
      );
    });

    it("deletes a record", async () => {
      const provider =
        new MemoryPersistenceProvider();

      await provider.put(
        "carts",
        {
          id: "cart-1",
        },
      );

      await provider.delete(
        "carts",
        "cart-1",
      );

      expect(
        await provider.get(
          "carts",
          "cart-1",
        ),
      ).toBeNull();
    });

    it("clears only the requested store", async () => {
      const provider =
        new MemoryPersistenceProvider();

      await provider.put(
        "products",
        {
          id: "product-1",
        },
      );

      await provider.put(
        "carts",
        {
          id: "cart-1",
        },
      );

      await provider.clear(
        "carts",
      );

      expect(
        await provider.getAll(
          "carts",
        ),
      ).toHaveLength(0);

      expect(
        await provider.getAll(
          "products",
        ),
      ).toHaveLength(1);
    });
  },
);