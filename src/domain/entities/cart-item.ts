import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  CartItemId,
  ProductVariantId,
} from "../types/identifiers";
import {
  isNegativeMoney,
  type Money,
} from "../value-objects/money";

export type CartItem = Readonly<{
  id: CartItemId;
  productVariantId: ProductVariantId;
  unitPrice: Money;
  quantity: number;
}>;

export type CreateCartItemInput = {
  id: string;
  productVariantId: string;
  unitPrice: Money;
  quantity: number;
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

function assertQuantity(
  quantity: number,
) {
  if (
    !Number.isSafeInteger(quantity) ||
    quantity <= 0
  ) {
    throw new DomainValidationError(
      "CART_ITEM_QUANTITY_INVALID",
      "CartItem quantity must be a positive safe integer.",
    );
  }
}

export function createCartItem(
  input: CreateCartItemInput,
): CartItem {
  const id = requireText(
    input.id,
    "CART_ITEM_ID_REQUIRED",
    "CartItem id",
  ) as CartItemId;

  const productVariantId = requireText(
    input.productVariantId,
    "CART_ITEM_PRODUCT_VARIANT_ID_REQUIRED",
    "CartItem productVariantId",
  ) as ProductVariantId;

  assertQuantity(input.quantity);

  if (isNegativeMoney(input.unitPrice)) {
    throw new DomainValidationError(
      "CART_ITEM_UNIT_PRICE_NEGATIVE",
      "CartItem unitPrice cannot be negative.",
    );
  }

  return Object.freeze({
    id,
    productVariantId,
    unitPrice: input.unitPrice,
    quantity: input.quantity,
  });
}