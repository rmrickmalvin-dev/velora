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

function item(
  id = "order-item-admin-1",
) {
  return createOrderItem({
    id,
    productId:
      "product-admin-demo",
    productVariantId:
      "variant-admin-demo",
    productNameSnapshot:
      "VELORA Admin Demo",
    skuSnapshot:
      "VEL-ADMIN-DEMO",
    unitPriceSnapshot:
      createMoney(
        159900,
        BRL,
      ),
    quantity: 2,
  });
}

function order(
  id: string,
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED" =
      "PENDING",
  customerId?:
    string,
) {
  return createOrder({
    id,
    ...(customerId
      ? { customerId }
      : {}),
    status,
    items: [
      item(
        `item-${id}`,
      ),
    ],
  });
}

describe(
  "Admin Order Operations",
  () => {
    it("lists no Admin Orders in a fresh demo runtime", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      expect(
        await runtime.application
          .listAdminOrders(),
      ).toEqual([]);
    });

    it("lists a guest Order", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const target =
        order(
          "order-admin-guest",
        );

      await runtime.repositories
        .orders
        .save(target);

      expect(
        (
          await runtime.application
            .listAdminOrders()
        )[0].id,
      ).toBe(
        target.id,
      );
    });

    it("lists a Customer Order as well as guest Orders", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.repositories
        .orders
        .save(
          order(
            "order-admin-customer",
            "PENDING",
            "customer-demo",
          ),
        );

      expect(
        (
          await runtime.application
            .listAdminOrders()
        )[0].customerId,
      ).toBe(
        "customer-demo",
      );
    });

    it("preserves repository Order sequence", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const first =
        order(
          "order-admin-first",
        );

      const second =
        order(
          "order-admin-second",
        );

      await runtime.repositories
        .orders.save(first);

      await runtime.repositories
        .orders.save(second);

      expect(
        (
          await runtime.application
            .listAdminOrders()
        ).map(
          (entry) =>
            entry.id,
        ),
      ).toEqual([
        first.id,
        second.id,
      ]);
    });

    it("persists a valid PENDING to CONFIRMED transition", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const target =
        order(
          "order-admin-confirm",
        );

      await runtime.repositories
        .orders.save(target);

      await runtime.application
        .changeOrderStatus({
          orderId:
            target.id,
          nextStatus:
            "CONFIRMED",
        });

      expect(
        (
          await runtime.repositories
            .orders.findById(
              target.id,
            )
        )?.status,
      ).toBe(
        "CONFIRMED",
      );
    });

    it("keeps status override across runtime recreation", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      const target =
        order(
          "order-admin-persistent",
        );

      await first.repositories
        .orders.save(target);

      await first.application
        .changeOrderStatus({
          orderId:
            target.id,
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
            .orders.findById(
              target.id,
            )
        )?.status,
      ).toBe(
        "CONFIRMED",
      );
    });

    it("rejects an invalid PENDING to SHIPPED jump", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const target =
        order(
          "order-admin-invalid",
        );

      await runtime.repositories
        .orders.save(target);

      await expect(
        runtime.application
          .changeOrderStatus({
            orderId:
              target.id,
            nextStatus:
              "SHIPPED",
          }),
      ).rejects.toMatchObject({
        code:
          "ORDER_STATUS_TRANSITION_INVALID",
      });
    });

    it("allows SHIPPED to DELIVERED and leaves DELIVERED terminal", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const target =
        order(
          "order-admin-delivery",
          "SHIPPED",
        );

      await runtime.repositories
        .orders.save(target);

      const delivered =
        await runtime.application
          .changeOrderStatus({
            orderId:
              target.id,
            nextStatus:
              "DELIVERED",
          });

      expect(
        delivered.status,
      ).toBe(
        "DELIVERED",
      );

      await expect(
        runtime.application
          .changeOrderStatus({
            orderId:
              target.id,
            nextStatus:
              "CANCELLED",
          }),
      ).rejects.toMatchObject({
        code:
          "ORDER_STATUS_TRANSITION_INVALID",
      });
    });

    it("preserves commercial Order item snapshots during status mutation", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const target =
        order(
          "order-admin-snapshot",
        );

      await runtime.repositories
        .orders.save(target);

      const updated =
        await runtime.application
          .changeOrderStatus({
            orderId:
              target.id,
            nextStatus:
              "CONFIRMED",
          });

      expect(
        updated.items,
      ).toEqual(
        target.items,
      );
    });

    it("does not mutate Inventory when Order status changes", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const inventory =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      const before =
        inventory
          ?.quantityOnHand;

      const target =
        order(
          "order-admin-no-stock",
        );

      await runtime.repositories
        .orders.save(target);

      await runtime.application
        .changeOrderStatus({
          orderId:
            target.id,
          nextStatus:
            "CONFIRMED",
        });

      expect(
        (
          await runtime.repositories
            .inventory
            .findByProductVariantId(
              "variant-aster-air-128-sky",
            )
        )?.quantityOnHand,
      ).toBe(
        before,
      );
    });
  },
);