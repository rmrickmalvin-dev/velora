import Link from "next/link";

import type {
  StorefrontProductDetailModel,
} from "../../presentation/storefront/storefront-product-detail-model";

import styles from "./product-detail.module.css";

type ProductDetailProps =
  Readonly<{
    model:
      StorefrontProductDetailModel;
  }>;

export function ProductDetail({
  model,
}: ProductDetailProps) {
  return (
    <main
      className={styles.page}
    >
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
              `/${model.locale}`
            }
          >
            VELORA
          </Link>

          <Link
            className={
              styles.back
            }
            href={
              model.backHref
            }
          >
            <span
              aria-hidden="true"
            >
              &larr;
            </span>
            {
              model.copy
                .backToStore
            }
          </Link>

          <div
            className={
              styles.localeSwitch
            }
            aria-label="Language"
          >
            {model.localeLinks.map(
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
                    model.locale
                      ? "page"
                      : undefined
                  }
                  className={
                    item.locale ===
                    model.locale
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
        className={styles.hero}
      >
        <div
          className={
            styles.visual
          }
          data-category={
            model.categoryKey
          }
          aria-hidden="true"
        >
          <div
            className={
              styles.visualGlow
            }
          />
          <div
            className={
              styles.productObject
            }
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
              model.copy
                .eyebrow
            }
          </p>

          <span
            className={
              styles.category
            }
          >
            {
              model.categoryLabel
            }
          </span>

          <h1>
            {
              model.name
            }
          </h1>

          <p
            className={
              styles.brandName
            }
          >
            {
              model.brand
            }
          </p>

          <a
            className={
              styles.primary
            }
            href="#variants"
          >
            {
              model.copy
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
              model.copy
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
              model.copy
                .variantsTitle
            }
          </h2>

          <p>
            {
              model.copy
                .variantsBody
            }
          </p>
        </div>

        <div
          className={
            styles.variantGrid
          }
        >
          {model.variants.map(
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
                      model.copy.sku
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
                    model.copy
                      .units
                  }
                </span>
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