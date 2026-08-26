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
  buildStorefrontProductVisual,
  getStorefrontFallbackAsset,
} from "./storefront-product-media";

async function product() {
  const result =
    await createStaticVeloraRuntime()
      .application
      .getStorefrontProductBySlug(
        createSlug(
          "aster-one-x-pro",
        ),
      );

  if (!result) {
    throw new Error(
      "Expected seeded Product.",
    );
  }

  return result;
}

describe(
  "Storefront Product Media",
  () => {
    it("keeps the canonical ProductMedia reference from Application data", async () => {
      const visual =
        buildStorefrontProductVisual(
          await product(),
          "smartphone",
        );

      expect(
        visual.canonicalMediaUrl,
      ).toContain(
        "/images/catalog/",
      );
    });

    it("keeps canonical ProductMedia alt metadata", async () => {
      const visual =
        buildStorefrontProductVisual(
          await product(),
          "smartphone",
        );

      expect(
        visual.canonicalAlt,
      ).not.toBeNull();
    });

    it("selects the category-specific local fallback asset", async () => {
      const visual =
        buildStorefrontProductVisual(
          await product(),
          "smartphone",
        );

      expect(
        visual.fallbackAsset,
      ).toBe(
        "/images/velora/smartphone.svg",
      );
    });

    it("maps every visual category to a local SVG fallback", () => {
      expect([
        getStorefrontFallbackAsset(
          "smartphone",
        ),
        getStorefrontFallbackAsset(
          "audio",
        ),
        getStorefrontFallbackAsset(
          "power",
        ),
        getStorefrontFallbackAsset(
          "protection",
        ),
      ]).toEqual([
        "/images/velora/smartphone.svg",
        "/images/velora/audio.svg",
        "/images/velora/power.svg",
        "/images/velora/protection.svg",
      ]);
    });

    it("returns frozen media descriptors", async () => {
      expect(
        Object.isFrozen(
          buildStorefrontProductVisual(
            await product(),
            "smartphone",
          ),
        ),
      ).toBe(true);
    });

    it("does not rewrite the seeded canonical media path into the fallback path", async () => {
      const visual =
        buildStorefrontProductVisual(
          await product(),
          "smartphone",
        );

      expect(
        visual.canonicalMediaUrl,
      ).not.toBe(
        visual.fallbackAsset,
      );
    });
  },
);