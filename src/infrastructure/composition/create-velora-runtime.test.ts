import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createOrderItem,
} from "../../domain/entities/order-item";
import {
  createOrder,
} from "../../domain/entities/order";
import {
  BRL,
} from "../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../domain/value-objects/money";
import {
  createSlug,
} from "../../domain/value-objects/slug";
import {
  MemoryPersistenceProvider,
} from "../persistence/memory-persistence-provider";
import {
  createLocalRepositories,
} from "../repositories/local/create-local-repositories";
import {
  createVeloraApplication,
} from "../../application/create-velora-application";
import {
  createVeloraRuntime,
} from "./create-velora-runtime";

function orderFixture() {
  return createOrder({
    id: "order-runtime-1",
    customerId:
      "customer-runtime-1",
    status: "PENDING",
    items: [
      createOrderItem({
        id:
          "order-runtime-item-1",
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
  "VELORA final BUILD 01 composition",
  () => {
    it("lists the seeded Storefront through the bound Application facade", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const products =
        await runtime.application
          .listStorefrontProducts();

      expect(products).toHaveLength(
        8,
      );
    });

    it("loads Product detail through the complete composition chain", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const product =
        await runtime.application
          .getStorefrontProductBySlug(
            createSlug(
              "aster-one-x-pro",
            ),
          );

      expect(
        product?.product.name,
      ).toBe(
        "Aster One X Pro",
      );

      expect(
        product?.variants,
      ).toHaveLength(3);
    });

    it("adds to Cart and reads subtotal through the Application facade", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "cart-runtime-1",
          cartItemId:
            "cart-runtime-item-1",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 2,
        });

      const summary =
        await runtime.application
          .getCartSummary(
            "cart-runtime-1",
          );

      expect(
        summary?.subtotal
          ?.minorUnits,
      ).toBe(999800);
    });

    it("preserves Cart state across runtime recreation when provider is shared", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      await first.application
        .addProductToCart({
          cartId:
            "cart-shared",
          cartItemId:
            "cart-shared-item",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await second.application
            .getCartSummary(
              "cart-shared",
            )
        )?.cart.items,
      ).toHaveLength(1);
    });

    it("persists Inventory adjustment and history through runtime recreation", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      const stock =
        await first.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-xp-256-graphite",
          );

      expect(stock).not.toBeNull();

      await first.application
        .adjustInventory({
          inventoryId:
            stock!.id,
          movementId:
            "movement-runtime-entry",
          type: "ENTRY",
          delta: 3,
          reason:
            "BUILD 01 integration",
        });

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await second.repositories
            .inventory
            .findById(
              stock!.id,
            )
        )?.quantityOnHand,
      ).toBe(
        stock!.quantityOnHand + 3,
      );

      expect(
        (
          await second.repositories
            .inventoryMovements
            .listByInventoryId(
              stock!.id,
            )
        ).some(
          (movement) =>
            movement.id ===
            "movement-runtime-entry",
        ),
      ).toBe(true);
    });

    it("persists Order lifecycle changes through the runtime", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      const order =
        orderFixture();

      await first.repositories
        .orders
        .save(order);

      await first.application
        .changeOrderStatus({
          orderId:
            order.id,
          nextStatus:
            "CONFIRMED",
        });

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await second.repositories
            .orders
            .findById(
              order.id,
            )
        )?.status,
      ).toBe(
        "CONFIRMED",
      );
    });

    it("resets persistent demo state back to seed-backed baseline", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const runtime =
        createVeloraRuntime(
          provider,
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "cart-reset",
          cartItemId:
            "cart-reset-item",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await runtime.resetDemo();

      const after =
        createVeloraRuntime(
          provider,
        );

      expect(
        await after.application
          .getCartSummary(
            "cart-reset",
          ),
      ).toBeNull();

      expect(
        await after.application
          .listStorefrontProducts(),
      ).toHaveLength(8);
    });

    it("freezes runtime and Application facade", () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      expect(
        Object.isFrozen(runtime),
      ).toBe(true);

      expect(
        Object.isFrozen(
          runtime.application,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          runtime.repositories,
        ),
      ).toBe(true);
    });

    it("binds the same Application facade to non-persistent local repositories", async () => {
      const repositories =
        createLocalRepositories();

      const application =
        createVeloraApplication(
          repositories,
        );

      expect(
        await application
          .listStorefrontProducts(),
      ).toHaveLength(8);
    });
  },
);