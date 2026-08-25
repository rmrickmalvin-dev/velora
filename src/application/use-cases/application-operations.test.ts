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
  createLocalRepositories,
} from "../../infrastructure/repositories/local";
import {
  adjustInventory,
} from "./adjust-inventory";
import {
  changeOrderStatus,
  listCustomerOrders,
} from "./order-use-cases";

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
  "Inventory and Order Application Use Cases",
  () => {
    it("applies Inventory movement and persists current state plus history", async () => {
      const repositories =
        createLocalRepositories();

      const current =
        await repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-xp-256-graphite",
          );

      expect(current).not.toBeNull();

      const before =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            current!.id,
          );

      const result =
        await adjustInventory(
          repositories,
          {
            inventoryId:
              current!.id,
            movementId:
              "movement-admin-entry-1",
            type: "ENTRY",
            delta: 5,
            reason:
              "Admin restock",
          },
        );

      expect(
        result.inventory
          .quantityOnHand,
      ).toBe(
        current!
          .quantityOnHand + 5,
      );

      const after =
        await repositories
          .inventoryMovements
          .listByInventoryId(
            current!.id,
          );

      expect(
        after,
      ).toHaveLength(
        before.length + 1,
      );

      expect(
        after[
          after.length - 1
        ].id,
      ).toBe(
        "movement-admin-entry-1",
      );
    });

    it("rejects adjustment for missing Inventory", async () => {
      const repositories =
        createLocalRepositories();

      await expect(
        adjustInventory(
          repositories,
          {
            inventoryId:
              "missing-inventory",
            movementId:
              "movement-1",
            type: "ENTRY",
            delta: 1,
            reason: "Test",
          },
        ),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_INVENTORY_NOT_FOUND",
      });
    });

    it("preserves negative-stock protection from Domain", async () => {
      const repositories =
        createLocalRepositories();

      const current =
        await repositories
          .inventory
          .findByProductVariantId(
            "variant-nivalis-fold-512-silver",
          );

      expect(current).not.toBeNull();

      await expect(
        adjustInventory(
          repositories,
          {
            inventoryId:
              current!.id,
            movementId:
              "movement-invalid-exit",
            type: "EXIT",
            delta: -99,
            reason:
              "Invalid sale",
          },
        ),
      ).rejects.toMatchObject({
        code:
          "INVENTORY_RESULT_NEGATIVE",
      });

      expect(
        (
          await repositories
            .inventory
            .findById(
              current!.id,
            )
        )?.quantityOnHand,
      ).toBe(
        current!
          .quantityOnHand,
      );
    });

    it("changes Order status through Domain lifecycle rules", async () => {
      const repositories =
        createLocalRepositories();

      const order =
        orderFixture(
          "order-1",
          "customer-1",
        );

      await repositories
        .orders
        .save(order);

      const result =
        await changeOrderStatus(
          repositories.orders,
          {
            orderId:
              order.id,
            nextStatus:
              "CONFIRMED",
          },
        );

      expect(
        result.status,
      ).toBe(
        "CONFIRMED",
      );

      expect(
        (
          await repositories
            .orders
            .findById(
              order.id,
            )
        )?.status,
      ).toBe(
        "CONFIRMED",
      );
    });

    it("rejects missing Order during status change", async () => {
      const repositories =
        createLocalRepositories();

      await expect(
        changeOrderStatus(
          repositories.orders,
          {
            orderId:
              "missing-order",
            nextStatus:
              "CONFIRMED",
          },
        ),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_ORDER_NOT_FOUND",
      });
    });

    it("preserves invalid Order transition protection", async () => {
      const repositories =
        createLocalRepositories();

      const order =
        orderFixture(
          "order-1",
        );

      await repositories
        .orders
        .save(order);

      await expect(
        changeOrderStatus(
          repositories.orders,
          {
            orderId:
              order.id,
            nextStatus:
              "SHIPPED",
          },
        ),
      ).rejects.toMatchObject({
        code:
          "ORDER_STATUS_TRANSITION_INVALID",
      });
    });

    it("lists only Orders for the requested Customer", async () => {
      const repositories =
        createLocalRepositories();

      const first =
        orderFixture(
          "order-customer-1",
          "customer-1",
        );

      const second =
        orderFixture(
          "order-customer-2",
          "customer-2",
        );

      const guest =
        orderFixture(
          "order-guest",
        );

      await repositories
        .orders
        .save(first);

      await repositories
        .orders
        .save(second);

      await repositories
        .orders
        .save(guest);

      expect(
        await listCustomerOrders(
          repositories.orders,
          "customer-1",
        ),
      ).toEqual([first]);
    });

    it("returns an empty list when Customer has no Orders", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await listCustomerOrders(
          repositories.orders,
          "customer-none",
        ),
      ).toEqual([]);
    });
  },
);