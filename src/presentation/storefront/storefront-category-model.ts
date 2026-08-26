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
  buildStorefrontHomeModel,
  storefrontCategoryLabel,
  type StorefrontCategoryKey,
  type StorefrontProductCard,
} from "./storefront-home-model";

export const storefrontCategoryRouteKeys =
  [
    "smartphone",
    "audio",
    "power",
    "protection",
  ] as const;

export type StorefrontCategoryRouteKey =
  (typeof storefrontCategoryRouteKeys)[number];

export type StorefrontCategoryModel =
  Readonly<{
    locale:
      StorefrontLocale;
    category:
      StorefrontCategoryRouteKey;
    title: string;
    eyebrow: string;
    body: string;
    backLabel: string;
    backHref: string;
    products:
      readonly StorefrontProductCard[];
    localeLinks:
      readonly Readonly<{
        locale:
          StorefrontLocale;
        href: string;
        label: string;
        shortLabel: string;
      }>[];
  }>;

export function isStorefrontCategoryRouteKey(
  value: string,
): value is StorefrontCategoryRouteKey {
  return storefrontCategoryRouteKeys.some(
    (category) =>
      category === value,
  );
}

export function buildStorefrontCategoryModel(
  locale:
    StorefrontLocale,
  category:
    StorefrontCategoryRouteKey,
  products:
    readonly StorefrontProduct[],
): StorefrontCategoryModel {
  const home =
    buildStorefrontHomeModel(
      locale,
      products,
    );

  const copy =
    getStorefrontInteractionCopy(
      locale,
    );

  const categoryProducts =
    home.products.filter(
      (product) =>
        product.categoryKey ===
        category,
    );

  return Object.freeze({
    locale,
    category,
    title:
      storefrontCategoryLabel(
        locale,
        category as StorefrontCategoryKey,
      ),
    eyebrow:
      copy.discovery.eyebrow,
    body:
      copy.discovery.body,
    backLabel:
      copy.detail.backToStore,
    backHref:
      `/${locale}#categories`,
    products:
      Object.freeze(
        categoryProducts,
      ),
    localeLinks:
      Object.freeze([
        Object.freeze({
          locale: "pt-BR",
          href:
            `/pt-BR/categories/${category}`,
          label:
            "Portugues",
          shortLabel: "BR",
        }),
        Object.freeze({
          locale: "en",
          href:
            `/en/categories/${category}`,
          label:
            "English",
          shortLabel: "EN",
        }),
        Object.freeze({
          locale: "es",
          href:
            `/es/categories/${category}`,
          label:
            "Espanol",
          shortLabel: "ES",
        }),
      ]),
  });
}