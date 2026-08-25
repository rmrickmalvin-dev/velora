import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createProduct,
} from "../../domain/entities/product";
import {
  createSlug,
} from "../../domain/value-objects/slug";
import {
  createLocalRepositories,
} from "../../infrastructure/repositories/local";
import {
  getStorefrontProductBySlug,
  listStorefrontProducts,
} from "./storefront-query";

describe(
  "Storefront Application Queries",
  () => {
    it("lists all active seeded products", async () => {
      const repositories =
        createLocalRepositories();

      const result =
        await listStorefrontProducts(
          repositories,
        );

      expect(result).toHaveLength(
        8,
      );
    });

    it("orders featured products before non-featured products", async () => {
      const repositories =
        createLocalRepositories();

      const result =
        await listStorefrontProducts(
          repositories,
        );

      const featuredFlags =
        result.map(
          (entry) =>
            entry.product
              .featured,
        );

      const firstFalse =
        featuredFlags.indexOf(
          false,
        );

      const lastTrue =
        featuredFlags
          .lastIndexOf(true);

      expect(
        lastTrue,
      ).toBeLessThan(
        firstFalse,
      );
    });

    it("aggregates active variants, media and inventory", async () => {
      const repositories =
        createLocalRepositories();

      const result =
        await getStorefrontProductBySlug(
          repositories,
          createSlug(
            "aster-one-x-pro",
          ),
        );

      expect(result).not.toBeNull();

      expect(
        result?.variants,
      ).toHaveLength(3);

      expect(
        result?.media,
      ).toHaveLength(2);

      for (
        const entry
        of result?.variants ??
          []
      ) {
        expect(
          entry.inventory,
        ).not.toBeNull();
      }
    });

    it("returns null for a missing slug", async () => {
      const repositories =
        createLocalRepositories();

      expect(
        await getStorefrontProductBySlug(
          repositories,
          createSlug(
            "missing-product",
          ),
        ),
      ).toBeNull();
    });

    it("hides inactive products from Storefront queries", async () => {
      const repositories =
        createLocalRepositories();

      await repositories
        .products
        .save(
          createProduct({
            id:
              "product-aster-air",
            slug:
              "aster-air",
            name:
              "Aster Air",
            brand: "Aster",
            model: "Air",
            categoryId:
              "category-smartphones",
            status:
              "INACTIVE",
          }),
        );

      const list =
        await listStorefrontProducts(
          repositories,
        );

      expect(
        list.some(
          (entry) =>
            entry.product.id ===
            "product-aster-air",
        ),
      ).toBe(false);

      expect(
        await getStorefrontProductBySlug(
          repositories,
          createSlug(
            "aster-air",
          ),
        ),
      ).toBeNull();
    });

    it("returns frozen Storefront result collections", async () => {
      const repositories =
        createLocalRepositories();

      const list =
        await listStorefrontProducts(
          repositories,
        );

      expect(
        Object.isFrozen(list),
      ).toBe(true);

      expect(
        Object.isFrozen(
          list[0],
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          list[0].variants,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          list[0].media,
        ),
      ).toBe(true);
    });
  },
);