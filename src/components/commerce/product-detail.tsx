"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  loadBrowserStorefrontProductDetail,
  subscribeBrowserStorefrontDataChanged,
} from "../../features/catalog/browser-storefront-catalog";
import Link from "next/link";

import type {
  StorefrontProductDetailModel,
} from "../../presentation/storefront/storefront-product-detail-model";

import {
  AdminStorefrontControls,
} from "../admin/admin-storefront-controls";
import {
  ProductVisual,
} from "./product-visual";

import {
  getStorefrontAccessibilityCopy,
} from "../../i18n/storefront-accessibility-copy";

import {
  AddToCartControl,
} from "./add-to-cart-control";
import {
  CartIndicator,
} from "./cart-indicator";

import styles from "./product-detail.module.css";

type ProductDetailProps =
  Readonly<{
    model:
      StorefrontProductDetailModel;
  }>;

export function ProductDetail({
  model: initialModel,
}: ProductDetailProps) {
  const accessibility =
    getStorefrontAccessibilityCopy(
      initialModel.locale,
    );

  const [
    runtimeModel,
    setRuntimeModel,
  ] =
    useState(
      initialModel,
    );

  useEffect(
    () => {
      let active =
        true;

      const refresh =
        () => {
          void loadBrowserStorefrontProductDetail(
            initialModel.locale,
            initialModel.slug,
          )
            .then(
              (next) => {
                if (
                  active &&
                  next
                ) {
                  setRuntimeModel(
                    next,
                  );
                }
              },
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

      return () => {
        active = false;
        unsubscribe();
      };
    },
    [
      initialModel.locale,
      initialModel.slug,
    ],
  );

  return (
    <main
      className={styles.page}
    >
      <a
        className="velora-skip-link"
        href="#product-main-content"
      >
        {
          accessibility
            .skipToContent
        }
      </a>
      <header
        className={styles.header}
      >
        <div
          className={
            styles.headerInner
          }
        >
          <Link
            className={styles.brand}
            href={
              `/${runtimeModel.locale}`
            }
          >
            VELORA
          </Link>

          <Link
            className={
              styles.back
            }
            href={
              runtimeModel.backHref
            }
          >
            <span
              aria-hidden="true"
            >
              &larr;
            </span>
            {
              runtimeModel.copy
                .backToStore
            }
          </Link>

          <CartIndicator
            locale={runtimeModel.locale}
          />

          <div
            className={
              styles.localeSwitch
            }
            role="navigation"
            aria-label={
              accessibility
                .languageNavigation
            }
          >
            {runtimeModel.localeLinks.map(
              (item) => (
                <Link
                  key={
                    item.locale
                  }
                  href={
                    item.href
                  }
                  hrefLang={
                    item.locale
                  }
                  aria-label={
                    item.label
                  }
                  aria-current={
                    item.locale ===
                    runtimeModel.locale
                      ? "page"
                      : undefined
                  }
                  className={
                    item.locale ===
                    runtimeModel.locale
                      ? styles.localeActive
                      : undefined
                  }
                >
                  {
                    item.shortLabel
                  }
                </Link>
              ),
            )}
          </div>
        </div>
      </header>

      <section
        id="product-main-content"
        tabIndex={-1}
        className={styles.hero}
      >
        <div
          className={
            styles.visual
          }
        >
          <div
            className={
              styles.visualGlow
            }
          />
          <ProductVisual
            visual={
              runtimeModel.visual
            }
            mode="detail"
          />
          <span
            className={
              styles.visualCode
            }
          >
            V / PRODUCT
          </span>
        </div>

        <div
          className={
            styles.summary
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            {
              runtimeModel.copy
                .eyebrow
            }
          </p>

          <span
            className={
              styles.category
            }
          >
            {
              runtimeModel.categoryLabel
            }
          </span>

          <h1>
            {
              runtimeModel.name
            }
          </h1>

          <p
            className={
              styles.brandName
            }
          >
            {
              runtimeModel.brand
            }
          </p>

          <AdminStorefrontControls
            locale={
              runtimeModel.locale
            }
            productId={
              runtimeModel.id
            }
            productSlug={
              runtimeModel.slug
            }
            stockUnits={
              runtimeModel.variants.reduce(
                (
                  total,
                  variant,
                ) =>
                  total +
                  variant.quantityOnHand,
                0,
              )
            }
          />

          <a
            className={
              styles.primary
            }
            href="#variants"
          >
            {
              runtimeModel.copy
                .viewVariants
            }
            <span
              aria-hidden="true"
            >
              &darr;
            </span>
          </a>

          <p
            className={
              styles.note
            }
          >
            {
              runtimeModel.copy
                .readOnlyNote
            }
          </p>
        </div>
      </section>

      <section
        id="variants"
        className={
          styles.variants
        }
      >
        <div
          className={
            styles.heading
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            VELORA / SKU
          </p>

          <h2>
            {
              runtimeModel.copy
                .variantsTitle
            }
          </h2>

          <p>
            {
              runtimeModel.copy
                .variantsBody
            }
          </p>
        </div>

        <div
          className={
            styles.variantGrid
          }
        >
          {runtimeModel.variants.map(
            (variant) => (
              <article
                key={
                  variant.id
                }
                className={
                  styles.variant
                }
              >
                <div
                  className={
                    styles.variantTop
                  }
                >
                  <span
                    className={
                      variant.available
                        ? styles.available
                        : styles.unavailable
                    }
                  >
                    {
                      variant.stockLabel
                    }
                  </span>

                  <span
                    className={
                      styles.sku
                    }
                  >
                    {
                      runtimeModel.copy.sku
                    }
                    {" "}
                    {
                      variant.sku
                    }
                  </span>
                </div>

                <h3>
                  {
                    variant.label
                  }
                </h3>

                <strong
                  className={
                    styles.price
                  }
                >
                  {
                    variant.priceLabel
                  }
                </strong>

                <span
                  className={
                    styles.quantity
                  }
                >
                  {
                    variant.quantityOnHand
                  }
                  {" "}
                  {
                    runtimeModel.copy
                      .units
                  }
                </span>

                <AddToCartControl
                  locale={
                    runtimeModel.locale
                  }
                  productVariantId={
                    variant.id
                  }
                  available={
                    variant.available
                  }
                />
              </article>
            ),
          )}
        </div>
      </section>

      <footer
        className={styles.footer}
      >
        <strong>
          VELORA
        </strong>
        <span>
          Pearl Technology / Product
        </span>
      </footer>
    </main>
  );
}
