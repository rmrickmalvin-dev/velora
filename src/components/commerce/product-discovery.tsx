"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getStorefrontCopy,
  type StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontInteractionCopy,
} from "../../i18n/storefront-interaction-copy";
import {
  getStorefrontSearchCopy,
} from "../../i18n/storefront-search-copy";
import {
  loadBrowserStorefrontProductCards,
  subscribeBrowserStorefrontDataChanged,
} from "../../features/catalog/browser-storefront-catalog";
import {
  readBrowserDiscoveryState,
  subscribeBrowserDiscoveryNavigation,
  writeBrowserDiscoveryState,
} from "../../features/catalog/browser-discovery-navigation";
import type {
  ProductDiscoveryCategory,
} from "../../presentation/storefront/product-discovery-model";
import {
  buildStorefrontSearchExperience,
} from "../../presentation/storefront/storefront-search-intelligence";
import type {
  StorefrontProductCard,
} from "../../presentation/storefront/storefront-home-model";

import {
  AdminStorefrontControls,
} from "../admin/admin-storefront-controls";
import {
  ProductVisual,
} from "./product-visual";

import styles from "./product-discovery.module.css";

type ProductDiscoveryProps =
  Readonly<{
    locale:
      StorefrontLocale;
    products:
      readonly StorefrontProductCard[];
    showCategoryFilters?: boolean;
  }>;

export function ProductDiscovery({
  locale,
  products,
  showCategoryFilters = true,
}: ProductDiscoveryProps) {
  const storefrontCopy =
    getStorefrontCopy(
      locale,
    );

  const copy =
    getStorefrontInteractionCopy(
      locale,
    ).discovery;

  const searchCopy =
    getStorefrontSearchCopy(
      locale,
    );

  const [
    displayProducts,
    setDisplayProducts,
  ] =
    useState<
      readonly StorefrontProductCard[]
    >(products);

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    category,
    setCategory,
  ] =
    useState<
      ProductDiscoveryCategory
    >("all");

  useEffect(
    () => {
      let active =
        true;

      queueMicrotask(
        () => {
          if (!active) {
            return;
          }

          const initialDiscoveryState =
            readBrowserDiscoveryState();

          setQuery(
            initialDiscoveryState.query,
          );

          setCategory(
            initialDiscoveryState.category,
          );
        },
      );

      const refresh =
        () => {
          void loadBrowserStorefrontProductCards(
            locale,
          )
            .then(
              (next) => {
                if (active) {
                  setDisplayProducts(
                    next,
                  );
                }
              },
            )
            .catch(
              () =>
                undefined,
            );
        };

      queueMicrotask(
        refresh,
      );

      const unsubscribe =
        subscribeBrowserStorefrontDataChanged(
          refresh,
        );

      const unsubscribeNavigation =
        subscribeBrowserDiscoveryNavigation(
          () => {
            const next =
              readBrowserDiscoveryState();

            setQuery(
              next.query,
            );

            setCategory(
              next.category,
            );
          },
        );

      return () => {
        active = false;
        unsubscribe();
        unsubscribeNavigation();
      };
    },
    [
      locale,
    ],
  );

  const searchExperience =
    useMemo(
      () =>
        buildStorefrontSearchExperience(
          displayProducts,
          query,
          category,
        ),
      [
        displayProducts,
        query,
        category,
      ],
    );

  const filtered =
    searchExperience.results;

  function updateDiscovery(
    nextQuery: string,
    nextCategory:
      ProductDiscoveryCategory,
  ) {
    setQuery(
      nextQuery,
    );

    setCategory(
      nextCategory,
    );

    writeBrowserDiscoveryState({
      query:
        nextQuery,
      category:
        nextCategory,
    });
  }

  function clearDiscovery() {
    updateDiscovery(
      "",
      "all",
    );
  }

  const categories:
    readonly Readonly<{
      key:
        ProductDiscoveryCategory;
      label: string;
    }>[] = [
      {
        key: "all",
        label:
          copy.allCategories,
      },
      {
        key: "smartphone",
        label:
          storefrontCopy
            .categories
            .smartphone,
      },
      {
        key: "audio",
        label:
          storefrontCopy
            .categories
            .audio,
      },
      {
        key: "power",
        label:
          storefrontCopy
            .categories
            .power,
      },
      {
        key: "protection",
        label:
          storefrontCopy
            .categories
            .protection,
      },
    ];

  return (
    <div
      className={styles.root}
    >
      <div
        className={
          styles.controls
        }
        role="search"
      >
        <label
          className={
            styles.search
          }
        >
          <span
            className={
              styles.srOnly
            }
          >
            {
              copy.searchLabel
            }
          </span>
          <span
            className={
              styles.searchIcon
            }
            aria-hidden="true"
          >
            /
          </span>
          <input
            value={query}
            onChange={
              (event) => {
                updateDiscovery(
                  event.target
                    .value,
                  category,
                );
              }
            }
            placeholder={
              copy.searchPlaceholder
            }
            type="search"
          />
        </label>

        {showCategoryFilters ? (
          <div
            className={
              styles.filters
            }
            aria-label={
              storefrontCopy
                .nav.categories
            }
          >
            {categories.map(
              (item) => (
                <button
                  key={
                    item.key
                  }
                  type="button"
                  className={
                    category ===
                    item.key
                      ? styles.filterActive
                      : styles.filter
                  }
                  aria-pressed={
                    category ===
                    item.key
                  }
                  onClick={
                    () => {
                      updateDiscovery(
                        query,
                        item.key,
                      );
                    }
                  }
                >
                  {
                    item.label
                  }
                <span
                  className={
                    styles.filterCount
                  }
                  aria-hidden="true"
                >
                  {
                    searchExperience.categoryCounts[item.key]
                  }
                </span>
                </button>
              ),
            )}
          </div>
        ) : null}

        <p
          className={
            styles.resultCount
          }
          aria-live="polite"
        >
          {filtered.length}
          {" "}
          {
            filtered.length ===
            1
              ? copy.resultSingular
              : copy.resultPlural
          }
        </p>
      </div>

      <div
        className={
          styles.searchMeta
        }
      >
        <span>
          {
            searchCopy.hint
          }
        </span>

        <span>
          {
            searchCopy.urlState
          }
        </span>

        {query ||
        category !==
          "all" ? (
          <button
            type="button"
            className={
              styles.clearSearch
            }
            onClick={
              clearDiscovery
            }
          >
            {
              searchCopy.clear
            }
          </button>
        ) : null}
      </div>

      {searchExperience.suggestions.length > 0 ? (
        <div
          className={
            styles.suggestions
          }
          aria-label={
            searchCopy.suggestions
          }
        >
          <span>
            {
              searchCopy.suggestions
            }
          </span>

          {searchExperience.suggestions.map(
              (
                suggestion,
              ) => (
                <button
                  key={
                    `${suggestion.kind}-${suggestion.query}`
                  }
                  type="button"
                  onClick={
                    () => {
                      updateDiscovery(
                        suggestion.query,
                        category,
                      );
                    }
                  }
                >
                  {
                    suggestion.label
                  }
                </button>
              ),
            )}
        </div>
      ) : null}
      {filtered.length === 0 ? (
        <div
          className={
            styles.empty
          }
        >
          <span
            aria-hidden="true"
          >
            00
          </span>
          <h3>
            {
              copy.emptyTitle
            }
          </h3>
          <p>
            {
              copy.emptyBody
            }
          </p>
        </div>
      ) : (
        <div
          className={
            styles.grid
          }
        >
          {filtered.map(
            (product) => (
              <article
                key={
                  product.id
                }
                className={
                  styles.card
                }
              >
                <div
                  className={
                    styles.cardTop
                  }
                >
                  <span
                    className={
                      styles.category
                    }
                  >
                    {
                      product.categoryLabel
                    }
                  </span>

                  {product.featured ? (
                    <span
                      className={
                        styles.badge
                      }
                    >
                      {
                        storefrontCopy
                          .featured
                          .badge
                      }
                    </span>
                  ) : null}
                </div>

                <Link
                  className={
                    styles.visualLink
                  }
                  href={
                    `/${locale}/products/${product.slug}`
                  }
                  aria-label={
                    `${copy.viewDetails}: ${product.name}`
                  }
                >
                  <div
                    className={
                      styles.visual
                    }
                  >
                    <ProductVisual
                      visual={
                        product.visual
                      }
                      mode="card"
                    />
                  </div>
                </Link>

                <div
                  className={
                    styles.info
                  }
                >
                  <span
                    className={
                      styles.brand
                    }
                  >
                    {
                      product.brand
                    }
                  </span>

                  <h3>
                    <Link
                      href={
                        `/${locale}/products/${product.slug}`
                      }
                    >
                      {
                        product.name
                      }
                    </Link>
                  </h3>

                  <div
                    className={
                      styles.commercial
                    }
                  >
                    <div>
                      <span
                        className={
                          styles.pricePrefix
                        }
                      >
                        {
                          storefrontCopy
                            .featured
                            .from
                        }
                      </span>
                      <strong>
                        {
                          product.priceLabel
                        }
                      </strong>
                    </div>

                    <span
                      className={
                        styles.stock
                      }
                    >
                      {
                        product.stockLabel
                      }
                    </span>
                  </div>

                  <AdminStorefrontControls
                    locale={locale}
                    productId={
                      product.id
                    }
                    productSlug={
                      product.slug
                    }
                    stockUnits={
                      product.stockUnits
                    }
                  />

                  <Link
                    className={
                      styles.details
                    }
                    href={
                      `/${locale}/products/${product.slug}`
                    }
                  >
                    {
                      copy.viewDetails
                    }
                    <span
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            ),
          )}
        </div>
      )}
    </div>
  );
}
