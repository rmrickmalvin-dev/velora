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
  createCartExperience,
  VELORA_DEMO_CART_ID,
} from "./cart-experience";

describe(
  "Cart Experience",
  () => {
    it("starts with an empty Cart snapshot", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      expect(
        await createCartExperience(
          runtime.application,
        ).load(),
      ).toEqual({
        totalItems: 0,
        lineCount: 0,
        subtotalMinorUnits:
          null,
        currency: null,
        lines: [],
      });
    });

    it("adds one Product Variant through Application", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const snapshot =
        await createCartExperience(
          runtime.application,
        ).add(
          "variant-aster-xp-256-graphite",
        );

      expect(
        snapshot.totalItems,
      ).toBe(1);

      expect(
        snapshot.lineCount,
      ).toBe(1);
    });

    it("merges repeated adds of the same Product Variant", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const cart =
        createCartExperience(
          runtime.application,
        );

      await cart.add(
        "variant-aster-xp-256-graphite",
      );

      const snapshot =
        await cart.add(
          "variant-aster-xp-256-graphite",
        );

      expect(
        snapshot.totalItems,
      ).toBe(2);

      expect(
        snapshot.lineCount,
      ).toBe(1);
    });

    it("counts quantities across different Cart lines", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const cart =
        createCartExperience(
          runtime.application,
        );

      await cart.add(
        "variant-aster-xp-256-graphite",
      );

      const snapshot =
        await cart.add(
          "variant-aster-air-128-sky",
        );

      expect(
        snapshot.totalItems,
      ).toBe(2);

      expect(
        snapshot.lineCount,
      ).toBe(2);
    });

    it("enriches Cart lines from Storefront Application data", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const snapshot =
        await createCartExperience(
          runtime.application,
        ).add(
          "variant-aster-xp-256-graphite",
        );

      expect(
        snapshot.lines[0]
          .productName,
      ).toBe(
        "Aster One X Pro",
      );

      expect(
        snapshot.lines[0]
          .sku,
      ).toBe(
        "VEL-ASTER-XP-256-GRA",
      );
    });

    it("derives subtotal from the Application Cart summary", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const snapshot =
        await createCartExperience(
          runtime.application,
        ).add(
          "variant-aster-xp-256-graphite",
        );

      expect(
        snapshot.subtotalMinorUnits,
      ).toBeGreaterThan(0);

      expect(
        snapshot.currency,
      ).toBe("BRL");
    });

    it("updates a Cart line quantity through Application", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const cart =
        createCartExperience(
          runtime.application,
        );

      const added =
        await cart.add(
          "variant-aster-xp-256-graphite",
        );

      const line =
        added.lines[0];

      const updated =
        await cart.update(
          line.cartItemId,
          line.productVariantId,
          3,
        );

      expect(
        updated.totalItems,
      ).toBe(3);

      expect(
        updated.lines[0]
          .quantity,
      ).toBe(3);
    });

    it("removes a Cart line through Application", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const cart =
        createCartExperience(
          runtime.application,
        );

      const added =
        await cart.add(
          "variant-aster-air-128-sky",
        );

      const line =
        added.lines[0];

      const removed =
        await cart.remove(
          line.cartItemId,
          line.productVariantId,
        );

      expect(
        removed.totalItems,
      ).toBe(0);

      expect(
        removed.lines,
      ).toEqual([]);
    });

    it("preserves Cart state across runtime recreation with the same provider", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      await createCartExperience(
        first.application,
      ).add(
        "variant-aster-air-128-sky",
      );

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await createCartExperience(
            second.application,
          ).load()
        ).totalItems,
      ).toBe(1);
    });

    it("preserves updated quantities across runtime recreation", async () => {
      const provider =
        new MemoryPersistenceProvider();

      const first =
        createVeloraRuntime(
          provider,
        );

      const cart =
        createCartExperience(
          first.application,
        );

      const added =
        await cart.add(
          "variant-aster-air-128-sky",
        );

      await cart.update(
        added.lines[0]
          .cartItemId,
        added.lines[0]
          .productVariantId,
        2,
      );

      const second =
        createVeloraRuntime(
          provider,
        );

      expect(
        (
          await createCartExperience(
            second.application,
          ).load()
        ).totalItems,
      ).toBe(2);
    });

    it("does not mutate Inventory when changing Cart quantity", async () => {
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

      const cart =
        createCartExperience(
          runtime.application,
        );

      const added =
        await cart.add(
          "variant-aster-air-128-sky",
        );

      await cart.update(
        added.lines[0]
          .cartItemId,
        added.lines[0]
          .productVariantId,
        2,
      );

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

    it("uses one stable demo Cart id", () => {
      expect(
        VELORA_DEMO_CART_ID,
      ).toBe(
        "velora-demo-cart",
      );
    });
  },
);