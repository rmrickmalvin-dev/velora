import type {
  StorefrontProductCard,
} from "./storefront-home-model";

export type ProductDiscoveryCategory =
  | "all"
  | StorefrontProductCard[
      "categoryKey"
    ];

export function normalizeDiscoveryText(
  value: string,
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .trim()
    .toLocaleLowerCase();
}

export function filterStorefrontProducts(
  products:
    readonly StorefrontProductCard[],
  query: string,
  category:
    ProductDiscoveryCategory,
): readonly StorefrontProductCard[] {
  const normalizedQuery =
    normalizeDiscoveryText(
      query,
    );

  const result =
    products.filter(
      (product) => {
        const matchesCategory =
          category === "all" ||
          product.categoryKey ===
            category;

        if (!matchesCategory) {
          return false;
        }

        if (
          normalizedQuery.length ===
          0
        ) {
          return true;
        }

        const searchable =
          normalizeDiscoveryText(
            [
              product.brand,
              product.name,
              product.categoryLabel,
            ].join(" "),
          );

        return searchable.includes(
          normalizedQuery,
        );
      },
    );

  return Object.freeze(result);
}