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

describe(
  "List Inventory Movements",
  () => {
    it("returns baseline movement history for seeded Inventory", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const inventory =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-xp-256-graphite",
          );

      expect(
        (
          await runtime.application
            .listInventoryMovements(
              inventory!.id,
            )
        ).length,
      ).toBeGreaterThan(0);
    });

    it("keeps history scoped to one Inventory", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const first =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-xp-256-graphite",
          );

      const second =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      const movements =
        await runtime.application
          .listInventoryMovements(
            first!.id,
          );

      expect(
        movements.every(
          (movement) =>
            movement.inventoryId ===
            first!.id,
        ),
      ).toBe(true);

      expect(
        movements.some(
          (movement) =>
            movement.inventoryId ===
            second!.id,
        ),
      ).toBe(false);
    });

    it("includes a newly persisted Admin adjustment", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const inventory =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      await runtime.application
        .adjustInventory({
          inventoryId:
            inventory!.id,
          movementId:
            "movement-admin-pass37-1",
          type: "ENTRY",
          delta: 2,
          reason:
            "PASSO 37 restock",
        });

      expect(
        (
          await runtime.application
            .listInventoryMovements(
              inventory!.id,
            )
        ).some(
          (movement) =>
            movement.id ===
            "movement-admin-pass37-1",
        ),
      ).toBe(true);
    });

    it("preserves append order", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const inventory =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      await runtime.application
        .adjustInventory({
          inventoryId:
            inventory!.id,
          movementId:
            "movement-admin-pass37-2",
          type: "ENTRY",
          delta: 1,
          reason:
            "First PASSO 37 movement",
        });

      await runtime.application
        .adjustInventory({
          inventoryId:
            inventory!.id,
          movementId:
            "movement-admin-pass37-3",
          type: "ADJUSTMENT",
          delta: -1,
          reason:
            "Second PASSO 37 movement",
        });

      const history =
        await runtime.application
          .listInventoryMovements(
            inventory!.id,
          );

      expect(
        history[
          history.length - 2
        ].id,
      ).toBe(
        "movement-admin-pass37-2",
      );

      expect(
        history[
          history.length - 1
        ].id,
      ).toBe(
        "movement-admin-pass37-3",
      );
    });

    it("keeps Domain movement reason available", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const inventory =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      await runtime.application
        .adjustInventory({
          inventoryId:
            inventory!.id,
          movementId:
            "movement-admin-pass37-4",
          type: "ENTRY",
          delta: 1,
          reason:
            "Manual warehouse check",
        });

      const history =
        await runtime.application
          .listInventoryMovements(
            inventory!.id,
          );

      expect(
        history[
          history.length - 1
        ].reason,
      ).toBe(
        "Manual warehouse check",
      );
    });

    it("returns an immutable repository snapshot", async () => {
      const runtime =
        createVeloraRuntime(
          new MemoryPersistenceProvider(),
        );

      const inventory =
        await runtime.repositories
          .inventory
          .findByProductVariantId(
            "variant-aster-air-128-sky",
          );

      expect(
        Object.isFrozen(
          await runtime.application
            .listInventoryMovements(
              inventory!.id,
            ),
        ),
      ).toBe(true);
    });
  },
);