import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createCart,
} from "../../../domain/entities/cart";
import {
  createInventory,
} from "../../../domain/entities/inventory";
import {
  createInventoryMovement,
} from "../../../domain/entities/inventory-movement";
import {
  createOrderItem,
} from "../../../domain/entities/order-item";
import {
  createOrder,
} from "../../../domain/entities/order";
import {
  createProduct,
} from "../../../domain/entities/product";
import {
  BRL,
} from "../../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../../domain/value-objects/money";
import {
  MemoryPersistenceProvider,
} from "../../persistence/memory-persistence-provider";
import {
  veloraSeed,
} from "../../seed";
import {
  createPersistentRepositories,
  resetPersistentOverrides,
} from "./create-persistent-repositories";

function orderFixture(
  id: string,
  customerId?: string,
) {
  return createOrder({
    id,
    ...(customerId
      ? { customerId }
      : {}),
    status: "PENDING",
    items: [
      createOrderItem({
        id: `${id}-item`,
        productId:
          "product-aster-one-x-pro",
        productVariantId:
          "variant-aster-xp-256-graphite",
        productNameSnapshot:
          "Aster One X Pro",
        skuSnapshot:
          "VEL-ASTER-XP-256-GRA",
        unitPriceSnapshot:
          createMoney(
            499900,
            BRL,
          ),
        quantity: 1,
      }),
    ],
  });
}

describe(
  "Persistent Repository Adapters",
  () => {
    it("falls back to immutable seed Catalog", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      expect(
        await repositories
          .products
          .list(),
      ).toHaveLength(8);

      expect(
        await repositories
          .productVariants
          .listByProductId(
            "product-aster-one-x-pro",
          ),
      ).toHaveLength(3);
    });

    it("persists Product override without mutating veloraSeed", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      const original =
        veloraSeed.products.find(
          (item) =>
            item.id ===
            "product-aster-air",
        );

      expect(original).toBeDefined();

      await repositories
        .products
        .save(
          createProduct({
            id:
              "product-aster-air",
            slug:
              "aster-air",
            name:
              "Aster Air Persistent",
            brand: "Aster",
            model: "Air",
            categoryId:
              "category-smartphones",
            status: "ACTIVE",
            featured: false,
          }),
        );

      expect(
        (
          await repositories
            .products
            .findById(
              "product-aster-air",
            )
        )?.name,
      ).toBe(
        "Aster Air Persistent",
      );

      expect(original?.name).toBe(
        "Aster Air",
      );
    });

    it("preserves Product overrides across repository bundle recreation when provider is shared", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createPersistentRepositories(
          provider,
        );

      await first.products.save(
        createProduct({
          id:
            "product-aster-air",
          slug: "aster-air",
          name:
            "Persistent Across Bundles",
          brand: "Aster",
          model: "Air",
          categoryId:
            "category-smartphones",
          status: "ACTIVE",
          featured: false,
        }),
      );

      const second =
        createPersistentRepositories(
          provider,
        );

      expect(
        (
          await second.products.findById(
            "product-aster-air",
          )
        )?.name,
      ).toBe(
        "Persistent Across Bundles",
      );
    });

    it("uses a fresh provider to recover clean seed baseline", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      await repositories.products.save(
        createProduct({
          id:
            "product-aster-air",
          slug: "aster-air",
          name:
            "Temporary Override",
          brand: "Aster",
          model: "Air",
          categoryId:
            "category-smartphones",
          status: "ACTIVE",
          featured: false,
        }),
      );

      const fresh =
        createPersistentRepositories(
          new MemoryPersistenceProvider(),
        );

      expect(
        (
          await fresh.products.findById(
            "product-aster-air",
          )
        )?.name,
      ).toBe("Aster Air");
    });

    it("persists Inventory override without mutating seed quantity", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      const baseline =
        veloraSeed.inventory[0];

      await repositories.inventory.save(
        createInventory({
          id: baseline.id,
          productVariantId:
            baseline.productVariantId,
          quantityOnHand: 77,
        }),
      );

      expect(
        (
          await repositories
            .inventory
            .findById(
              baseline.id,
            )
        )?.quantityOnHand,
      ).toBe(77);

      expect(
        baseline.quantityOnHand,
      ).not.toBe(77);
    });

    it("appends persistent InventoryMovement after seed history", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      const inventory =
        veloraSeed.inventory[0];

      const before =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            inventory.id,
          );

      const movement =
        createInventoryMovement({
          id:
            "movement-persistent-1",
          inventoryId:
            inventory.id,
          type: "ENTRY",
          delta: 2,
          reason:
            "Persistent restock",
        });

      await repositories
        .inventoryMovements
        .append(movement);

      const after =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            inventory.id,
          );

      expect(after).toHaveLength(
        before.length + 1,
      );

      expect(
        after[after.length - 1].id,
      ).toBe(
        "movement-persistent-1",
      );
    });

    it("rejects InventoryMovement id duplicated from baseline", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      const baseline =
        veloraSeed
          .inventoryMovements[0];

      await expect(
        repositories
          .inventoryMovements
          .append(baseline),
      ).rejects.toMatchObject({
        code:
          "PERSISTENCE_DUPLICATE_ID",
      });
    });

    it("persists Cart across repository bundle recreation", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createPersistentRepositories(
          provider,
        );

      await first.carts.save(
        createCart({
          id: "cart-1",
        }),
      );

      const second =
        createPersistentRepositories(
          provider,
        );

      expect(
        await second.carts.findById(
          "cart-1",
        ),
      ).not.toBeNull();
    });

    it("removes persisted Cart", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      await repositories.carts.save(
        createCart({
          id: "cart-1",
        }),
      );

      await repositories.carts.remove(
        "cart-1",
      );

      expect(
        await repositories.carts.findById(
          "cart-1",
        ),
      ).toBeNull();
    });

    it("persists and lists Customer Orders", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      const order =
        orderFixture(
          "order-1",
          "customer-1",
        );

      await repositories.orders.save(
        order,
      );

      expect(
        await repositories.orders.findById(
          order.id,
        ),
      ).toEqual(order);

      expect(
        await repositories
          .orders
          .listByCustomerId(
            "customer-1",
          ),
      ).toEqual([order]);
    });

    it("rehydrates persisted Domain entities as frozen objects", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      await repositories.carts.save(
        createCart({
          id: "cart-1",
        }),
      );

      const cart =
        await repositories.carts.findById(
          "cart-1",
        );

      expect(
        Object.isFrozen(cart),
      ).toBe(true);

      expect(
        Object.isFrozen(
          cart?.items,
        ),
      ).toBe(true);
    });

    it("reset clears overrides and restores seed fallback plus empty runtime state", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const repositories =
        createPersistentRepositories(
          provider,
        );

      await repositories.products.save(
        createProduct({
          id:
            "product-aster-air",
          slug: "aster-air",
          name:
            "Override Before Reset",
          brand: "Aster",
          model: "Air",
          categoryId:
            "category-smartphones",
          status: "ACTIVE",
          featured: false,
        }),
      );

      await repositories.carts.save(
        createCart({
          id: "cart-1",
        }),
      );

      await repositories.orders.save(
        orderFixture(
          "order-1",
        ),
      );

      await resetPersistentOverrides(
        provider,
      );

      const after =
        createPersistentRepositories(
          provider,
        );

      expect(
        (
          await after.products.findById(
            "product-aster-air",
          )
        )?.name,
      ).toBe("Aster Air");

      expect(
        await after.carts.findById(
          "cart-1",
        ),
      ).toBeNull();

      expect(
        await after.orders.findById(
          "order-1",
        ),
      ).toBeNull();
    });

    it("keeps repository bundle frozen", () => {
      const repositories =
        createPersistentRepositories(
          new MemoryPersistenceProvider(),
        );

      expect(
        Object.isFrozen(
          repositories,
        ),
      ).toBe(true);
    });

    it("returns frozen merged Catalog lists", async () => {
      const repositories =
        createPersistentRepositories(
          new MemoryPersistenceProvider(),
        );

      const products =
        await repositories.products.list();

      expect(
        Object.isFrozen(products),
      ).toBe(true);

      expect(
        Object.isFrozen(
          products[0],
        ),
      ).toBe(true);
    });
  },
);