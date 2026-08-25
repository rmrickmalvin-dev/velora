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
import {
  createCart,
} from "./cart";

function item(
  id = "cart-item-1",
  productVariantId =
    "variant-1",
) {
  return createCartItem({
    id,
    productVariantId,
    unitPrice:
      createMoney(
        10000,
        BRL,
      ),
    quantity: 1,
  });
}

describe("Cart", () => {
  it("creates an empty cart", () => {
    expect(
      createCart({
        id: "cart-1",
      }),
    ).toEqual({
      id: "cart-1",
      items: [],
    });
  });

  it("creates a cart with items", () => {
    const cart = createCart({
      id: "cart-1",
      items: [item()],
    });

    expect(
      cart.items,
    ).toHaveLength(1);
  });

  it("rejects an empty id", () => {
    expect(() =>
      createCart({
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ID_REQUIRED",
      }),
    );
  });

  it("freezes cart and items collection", () => {
    const cart = createCart({
      id: "cart-1",
      items: [item()],
    });

    expect(
      Object.isFrozen(cart),
    ).toBe(true);

    expect(
      Object.isFrozen(
        cart.items,
      ),
    ).toBe(true);
  });

  it("rejects duplicated cart item ids", () => {
    expect(() =>
      createCart({
        id: "cart-1",
        items: [
          item(
            "same-id",
            "variant-1",
          ),
          item(
            "same-id",
            "variant-2",
          ),
        ],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_ITEM_ID_DUPLICATED",
      }),
    );
  });

  it("rejects duplicated product variants", () => {
    expect(() =>
      createCart({
        id: "cart-1",
        items: [
          item(
            "item-1",
            "same-variant",
          ),
          item(
            "item-2",
            "same-variant",
          ),
        ],
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "CART_PRODUCT_VARIANT_DUPLICATED",
      }),
    );
  });

  it("copies the input items collection", () => {
    const items = [item()];

    const cart = createCart({
      id: "cart-1",
      items,
    });

    items.length = 0;

    expect(
      cart.items,
    ).toHaveLength(1);
  });
});