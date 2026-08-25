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
  createCartItem,
} from "../entities/cart-item";
import {
  createCart,
} from "../entities/cart";
import {
  addCartItem,
  calculateCartSubtotal,
  removeCartItem,
  updateCartItemQuantity,
} from "./cart-service";

function item(
  id: string,
  productVariantId: string,
  minorUnits = 10000,
  quantity = 1,
  currency = BRL,
) {
  return createCartItem({
    id,
    productVariantId,
    unitPrice:
      createMoney(
        minorUnits,
        currency,
      ),
    quantity,
  });
}

describe("Cart Service", () => {
  it("adds a cart item", () => {
    const cart = createCart({
      id: "cart-1",
    });

    const result =
      addCartItem(
        cart,
        item(
          "item-1",
          "variant-1",
        ),
      );

    expect(
      result.items,
    ).toHaveLength(1);
  });

  it("does not mutate the original cart when adding", () => {
    const cart = createCart({
      id: "cart-1",
    });

    addCartItem(
      cart,
      item(
        "item-1",
        "variant-1",
      ),
    );

    expect(
      cart.items,
    ).toHaveLength(0);
  });

  it("rejects adding the same product variant twice", () => {
    const cart = createCart({
      id: "cart-1",
      items: [
        item(
          "item-1",
          "variant-1",
        ),
      ],
    });

    expect(() =>
      addCartItem(
        cart,
        item(
          "item-2",
          "variant-1",
        ),
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_PRODUCT_VARIANT_DUPLICATED",
      }),
    );
  });

  it("removes a cart item", () => {
    const cart = createCart({
      id: "cart-1",
      items: [
        item(
          "item-1",
          "variant-1",
        ),
      ],
    });

    const result =
      removeCartItem(
        cart,
        "item-1",
      );

    expect(
      result.items,
    ).toHaveLength(0);
  });

  it("rejects removing an unknown cart item", () => {
    const cart = createCart({
      id: "cart-1",
    });

    expect(() =>
      removeCartItem(
        cart,
        "missing",
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_NOT_FOUND",
      }),
    );
  });

  it("updates a cart item quantity", () => {
    const cart = createCart({
      id: "cart-1",
      items: [
        item(
          "item-1",
          "variant-1",
        ),
      ],
    });

    const result =
      updateCartItemQuantity(
        cart,
        "item-1",
        4,
      );

    expect(
      result.items[0]
        .quantity,
    ).toBe(4);
  });

  it("does not mutate the original item when updating quantity", () => {
    const original =
      item(
        "item-1",
        "variant-1",
      );

    const cart = createCart({
      id: "cart-1",
      items: [original],
    });

    updateCartItemQuantity(
      cart,
      "item-1",
      4,
    );

    expect(
      original.quantity,
    ).toBe(1);
  });

  it("rejects updating an unknown cart item", () => {
    const cart = createCart({
      id: "cart-1",
    });

    expect(() =>
      updateCartItemQuantity(
        cart,
        "missing",
        2,
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_NOT_FOUND",
      }),
    );
  });

  it("calculates subtotal for one item", () => {
    const cart = createCart({
      id: "cart-1",
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
      calculateCartSubtotal(
        cart,
      ),
    ).toEqual({
      minorUnits: 999800,
      currency: "BRL",
    });
  });

  it("calculates subtotal for multiple items", () => {
    const cart = createCart({
      id: "cart-1",
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
      calculateCartSubtotal(
        cart,
      ),
    ).toEqual({
      minorUnits: 27500,
      currency: "BRL",
    });
  });

  it("returns null subtotal for an empty cart", () => {
    const cart = createCart({
      id: "cart-1",
    });

    expect(
      calculateCartSubtotal(
        cart,
      ),
    ).toBeNull();
  });

  it("rejects subtotal across different currencies", () => {
    const USD =
      createCurrencyCode(
        "USD",
      );

    const cart = createCart({
      id: "cart-1",
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
      calculateCartSubtotal(
        cart,
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "MONEY_CURRENCY_MISMATCH",
      }),
    );
  });
});