import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createStaticVeloraRuntime,
} from "../../infrastructure/composition/create-static-velora-runtime";
import {
  buildStorefrontHomeModel,
  formatStorefrontMoney,
} from "./storefront-home-model";

async function products() {
  return createStaticVeloraRuntime()
    .application
    .listStorefrontProducts();
}

describe(
  "Storefront Home Model",
  () => {
    it("builds four featured Storefront cards from Application data", async () => {
      const model =
        buildStorefrontHomeModel(
          "pt-BR",
          await products(),
        );

      expect(
        model.featuredProducts,
      ).toHaveLength(4);

      expect(
        model.featuredProducts.every(
          (product) =>
            product.featured,
        ),
      ).toBe(true);
    });

    it("uses catalog Product names instead of hardcoded card names", async () => {
      const model =
        buildStorefrontHomeModel(
          "en",
          await products(),
        );

      expect(
        model.featuredProducts.map(
          (product) =>
            product.name,
        ),
      ).toEqual([
        "Aster Air",
        "Aster One X Pro",
        "Halo Buds Pro",
        "Nivalis Fold S",
      ]);
    });

    it("maps Domain category ids to localized labels", async () => {
      const model =
        buildStorefrontHomeModel(
          "es",
          await products(),
        );

      const halo =
        model.featuredProducts.find(
          (product) =>
            product.name ===
            "Halo Buds Pro",
        );

      expect(
        halo?.categoryLabel,
      ).toBe("Audio");
    });

    it("formats BRL for PT-BR", () => {
      expect(
        formatStorefrontMoney(
          "pt-BR",
          499900,
          "BRL",
        ),
      ).toContain(
        "4.999,00",
      );
    });

    it("formats BRL with locale-aware English separators", () => {
      expect(
        formatStorefrontMoney(
          "en",
          499900,
          "BRL",
        ),
      ).toContain(
        "4,999.00",
      );
    });

    it("creates equivalent locale links", async () => {
      const model =
        buildStorefrontHomeModel(
          "pt-BR",
          await products(),
        );

      expect(
        model.localeLinks.map(
          (item) =>
            item.href,
        ),
      ).toEqual([
        "/pt-BR",
        "/en",
        "/es",
      ]);
    });

    it("reports seeded stock availability", async () => {
      const model =
        buildStorefrontHomeModel(
          "en",
          await products(),
        );

      expect(
        model.featuredProducts.some(
          (product) =>
            product.stockLabel ===
            "In stock",
        ),
      ).toBe(true);
    });

    it("freezes the public Storefront model", async () => {
      const model =
        buildStorefrontHomeModel(
          "pt-BR",
          await products(),
        );

      expect(
        Object.isFrozen(model),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.featuredProducts,
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