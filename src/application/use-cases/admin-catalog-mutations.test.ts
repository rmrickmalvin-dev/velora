import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createSlug,
} from "../../domain/value-objects/slug";
import {
  createVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  MemoryPersistenceProvider,
} from "../../infrastructure/persistence/memory-persistence-provider";

describe(
  "Admin Catalog Mutations",
  () => {
    it("updates Product commercial identity through Application", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const updated =
        await runtime.application
          .updateAdminProduct({
            productId:
              "product-aster-air",
            name:
              "Aster Air Studio",
            brand:
              "Aster Labs",
            model:
              "Air Studio",
            featured: false,
          });

      expect(
        updated.name,
      ).toBe(
        "Aster Air Studio",
      );

      expect(
        updated.brand,
      ).toBe(
        "Aster Labs",
      );

      expect(
        updated.model,
      ).toBe(
        "Air Studio",
      );
    });

    it("preserves Product slug, category and status", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const before =
        await runtime.repositories
          .products.findById(
            "product-aster-air",
          );

      const updated =
        await runtime.application
          .updateAdminProduct({
            productId:
              "product-aster-air",
            name:
              "Aster Air Studio",
            brand:
              "Aster",
            model:
              "Air Studio",
            featured: true,
          });

      expect(
        updated.slug,
      ).toBe(
        before?.slug,
      );

      expect(
        updated.categoryId,
      ).toBe(
        before?.categoryId,
      );

      expect(
        updated.status,
      ).toBe(
        before?.status,
      );
    });

    it("persists Product override across runtime recreation", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      await first.application
        .updateAdminProduct({
          productId:
            "product-aster-air",
          name:
            "Aster Air Persisted",
          brand:
            "Aster",
          model:
            "Air",
          featured: true,
        });

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await second.application
            .getStorefrontProductBySlug(
              createSlug(
                "aster-air",
              ),
            )
        )?.product.name,
      ).toBe(
        "Aster Air Persisted",
      );
    });

    it("rejects an unknown Product", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await expect(
        runtime.application
          .updateAdminProduct({
            productId:
              "product-missing",
            name:
              "Missing",
            brand:
              "VELORA",
            model:
              "Missing",
            featured: false,
          }),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_PRODUCT_NOT_FOUND",
      });
    });

    it("updates Variant price in minor units", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const updated =
        await runtime.application
          .updateAdminVariantPrice({
            productVariantId:
              "variant-aster-air-128-sky",
            priceMinorUnits:
              279900,
          });

      expect(
        updated.price
          .minorUnits,
      ).toBe(279900);
    });

    it("preserves Variant currency, SKU and attributes", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const before =
        await runtime.repositories
          .productVariants
          .findById(
            "variant-aster-air-128-sky",
          );

      const updated =
        await runtime.application
          .updateAdminVariantPrice({
            productVariantId:
              "variant-aster-air-128-sky",
            priceMinorUnits:
              289900,
          });

      expect(
        updated.price.currency,
      ).toBe(
        before?.price.currency,
      );

      expect(
        updated.sku,
      ).toBe(
        before?.sku,
      );

      expect(
        updated.attributes,
      ).toEqual(
        before?.attributes,
      );
    });

    it("persists Variant price override across runtime recreation", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      await first.application
        .updateAdminVariantPrice({
          productVariantId:
            "variant-aster-air-128-sky",
          priceMinorUnits:
            269900,
        });

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await second.repositories
            .productVariants
            .findById(
              "variant-aster-air-128-sky",
            )
        )?.price.minorUnits,
      ).toBe(269900);
    });

    it("rejects an unknown Product Variant", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await expect(
        runtime.application
          .updateAdminVariantPrice({
            productVariantId:
              "variant-missing",
            priceMinorUnits:
              10000,
          }),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_PRODUCT_VARIANT_NOT_FOUND",
      });
    });

    it("keeps Inventory unchanged after price mutation", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const before =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      await runtime.application
        .updateAdminVariantPrice({
          productVariantId:
            "variant-aster-air-128-sky",
          priceMinorUnits:
            259900,
        });

      const after =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      expect(
        after?.quantityOnHand,
      ).toBe(
        before?.quantityOnHand,
      );
    });

    it("restores seed Product and price after resetDemo", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const runtime =
        createVeloraRuntime(
          provider,
        );

      const baseline =
        await runtime.application
          .getStorefrontProductBySlug(
            createSlug(
              "aster-air",
            ),
          );

      const baselinePrice =
        baseline?.variants.find(
          (entry) =>
            entry.variant.id ===
            "variant-aster-air-128-sky",
        )?.variant.price
          .minorUnits;

      await runtime.application
        .updateAdminProduct({
          productId:
            "product-aster-air",
          name:
            "Temporary Name",
          brand:
            "Temporary",
          model:
            "Temporary",
          featured: false,
        });

      await runtime.application
        .updateAdminVariantPrice({
          productVariantId:
            "variant-aster-air-128-sky",
          priceMinorUnits:
            123400,
        });

      await runtime.resetDemo();

      const restored =
        await createVeloraRuntime(
          provider,
        ).application
          .getStorefrontProductBySlug(
            createSlug(
              "aster-air",
            ),
          );

      expect(
        restored?.product.name,
      ).toBe(
        baseline?.product.name,
      );

      expect(
        restored?.variants.find(
          (entry) =>
            entry.variant.id ===
            "variant-aster-air-128-sky",
        )?.variant.price
          .minorUnits,
      ).toBe(
        baselinePrice,
      );
    });
  },
);