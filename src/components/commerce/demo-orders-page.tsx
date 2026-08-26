"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontOrdersCopy,
} from "../../i18n/storefront-orders-copy";
import {
  loadBrowserDemoOrders,
  resetBrowserDemoData,
} from "../../features/orders/browser-demo-orders";
import type {
  DemoOrderHistoryItem,
} from "../../presentation/orders/demo-order-history-model";
import {
  formatStorefrontMoney,
} from "../../presentation/storefront/storefront-home-model";

import {
  CartIndicator,
} from "./cart-indicator";

import styles from "./demo-orders-page.module.css";

type DemoOrdersPageProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

export function DemoOrdersPage({
  locale,
}: DemoOrdersPageProps) {
  const copy =
    getStorefrontOrdersCopy(
      locale,
    );

  const [
    orders,
    setOrders,
  ] =
    useState<
      readonly DemoOrderHistoryItem[]
    >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    confirmingReset,
    setConfirmingReset,
  ] = useState(false);

  const [
    resetting,
    setResetting,
  ] = useState(false);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  useEffect(
    () => {
      queueMicrotask(
        () => {
          void loadBrowserDemoOrders()
            .then(
              setOrders,
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
    [],
  );

  async function confirmReset() {
    if (resetting) {
      return;
    }

    setResetting(true);
    setFeedback("");

    try {
      await resetBrowserDemoData();

      setOrders([]);
      setConfirmingReset(false);
      setFeedback(
        copy.resetComplete,
      );
    } finally {
      setResetting(false);
    }
  }

  return (
    <main
      className={styles.page}
    >
      <a
        className="velora-skip-link"
        href="#orders-main-content"
      >
        {
          locale === "en"
            ? "Skip to content"
            : locale === "es"
              ? "Saltar al contenido"
              : "Pular para o conte\u00fado"
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
              `/${locale}`
            }
          >
            VELORA
          </Link>

          <Link
            className={styles.back}
            href={
              `/${locale}`
            }
          >
            <span
              aria-hidden="true"
            >
              &larr;
            </span>
            {
              copy.backToStore
            }
          </Link>

          <CartIndicator
            locale={locale}
          />
        </div>
      </header>

      <section
        id="orders-main-content"
        tabIndex={-1}
        className={styles.hero}
      >
        <p
          className={
            styles.eyebrow
          }
        >
          {
            copy.eyebrow
          }
        </p>

        <h1>
          {
            copy.title
          }
        </h1>

        <p
          className={
            styles.body
          }
        >
          {
            copy.body
          }
        </p>

        <div
          className={
            styles.notice
          }
          role="note"
        >
          {
            copy.noPaymentNotice
          }
        </div>
      </section>

      <section
        className={
          styles.history
        }
        aria-busy={
          loading
        }
      >
        {loading ? (
          <p>
            Loading...
          </p>
        ) : orders.length ===
          0 ? (
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

            <h2>
              {
                copy.emptyTitle
              }
            </h2>

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
            {orders.map(
              (order) => (
                <article
                  key={
                    order.orderId
                  }
                  className={
                    styles.card
                  }
                >
                  <span
                    className={
                      styles.reference
                    }
                  >
                    {
                      order.orderId
                    }
                  </span>

                  <dl>
                    <div>
                      <dt>
                        {
                          copy.status
                        }
                      </dt>
                      <dd>
                        {
                          order.status
                        }
                      </dd>
                    </div>

                    <div>
                      <dt>
                        {
                          copy.items
                        }
                      </dt>
                      <dd>
                        {
                          order.totalItems
                        }
                      </dd>
                    </div>

                    <div>
                      <dt>
                        {
                          copy.subtotal
                        }
                      </dt>
                      <dd>
                        {
                          formatStorefrontMoney(
                            locale,
                            order.subtotalMinorUnits,
                            order.currency,
                          )
                        }
                      </dd>
                    </div>
                  </dl>
                </article>
              ),
            )}
          </div>
        )}
      </section>

      <section
        className={
          styles.reset
        }
      >
        <h2>
          {
            copy.reset
          }
        </h2>

        <p>
          {
            copy.resetBody
          }
        </p>

        {confirmingReset ? (
          <div
            className={
              styles.resetActions
            }
          >
            <button
              type="button"
              className={
                styles.confirmReset
              }
              disabled={
                resetting
              }
              onClick={
                () => {
                  void confirmReset();
                }
              }
            >
              {
                copy.confirmReset
              }
            </button>

            <button
              type="button"
              className={
                styles.cancelReset
              }
              disabled={
                resetting
              }
              onClick={
                () => {
                  setConfirmingReset(
                    false,
                  );
                }
              }
            >
              {
                copy.cancelReset
              }
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={
              styles.resetTrigger
            }
            onClick={
              () => {
                setConfirmingReset(
                  true,
                );

                setFeedback("");
              }
            }
          >
            {
              copy.reset
            }
          </button>
        )}

        <div
          className={
            styles.feedback
          }
          role="status"
          aria-live="polite"
        >
          {feedback}
        </div>
      </section>
    </main>
  );
}