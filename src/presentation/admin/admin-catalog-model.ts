import type {
  StorefrontProduct,
} from "../../application/use-cases/storefront-query";
import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  formatStorefrontMoney,
} from "../storefront/storefront-home-model";

export type AdminCatalogVariantModel =
  Readonly<{
    variantId: string;
    sku: string;
    priceLabel: string;
    priceMinorUnits: number;
    currency: string;
    quantityOnHand: number;
    available: boolean;
    lowStock: boolean;
  }>;

export type AdminCatalogProductModel =
  Readonly<{
    productId: string;
    slug: string;
    brand: string;
    model: string;
    name: string;
    featured: boolean;
    variantCount: number;
    totalStock: number;
    lowStockVariantCount: number;
    variants:
      readonly AdminCatalogVariantModel[];
  }>;

export type AdminCatalogModel =
  Readonly<{
    productCount: number;
    variantCount: number;
    inventoryUnits: number;
    lowStockVariantCount: number;
    products:
      readonly AdminCatalogProductModel[];
  }>;

export function buildAdminCatalogModel(
  locale:
    StorefrontLocale,
  products:
    readonly StorefrontProduct[],
): AdminCatalogModel {
  const mapped =
    products.map(
      (
        product,
      ): AdminCatalogProductModel => {
        const variants =
          product.variants.map(
            (
              entry,
            ): AdminCatalogVariantModel => {
              const quantityOnHand =
                entry.inventory
                  ?.quantityOnHand ??
                0;

              return Object.freeze({
                variantId:
                  entry.variant.id,
                sku:
                  entry.variant.sku,
                priceLabel:
                  formatStorefrontMoney(
                    locale,
                    entry.variant.price
                      .minorUnits,
                    entry.variant.price
                      .currency,
                  ),
                priceMinorUnits:
                  entry.variant.price
                    .minorUnits,
                currency:
                  entry.variant.price
                    .currency,
                quantityOnHand,
                available:
                  quantityOnHand > 0,
                lowStock:
                  quantityOnHand <= 5,
              });
            },
          );

        const totalStock =
          variants.reduce(
            (
              total,
              variant,
            ) =>
              total +
              variant.quantityOnHand,
            0,
          );

        const lowStockVariantCount =
          variants.filter(
            (variant) =>
              variant.lowStock,
          ).length;

        return Object.freeze({
          productId:
            product.product.id,
          slug:
            product.product.slug,
          brand:
            product.product.brand,
          model:
            product.product.model,
          name:
            product.product.name,
          featured:
            product.product.featured,
          variantCount:
            variants.length,
          totalStock,
          lowStockVariantCount,
          variants:
            Object.freeze(
              variants,
            ),
        });
      },
    );

  mapped.sort(
    (
      left,
      right,
    ) =>
      left.name.localeCompare(
        right.name,
      ),
  );

  return Object.freeze({
    productCount:
      mapped.length,
    variantCount:
      mapped.reduce(
        (
          total,
          product,
        ) =>
          total +
          product.variantCount,
        0,
      ),
    inventoryUnits:
      mapped.reduce(
        (
          total,
          product,
        ) =>
          total +
          product.totalStock,
        0,
      ),
    lowStockVariantCount:
      mapped.reduce(
        (
          total,
          product,
        ) =>
          total +
          product.lowStockVariantCount,
        0,
      ),
    products:
      Object.freeze(
        mapped,
      ),
  });
}