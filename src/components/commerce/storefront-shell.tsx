import Link from "next/link";

import type {
  StorefrontHomeModel,
} from "../../presentation/storefront/storefront-home-model";

import {
  ProductDiscovery,
} from "./product-discovery";

import styles from "./storefront-shell.module.css";

type StorefrontShellProps =
  Readonly<{
    model:
      StorefrontHomeModel;
  }>;

export function StorefrontShell({
  model,
}: StorefrontShellProps) {
  const {
    copy,
    locale,
    localeLinks,
    products,
  } = model;

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
          <a
            className={styles.brand}
            href="#top"
            aria-label="VELORA"
          >
            VELORA
          </a>

          <nav
            className={styles.nav}
            aria-label="Primary"
          >
            <a href="#featured">
              {
                copy.nav
                  .featured
              }
            </a>
            <a href="#categories">
              {
                copy.nav
                  .categories
              }
            </a>
            <a href="#experience">
              {
                copy.nav
                  .experience
              }
            </a>
          </nav>

          <div
            className={
              styles.localeSwitch
            }
            aria-label="Language"
          >
            {localeLinks.map(
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
                    locale
                      ? "page"
                      : undefined
                  }
                  className={
                    item.locale ===
                    locale
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
        id="top"
        className={styles.hero}
      >
        <div
          className={
            styles.heroContent
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            {
              copy.hero
                .eyebrow
            }
          </p>

          <h1>
            {
              copy.hero
                .title
            }
          </h1>

          <p
            className={
              styles.heroBody
            }
          >
            {
              copy.hero.body
            }
          </p>

          <div
            className={
              styles.heroActions
            }
          >
            <a
              className={
                styles.primaryButton
              }
              href="#featured"
            >
              {
                copy.hero
                  .primaryCta
              }
              <span
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>

            <a
              className={
                styles.secondaryButton
              }
              href="#categories"
            >
              {
                copy.hero
                  .secondaryCta
              }
            </a>
          </div>

          <div
            className={
              styles.proof
            }
          >
            <span
              className={
                styles.proofDot
              }
              aria-hidden="true"
            />
            {
              copy.hero.proof
            }
          </div>
        </div>

        <div
          className={
            styles.heroVisual
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
              styles.heroDeviceBack
            }
          />
          <div
            className={
              styles.heroDevice
            }
          >
            <div
              className={
                styles.cameraCluster
              }
            >
              <span />
              <span />
              <span />
            </div>
            <div
              className={
                styles.deviceMark
              }
            >
              V
            </div>
          </div>
          <div
            className={
              styles.heroSpec
            }
          >
            <span>
              VELORA
            </span>
            <strong>
              PEARL / 01
            </strong>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className={styles.section}
      >
        <div
          className={
            styles.sectionHeading
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            {
              copy.categories
                .eyebrow
            }
          </p>
          <h2>
            {
              copy.categories
                .title
            }
          </h2>
          <p>
            {
              copy.categories
                .body
            }
          </p>
        </div>

        <div
          className={
            styles.categoryGrid
          }
        >
          {[
            [
              "01",
              copy.categories
                .smartphone,
              "smartphone",
            ],
            [
              "02",
              copy.categories
                .audio,
              "audio",
            ],
            [
              "03",
              copy.categories
                .power,
              "power",
            ],
            [
              "04",
              copy.categories
                .protection,
              "protection",
            ],
          ].map(
            ([
              number,
              label,
              visual,
            ]) => (
              <article
                key={number}
                className={
                  styles.categoryCard
                }
                data-visual={
                  visual
                }
              >
                <span
                  className={
                    styles.categoryNumber
                  }
                >
                  {number}
                </span>
                <div
                  className={
                    styles.categoryArt
                  }
                  aria-hidden="true"
                />
                <h3>
                  {label}
                </h3>
              </article>
            ),
          )}
        </div>
      </section>

      <section
        id="featured"
        className={
          styles.featuredSection
        }
      >
        <div
          className={
            styles.sectionHeading
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            {
              copy.featured
                .eyebrow
            }
          </p>
          <h2>
            {
              copy.featured
                .title
            }
          </h2>
          <p>
            {
              copy.featured
                .body
            }
          </p>
        </div>

        <ProductDiscovery
          locale={locale}
          products={products}
        />
      </section>

      <section
        id="experience"
        className={
          styles.experience
        }
      >
        <div
          className={
            styles.experienceIntro
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            {
              copy.experience
                .eyebrow
            }
          </p>
          <h2>
            {
              copy.experience
                .title
            }
          </h2>
          <p>
            {
              copy.experience
                .body
            }
          </p>
        </div>

        <div
          className={
            styles.experienceGrid
          }
        >
          {[
            [
              "01",
              copy.experience
                .pointOneTitle,
              copy.experience
                .pointOneBody,
            ],
            [
              "02",
              copy.experience
                .pointTwoTitle,
              copy.experience
                .pointTwoBody,
            ],
            [
              "03",
              copy.experience
                .pointThreeTitle,
              copy.experience
                .pointThreeBody,
            ],
          ].map(
            ([
              number,
              title,
              body,
            ]) => (
              <article
                key={number}
                className={
                  styles.experienceCard
                }
              >
                <span>
                  {number}
                </span>
                <h3>
                  {title}
                </h3>
                <p>
                  {body}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <footer
        className={styles.footer}
      >
        <div>
          <strong>
            {
              copy.footer
                .statement
            }
          </strong>
          <span>
            {
              copy.footer
                .portfolio
            }
          </span>
        </div>
        <span
          className={
            styles.footerMark
          }
        >
          V / 02
        </span>
      </footer>
    </main>
  );
}