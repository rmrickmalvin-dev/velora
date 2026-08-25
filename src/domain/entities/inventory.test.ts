import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createInventory,
} from "./inventory";

const validInventory = {
  id: "inventory-aster-xp-256-graphite",
  productVariantId:
    "variant-aster-xp-256-graphite",
  quantityOnHand: 12,
};

describe("Inventory", () => {
  it("creates an inventory record", () => {
    expect(
      createInventory(
        validInventory,
      ),
    ).toEqual(
      validInventory,
    );
  });

  it("allows zero quantity", () => {
    const inventory =
      createInventory({
        ...validInventory,
        quantityOnHand: 0,
      });

    expect(
      inventory.quantityOnHand,
    ).toBe(0);
  });

  it("trims identity values", () => {
    const inventory =
      createInventory({
        ...validInventory,
        id: " inventory-1 ",
        productVariantId:
          " variant-1 ",
      });

    expect(
      inventory.id,
    ).toBe(
      "inventory-1",
    );

    expect(
      inventory.productVariantId,
    ).toBe(
      "variant-1",
    );
  });

  it("rejects an empty id", () => {
    expect(() =>
      createInventory({
        ...validInventory,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product variant id", () => {
    expect(() =>
      createInventory({
        ...validInventory,
        productVariantId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_PRODUCT_VARIANT_ID_REQUIRED",
      }),
    );
  });

  it("rejects a negative quantity", () => {
    expect(() =>
      createInventory({
        ...validInventory,
        quantityOnHand: -1,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects a fractional quantity", () => {
    expect(() =>
      createInventory({
        ...validInventory,
        quantityOnHand: 1.5,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_QUANTITY_INVALID",
      }),
    );
  });

  it("rejects an unsafe integer quantity", () => {
    expect(() =>
      createInventory({
        ...validInventory,
        quantityOnHand:
          Number.MAX_SAFE_INTEGER + 1,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_QUANTITY_INVALID",
      }),
    );
  });
});