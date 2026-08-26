import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createSlug,
} from "../../domain/value-objects/slug";
import {
  createStaticVeloraRuntime,
} from "../../infrastructure/composition/create-static-velora-runtime";
import {
  buildStorefrontProductDetailModel,
} from "./storefront-product-detail-model";

async function product() {
  const value =
    await createStaticVeloraRuntime()
      .application
      .getStorefrontProductBySlug(
        createSlug(
          "aster-one-x-pro",
        ),
      );

  if (!value) {
    throw new Error(
      "Expected seeded Product.",
    );
  }

  return value;
}

describe(
  "Storefront Product Detail Model",
  () => {
    it("keeps Product identity from Application data", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "pt-BR",
          await product(),
        );

      expect(model.name).toBe(
        "Aster One X Pro",
      );

      expect(model.brand).toBe(
        "Aster",
      );
    });

    it("maps the Product category to localized Presentation copy", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "pt-BR",
          await product(),
        );

      expect(
        model.categoryLabel,
      ).toBe("Smartphones");
    });

    it("exposes all active Product variants", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "en",
          await product(),
        );

      expect(
        model.variants,
      ).toHaveLength(3);
    });

    it("formats each variant price for the selected locale", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "en",
          await product(),
        );

      expect(
        model.variants[0]
          .priceLabel,
      ).toMatch(
        /BRL|R\$/,
      );
    });

    it("derives stock labels from Inventory", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "en",
          await product(),
        );

      expect(
        model.variants.every(
          (variant) =>
            variant.available,
        ),
      ).toBe(true);

      expect(
        model.variants.every(
          (variant) =>
            variant.stockLabel ===
            "Available",
        ),
      ).toBe(true);
    });

    it("preserves Product slug across locale links", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "es",
          await product(),
        );

      expect(
        model.localeLinks.map(
          (item) =>
            item.href,
        ),
      ).toEqual([
        "/pt-BR/products/aster-one-x-pro",
        "/en/products/aster-one-x-pro",
        "/es/products/aster-one-x-pro",
      ]);
    });

    it("creates a locale-safe Storefront back link", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "es",
          await product(),
        );

      expect(
        model.backHref,
      ).toBe(
        "/es#featured",
      );
    });

    it("freezes detail and variant collections", async () => {
      const model =
        buildStorefrontProductDetailModel(
          "pt-BR",
          await product(),
        );

      expect(
        Object.isFrozen(model),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.variants,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.localeLinks,
        ),
      ).toBe(true);
    });
  },
);