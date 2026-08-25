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
  createCartItem,
} from "./cart-item";

const validItem = {
  id: "cart-item-aster-xp",
  productVariantId:
    "variant-aster-xp-256-graphite",
  unitPrice:
    createMoney(
      499900,
      BRL,
    ),
  quantity: 2,
};

describe("CartItem", () => {
  it("creates a cart item", () => {
    expect(
      createCartItem(validItem),
    ).toEqual(validItem);
  });

  it("trims identity values", () => {
    const item =
      createCartItem({
        ...validItem,
        id: " cart-item-1 ",
        productVariantId:
          " variant-1 ",
      });

    expect(item.id).toBe(
      "cart-item-1",
    );

    expect(
      item.productVariantId,
    ).toBe(
      "variant-1",
    );
  });

  it("creates an immutable cart item", () => {
    const item =
      createCartItem(validItem);

    expect(
      Object.isFrozen(item),
    ).toBe(true);
  });

  it("rejects an empty id", () => {
    expect(() =>
      createCartItem({
        ...validItem,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product variant id", () => {
    expect(() =>
      createCartItem({
        ...validItem,
        productVariantId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_PRODUCT_VARIANT_ID_REQUIRED",
      }),
    );
  });

  it("rejects zero quantity", () => {
    expect(() =>
      createCartItem({
        ...validItem,
        quantity: 0,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects negative quantity", () => {
    expect(() =>
      createCartItem({
        ...validItem,
        quantity: -1,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects fractional quantity", () => {
    expect(() =>
      createCartItem({
        ...validItem,
        quantity: 1.5,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects negative unit price", () => {
    expect(() =>
      createCartItem({
        ...validItem,
        unitPrice:
          createMoney(
            -1,
            BRL,
          ),
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_UNIT_PRICE_NEGATIVE",
      }),
    );
  });
});