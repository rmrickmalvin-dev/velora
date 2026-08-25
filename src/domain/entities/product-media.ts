import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  ProductId,
  ProductMediaId,
  ProductVariantId,
} from "../types/identifiers";

export type ProductMedia =
  Readonly<{
    id: ProductMediaId;
    productId: ProductId;
    variantId?: ProductVariantId;
    url: string;
    alt: string;
    position: number;
  }>;

export type CreateProductMediaInput =
  {
    id: string;
    productId: string;
    variantId?: string;
    url: string;
    alt: string;
    position?: number;
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

export function createProductMedia(
  input: CreateProductMediaInput,
): ProductMedia {
  const id =
    requireText(
      input.id,
      "PRODUCT_MEDIA_ID_REQUIRED",
      "ProductMedia id",
    ) as ProductMediaId;

  const productId =
    requireText(
      input.productId,
      "PRODUCT_MEDIA_PRODUCT_ID_REQUIRED",
      "ProductMedia productId",
    ) as ProductId;

  const url =
    requireText(
      input.url,
      "PRODUCT_MEDIA_URL_REQUIRED",
      "ProductMedia url",
    );

  const alt =
    requireText(
      input.alt,
      "PRODUCT_MEDIA_ALT_REQUIRED",
      "ProductMedia alt",
    );

  const position =
    input.position ?? 0;

  if (
    !Number.isSafeInteger(
      position,
    ) ||
    position < 0
  ) {
    throw new DomainValidationError(
      "PRODUCT_MEDIA_POSITION_INVALID",
      "ProductMedia position must be a non-negative safe integer.",
    );
  }

  let variantId:
    | ProductVariantId
    | undefined;

  if (
    input.variantId !==
    undefined
  ) {
    variantId =
      requireText(
        input.variantId,
        "PRODUCT_MEDIA_VARIANT_ID_REQUIRED",
        "ProductMedia variantId",
      ) as ProductVariantId;
  }

  return Object.freeze({
    id,
    productId,
    ...(variantId
      ? { variantId }
      : {}),
    url,
    alt,
    position,
  });
}