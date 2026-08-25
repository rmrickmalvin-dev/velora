import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  OrderItemId,
  ProductId,
  ProductVariantId,
} from "../types/identifiers";
import {
  isNegativeMoney,
  type Money,
} from "../value-objects/money";
import {
  createSku,
  type SKU,
} from "../value-objects/sku";

export type OrderItem = Readonly<{
  id: OrderItemId;
  productId: ProductId;
  productVariantId: ProductVariantId;
  productNameSnapshot: string;
  skuSnapshot: SKU;
  unitPriceSnapshot: Money;
  quantity: number;
}>;

export type CreateOrderItemInput = {
  id: string;
  productId: string;
  productVariantId: string;
  productNameSnapshot: string;
  skuSnapshot: string;
  unitPriceSnapshot: Money;
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
      "ORDER_ITEM_QUANTITY_INVALID",
      "OrderItem quantity must be a positive safe integer.",
    );
  }
}

export function createOrderItem(
  input: CreateOrderItemInput,
): OrderItem {
  const id = requireText(
    input.id,
    "ORDER_ITEM_ID_REQUIRED",
    "OrderItem id",
  ) as OrderItemId;

  const productId = requireText(
    input.productId,
    "ORDER_ITEM_PRODUCT_ID_REQUIRED",
    "OrderItem productId",
  ) as ProductId;

  const productVariantId = requireText(
    input.productVariantId,
    "ORDER_ITEM_PRODUCT_VARIANT_ID_REQUIRED",
    "OrderItem productVariantId",
  ) as ProductVariantId;

  const productNameSnapshot =
    requireText(
      input.productNameSnapshot,
      "ORDER_ITEM_PRODUCT_NAME_SNAPSHOT_REQUIRED",
      "OrderItem productNameSnapshot",
    );

  assertQuantity(
    input.quantity,
  );

  if (
    isNegativeMoney(
      input.unitPriceSnapshot,
    )
  ) {
    throw new DomainValidationError(
      "ORDER_ITEM_UNIT_PRICE_SNAPSHOT_NEGATIVE",
      "OrderItem unitPriceSnapshot cannot be negative.",
    );
  }

  return Object.freeze({
    id,
    productId,
    productVariantId,
    productNameSnapshot,
    skuSnapshot:
      createSku(
        input.skuSnapshot,
      ),
    unitPriceSnapshot:
      input.unitPriceSnapshot,
    quantity:
      input.quantity,
  });
}