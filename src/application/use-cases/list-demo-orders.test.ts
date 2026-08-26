import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createOrder,
} from "../../domain/entities/order";
import {
  createOrderItem,
} from "../../domain/entities/order-item";
import {
  BRL,
} from "../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../domain/value-objects/money";
import {
  createVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  MemoryPersistenceProvider,
} from "../../infrastructure/persistence/memory-persistence-provider";

async function addCart(
  runtime:
    ReturnType<
      typeof createVeloraRuntime
    >,
) {
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
}

describe(
  "List Demo Orders",
  () => {
    it("returns an empty collection before demo Order creation", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      expect(
        await runtime.application
          .listDemoOrders(),
      ).toEqual([]);
    });

    it("returns persisted guest demo Orders", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await addCart(runtime);

      await runtime.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-history-1",
        });

      expect(
        (
          await runtime.application
            .listDemoOrders()
        ).map(
          (order) =>
            order.id,
        ),
      ).toEqual([
        "demo-order-history-1",
      ]);
    });

    it("excludes customer-bound Orders", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const item =
        createOrderItem({
          id:
            "customer-order-item",
          productId:
            "product-customer",
          productVariantId:
            "variant-customer",
          productNameSnapshot:
            "Customer Product",
          skuSnapshot:
            "VEL-CUSTOMER",
          unitPriceSnapshot:
            createMoney(
              1000,
              BRL,
            ),
          quantity: 1,
        });

      await runtime.repositories
        .orders
        .save(
          createOrder({
            id:
              "customer-order",
            customerId:
              "customer-1",
            status:
              "PENDING",
            items: [
              item,
            ],
          }),
        );

      expect(
        await runtime.application
          .listDemoOrders(),
      ).toEqual([]);
    });

    it("returns a frozen collection", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      expect(
        Object.isFrozen(
          await runtime.application
            .listDemoOrders(),
        ),
      ).toBe(true);
    });

    it("preserves Order identity and status", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await addCart(runtime);

      await runtime.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-history-2",
        });

      const order =
        (
          await runtime.application
            .listDemoOrders()
        )[0];

      expect(order.id)
        .toBe(
          "demo-order-history-2",
        );

      expect(order.status)
        .toBe("PENDING");
    });

    it("survives runtime recreation with the same provider", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      await addCart(first);

      await first.application
        .createDemoOrderFromCart({
          cartId:
            "velora-demo-cart",
          orderId:
            "demo-order-history-3",
        });

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await second.application
            .listDemoOrders()
        ).map(
          (order) =>
            order.id,
        ),
      ).toContain(
        "demo-order-history-3",
      );
    });
  },
);