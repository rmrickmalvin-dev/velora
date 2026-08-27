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

async function product() {
  const products =
    await createStaticVeloraRuntime()
      .application
      .listStorefrontProducts();

  return buildAdminCatalogModel(
    "en",
    products,
  ).products.find(
    (entry) =>
      entry.productId ===
      "product-aster-air",
  )!;
}

describe(
  "Admin Catalog Edit Read Model",
  () => {
    it("exposes Product model", async () => {
      expect(
        (
          await product()
        ).model,
      ).toBe("Air");
    });

    it("exposes Featured state", async () => {
      expect(
        typeof (
          await product()
        ).featured,
      ).toBe(
        "boolean",
      );
    });

    it("exposes raw Variant price minor units", async () => {
      expect(
        (
          await product()
        ).variants[0]
          .priceMinorUnits,
      ).toBeGreaterThan(0);
    });

    it("exposes Variant currency", async () => {
      expect(
        (
          await product()
        ).variants[0]
          .currency,
      ).toBe("BRL");
    });

    it("keeps localized price label beside raw price", async () => {
      const variant =
        (
          await product()
        ).variants[0];

      expect(
        variant.priceLabel,
      ).toContain("R$");

      expect(
        variant.priceMinorUnits,
      ).toBeGreaterThan(0);
    });

    it("keeps edit data inside a frozen read model", async () => {
      const entry =
        await product();

      expect(
        Object.isFrozen(
          entry,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          entry.variants[0],
        ),
      ).toBe(true);
    });
  },
);