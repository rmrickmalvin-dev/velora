import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createStaticVeloraRuntime,
} from "../../infrastructure/composition/create-static-velora-runtime";
import {
  buildStorefrontCategoryModel,
  isStorefrontCategoryRouteKey,
  storefrontCategoryRouteKeys,
} from "./storefront-category-model";

async function products() {
  return createStaticVeloraRuntime()
    .application
    .listStorefrontProducts();
}

describe(
  "Storefront Category Model",
  () => {
    it("exposes exactly four canonical category route keys", () => {
      expect(
        storefrontCategoryRouteKeys,
      ).toEqual([
        "smartphone",
        "audio",
        "power",
        "protection",
      ]);
    });

    it("recognizes supported category route keys", () => {
      expect(
        isStorefrontCategoryRouteKey(
          "audio",
        ),
      ).toBe(true);
    });

    it("rejects unsupported category route keys", () => {
      expect(
        isStorefrontCategoryRouteKey(
          "wearables",
        ),
      ).toBe(false);
    });

    it("filters the Storefront catalog to the requested category", async () => {
      const model =
        buildStorefrontCategoryModel(
          "pt-BR",
          "audio",
          await products(),
        );

      expect(
        model.products.length,
      ).toBeGreaterThan(0);

      expect(
        model.products.every(
          (product) =>
            product.categoryKey ===
            "audio",
        ),
      ).toBe(true);
    });

    it("localizes the category title", async () => {
      const model =
        buildStorefrontCategoryModel(
          "es",
          "protection",
          await products(),
        );

      expect(
        model.title,
      ).toBe("Proteccion");
    });

    it("preserves the category journey across locale links", async () => {
      const model =
        buildStorefrontCategoryModel(
          "en",
          "power",
          await products(),
        );

      expect(
        model.localeLinks.map(
          (item) =>
            item.href,
        ),
      ).toEqual([
        "/pt-BR/categories/power",
        "/en/categories/power",
        "/es/categories/power",
      ]);
    });

    it("creates a locale-safe Storefront back link", async () => {
      const model =
        buildStorefrontCategoryModel(
          "es",
          "audio",
          await products(),
        );

      expect(
        model.backHref,
      ).toBe(
        "/es#categories",
      );
    });

    it("returns a frozen category model and Product list", async () => {
      const model =
        buildStorefrontCategoryModel(
          "pt-BR",
          "smartphone",
          await products(),
        );

      expect(
        Object.isFrozen(model),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.products,
        ),
      ).toBe(true);
    });
  },
);