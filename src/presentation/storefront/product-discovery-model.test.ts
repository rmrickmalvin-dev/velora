import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  StorefrontProductCard,
} from "./storefront-home-model";
import {
  filterStorefrontProducts,
  normalizeDiscoveryText,
} from "./product-discovery-model";

const products:
  readonly StorefrontProductCard[] =
    Object.freeze([
      Object.freeze({
        id: "1",
        slug: "aster-air",
        brand: "Aster",
        name: "Aster Air",
        categoryKey:
          "smartphone",
        categoryLabel:
          "Smartphones",
        priceLabel:
          "R$ 1.00",
        stockLabel:
          "Em estoque",
        featured: true,
      }),
      Object.freeze({
        id: "2",
        slug: "halo-buds-pro",
        brand: "Halo",
        name: "Halo Buds Pro",
        categoryKey:
          "audio",
        categoryLabel:
          "Audio",
        priceLabel:
          "R$ 2.00",
        stockLabel:
          "Em estoque",
        featured: true,
      }),
      Object.freeze({
        id: "3",
        slug: "flux-gan-65w",
        brand: "Flux",
        name: "Flux GaN 65W",
        categoryKey:
          "power",
        categoryLabel:
          "Energia",
        priceLabel:
          "R$ 3.00",
        stockLabel:
          "Em estoque",
        featured: false,
      }),
    ]);

describe(
  "Product Discovery Model",
  () => {
    it("returns all products for empty search and all categories", () => {
      expect(
        filterStorefrontProducts(
          products,
          "",
          "all",
        ),
      ).toHaveLength(3);
    });

    it("filters by Product name case-insensitively", () => {
      expect(
        filterStorefrontProducts(
          products,
          "BUDS",
          "all",
        ).map(
          (item) =>
            item.id,
        ),
      ).toEqual(["2"]);
    });

    it("filters by brand", () => {
      expect(
        filterStorefrontProducts(
          products,
          "flux",
          "all",
        ).map(
          (item) =>
            item.id,
        ),
      ).toEqual(["3"]);
    });

    it("filters by category", () => {
      expect(
        filterStorefrontProducts(
          products,
          "",
          "audio",
        ).map(
          (item) =>
            item.id,
        ),
      ).toEqual(["2"]);
    });

    it("combines query and category", () => {
      expect(
        filterStorefrontProducts(
          products,
          "aster",
          "audio",
        ),
      ).toEqual([]);
    });

    it("returns empty result when nothing matches", () => {
      expect(
        filterStorefrontProducts(
          products,
          "missing",
          "all",
        ),
      ).toEqual([]);
    });

    it("normalizes accents and whitespace", () => {
      expect(
        normalizeDiscoveryText(
          "  Tecnologia  ",
        ),
      ).toBe(
        "tecnologia",
      );
    });

    it("returns a frozen result collection", () => {
      expect(
        Object.isFrozen(
          filterStorefrontProducts(
            products,
            "",
            "all",
          ),
        ),
      ).toBe(true);
    });
  },
);