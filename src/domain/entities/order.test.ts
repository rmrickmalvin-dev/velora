import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  OrderStatus,
} from "../types/statuses";
import {
  BRL,
} from "../value-objects/currency-code";
import {
  createMoney,
} from "../value-objects/money";
import {
  createOrderItem,
} from "./order-item";
import {
  createOrder,
} from "./order";

function item(
  id = "order-item-1",
) {
  return createOrderItem({
    id,
    productId:
      "product-1",
    productVariantId:
      "variant-1",
    productNameSnapshot:
      "Aster One",
    skuSnapshot:
      "VL-ASTER-ONE",
    unitPriceSnapshot:
      createMoney(
        10000,
        BRL,
      ),
    quantity: 1,
  });
}

describe("Order", () => {
  it("creates a customer order", () => {
    const order =
      createOrder({
        id: "order-1",
        customerId:
          "customer-1",
        status: "PENDING",
        items: [item()],
      });

    expect(order).toEqual({
      id: "order-1",
      customerId:
        "customer-1",
      status: "PENDING",
      items: [item()],
    });
  });

  it("creates a guest order without customer id", () => {
    const order =
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [item()],
      });

    expect(
      order.customerId,
    ).toBeUndefined();
  });

  it("trims order and customer ids", () => {
    const order =
      createOrder({
        id: " order-1 ",
        customerId:
          " customer-1 ",
        status: "PENDING",
        items: [item()],
      });

    expect(order.id).toBe(
      "order-1",
    );

    expect(
      order.customerId,
    ).toBe(
      "customer-1",
    );
  });

  it("rejects an empty order id", () => {
    expect(() =>
      createOrder({
        id: " ",
        status: "PENDING",
        items: [item()],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty customer id when provided", () => {
    expect(() =>
      createOrder({
        id: "order-1",
        customerId: " ",
        status: "PENDING",
        items: [item()],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_CUSTOMER_ID_INVALID",
      }),
    );
  });

  it("rejects an empty items collection", () => {
    expect(() =>
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEMS_REQUIRED",
      }),
    );
  });

  it("rejects duplicated order item ids", () => {
    expect(() =>
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [
          item("same-id"),
          item("same-id"),
        ],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_ID_DUPLICATED",
      }),
    );
  });

  it("rejects an unsupported status at runtime", () => {
    expect(() =>
      createOrder({
        id: "order-1",
        status:
          "REFUNDED" as OrderStatus,
        items: [item()],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_STATUS_INVALID",
      }),
    );
  });

  it("freezes order and items collection", () => {
    const order =
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [item()],
      });

    expect(
      Object.isFrozen(order),
    ).toBe(true);

    expect(
      Object.isFrozen(
        order.items,
      ),
    ).toBe(true);
  });
});