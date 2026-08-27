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
  buildAdminOrdersModel,
  filterAdminOrders,
} from "./admin-orders-model";

function item(
  id: string,
  quantity = 1,
  minorUnits = 10000,
) {
  return createOrderItem({
    id,
    productId:
      `product-${id}`,
    productVariantId:
      `variant-${id}`,
    productNameSnapshot:
      `Product ${id}`,
    skuSnapshot:
      `SKU-${id}`,
    unitPriceSnapshot:
      createMoney(
        minorUnits,
        BRL,
      ),
    quantity,
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
        `${id}-1`,
        2,
        5000,
      ),
      item(
        `${id}-2`,
        1,
        2500,
      ),
    ],
  });
}

describe(
  "Admin Orders Model",
  () => {
    it("counts all Orders", () => {
      expect(
        buildAdminOrdersModel([
          order("order-1"),
          order("order-2"),
        ]).totalOrders,
      ).toBe(2);
    });

    it("counts Orders by status", () => {
      const model =
        buildAdminOrdersModel([
          order(
            "order-1",
            "PENDING",
          ),
          order(
            "order-2",
            "CONFIRMED",
          ),
        ]);

      expect(
        model.statusCounts.PENDING,
      ).toBe(1);

      expect(
        model.statusCounts.CONFIRMED,
      ).toBe(1);
    });

    it("marks guest Orders", () => {
      expect(
        buildAdminOrdersModel([
          order(
            "order-guest",
          ),
        ]).orders[0]
          .customerKind,
      ).toBe(
        "GUEST",
      );
    });

    it("marks Customer Orders without claiming verification", () => {
      const model =
        buildAdminOrdersModel([
          order(
            "order-customer",
            "PENDING",
            "customer-demo",
          ),
        ]);

      expect(
        model.orders[0]
          .customerKind,
      ).toBe(
        "CUSTOMER",
      );

      expect(
        model.orders[0]
          .customerId,
      ).toBe(
        "customer-demo",
      );
    });

    it("calculates total item quantity", () => {
      expect(
        buildAdminOrdersModel([
          order("order-items"),
        ]).orders[0]
          .totalItems,
      ).toBe(3);
    });

    it("keeps line count separate from item quantity", () => {
      expect(
        buildAdminOrdersModel([
          order("order-lines"),
        ]).orders[0]
          .lineCount,
      ).toBe(2);
    });

    it("calculates commercial snapshot subtotal", () => {
      expect(
        buildAdminOrdersModel([
          order("order-subtotal"),
        ]).orders[0]
          .subtotalMinorUnits,
      ).toBe(12500);
    });

    it("exposes only Domain-allowed next statuses", () => {
      expect(
        buildAdminOrdersModel([
          order(
            "order-status",
            "PENDING",
          ),
        ]).orders[0]
          .nextStatuses,
      ).toEqual([
        "CONFIRMED",
        "CANCELLED",
      ]);
    });

    it("filters by operational status", () => {
      const model =
        buildAdminOrdersModel([
          order(
            "order-pending",
            "PENDING",
          ),
          order(
            "order-shipped",
            "SHIPPED",
          ),
        ]);

      expect(
        filterAdminOrders(
          model.orders,
          "SHIPPED",
        ).map(
          (entry) =>
            entry.orderId,
        ),
      ).toEqual([
        "order-shipped",
      ]);
    });

    it("returns frozen Presentation collections", () => {
      const model =
        buildAdminOrdersModel([
          order("order-frozen"),
        ]);

      expect(
        Object.isFrozen(
          model,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.orders,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.orders[0],
        ),
      ).toBe(true);
    });
  },
);