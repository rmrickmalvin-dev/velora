import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  ProductCategoryId,
  ProductId,
} from "../types/identifiers";
import {
  isProductStatus,
  type ProductStatus,
} from "../types/statuses";
import {
  createSlug,
  type Slug,
} from "../value-objects/slug";

export type Product =
  Readonly<{
    id: ProductId;
    slug: Slug;
    name: string;
    brand: string;
    model: string;
    categoryId: ProductCategoryId;
    status: ProductStatus;
    featured: boolean;
  }>;

export type CreateProductInput = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  categoryId: string;
  status: ProductStatus;
  featured?: boolean;
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

export function createProduct(
  input: CreateProductInput,
): Product {
  const id =
    requireText(
      input.id,
      "PRODUCT_ID_REQUIRED",
      "Product id",
    ) as ProductId;

  const categoryId =
    requireText(
      input.categoryId,
      "PRODUCT_CATEGORY_ID_REQUIRED",
      "Product categoryId",
    ) as ProductCategoryId;

  const name =
    requireText(
      input.name,
      "PRODUCT_NAME_REQUIRED",
      "Product name",
    );

  const brand =
    requireText(
      input.brand,
      "PRODUCT_BRAND_REQUIRED",
      "Product brand",
    );

  const model =
    requireText(
      input.model,
      "PRODUCT_MODEL_REQUIRED",
      "Product model",
    );

  if (
    !isProductStatus(
      input.status,
    )
  ) {
    throw new DomainValidationError(
      "PRODUCT_STATUS_INVALID",
      `Invalid Product status: ${input.status}`,
    );
  }

  return Object.freeze({
    id,
    slug:
      createSlug(input.slug),
    name,
    brand,
    model,
    categoryId,
    status: input.status,
    featured:
      input.featured ?? false,
  });
}