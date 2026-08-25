import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  InventoryId,
  ProductVariantId,
} from "../types/identifiers";

export type Inventory = Readonly<{
  id: InventoryId;
  productVariantId: ProductVariantId;
  quantityOnHand: number;
}>;

export type CreateInventoryInput = {
  id: string;
  productVariantId: string;
  quantityOnHand: number;
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

function assertQuantityOnHand(
  quantityOnHand: number,
) {
  if (
    !Number.isSafeInteger(quantityOnHand) ||
    quantityOnHand < 0
  ) {
    throw new DomainValidationError(
      "INVENTORY_QUANTITY_INVALID",
      "Inventory quantityOnHand must be a non-negative safe integer.",
    );
  }
}

export function createInventory(
  input: CreateInventoryInput,
): Inventory {
  const id = requireText(
    input.id,
    "INVENTORY_ID_REQUIRED",
    "Inventory id",
  ) as InventoryId;

  const productVariantId = requireText(
    input.productVariantId,
    "INVENTORY_PRODUCT_VARIANT_ID_REQUIRED",
    "Inventory productVariantId",
  ) as ProductVariantId;

  assertQuantityOnHand(
    input.quantityOnHand,
  );

  return Object.freeze({
    id,
    productVariantId,
    quantityOnHand:
      input.quantityOnHand,
  });
}