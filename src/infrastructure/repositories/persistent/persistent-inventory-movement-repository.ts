import type {
  InventoryMovement,
} from "../../../domain/entities/inventory-movement";
import type {
  InventoryMovementRepository,
} from "../../../domain/repositories/inventory-movement-repository";
import type {
  InventoryId,
} from "../../../domain/types/identifiers";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  PersistenceError,
} from "../../persistence/persistence-error";
import {
  hydrateInventoryMovement,
} from "./domain-hydrators";

export class PersistentInventoryMovementRepository
  implements InventoryMovementRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
    private readonly baseline:
      readonly InventoryMovement[] =
        [],
  ) {}

  async listByInventoryId(
    inventoryId: InventoryId,
  ): Promise<
    readonly InventoryMovement[]
  > {
    const persisted =
      (
        await this.provider.getAll<
          InventoryMovement
        >(
          "inventoryMovements",
        )
      ).map(
        hydrateInventoryMovement,
      );

    return Object.freeze([
      ...this.baseline
        .filter(
          (item) =>
            item.inventoryId ===
            inventoryId,
        )
        .map(
          hydrateInventoryMovement,
        ),
      ...persisted.filter(
        (item) =>
          item.inventoryId ===
          inventoryId,
      ),
    ]);
  }

  async append(
    movement: InventoryMovement,
  ): Promise<void> {
    const baselineDuplicate =
      this.baseline.some(
        (item) =>
          item.id ===
          movement.id,
      );

    if (baselineDuplicate) {
      throw new PersistenceError(
        "PERSISTENCE_DUPLICATE_ID",
        `InventoryMovement already exists: ${movement.id}`,
      );
    }

    await this.provider.add(
      "inventoryMovements",
      movement,
    );
  }
}