import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createStaticVeloraRuntime,
} from "../../infrastructure/composition/create-static-velora-runtime";
import {
  buildAdminCatalogModel,
} from "./admin-catalog-model";

async function model() {
  const products =
    await createStaticVeloraRuntime()
      .application
      .listStorefrontProducts();

  return buildAdminCatalogModel(
    "en",
    products,
  );
}

describe(
  "Admin Catalog Inventory Read Model",
  () => {
    it("exposes Inventory identity for every seeded Variant", async () => {
      expect(
        (
          await model()
        ).products.every(
          (product) =>
            product.variants.every(
              (variant) =>
                Boolean(
                  variant.inventoryId,
                ),
            ),
        ),
      ).toBe(true);
    });

    it("keeps quantityOnHand beside Inventory identity", async () => {
      const variant =
        (
          await model()
        ).products[0]
          .variants[0];

      expect(
        variant.inventoryId,
      ).toBeTruthy();

      expect(
        Number.isSafeInteger(
          variant.quantityOnHand,
        ),
      ).toBe(true);
    });

    it("preserves Variant identity for Inventory operations", async () => {
      expect(
        (
          await model()
        ).products.some(
          (product) =>
            product.variants.some(
              (variant) =>
                variant.variantId ===
                "variant-aster-air-128-sky",
            ),
        ),
      ).toBe(true);
    });

    it("preserves SKU for Inventory operation context", async () => {
      expect(
        (
          await model()
        ).products.some(
          (product) =>
            product.variants.some(
              (variant) =>
                variant.sku ===
                "VEL-ASTER-XP-256-GRA",
            ),
        ),
      ).toBe(true);
    });

    it("keeps Inventory identity in the frozen Variant model", async () => {
      const variant =
        (
          await model()
        ).products[0]
          .variants[0];

      expect(
        Object.isFrozen(
          variant,
        ),
      ).toBe(true);
    });

    it("does not derive Inventory id from SKU text", async () => {
      const variant =
        (
          await model()
        ).products[0]
          .variants[0];

      expect(
        variant.inventoryId,
      ).not.toBe(
        variant.sku,
      );
    });
  },
);