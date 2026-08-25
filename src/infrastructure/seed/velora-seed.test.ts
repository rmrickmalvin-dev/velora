import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createVeloraSeed,
  veloraSeed,
} from "./velora-seed";

function isUnique(
  values: readonly string[],
) {
  return (
    new Set(values).size ===
    values.length
  );
}

describe("VELORA Seed", () => {
  it("creates the expected baseline size", () => {
    expect(
      veloraSeed.categories,
    ).toHaveLength(4);

    expect(
      veloraSeed.products,
    ).toHaveLength(8);

    expect(
      veloraSeed.variants,
    ).toHaveLength(15);

    expect(
      veloraSeed.media,
    ).toHaveLength(16);

    expect(
      veloraSeed.inventory,
    ).toHaveLength(15);

    expect(
      veloraSeed.inventoryMovements,
    ).toHaveLength(15);
  });

  it("contains only the expected baseline collections", () => {
    expect(
      Object.keys(
        veloraSeed,
      ).sort(),
    ).toEqual([
      "categories",
      "inventory",
      "inventoryMovements",
      "media",
      "products",
      "variants",
    ]);
  });

  it("freezes the seed container and collections", () => {
    expect(
      Object.isFrozen(
        veloraSeed,
      ),
    ).toBe(true);

    for (
      const collection
      of Object.values(
        veloraSeed,
      )
    ) {
      expect(
        Object.isFrozen(
          collection,
        ),
      ).toBe(true);
    }
  });

  it("contains frozen Domain entities", () => {
    for (
      const collection
      of Object.values(
        veloraSeed,
      )
    ) {
      for (
        const entity
        of collection
      ) {
        expect(
          Object.isFrozen(
            entity,
          ),
        ).toBe(true);
      }
    }
  });

  it("keeps category ids and slugs unique", () => {
    expect(
      isUnique(
        veloraSeed.categories.map(
          (category) =>
            category.id,
        ),
      ),
    ).toBe(true);

    expect(
      isUnique(
        veloraSeed.categories.map(
          (category) =>
            category.slug,
        ),
      ),
    ).toBe(true);
  });

  it("keeps product ids and slugs unique with valid categories", () => {
    const categoryIds =
      new Set(
        veloraSeed.categories.map(
          (category) =>
            category.id,
        ),
      );

    expect(
      isUnique(
        veloraSeed.products.map(
          (product) =>
            product.id,
        ),
      ),
    ).toBe(true);

    expect(
      isUnique(
        veloraSeed.products.map(
          (product) =>
            product.slug,
        ),
      ),
    ).toBe(true);

    for (
      const product
      of veloraSeed.products
    ) {
      expect(
        categoryIds.has(
          product.categoryId,
        ),
      ).toBe(true);
    }
  });

  it("keeps every category represented and exposes featured products", () => {
    for (
      const category
      of veloraSeed.categories
    ) {
      expect(
        veloraSeed.products.some(
          (product) =>
            product.categoryId ===
            category.id,
        ),
      ).toBe(true);
    }

    expect(
      veloraSeed.products.filter(
        (product) =>
          product.featured,
      ).length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("keeps variant ids and SKUs unique with valid product references", () => {
    const productIds =
      new Set(
        veloraSeed.products.map(
          (product) =>
            product.id,
        ),
      );

    expect(
      isUnique(
        veloraSeed.variants.map(
          (variant) =>
            variant.id,
        ),
      ),
    ).toBe(true);

    expect(
      isUnique(
        veloraSeed.variants.map(
          (variant) =>
            variant.sku,
        ),
      ),
    ).toBe(true);

    for (
      const variant
      of veloraSeed.variants
    ) {
      expect(
        productIds.has(
          variant.productId,
        ),
      ).toBe(true);
    }

    for (
      const product
      of veloraSeed.products
    ) {
      expect(
        veloraSeed.variants.some(
          (variant) =>
            variant.productId ===
            product.id,
        ),
      ).toBe(true);
    }
  });

  it("keeps media references coherent", () => {
    const mediaIds =
      veloraSeed.media.map(
        (media) =>
          media.id,
      );

    expect(
      isUnique(mediaIds),
    ).toBe(true);

    for (
      const media
      of veloraSeed.media
    ) {
      const product =
        veloraSeed.products.find(
          (candidate) =>
            candidate.id ===
            media.productId,
        );

      expect(
        product,
      ).toBeDefined();

      if (
        media.variantId
      ) {
        const variant =
          veloraSeed.variants.find(
            (candidate) =>
              candidate.id ===
              media.variantId,
          );

        expect(
          variant,
        ).toBeDefined();

        expect(
          variant?.productId,
        ).toBe(
          media.productId,
        );
      }
    }
  });

  it("creates exactly one inventory record per variant", () => {
    expect(
      isUnique(
        veloraSeed.inventory.map(
          (stock) =>
            stock.id,
        ),
      ),
    ).toBe(true);

    for (
      const variant
      of veloraSeed.variants
    ) {
      const matches =
        veloraSeed.inventory.filter(
          (stock) =>
            stock.productVariantId ===
            variant.id,
        );

      expect(
        matches,
      ).toHaveLength(1);

      expect(
        matches[0]
          .quantityOnHand,
      ).toBeGreaterThan(0);
    }
  });

  it("creates one initial ENTRY movement matching each inventory quantity", () => {
    for (
      const stock
      of veloraSeed.inventory
    ) {
      const movements =
        veloraSeed.inventoryMovements.filter(
          (movement) =>
            movement.inventoryId ===
            stock.id,
        );

      expect(
        movements,
      ).toHaveLength(1);

      expect(
        movements[0].type,
      ).toBe("ENTRY");

      expect(
        movements[0].delta,
      ).toBe(
        stock.quantityOnHand,
      );

      expect(
        movements[0].reason,
      ).toBe(
        "Initial seed stock",
      );
    }
  });

  it("recreates the same deterministic baseline", () => {
    const first =
      createVeloraSeed();

    const second =
      createVeloraSeed();

    expect(first).toEqual(
      second,
    );

    expect(first).not.toBe(
      second,
    );

    expect(
      first.products,
    ).not.toBe(
      second.products,
    );
  });
});