import {
  describe,
  expect,
  it,
} from "vitest";

import {
  BRL,
  createCurrencyCode,
} from "../value-objects/currency-code";
import {
  createMoney,
} from "../value-objects/money";
import {
  createOrderItem,
} from "../entities/order-item";
import {
  createOrder,
} from "../entities/order";
import {
  calculateOrderSubtotal,
  transitionOrderStatus,
} from "./order-service";

function item(
  id: string,
  productVariantId: string,
  minorUnits = 10000,
  quantity = 1,
  currency = BRL,
) {
  return createOrderItem({
    id,
    productId:
      `product-${productVariantId}`,
    productVariantId,
    productNameSnapshot:
      `Product ${productVariantId}`,
    skuSnapshot:
      `SKU-${productVariantId}`,
    unitPriceSnapshot:
      createMoney(
        minorUnits,
        currency,
      ),
    quantity,
  });
}

function order(
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED" =
      "PENDING",
) {
  return createOrder({
    id: "order-1",
    status,
    items: [
      item(
        "item-1",
        "variant-1",
      ),
    ],
  });
}

describe("Order Service", () => {
  it("calculates subtotal for one order item", () => {
    const target =
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [
          item(
            "item-1",
            "variant-1",
            499900,
            2,
          ),
        ],
      });

    expect(
      calculateOrderSubtotal(
        target,
      ),
    ).toEqual({
      minorUnits: 999800,
      currency: "BRL",
    });
  });

  it("calculates subtotal for multiple order items", () => {
    const target =
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [
          item(
            "item-1",
            "variant-1",
            10000,
            2,
          ),
          item(
            "item-2",
            "variant-2",
            2500,
            3,
          ),
        ],
      });

    expect(
      calculateOrderSubtotal(
        target,
      ),
    ).toEqual({
      minorUnits: 27500,
      currency: "BRL",
    });
  });

  it("rejects subtotal across different currencies", () => {
    const USD =
      createCurrencyCode(
        "USD",
      );

    const target =
      createOrder({
        id: "order-1",
        status: "PENDING",
        items: [
          item(
            "item-1",
            "variant-1",
            10000,
            1,
            BRL,
          ),
          item(
            "item-2",
            "variant-2",
            10000,
            1,
            USD,
          ),
        ],
      });

    expect(() =>
      calculateOrderSubtotal(
        target,
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "MONEY_CURRENCY_MISMATCH",
      }),
    );
  });

  it("transitions PENDING to CONFIRMED", () => {
    const result =
      transitionOrderStatus(
        order("PENDING"),
        "CONFIRMED",
      );

    expect(
      result.status,
    ).toBe(
      "CONFIRMED",
    );
  });

  it("transitions CONFIRMED to PREPARING", () => {
    const result =
      transitionOrderStatus(
        order("CONFIRMED"),
        "PREPARING",
      );

    expect(
      result.status,
    ).toBe(
      "PREPARING",
    );
  });

  it("transitions PREPARING to SHIPPED", () => {
    const result =
      transitionOrderStatus(
        order("PREPARING"),
        "SHIPPED",
      );

    expect(
      result.status,
    ).toBe(
      "SHIPPED",
    );
  });

  it("transitions SHIPPED to DELIVERED", () => {
    const result =
      transitionOrderStatus(
        order("SHIPPED"),
        "DELIVERED",
      );

    expect(
      result.status,
    ).toBe(
      "DELIVERED",
    );
  });

  it("allows cancellation from PENDING", () => {
    const result =
      transitionOrderStatus(
        order("PENDING"),
        "CANCELLED",
      );

    expect(
      result.status,
    ).toBe(
      "CANCELLED",
    );
  });

  it("rejects invalid status jumps", () => {
    expect(() =>
      transitionOrderStatus(
        order("PENDING"),
        "SHIPPED",
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_STATUS_TRANSITION_INVALID",
      }),
    );
  });

  it("treats DELIVERED as terminal", () => {
    expect(() =>
      transitionOrderStatus(
        order("DELIVERED"),
        "CANCELLED",
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_STATUS_TRANSITION_INVALID",
      }),
    );
  });

  it("treats CANCELLED as terminal", () => {
    expect(() =>
      transitionOrderStatus(
        order("CANCELLED"),
        "CONFIRMED",
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_STATUS_TRANSITION_INVALID",
      }),
    );
  });

  it("does not mutate the original order when transitioning", () => {
    const original =
      order("PENDING");

    transitionOrderStatus(
      original,
      "CONFIRMED",
    );

    expect(
      original.status,
    ).toBe(
      "PENDING",
    );
  });
});