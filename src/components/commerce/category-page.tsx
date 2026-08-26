import Link from "next/link";

import type {
  StorefrontCategoryModel,
} from "../../presentation/storefront/storefront-category-model";

import {
  ProductDiscovery,
} from "./product-discovery";

import {
  getStorefrontAccessibilityCopy,
} from "../../i18n/storefront-accessibility-copy";

import styles from "./category-page.module.css";

type CategoryPageProps =
  Readonly<{
    model:
      StorefrontCategoryModel;
  }>;

export function CategoryPage({
  model,
}: CategoryPageProps) {
  const accessibility =
    getStorefrontAccessibilityCopy(
      model.locale,
    );

  return (
    <main
      className={styles.page}
    >
      <a
        className="velora-skip-link"
        href="#category-main-content"
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
              `/${model.locale}`
            }
          >
            VELORA
          </Link>

          <Link
            className={styles.back}
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
              model.backLabel
            }
          </Link>

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
        id="category-main-content"
        tabIndex={-1}
        className={styles.hero}
      >
        <p
          className={
            styles.eyebrow
          }
        >
          {
            model.eyebrow
          }
        </p>

        <h1>
          {
            model.title
          }
        </h1>

        <p
          className={
            styles.body
          }
        >
          {
            model.body
          }
        </p>
      </section>

      <section
        className={
          styles.products
        }
      >
        <ProductDiscovery
          locale={
            model.locale
          }
          products={
            model.products
          }
          showCategoryFilters={
            false
          }
        />
      </section>

      <footer
        className={styles.footer}
      >
        <strong>
          VELORA
        </strong>
        <span>
          Pearl Technology / Category
        </span>
      </footer>
    </main>
  );
}