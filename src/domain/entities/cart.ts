import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  CartId,
} from "../types/identifiers";
import type {
  CartItem,
} from "./cart-item";

export type Cart = Readonly<{
  id: CartId;
  items: readonly CartItem[];
}>;

export type CreateCartInput = {
  id: string;
  items?: readonly CartItem[];
};

function requireId(
  value: string,
): CartId {
  const normalized = value.trim();

  if (!normalized) {
    throw new DomainValidationError(
      "CART_ID_REQUIRED",
      "Cart id cannot be empty.",
    );
  }

  return normalized as CartId;
}

function assertUniqueItems(
  items: readonly CartItem[],
) {
  const itemIds = new Set<string>();
  const variantIds = new Set<string>();

  for (const item of items) {
    if (itemIds.has(item.id)) {
      throw new DomainValidationError(
        "CART_ITEM_ID_DUPLICATED",
        `CartItem id is duplicated: ${item.id}`,
      );
    }

    if (
      variantIds.has(
        item.productVariantId,
      )
    ) {
      throw new DomainValidationError(
        "CART_PRODUCT_VARIANT_DUPLICATED",
        `ProductVariant already exists in Cart: ${item.productVariantId}`,
      );
    }

    itemIds.add(item.id);
    variantIds.add(
      item.productVariantId,
    );
  }
}

export function createCart(
  input: CreateCartInput,
): Cart {
  const id = requireId(input.id);

  const items = [
    ...(input.items ?? []),
  ];

  assertUniqueItems(items);

  return Object.freeze({
    id,
    items:
      Object.freeze(items),
  });
}