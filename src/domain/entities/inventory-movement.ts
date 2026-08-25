import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  InventoryId,
  InventoryMovementId,
} from "../types/identifiers";
import {
  inventoryMovementTypes,
  type InventoryMovementType,
} from "../types/statuses";

export type InventoryMovement =
  Readonly<{
    id: InventoryMovementId;
    inventoryId: InventoryId;
    type: InventoryMovementType;
    delta: number;
    reason: string;
  }>;

export type CreateInventoryMovementInput =
  {
    id: string;
    inventoryId: string;
    type: InventoryMovementType;
    delta: number;
    reason: string;
  };

function requireText(
  value: string,
  code: string,
  field: string,
) {
  const normalized = value.trim();

  if (!normalized) {
    throw new DomainValidationError(
      code,
      `${field} cannot be empty.`,
    );
  }

  return normalized;
}

function isInventoryMovementType(
  value: string,
): value is InventoryMovementType {
  return inventoryMovementTypes.includes(
    value as InventoryMovementType,
  );
}

export function createInventoryMovement(
  input: CreateInventoryMovementInput,
): InventoryMovement {
  const id = requireText(
    input.id,
    "INVENTORY_MOVEMENT_ID_REQUIRED",
    "InventoryMovement id",
  ) as InventoryMovementId;

  const inventoryId = requireText(
    input.inventoryId,
    "INVENTORY_MOVEMENT_INVENTORY_ID_REQUIRED",
    "InventoryMovement inventoryId",
  ) as InventoryId;

  const reason = requireText(
    input.reason,
    "INVENTORY_MOVEMENT_REASON_REQUIRED",
    "InventoryMovement reason",
  );

  if (
    !isInventoryMovementType(
      input.type,
    )
  ) {
    throw new DomainValidationError(
      "INVENTORY_MOVEMENT_TYPE_INVALID",
      `Invalid InventoryMovement type: ${input.type}`,
    );
  }

  if (
    !Number.isSafeInteger(
      input.delta,
    ) ||
    input.delta === 0
  ) {
    throw new DomainValidationError(
      "INVENTORY_MOVEMENT_DELTA_INVALID",
      "InventoryMovement delta must be a non-zero safe integer.",
    );
  }

  if (
    input.type === "ENTRY" &&
    input.delta <= 0
  ) {
    throw new DomainValidationError(
      "INVENTORY_MOVEMENT_ENTRY_DELTA_INVALID",
      "ENTRY delta must be greater than zero.",
    );
  }

  if (
    input.type === "EXIT" &&
    input.delta >= 0
  ) {
    throw new DomainValidationError(
      "INVENTORY_MOVEMENT_EXIT_DELTA_INVALID",
      "EXIT delta must be less than zero.",
    );
  }

  return Object.freeze({
    id,
    inventoryId,
    type: input.type,
    delta: input.delta,
    reason,
  });
}