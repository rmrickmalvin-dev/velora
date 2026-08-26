import type {
  StorefrontProduct,
} from "../../application/use-cases/storefront-query";
import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontInteractionCopy,
} from "../../i18n/storefront-interaction-copy";
import {
  formatStorefrontMoney,
  storefrontCategoryKey,
  storefrontCategoryLabel,
  type StorefrontCategoryKey,
} from "./storefront-home-model";
import {
  buildStorefrontProductVisual,
  type StorefrontProductVisual,
} from "./storefront-product-media";

export type StorefrontProductVariantModel =
  Readonly<{
    id: string;
    sku: string;
    label: string;
    priceLabel: string;
    quantityOnHand: number;
    stockLabel: string;
    available: boolean;
  }>;

export type StorefrontProductDetailModel =
  Readonly<{
    locale:
      StorefrontLocale;
    id: string;
    slug: string;
    brand: string;
    name: string;
    categoryKey:
      StorefrontCategoryKey;
    categoryLabel: string;
    copy:
      ReturnType<
        typeof getStorefrontInteractionCopy
      >["detail"];
    backHref: string;
    localeLinks:
      readonly Readonly<{
        locale:
          StorefrontLocale;
        href: string;
        label: string;
        shortLabel: string;
      }>[];
    variants:
      readonly StorefrontProductVariantModel[];
    visual:
      StorefrontProductVisual;
  }>;

function variantLabel(
  attributes:
    Readonly<
      Record<string, string>
    >,
  sku: string,
): string {
  const values =
    Object.values(
      attributes,
    );

  return values.length > 0
    ? values.join(" / ")
    : sku;
}

export function buildStorefrontProductDetailModel(
  locale:
    StorefrontLocale,
  product:
    StorefrontProduct,
): StorefrontProductDetailModel {
  const copy =
    getStorefrontInteractionCopy(
      locale,
    ).detail;

  const categoryKey =
    storefrontCategoryKey(
      product.product
        .categoryId,
    );

  const variants =
    product.variants.map(
      (
        entry,
      ): StorefrontProductVariantModel => {
        const quantity =
          entry.inventory
            ?.quantityOnHand ??
          0;

        return Object.freeze({
          id:
            entry.variant.id,
          sku:
            entry.variant.sku,
          label:
            variantLabel(
              entry.variant
                .attributes,
              entry.variant.sku,
            ),
          priceLabel:
            formatStorefrontMoney(
              locale,
              entry.variant
                .price
                .minorUnits,
              entry.variant
                .price
                .currency,
            ),
          quantityOnHand:
            quantity,
          stockLabel:
            quantity > 0
              ? copy.available
              : copy.unavailable,
          available:
            quantity > 0,
        });
      },
    );

  const slug =
    product.product.slug;

  return Object.freeze({
    locale,
    id:
      product.product.id,
    slug,
    brand:
      product.product.brand,
    name:
      product.product.name,
    categoryKey,
    categoryLabel:
      storefrontCategoryLabel(
        locale,
        categoryKey,
      ),
    copy,
    backHref:
      `/${locale}#featured`,
    localeLinks:
      Object.freeze([
        Object.freeze({
          locale: "pt-BR",
          href:
            `/pt-BR/products/${slug}`,
          label:
            "Portugues",
          shortLabel: "BR",
        }),
        Object.freeze({
          locale: "en",
          href:
            `/en/products/${slug}`,
          label:
            "English",
          shortLabel: "EN",
        }),
        Object.freeze({
          locale: "es",
          href:
            `/es/products/${slug}`,
          label:
            "Espanol",
          shortLabel: "ES",
        }),
      ]),
    variants:
      Object.freeze(
        variants,
      ),
    visual:
      buildStorefrontProductVisual(
        product,
        categoryKey,
      ),
  });
}