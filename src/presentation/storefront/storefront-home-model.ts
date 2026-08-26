import type {
  StorefrontProduct,
} from "../../application/use-cases/storefront-query";
import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontCopy,
} from "../../i18n/storefront-copy";

export type StorefrontProductCard =
  Readonly<{
    id: string;
    slug: string;
    brand: string;
    name: string;
    categoryKey:
      "smartphone" |
      "audio" |
      "power" |
      "protection";
    categoryLabel: string;
    priceLabel: string;
    stockLabel: string;
    featured: boolean;
  }>;

export type StorefrontHomeModel =
  Readonly<{
    locale: StorefrontLocale;
    copy:
      ReturnType<
        typeof getStorefrontCopy
      >;
    localeLinks:
      readonly Readonly<{
        locale:
          StorefrontLocale;
        href: string;
        label: string;
        shortLabel: string;
      }>[];
    featuredProducts:
      readonly StorefrontProductCard[];
  }>;

const localeNumberFormats:
  Record<
    StorefrontLocale,
    string
  > = {
    "pt-BR": "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

function categoryKey(
  categoryId: string,
): StorefrontProductCard[
  "categoryKey"
] {
  if (
    categoryId ===
    "category-audio"
  ) {
    return "audio";
  }

  if (
    categoryId ===
    "category-power"
  ) {
    return "power";
  }

  if (
    categoryId ===
    "category-protection"
  ) {
    return "protection";
  }

  return "smartphone";
}

function categoryLabel(
  locale: StorefrontLocale,
  key:
    StorefrontProductCard[
      "categoryKey"
    ],
): string {
  const copy =
    getStorefrontCopy(
      locale,
    );

  return copy.categories[key];
}

function lowestPrice(
  product:
    StorefrontProduct,
) {
  if (
    product.variants.length === 0
  ) {
    return null;
  }

  return product.variants.reduce(
    (lowest, current) =>
      current.variant.price
        .minorUnits <
      lowest.variant.price
        .minorUnits
        ? current
        : lowest,
  ).variant.price;
}

export function formatStorefrontMoney(
  locale:
    StorefrontLocale,
  minorUnits: number,
  currency: string,
): string {
  return new Intl.NumberFormat(
    localeNumberFormats[locale],
    {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    },
  ).format(
    minorUnits / 100,
  );
}

export function buildStorefrontHomeModel(
  locale:
    StorefrontLocale,
  products:
    readonly StorefrontProduct[],
): StorefrontHomeModel {
  const copy =
    getStorefrontCopy(
      locale,
    );

  const featuredProducts =
    products
      .slice(0, 4)
      .map(
        (
          product,
        ): StorefrontProductCard => {
          const key =
            categoryKey(
              product.product
                .categoryId,
            );

          const price =
            lowestPrice(
              product,
            );

          const totalStock =
            product.variants.reduce(
              (
                total,
                variant,
              ) =>
                total +
                (
                  variant
                    .inventory
                    ?.quantityOnHand ??
                  0
                ),
              0,
            );

          return Object.freeze({
            id:
              product.product.id,
            slug:
              product.product.slug,
            brand:
              product.product.brand,
            name:
              product.product.name,
            categoryKey: key,
            categoryLabel:
              categoryLabel(
                locale,
                key,
              ),
            priceLabel:
              price
                ? formatStorefrontMoney(
                    locale,
                    price.minorUnits,
                    price.currency,
                  )
                : "-",
            stockLabel:
              totalStock <= 5
                ? copy.featured
                    .stockLow
                : copy.featured
                    .stockAvailable,
            featured:
              product.product
                .featured,
          });
        },
      );

  return Object.freeze({
    locale,
    copy,
    localeLinks:
      Object.freeze([
        Object.freeze({
          locale: "pt-BR",
          href: "/pt-BR",
          label:
            "Portugues",
          shortLabel: "BR",
        }),
        Object.freeze({
          locale: "en",
          href: "/en",
          label: "English",
          shortLabel: "EN",
        }),
        Object.freeze({
          locale: "es",
          href: "/es",
          label: "Espanol",
          shortLabel: "ES",
        }),
      ]),
    featuredProducts:
      Object.freeze(
        featuredProducts,
      ),
  });
}