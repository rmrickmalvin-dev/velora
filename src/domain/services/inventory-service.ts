import { DomainValidationError } from "../errors/domain-validation-error";
import {
  createInventory,
  type Inventory,
} from "../entities/inventory";
import type {
  InventoryMovement,
} from "../entities/inventory-movement";

export function applyInventoryMovement(
  inventory: Inventory,
  movement: InventoryMovement,
): Inventory {
  if (
    movement.inventoryId !==
    inventory.id
  ) {
    throw new DomainValidationError(
      "INVENTORY_MOVEMENT_INVENTORY_MISMATCH",
      "InventoryMovement does not belong to the provided Inventory.",
    );
  }

  const nextQuantity =
    inventory.quantityOnHand +
    movement.delta;

  if (
    !Number.isSafeInteger(
      nextQuantity,
    )
  ) {
    throw new DomainValidationError(
      "INVENTORY_RESULT_UNSAFE",
      "Inventory movement would produce an unsafe integer quantity.",
    );
  }

  if (
    nextQuantity < 0
  ) {
    throw new DomainValidationError(
      "INVENTORY_RESULT_NEGATIVE",
      "Inventory movement cannot produce negative stock.",
    );
  }

  return createInventory({
    id: inventory.id,
    productVariantId:
      inventory.productVariantId,
    quantityOnHand:
      nextQuantity,
  });
}