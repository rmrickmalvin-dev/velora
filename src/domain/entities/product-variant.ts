import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  ProductId,
  ProductVariantId,
} from "../types/identifiers";
import {
  isProductStatus,
  type ProductStatus,
} from "../types/statuses";
import {
  isNegativeMoney,
  type Money,
} from "../value-objects/money";
import {
  createSku,
  type SKU,
} from "../value-objects/sku";

export type ProductVariantAttributes =
  Readonly<
    Record<string, string>
  >;

export type ProductVariant =
  Readonly<{
    id: ProductVariantId;
    productId: ProductId;
    sku: SKU;
    price: Money;
    status: ProductStatus;
    attributes:
      ProductVariantAttributes;
  }>;

export type CreateProductVariantInput =
  {
    id: string;
    productId: string;
    sku: string;
    price: Money;
    status: ProductStatus;
    attributes?: Record<
      string,
      string
    >;
  };

function requireText(
  value: string,
  code: string,
  field: string,
) {
  const normalized =
    value.trim();

  if (!normalized) {
    throw new DomainValidationError(
      code,
      `${field} cannot be empty.`,
    );
  }

  return normalized;
}

function normalizeAttributes(
  attributes:
    | Record<string, string>
    | undefined,
): ProductVariantAttributes {
  const normalized:
    Record<string, string> = {};

  for (
    const [rawKey, rawValue]
    of Object.entries(
      attributes ?? {},
    )
  ) {
    const key =
      rawKey.trim();

    const value =
      rawValue.trim();

    if (!key) {
      throw new DomainValidationError(
        "PRODUCT_VARIANT_ATTRIBUTE_KEY_REQUIRED",
        "ProductVariant attribute key cannot be empty.",
      );
    }

    if (!value) {
      throw new DomainValidationError(
        "PRODUCT_VARIANT_ATTRIBUTE_VALUE_REQUIRED",
        `ProductVariant attribute "${key}" cannot be empty.`,
      );
    }

    normalized[key] = value;
  }

  return Object.freeze(
    normalized,
  );
}

export function createProductVariant(
  input: CreateProductVariantInput,
): ProductVariant {
  const id =
    requireText(
      input.id,
      "PRODUCT_VARIANT_ID_REQUIRED",
      "ProductVariant id",
    ) as ProductVariantId;

  const productId =
    requireText(
      input.productId,
      "PRODUCT_VARIANT_PRODUCT_ID_REQUIRED",
      "ProductVariant productId",
    ) as ProductId;

  if (
    !isProductStatus(
      input.status,
    )
  ) {
    throw new DomainValidationError(
      "PRODUCT_VARIANT_STATUS_INVALID",
      `Invalid ProductVariant status: ${input.status}`,
    );
  }

  if (
    isNegativeMoney(
      input.price,
    )
  ) {
    throw new DomainValidationError(
      "PRODUCT_VARIANT_PRICE_NEGATIVE",
      "ProductVariant price cannot be negative.",
    );
  }

  return Object.freeze({
    id,
    productId,
    sku:
      createSku(input.sku),
    price: input.price,
    status: input.status,
    attributes:
      normalizeAttributes(
        input.attributes,
      ),
  });
}