import {
  describe,
  expect,
  it,
} from "vitest";

import {
  BRL,
} from "../value-objects/currency-code";
import {
  createMoney,
} from "../value-objects/money";
import {
  createOrderItem,
} from "./order-item";

const validItem = {
  id: "order-item-aster-xp",
  productId:
    "product-aster-one-x-pro",
  productVariantId:
    "variant-aster-xp-256-graphite",
  productNameSnapshot:
    "Aster One X Pro",
  skuSnapshot:
    "vl_aster xp 256 gra",
  unitPriceSnapshot:
    createMoney(
      499900,
      BRL,
    ),
  quantity: 2,
};

describe("OrderItem", () => {
  it("creates a commercial snapshot", () => {
    const item =
      createOrderItem(
        validItem,
      );

    expect(item).toEqual({
      ...validItem,
      skuSnapshot:
        "VL-ASTER-XP-256-GRA",
    });
  });

  it("trims identity and name snapshot values", () => {
    const item =
      createOrderItem({
        ...validItem,
        id: " order-item-1 ",
        productId: " product-1 ",
        productVariantId:
          " variant-1 ",
        productNameSnapshot:
          " Product Name ",
      });

    expect(item.id).toBe(
      "order-item-1",
    );

    expect(
      item.productId,
    ).toBe(
      "product-1",
    );

    expect(
      item.productVariantId,
    ).toBe(
      "variant-1",
    );

    expect(
      item.productNameSnapshot,
    ).toBe(
      "Product Name",
    );
  });

  it("creates an immutable order item", () => {
    const item =
      createOrderItem(
        validItem,
      );

    expect(
      Object.isFrozen(item),
    ).toBe(true);
  });

  it("rejects an empty id", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product id", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        productId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_PRODUCT_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product variant id", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        productVariantId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_PRODUCT_VARIANT_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product name snapshot", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        productNameSnapshot: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_PRODUCT_NAME_SNAPSHOT_REQUIRED",
      }),
    );
  });

  it("normalizes the SKU snapshot", () => {
    const item =
      createOrderItem(
        validItem,
      );

    expect(
      item.skuSnapshot,
    ).toBe(
      "VL-ASTER-XP-256-GRA",
    );
  });

  it("rejects zero quantity", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        quantity: 0,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects fractional quantity", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        quantity: 1.5,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects negative unit price snapshot", () => {
    expect(() =>
      createOrderItem({
        ...validItem,
        unitPriceSnapshot:
          createMoney(
            -1,
            BRL,
          ),
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "ORDER_ITEM_UNIT_PRICE_SNAPSHOT_NEGATIVE",
      }),
    );
  });
});