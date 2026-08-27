"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontAdminCopy,
} from "../../i18n/storefront-admin-copy";
import {
  loadBrowserAdminCatalog,
} from "../../features/admin/browser-admin-catalog";
import type {
  AdminCatalogModel,
} from "../../presentation/admin/admin-catalog-model";

import {
  AdminProductEditor,
} from "./admin-product-editor";

import styles from "./admin-catalog-dashboard.module.css";

type AdminCatalogDashboardProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

export function AdminCatalogDashboard({
  locale,
}: AdminCatalogDashboardProps) {
  const copy =
    getStorefrontAdminCopy(
      locale,
    );

  const [
    model,
    setModel,
  ] =
    useState<
      AdminCatalogModel |
      null
    >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedProductId,
    setSelectedProductId,
  ] =
    useState<
      string | null
    >(null);

  useEffect(
    () => {
      queueMicrotask(
        () => {
          void loadBrowserAdminCatalog(
            locale,
          )
            .then(
              (next) => {
                setModel(
                  next,
                );

                const requested =
                  new URLSearchParams(
                    window.location.search,
                  ).get(
                    "product",
                  );

                if (
                  requested &&
                  next.products.some(
                    (product) =>
                      product.productId ===
                      requested,
                  )
                ) {
                  setSelectedProductId(
                    requested,
                  );
                }
              },
            )
            .finally(
              () => {
                setLoading(
                  false,
                );
              },
            );
        },
      );
    },
    [
      locale,
    ],
  );

  if (loading) {
    return (
      <section
        className={
          styles.root
        }
        aria-busy="true"
      >
        <p>
          {
            copy.loading
          }
        </p>
      </section>
    );
  }

  if (
    !model ||
    model.products.length ===
      0
  ) {
    return (
      <section
        className={
          styles.root
        }
      >
        <p>
          {
            copy.empty
          }
        </p>
      </section>
    );
  }

  const selectedProduct =
    model.products.find(
      (product) =>
        product.productId ===
        selectedProductId,
    ) ??
    null;

  return (
    <section
      className={
        styles.root
      }
      aria-labelledby="velora-admin-catalog-title"
    >
      <header
        className={
          styles.heading
        }
      >
        <p
          className={
            styles.eyebrow
          }
        >
          {
            copy.dashboardEyebrow
          }
        </p>

        <h2
          id="velora-admin-catalog-title"
        >
          {
            copy.dashboardTitle
          }
        </h2>

        <p>
          {
            copy.dashboardBody
          }
        </p>

        <div
          className={
            styles.notice
          }
          role="note"
        >
          {
            copy.readOnlyNotice
          }
        </div>
      </header>

      <div
        className={
          styles.metrics
        }
      >
        {[
          [
            copy.products,
            model.productCount,
          ],
          [
            copy.variants,
            model.variantCount,
          ],
          [
            copy.units,
            model.inventoryUnits,
          ],
          [
            copy.lowStock,
            model.lowStockVariantCount,
          ],
        ].map(
          (
            [
              label,
              value,
            ],
          ) => (
            <article
              key={label}
              className={
                styles.metric
              }
            >
              <span>
                {label}
              </span>
              <strong>
                {value}
              </strong>
            </article>
          ),
        )}
      </div>

      {selectedProduct ? (
        <AdminProductEditor
          key={
            selectedProduct.productId
          }
          locale={locale}
          product={
            selectedProduct
          }
          onClose={
            () => {
              setSelectedProductId(
                null,
              );
            }
          }
          onChanged={
            async () => {
              const next =
                await loadBrowserAdminCatalog(
                  locale,
                );

              setModel(
                next,
              );
            }
          }
        />
      ) : null}

      <div
        className={
          styles.catalog
        }
      >
        {model.products.map(
          (product) => (
            <article
              key={
                product.productId
              }
              className={
                styles.product
              }
            >
              <header
                className={
                  styles.productHeading
                }
              >
                <div>
                  <span>
                    {
                      product.brand
                    }
                  </span>
                  <h3>
                    {
                      product.name
                    }
                  </h3>
                </div>

                <div
                  className={
                    styles.productActions
                  }
                >
                  <strong>
                    {
                      product.totalStock
                    }
                    {" "}
                    {
                      copy.units
                    }
                  </strong>

                  <button
                    type="button"
                    onClick={
                      () => {
                        setSelectedProductId(
                          product.productId,
                        );
                      }
                    }
                  >
                    {
                      copy.editProduct
                    }
                  </button>
                </div>
              </header>

              <div
                className={
                  styles.variants
                }
              >
                {product.variants.map(
                  (variant) => (
                    <div
                      key={
                        variant.variantId
                      }
                      className={
                        styles.variant
                      }
                      data-low-stock={
                        variant.lowStock
                      }
                    >
                      <span>
                        {
                          copy.sku
                        }
                        {" "}
                        {
                          variant.sku
                        }
                      </span>

                      <strong>
                        {
                          variant.priceLabel
                        }
                      </strong>

                      <span>
                        {
                          copy.stock
                        }
                        {" "}
                        {
                          variant.quantityOnHand
                        }
                      </span>

                      <span>
                        {
                          variant.lowStock
                            ? copy.attention
                            : copy.available
                        }
                      </span>
                    </div>
                  ),
                )}
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}