import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  StorefrontProductCard,
} from "./storefront-home-model";
import {
  buildStorefrontSearchExperience,
  getStorefrontSearchCategories,
  normalizeStorefrontSearchText,
  tokenizeStorefrontSearch,
} from "./storefront-search-intelligence";

function card(
  input:
    Partial<
      StorefrontProductCard
    > &
    Pick<
      StorefrontProductCard,
      "id" |
      "slug" |
      "brand" |
      "name" |
      "categoryKey" |
      "categoryLabel"
    >,
): StorefrontProductCard {
  return Object.freeze({
    visual: Object.freeze({
      canonicalMediaUrl: null,
      canonicalAlt: null,
      fallbackAsset:
        "/images/products/search-fixture.svg",
    }),
    priceLabel:
      "R$ 1.000,00",
    stockLabel:
      "Em estoque",
    stockUnits: 10,
    featured: false,
    ...input,
  });
}

const products:
  readonly StorefrontProductCard[] =
    Object.freeze([
      card({
        id: "1",
        slug:
          "aster-air",
        brand:
          "Aster",
        name:
          "Aster Air",
        categoryKey:
          "smartphone",
        categoryLabel:
          "Smartphones",
        featured: true,
      }),
      card({
        id: "2",
        slug:
          "aster-buds-pro",
        brand:
          "Aster",
        name:
          "Aster Buds Pro",
        categoryKey:
          "audio",
        categoryLabel:
          "\u00c1udio",
      }),
      card({
        id: "3",
        slug:
          "flux-gan-65w",
        brand:
          "Flux",
        name:
          "Flux GaN 65W",
        categoryKey:
          "power",
        categoryLabel:
          "Energia",
        stockUnits: 0,
      }),
      card({
        id: "4",
        slug:
          "halo-clear-case",
        brand:
          "Halo",
        name:
          "Halo Clear Case",
        categoryKey:
          "protection",
        categoryLabel:
          "Prote\u00e7\u00e3o",
      }),
    ]);

describe(
  "Storefront Search Intelligence",
  () => {
    it("normalizes accents, punctuation and case", () => {
      expect(
        normalizeStorefrontSearchText(
          "  \u00c1UDIO / Pro  ",
        ),
      ).toBe(
        "audio pro",
      );
    });

    it("tokenizes normalized multi-term queries", () => {
      expect(
        tokenizeStorefrontSearch(
          "Aster   Pro",
        ),
      ).toEqual([
        "aster",
        "pro",
      ]);
    });

    it("preserves catalog order for an empty query", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "",
          "all",
        ).results.map(
          (entry) =>
            entry.id,
        ),
      ).toEqual([
        "1",
        "2",
        "3",
        "4",
      ]);
    });

    it("filters by category without a query", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "",
          "audio",
        ).results.map(
          (entry) =>
            entry.id,
        ),
      ).toEqual([
        "2",
      ]);
    });

    it("requires every search term to match", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "aster pro",
          "all",
        ).results.map(
          (entry) =>
            entry.id,
        ),
      ).toEqual([
        "2",
      ]);
    });

    it("searches by Brand", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "flux",
          "all",
        ).results[0].id,
      ).toBe("3");
    });

    it("searches localized Category labels accent-insensitively", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "audio",
          "all",
        ).results[0].id,
      ).toBe("2");
    });

    it("searches by stable Product slug", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "halo-clear",
          "all",
        ).results[0].id,
      ).toBe("4");
    });

    it("ranks an exact Product name above a broader Brand match", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "aster air",
          "all",
        ).results[0].id,
      ).toBe("1");
    });

    it("keeps source order as deterministic tie-breaker", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "aster",
          "all",
        ).results.map(
          (entry) =>
            entry.id,
        ),
      ).toEqual([
        "1",
        "2",
      ]);
    });

    it("counts query matches before the active Category filter", () => {
      const experience =
        buildStorefrontSearchExperience(
          products,
          "aster",
          "audio",
        );

      expect(
        experience.categoryCounts
          .all,
      ).toBe(2);

      expect(
        experience.categoryCounts
          .smartphone,
      ).toBe(1);

      expect(
        experience.categoryCounts
          .audio,
      ).toBe(1);
    });

    it("limits Suggestions to five unique entries", () => {
      expect(
        buildStorefrontSearchExperience(
          products,
          "a",
          "all",
        ).suggestions,
      ).toEqual([]);

      expect(
        buildStorefrontSearchExperience(
          products,
          "as",
          "all",
        ).suggestions.length,
      ).toBeLessThanOrEqual(
        5,
      );
    });

    it("returns frozen search collections", () => {
      const experience =
        buildStorefrontSearchExperience(
          products,
          "aster",
          "all",
        );

      expect(
        Object.isFrozen(
          experience.results,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          experience.suggestions,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          experience.categoryCounts,
        ),
      ).toBe(true);
    });

    it("exposes the four supported search Categories", () => {
      expect(
        getStorefrontSearchCategories(),
      ).toEqual([
        "smartphone",
        "audio",
        "power",
        "protection",
      ]);
    });
  },
);
