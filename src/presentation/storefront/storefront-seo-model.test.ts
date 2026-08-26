import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildStorefrontSeoModel,
} from "./storefront-seo-model";

describe(
  "Storefront SEO Model",
  () => {
    it("builds the current locale home canonical path", () => {
      expect(
        buildStorefrontSeoModel(
          "pt-BR",
          "VELORA",
          "Description",
        ).canonicalPath,
      ).toBe("/pt-BR");
    });

    it("builds all home language alternates", () => {
      expect(
        buildStorefrontSeoModel(
          "en",
          "VELORA",
          "Description",
        ).languageAlternates,
      ).toEqual({
        "pt-BR": "/pt-BR",
        en: "/en",
        es: "/es",
        "x-default":
          "/pt-BR",
      });
    });

    it("preserves Product slug in canonical path", () => {
      expect(
        buildStorefrontSeoModel(
          "es",
          "Product",
          "Description",
          "/products/aster-air",
        ).canonicalPath,
      ).toBe(
        "/es/products/aster-air",
      );
    });

    it("preserves Product slug in language alternates", () => {
      expect(
        buildStorefrontSeoModel(
          "pt-BR",
          "Product",
          "Description",
          "/products/aster-air",
        ).languageAlternates.en,
      ).toBe(
        "/en/products/aster-air",
      );
    });

    it("normalizes a category suffix without a leading slash", () => {
      expect(
        buildStorefrontSeoModel(
          "en",
          "Audio",
          "Description",
          "categories/audio",
        ).canonicalPath,
      ).toBe(
        "/en/categories/audio",
      );
    });

    it("keeps supplied title and description", () => {
      const model =
        buildStorefrontSeoModel(
          "en",
          "Title",
          "Description",
        );

      expect(model.title).toBe(
        "Title",
      );

      expect(
        model.description,
      ).toBe(
        "Description",
      );
    });

    it("declares index and follow", () => {
      expect(
        buildStorefrontSeoModel(
          "en",
          "Title",
          "Description",
        ).robots,
      ).toEqual({
        index: true,
        follow: true,
      });
    });

    it("freezes the public SEO records", () => {
      const model =
        buildStorefrontSeoModel(
          "pt-BR",
          "Title",
          "Description",
        );

      expect(
        Object.isFrozen(model),
      ).toBe(true);

      expect(
        Object.isFrozen(
          model.languageAlternates,
        ),
      ).toBe(true);
    });
  },
);