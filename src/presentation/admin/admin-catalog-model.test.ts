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
    "pt-BR",
    products,
  );
}

describe(
  "Admin Catalog Model",
  () => {
    it("lists the active Storefront catalog", async () => {
      expect(
        (
          await model()
        ).productCount,
      ).toBe(8);
    });

    it("counts seeded active Product Variants", async () => {
      expect(
        (
          await model()
        ).variantCount,
      ).toBe(15);
    });

    it("derives positive Inventory units", async () => {
      expect(
        (
          await model()
        ).inventoryUnits,
      ).toBeGreaterThan(0);
    });

    it("preserves Product identity", async () => {
      expect(
        (
          await model()
        ).products.some(
          (product) =>
            product.productId ===
            "product-aster-one-x-pro",
        ),
      ).toBe(true);
    });

    it("preserves Product slug", async () => {
      expect(
        (
          await model()
        ).products.some(
          (product) =>
            product.slug ===
            "aster-one-x-pro",
        ),
      ).toBe(true);
    });

    it("preserves Variant SKU", async () => {
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

    it("formats Variant prices for the requested locale", async () => {
      expect(
        (
          await model()
        ).products[0]
          .variants[0]
          .priceLabel,
      ).toContain(
        "R$",
      );
    });

    it("derives Product total stock from Variant stock", async () => {
      const product =
        (
          await model()
        ).products[0];

      expect(
        product.totalStock,
      ).toBe(
        product.variants.reduce(
          (
            total,
            variant,
          ) =>
            total +
            variant.quantityOnHand,
          0,
        ),
      );
    });

    it("sorts Products alphabetically for Admin review", async () => {
      const names =
        (
          await model()
        ).products.map(
          (product) =>
            product.name,
        );

      expect(names).toEqual(
        [...names].sort(
          (
            left,
            right,
          ) =>
            left.localeCompare(
              right,
            ),
        ),
      );
    });

    it("returns frozen Admin read models", async () => {
      const result =
        await model();

      expect(
        Object.isFrozen(
          result,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          result.products,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          result.products[0]
            .variants,
        ),
      ).toBe(true);
    });
  },
);