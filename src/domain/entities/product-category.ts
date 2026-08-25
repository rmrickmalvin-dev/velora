import { DomainValidationError } from "../errors/domain-validation-error";
import type { ProductCategoryId } from "../types/identifiers";
import {
  createSlug,
  type Slug,
} from "../value-objects/slug";

export type ProductCategory =
  Readonly<{
    id: ProductCategoryId;
    slug: Slug;
    name: string;
    description?: string;
  }>;

export type CreateProductCategoryInput =
  {
    id: string;
    slug: string;
    name: string;
    description?: string;
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

export function createProductCategory(
  input: CreateProductCategoryInput,
): ProductCategory {
  const id =
    requireText(
      input.id,
      "PRODUCT_CATEGORY_ID_REQUIRED",
      "ProductCategory id",
    ) as ProductCategoryId;

  const name =
    requireText(
      input.name,
      "PRODUCT_CATEGORY_NAME_REQUIRED",
      "ProductCategory name",
    );

  const description =
    input.description
      ?.trim() || undefined;

  const category = {
    id,
    slug: createSlug(input.slug),
    name,
    ...(description
      ? { description }
      : {}),
  };

  return Object.freeze(category);
}