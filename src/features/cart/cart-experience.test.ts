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

      const cart =
        createCartExperience(
          runtime.application,
        );

      expect(
        await cart.load(),
      ).toEqual({
        totalItems: 0,
        lineCount: 0,
        subtotalMinorUnits:
          null,
        currency: null,
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

    it("does not mutate Inventory when adding to Cart", async () => {
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

      await createCartExperience(
        runtime.application,
      ).add(
        "variant-aster-air-128-sky",
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