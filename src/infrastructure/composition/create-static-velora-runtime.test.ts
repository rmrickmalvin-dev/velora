import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createStaticVeloraRuntime,
} from "./create-static-velora-runtime";

describe(
  "Static VELORA Runtime",
  () => {
    it("serves the complete seed Storefront without browser APIs", async () => {
      const runtime =
        createStaticVeloraRuntime();

      expect(
        await runtime.application
          .listStorefrontProducts(),
      ).toHaveLength(8);
    });

    it("creates isolated SSG runtime state", async () => {
      const first =
        createStaticVeloraRuntime();

      const second =
        createStaticVeloraRuntime();

      await first.application
        .addProductToCart({
          cartId:
            "static-cart",
          cartItemId:
            "static-cart-item",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      expect(
        await second.application
          .getCartSummary(
            "static-cart",
          ),
      ).toBeNull();
    });
  },
);