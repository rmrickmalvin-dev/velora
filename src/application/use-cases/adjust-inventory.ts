import {
  createInventoryMovement,
  type InventoryMovement,
} from "../../domain/entities/inventory-movement";
import type {
  Inventory,
} from "../../domain/entities/inventory";
import type {
  InventoryMovementRepository,
} from "../../domain/repositories/inventory-movement-repository";
import type {
  InventoryRepository,
} from "../../domain/repositories/inventory-repository";
import {
  applyInventoryMovement,
} from "../../domain/services/inventory-service";
import type {
  InventoryId,
  InventoryMovementId,
} from "../../domain/types/identifiers";
import type {
  InventoryMovementType,
} from "../../domain/types/statuses";
import {
  ApplicationError,
} from "../errors/application-error";

export type AdjustInventoryDependencies =
  Readonly<{
    inventory:
      InventoryRepository;
    inventoryMovements:
      InventoryMovementRepository;
  }>;

export type AdjustInventoryInput =
  Readonly<{
    inventoryId: InventoryId;
    movementId:
      InventoryMovementId;
    type:
      InventoryMovementType;
    delta: number;
    reason: string;
  }>;

export type AdjustInventoryResult =
  Readonly<{
    inventory: Inventory;
    movement:
      InventoryMovement;
  }>;

export async function adjustInventory(
  dependencies:
    AdjustInventoryDependencies,
  input:
    AdjustInventoryInput,
): Promise<
  AdjustInventoryResult
> {
  const current =
    await dependencies
      .inventory
      .findById(
        input.inventoryId,
      );

  if (!current) {
    throw new ApplicationError(
      "APPLICATION_INVENTORY_NOT_FOUND",
      "Inventory was not found.",
    );
  }

  const movement =
    createInventoryMovement({
      id: input.movementId,
      inventoryId:
        current.id,
      type: input.type,
      delta: input.delta,
      reason: input.reason,
    });

  const next =
    applyInventoryMovement(
      current,
      movement,
    );

  await dependencies
    .inventory
    .save(next);

  await dependencies
    .inventoryMovements
    .append(movement);

  return Object.freeze({
    inventory: next,
    movement,
  });
}