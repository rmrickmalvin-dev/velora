import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  MemoryPersistenceProvider,
} from "../../infrastructure/persistence/memory-persistence-provider";
import {
  completeDemoOrder,
  createDemoOrderReference,
} from "./browser-checkout-runtime";

describe(
  "Browser Checkout Runtime",
  () => {
    it("creates a deterministic demo Order reference from supplied inputs", () => {
      expect(
        createDemoOrderReference(
          123,
          "abc-123",
        ),
      ).toBe(
        "demo-order-123-abc123",
      );
    });

    it("uses a local fallback suffix when entropy is empty", () => {
      expect(
        createDemoOrderReference(
          123,
          "",
        ),
      ).toBe(
        "demo-order-123-local",
      );
    });

    it("completes a demo Order through the Application facade", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      const confirmation =
        await completeDemoOrder(
          runtime.application,
          "demo-order-runtime-1",
        );

      expect(
        confirmation.orderId,
      ).toBe(
        "demo-order-runtime-1",
      );

      expect(
        confirmation.status,
      ).toBe("PENDING");
    });

    it("returns quantity-based confirmation totals", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 2,
        });

      const confirmation =
        await completeDemoOrder(
          runtime.application,
          "demo-order-runtime-2",
        );

      expect(
        confirmation.totalItems,
      ).toBe(2);

      expect(
        confirmation.lineCount,
      ).toBe(1);
    });

    it("persists the Order through the same runtime provider", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await completeDemoOrder(
        runtime.application,
        "demo-order-runtime-3",
      );

      expect(
        await runtime.repositories
          .orders
          .findById(
            "demo-order-runtime-3",
          ),
      ).not.toBeNull();
    });

    it("leaves no Cart after successful completion", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      await runtime.application
        .addProductToCart({
          cartId:
            "velora-demo-cart",
          cartItemId:
            "cart-item-variant-aster-air-128-sky",
          productVariantId:
            "variant-aster-air-128-sky",
          quantity: 1,
        });

      await completeDemoOrder(
        runtime.application,
        "demo-order-runtime-4",
      );

      expect(
        await runtime.application
          .getCartSummary(
            "velora-demo-cart",
          ),
      ).toBeNull();
    });
  },
);