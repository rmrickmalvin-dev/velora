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
  createSku,
} from "../../../domain/value-objects/sku";
import {
  createSlug,
} from "../../../domain/value-objects/slug";
import {
  veloraSeed,
} from "../../seed";
import {
  createLocalRepositories,
} from "./create-local-repositories";

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
        id:
          `${id}-item-1`,
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
  "Local Repository Implementations",
  () => {
    it("initializes catalog and inventory from the VELORA seed", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await repositories
          .productCategories
          .list(),
      ).toHaveLength(4);

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

      expect(
        await repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-xp-256-graphite",
          ),
      ).not.toBeNull();
    });

    it("finds Product by id and slug", async () => {
      const repositories =
        createLocalRepositories();

      const byId =
        await repositories
          .products
          .findById(
            "product-aster-one-x-pro",
          );

      const bySlug =
        await repositories
          .products
          .findBySlug(
            createSlug(
              "aster-one-x-pro",
            ),
          );

      expect(byId?.id).toBe(
        "product-aster-one-x-pro",
      );

      expect(bySlug).toEqual(
        byId,
      );
    });

    it("upserts Product by id", async () => {
      const repositories =
        createLocalRepositories();

      const original =
        await repositories
          .products
          .findById(
            "product-aster-air",
          );

      expect(original).not.toBeNull();

      await repositories
        .products
        .save(
          createProduct({
            id:
              "product-aster-air",
            slug:
              "aster-air",
            name:
              "Aster Air Updated",
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
        "Aster Air Updated",
      );
    });

    it("finds ProductVariant by SKU and Product", async () => {
      const repositories =
        createLocalRepositories();

      const variant =
        await repositories
          .productVariants
          .findBySku(
            createSku(
              "VEL-ASTER-XP-256-GRA",
            ),
          );

      expect(
        variant?.productId,
      ).toBe(
        "product-aster-one-x-pro",
      );

      expect(
        await repositories
          .productVariants
          .listByProductId(
            "product-aster-one-x-pro",
          ),
      ).toHaveLength(3);
    });

    it("queries ProductMedia by Product and Variant", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await repositories
          .productMedia
          .listByProductId(
            "product-aster-one-x-pro",
          ),
      ).toHaveLength(2);

      expect(
        await repositories
          .productMedia
          .listByVariantId(
            "variant-aster-xp-256-graphite",
          ),
      ).toHaveLength(1);
    });

    it("updates local Inventory without mutating the seed", async () => {
      const repositories =
        createLocalRepositories();

      const seedInventory =
        veloraSeed.inventory.find(
          (item) =>
            item.productVariantId ===
            "variant-aster-xp-256-graphite",
        );

      expect(
        seedInventory,
      ).toBeDefined();

      await repositories
        .inventory
        .save(
          createInventory({
            id:
              seedInventory!.id,
            productVariantId:
              seedInventory!
                .productVariantId,
            quantityOnHand: 99,
          }),
        );

      expect(
        (
          await repositories
            .inventory
            .findById(
              seedInventory!.id,
            )
        )?.quantityOnHand,
      ).toBe(99);

      expect(
        seedInventory!
          .quantityOnHand,
      ).not.toBe(99);
    });

    it("preserves InventoryMovement append order", async () => {
      const repositories =
        createLocalRepositories();

      const stock =
        veloraSeed.inventory[0];

      const before =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            stock.id,
          );

      const movement =
        createInventoryMovement({
          id:
            "movement-local-extra",
          inventoryId:
            stock.id,
          type: "ENTRY",
          delta: 2,
          reason:
            "Local repository test",
        });

      await repositories
        .inventoryMovements
        .append(movement);

      const after =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            stock.id,
          );

      expect(
        after,
      ).toHaveLength(
        before.length + 1,
      );

      expect(
        after[
          after.length - 1
        ],
      ).toEqual(
        movement,
      );
    });

    it("starts Cart repository empty", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await repositories
          .carts
          .findById("cart-1"),
      ).toBeNull();
    });

    it("saves, finds and removes Cart", async () => {
      const repositories =
        createLocalRepositories();

      const cart =
        createCart({
          id: "cart-1",
        });

      await repositories
        .carts
        .save(cart);

      expect(
        await repositories
          .carts
          .findById("cart-1"),
      ).toEqual(cart);

      await repositories
        .carts
        .remove("cart-1");

      expect(
        await repositories
          .carts
          .findById("cart-1"),
      ).toBeNull();
    });

    it("starts Order repository empty", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await repositories
          .orders
          .findById("order-1"),
      ).toBeNull();
    });

    it("saves and lists customer Orders", async () => {
      const repositories =
        createLocalRepositories();

      const order =
        orderFixture(
          "order-customer-1",
          "customer-1",
        );

      await repositories
        .orders
        .save(order);

      expect(
        await repositories
          .orders
          .findById(
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

    it("does not include guest Orders in customer queries", async () => {
      const repositories =
        createLocalRepositories();

      await repositories
        .orders
        .save(
          orderFixture(
            "order-guest-1",
          ),
        );

      expect(
        await repositories
          .orders
          .listByCustomerId(
            "customer-1",
          ),
      ).toEqual([]);
    });

    it("returns frozen repository list snapshots", async () => {
      const repositories =
        createLocalRepositories();

      const products =
        await repositories
          .products
          .list();

      const movements =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            veloraSeed
              .inventory[0].id,
          );

      expect(
        Object.isFrozen(
          products,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          movements,
        ),
      ).toBe(true);
    });

    it("returns null for missing records", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await repositories
          .products
          .findById(
            "missing-product",
          ),
      ).toBeNull();

      expect(
        await repositories
          .inventory
          .findById(
            "missing-inventory",
          ),
      ).toBeNull();
    });

    it("creates isolated repository bundles", async () => {
      const first =
        createLocalRepositories();

      const second =
        createLocalRepositories();

      await first.carts.save(
        createCart({
          id:
            "isolated-cart",
        }),
      );

      expect(
        await first.carts.findById(
          "isolated-cart",
        ),
      ).not.toBeNull();

      expect(
        await second.carts.findById(
          "isolated-cart",
        ),
      ).toBeNull();
    });

    it("freezes the repository bundle", () => {
      const repositories =
        createLocalRepositories();

      expect(
        Object.isFrozen(
          repositories,
        ),
      ).toBe(true);
    });
  },
);