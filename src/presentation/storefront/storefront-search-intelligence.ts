import type {
  ProductDiscoveryCategory,
} from "./product-discovery-model";
import type {
  StorefrontProductCard,
} from "./storefront-home-model";

export type StorefrontSearchSuggestion =
  Readonly<{
    label: string;
    query: string;
    kind:
      | "PRODUCT"
      | "BRAND"
      | "CATEGORY";
  }>;

export type StorefrontSearchExperience =
  Readonly<{
    normalizedQuery: string;
    terms:
      readonly string[];
    results:
      readonly StorefrontProductCard[];
    categoryCounts:
      Readonly<
        Record<
          ProductDiscoveryCategory,
          number
        >
      >;
    suggestions:
      readonly StorefrontSearchSuggestion[];
  }>;

type RankedProduct =
  Readonly<{
    product:
      StorefrontProductCard;
    score: number;
    sourceIndex: number;
  }>;

const categories:
  readonly Exclude<
    ProductDiscoveryCategory,
    "all"
  >[] =
    Object.freeze([
      "smartphone",
      "audio",
      "power",
      "protection",
    ]);

export function normalizeStorefrontSearchText(
  value: string,
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(
      /[^a-zA-Z0-9-]+/g,
      " ",
    )
    .trim()
    .toLowerCase();
}

export function tokenizeStorefrontSearch(
  value: string,
): readonly string[] {
  const normalized =
    normalizeStorefrontSearchText(
      value,
    );

  if (!normalized) {
    return Object.freeze([]);
  }

  return Object.freeze(
    normalized
      .split(/\s+/)
      .filter(Boolean),
  );
}

function searchableFields(
  product:
    StorefrontProductCard,
) {
  return {
    name:
      normalizeStorefrontSearchText(
        product.name,
      ),
    brand:
      normalizeStorefrontSearchText(
        product.brand,
      ),
    category:
      normalizeStorefrontSearchText(
        product.categoryLabel,
      ),
    slug:
      normalizeStorefrontSearchText(
        product.slug,
      ),
  };
}

function rankProduct(
  product:
    StorefrontProductCard,
  normalizedQuery: string,
  terms:
    readonly string[],
  sourceIndex: number,
): RankedProduct | null {
  if (
    terms.length === 0
  ) {
    return {
      product,
      score: 0,
      sourceIndex,
    };
  }

  const fields =
    searchableFields(
      product,
    );

  const aggregate =
    [
      fields.name,
      fields.brand,
      fields.category,
      fields.slug,
    ].join(" ");

  if (
    !terms.every(
      (term) =>
        aggregate.includes(
          term,
        ),
    )
  ) {
    return null;
  }

  let score = 0;

  if (
    fields.name ===
    normalizedQuery
  ) {
    score += 120;
  } else if (
    fields.name.startsWith(
      normalizedQuery,
    )
  ) {
    score += 80;
  }

  if (
    fields.brand ===
    normalizedQuery
  ) {
    score += 70;
  } else if (
    fields.brand.startsWith(
      normalizedQuery,
    )
  ) {
    score += 40;
  }

  if (
    fields.category ===
    normalizedQuery
  ) {
    score += 35;
  }

  if (
    fields.slug ===
    normalizedQuery
  ) {
    score += 35;
  } else if (
    fields.slug.includes(
      normalizedQuery,
    )
  ) {
    score += 15;
  }

  for (const term of terms) {
    if (
      fields.name.includes(
        term,
      )
    ) {
      score += 25;
    }

    if (
      fields.brand.includes(
        term,
      )
    ) {
      score += 18;
    }

    if (
      fields.category.includes(
        term,
      )
    ) {
      score += 10;
    }

    if (
      fields.slug.includes(
        term,
      )
    ) {
      score += 8;
    }
  }

  if (product.featured) {
    score += 2;
  }

  if (
    product.stockUnits > 0
  ) {
    score += 1;
  }

  return {
    product,
    score,
    sourceIndex,
  };
}

function buildSuggestions(
  products:
    readonly StorefrontProductCard[],
  normalizedQuery: string,
): readonly StorefrontSearchSuggestion[] {
  if (
    normalizedQuery.length < 2
  ) {
    return Object.freeze([]);
  }

  const candidates:
    StorefrontSearchSuggestion[] =
      [];

  const seen =
    new Set<string>();

  function add(
    suggestion:
      StorefrontSearchSuggestion,
  ) {
    const key =
      normalizeStorefrontSearchText(
        suggestion.query,
      );

    if (
      seen.has(
        key,
      ) ||
      !key.includes(
        normalizedQuery,
      )
    ) {
      return;
    }

    seen.add(
      key,
    );

    candidates.push(
      Object.freeze(
        suggestion,
      ),
    );
  }

  for (
    const product of products
  ) {
    add({
      label:
        product.name,
      query:
        product.name,
      kind:
        "PRODUCT",
    });

    add({
      label:
        product.brand,
      query:
        product.brand,
      kind:
        "BRAND",
    });

    add({
      label:
        product.categoryLabel,
      query:
        product.categoryLabel,
      kind:
        "CATEGORY",
    });
  }

  return Object.freeze(
    candidates
      .sort(
        (
          left,
          right,
        ) => {
          const leftValue =
            normalizeStorefrontSearchText(
              left.query,
            );

          const rightValue =
            normalizeStorefrontSearchText(
              right.query,
            );

          const leftPrefix =
            leftValue.startsWith(
              normalizedQuery,
            )
              ? 0
              : 1;

          const rightPrefix =
            rightValue.startsWith(
              normalizedQuery,
            )
              ? 0
              : 1;

          return (
            leftPrefix -
              rightPrefix ||
            leftValue.length -
              rightValue.length ||
            leftValue.localeCompare(
              rightValue,
            )
          );
        },
      )
      .slice(
        0,
        5,
      ),
  );
}

export function buildStorefrontSearchExperience(
  products:
    readonly StorefrontProductCard[],
  query: string,
  category:
    ProductDiscoveryCategory,
): StorefrontSearchExperience {
  const normalizedQuery =
    normalizeStorefrontSearchText(
      query,
    );

  const terms =
    tokenizeStorefrontSearch(
      query,
    );

  const ranked =
    products
      .map(
        (
          product,
          sourceIndex,
        ) =>
          rankProduct(
            product,
            normalizedQuery,
            terms,
            sourceIndex,
          ),
      )
      .filter(
        (
          entry,
        ): entry is
          RankedProduct =>
          entry !== null,
      );

  if (
    terms.length > 0
  ) {
    ranked.sort(
      (
        left,
        right,
      ) =>
        right.score -
          left.score ||
        left.sourceIndex -
          right.sourceIndex,
    );
  }

  const counts:
    Record<
      ProductDiscoveryCategory,
      number
    > = {
      all:
        ranked.length,
      smartphone: 0,
      audio: 0,
      power: 0,
      protection: 0,
    };

  for (const entry of ranked) {
    counts[
      entry.product
        .categoryKey
    ] += 1;
  }

  const results =
    ranked
      .filter(
        (entry) =>
          category ===
            "all" ||
          entry.product
            .categoryKey ===
            category,
      )
      .map(
        (entry) =>
          entry.product,
      );

  return Object.freeze({
    normalizedQuery,
    terms,
    results:
      Object.freeze(
        results,
      ),
    categoryCounts:
      Object.freeze(
        counts,
      ),
    suggestions:
      buildSuggestions(
        products,
        normalizedQuery,
      ),
  });
}

export function getStorefrontSearchCategories():
  readonly Exclude<
    ProductDiscoveryCategory,
    "all"
  >[] {
  return Object.freeze([
    ...categories,
  ]);
}