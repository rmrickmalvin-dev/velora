import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  MemoryPersistenceProvider,
} from "../../infrastructure/persistence/memory-persistence-provider";

describe(
  "Create Demo Order From Cart",
  () => {
    it("creates a PENDING guest Order from the persistent Cart", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-xp-256-graphite",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        });

      const order =
        await runtime.application
          .createDemoOrderFromCart({
            cartId:
              "velora-demo-cart",
            orderId:
              "demo-order-1",
          });

      expect(order.status)
        .toBe("PENDING");

      expect(order.customerId)
        .toBeUndefined();
    });

    it("preserves Product and SKU snapshots in OrderItem", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-xp-256-graphite",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        });

      const order =
        await runtime.application
          .createDemoOrderFromCart({
            cartId:
              "velora-demo-cart",
            orderId:
              "demo-order-2",
          });

      expect(
        order.items[0]
          .productNameSnapshot,
      ).toBe(
        "Aster One X Pro",
      );

      expect(
        order.items[0]
          .skuSnapshot,
      ).toBe(
        "VEL-ASTER-XP-256-GRA",
      );
    });

    it("preserves Cart price and quantity snapshots", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 2,
        });

      const cart =
        await runtime.application
          .getCartSummary(
            "velora-demo-cart",
          );

      const order =
        await runtime.application
          .createDemoOrderFromCart({
            cartId:
              "velora-demo-cart",
            orderId:
              "demo-order-3",
          });

      expect(
        order.items[0]
          .quantity,
      ).toBe(2);

      expect(
        order.items[0]
          .unitPriceSnapshot
          .minorUnits,
      ).toBe(
        cart?.cart.items[0]
          .unitPrice.minorUnits,
      );
    });

    it("persists Order before Cart completion returns", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await runtime.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-4",
        });

      expect(
        await runtime.repositories
          .orders
          .findById(
            "demo-order-4",
          ),
      ).not.toBeNull();
    });

    it("clears Cart only after successful Order creation", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await runtime.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-5",
        });

      expect(
        await runtime.application
          .getCartSummary(
            "velora-demo-cart",
          ),
      ).toBeNull();
    });

    it("rejects empty Cart Order creation", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await expect(
        runtime.application
          .createDemoOrderFromCart({
            cartId:
              "velora-demo-cart",
            orderId:
              "demo-order-empty",
          }),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_CART_EMPTY",
      });
    });

    it("rejects duplicate Order identity without clearing the active Cart", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await runtime.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-conflict",
        });

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-xp-256-graphite",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        });

      await expect(
        runtime.application
          .createDemoOrderFromCart({
            cartId:
              "velora-demo-cart",
            orderId:
              "demo-order-conflict",
          }),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_ORDER_ID_CONFLICT",
      });

      expect(
        await runtime.application
          .getCartSummary(
            "velora-demo-cart",
          ),
      ).not.toBeNull();
    });

    it("does not mutate Inventory when creating the demo Order", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const before =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await runtime.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-6",
        });

      const after =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      expect(
        after?.quantityOnHand,
      ).toBe(
        before?.quantityOnHand,
      );
    });
  },
);