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
  createProductVariant,
} from "./product-variant";

const validVariant = {
  id:
    "variant-aster-xp-256-graphite",
  productId:
    "product-aster-one-x-pro",
  sku:
    "vl_aster xp 256 gra",
  price:
    createMoney(
      499900,
      BRL,
    ),
  status: "ACTIVE" as const,
  attributes: {
    storage: "256 GB",
    color: "Graphite",
  },
};

describe("ProductVariant", () => {
  it("creates a normalized variant", () => {
    const variant =
      createProductVariant(
        validVariant,
      );

    expect(
      variant.id,
    ).toBe(
      "variant-aster-xp-256-graphite",
    );

    expect(
      variant.productId,
    ).toBe(
      "product-aster-one-x-pro",
    );

    expect(
      variant.sku,
    ).toBe(
      "VL-ASTER-XP-256-GRA",
    );

    expect(
      variant.price,
    ).toEqual({
      minorUnits: 499900,
      currency: "BRL",
    });

    expect(
      variant.attributes,
    ).toEqual({
      storage: "256 GB",
      color: "Graphite",
    });
  });

  it("rejects an empty id", () => {
    expect(() =>
      createProductVariant({
        ...validVariant,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_VARIANT_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product id", () => {
    expect(() =>
      createProductVariant({
        ...validVariant,
        productId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_VARIANT_PRODUCT_ID_REQUIRED",
      }),
    );
  });

  it("rejects a negative price", () => {
    expect(() =>
      createProductVariant({
        ...validVariant,
        price:
          createMoney(
            -1,
            BRL,
          ),
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_VARIANT_PRICE_NEGATIVE",
      }),
    );
  });

  it("rejects an empty attribute key", () => {
    expect(() =>
      createProductVariant({
        ...validVariant,
        attributes: {
          " ": "Graphite",
        },
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_VARIANT_ATTRIBUTE_KEY_REQUIRED",
      }),
    );
  });

  it("rejects an empty attribute value", () => {
    expect(() =>
      createProductVariant({
        ...validVariant,
        attributes: {
          color: " ",
        },
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_VARIANT_ATTRIBUTE_VALUE_REQUIRED",
      }),
    );
  });

  it("freezes variant attributes", () => {
    const variant =
      createProductVariant(
        validVariant,
      );

    expect(
      Object.isFrozen(
        variant.attributes,
      ),
    ).toBe(true);
  });
});