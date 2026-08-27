import {
  createProduct,
  type Product,
} from "../../domain/entities/product";
import {
  createProductVariant,
  type ProductVariant,
} from "../../domain/entities/product-variant";
import type {
  ProductRepository,
} from "../../domain/repositories/product-repository";
import type {
  ProductVariantRepository,
} from "../../domain/repositories/product-variant-repository";
import type {
  ProductId,
  ProductVariantId,
} from "../../domain/types/identifiers";
import {
  createMoney,
} from "../../domain/value-objects/money";
import {
  ApplicationError,
} from "../errors/application-error";

export type UpdateAdminProductInput =
  Readonly<{
    productId:
      ProductId;
    name: string;
    brand: string;
    model: string;
    featured: boolean;
  }>;

export type UpdateAdminVariantPriceInput =
  Readonly<{
    productVariantId:
      ProductVariantId;
    priceMinorUnits:
      number;
  }>;

export async function updateAdminProduct(
  products:
    ProductRepository,
  input:
    UpdateAdminProductInput,
): Promise<Product> {
  const current =
    await products.findById(
      input.productId,
    );

  if (!current) {
    throw new ApplicationError(
      "APPLICATION_PRODUCT_NOT_FOUND",
      "Product was not found for Admin update.",
    );
  }

  const updated =
    createProduct({
      id: current.id,
      slug: current.slug,
      name: input.name,
      brand: input.brand,
      model: input.model,
      categoryId:
        current.categoryId,
      status:
        current.status,
      featured:
        input.featured,
    });

  await products.save(
    updated,
  );

  return updated;
}

export async function updateAdminVariantPrice(
  variants:
    ProductVariantRepository,
  input:
    UpdateAdminVariantPriceInput,
): Promise<ProductVariant> {
  const current =
    await variants.findById(
      input.productVariantId,
    );

  if (!current) {
    throw new ApplicationError(
      "APPLICATION_PRODUCT_VARIANT_NOT_FOUND",
      "Product Variant was not found for Admin price update.",
    );
  }

  const updated =
    createProductVariant({
      id: current.id,
      productId:
        current.productId,
      sku: current.sku,
      price:
        createMoney(
          input.priceMinorUnits,
          current.price.currency,
        ),
      status:
        current.status,
      attributes: {
        ...current.attributes,
      },
    });

  await variants.save(
    updated,
  );

  return updated;
}