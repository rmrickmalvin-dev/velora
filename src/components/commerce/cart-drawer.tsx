"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontCartCopy,
} from "../../i18n/storefront-cart-copy";
import {
  getStorefrontCheckoutCopy,
} from "../../i18n/storefront-checkout-copy";
import {
  getStorefrontOrdersCopy,
} from "../../i18n/storefront-orders-copy";
import {
  emitBrowserCartChanged,
  getBrowserCartExperience,
  subscribeBrowserCartChanged,
} from "../../features/cart/browser-cart-runtime";
import type {
  CartExperienceSnapshot,
} from "../../features/cart/cart-experience";
import {
  formatStorefrontMoney,
} from "../../presentation/storefront/storefront-home-model";

import styles from "./cart-drawer.module.css";

type CartDrawerProps =
  Readonly<{
    locale:
      StorefrontLocale;
    open: boolean;
    onClose:
      () => void;
  }>;

const emptySnapshot:
  CartExperienceSnapshot =
    Object.freeze({
      totalItems: 0,
      lineCount: 0,
      subtotalMinorUnits:
        null,
      currency: null,
      lines:
        Object.freeze([]),
    });

export function CartDrawer({
  locale,
  open,
  onClose,
}: CartDrawerProps) {
  const copy =
    getStorefrontCartCopy(
      locale,
    );

  const checkoutCopy =
    getStorefrontCheckoutCopy(
      locale,
    );

  const ordersCopy =
    getStorefrontOrdersCopy(
      locale,
    );

  const [
    snapshot,
    setSnapshot,
  ] =
    useState<
      CartExperienceSnapshot
    >(
      emptySnapshot,
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const closeButton =
    useRef<
      HTMLButtonElement
    >(null);

  const load =
    useCallback(
      () => {
        setLoading(true);

        void getBrowserCartExperience()
          .load()
          .then(
            (next) => {
              setSnapshot(
                next,
              );
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
      [],
    );

  useEffect(
    () => {
      if (!open) {
        return;
      }

      const previousOverflow =
        document.body.style
          .overflow;

      document.body.style
        .overflow =
        "hidden";

      queueMicrotask(
        () => {
          load();

          closeButton.current
            ?.focus();
        },
      );

      const unsubscribe =
        subscribeBrowserCartChanged(
          load,
        );

      const onKeyDown =
        (
          event:
            KeyboardEvent,
        ) => {
          if (
            event.key ===
            "Escape"
          ) {
            onClose();
          }
        };

      window.addEventListener(
        "keydown",
        onKeyDown,
      );

      return () => {
        document.body.style
          .overflow =
          previousOverflow;

        unsubscribe();

        window.removeEventListener(
          "keydown",
          onKeyDown,
        );
      };
    },
    [
      load,
      onClose,
      open,
    ],
  );

  if (!open) {
    return null;
  }

  const itemNoun =
    snapshot.totalItems === 1
      ? copy.itemSingular
      : copy.itemPlural;

  const subtotal =
    snapshot.subtotalMinorUnits !==
      null &&
    snapshot.currency !==
      null
      ? formatStorefrontMoney(
          locale,
          snapshot.subtotalMinorUnits,
          snapshot.currency,
        )
      : "-";

  async function updateQuantity(
    cartItemId: string,
    productVariantId: string,
    quantity: number,
  ) {
    if (quantity < 1) {
      return;
    }

    setLoading(true);

    try {
      const next =
        await getBrowserCartExperience()
          .update(
            cartItemId,
            productVariantId,
            quantity,
          );

      setSnapshot(next);
      emitBrowserCartChanged();
    } finally {
      setLoading(false);
    }
  }

  async function removeLine(
    cartItemId: string,
    productVariantId: string,
  ) {
    setLoading(true);

    try {
      const next =
        await getBrowserCartExperience()
          .remove(
            cartItemId,
            productVariantId,
          );

      setSnapshot(next);
      emitBrowserCartChanged();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={styles.layer}
    >
      <button
        type="button"
        className={
          styles.backdrop
        }
        aria-label={
          copy.close
        }
        onClick={
          onClose
        }
      />

      <aside
        className={
          styles.drawer
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="velora-cart-title"
      >
        <header
          className={
            styles.header
          }
        >
          <div>
            <p>
              VELORA / CART
            </p>

            <h2
              id="velora-cart-title"
            >
              {
                copy.drawerTitle
              }
            </h2>

            <span>
              {
                snapshot.totalItems
              }
              {" "}
              {
                itemNoun
              }
            </span>
          </div>

          <button
            ref={
              closeButton
            }
            type="button"
            className={
              styles.close
            }
            aria-label={
              copy.close
            }
            onClick={
              onClose
            }
          >
            <span
              aria-hidden="true"
            >
              &times;
            </span>
          </button>
        </header>

        <div
          className={
            styles.content
          }
          aria-busy={
            loading
          }
        >
          {loading &&
          snapshot.lineCount ===
            0 ? (
            <p
              className={
                styles.loading
              }
            >
              {
                copy.loading
              }
            </p>
          ) : snapshot.lines
              .length === 0 ? (
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
                  copy.emptyCart
                }
              </h3>

              <p>
                {
                  copy.drawerBody
                }
              </p>
            </div>
          ) : (
            <div
              className={
                styles.lines
              }
            >
              {snapshot.lines.map(
                (line) => (
                  <article
                    key={
                      line.cartItemId
                    }
                    className={
                      styles.line
                    }
                  >
                    <div
                      className={
                        styles.lineHeading
                      }
                    >
                      <div>
                        <span
                          className={
                            styles.sku
                          }
                        >
                          {
                            line.sku
                          }
                        </span>

                        <h3>
                          {
                            line.productName
                          }
                        </h3>
                      </div>

                      <strong>
                        {
                          formatStorefrontMoney(
                            locale,
                            line.unitPriceMinorUnits *
                              line.quantity,
                            line.currency,
                          )
                        }
                      </strong>
                    </div>

                    <div
                      className={
                        styles.lineActions
                      }
                    >
                      <div
                        className={
                          styles.quantity
                        }
                        aria-label={
                          copy.quantity
                        }
                      >
                        <button
                          type="button"
                          disabled={
                            loading ||
                            line.quantity <=
                              1
                          }
                          aria-label={
                            copy.decrease
                          }
                          onClick={
                            () => {
                              void updateQuantity(
                                line.cartItemId,
                                line.productVariantId,
                                line.quantity -
                                  1,
                              );
                            }
                          }
                        >
                          -
                        </button>

                        <span>
                          {
                            line.quantity
                          }
                        </span>

                        <button
                          type="button"
                          disabled={
                            loading
                          }
                          aria-label={
                            copy.increase
                          }
                          onClick={
                            () => {
                              void updateQuantity(
                                line.cartItemId,
                                line.productVariantId,
                                line.quantity +
                                  1,
                              );
                            }
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className={
                          styles.remove
                        }
                        disabled={
                          loading
                        }
                        onClick={
                          () => {
                            void removeLine(
                              line.cartItemId,
                              line.productVariantId,
                            );
                          }
                        }
                      >
                        {
                          copy.remove
                        }
                      </button>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}
        </div>

        <footer
          className={
            styles.footer
          }
        >
          <div
            className={
              styles.subtotal
            }
          >
            <span>
              {
                copy.subtotal
              }
            </span>

            <strong>
              {subtotal}
            </strong>
          </div>

          {snapshot.lines.length >
          0 ? (
            <Link
              className={
                styles.checkout
              }
              href={
                `/${locale}/checkout`
              }
              onClick={
                onClose
              }
            >
              {
                checkoutCopy
                  .checkoutCta
              }
              <span
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          ) : null}

          <Link
            className={
              styles.history
            }
            href={
              `/${locale}/orders`
            }
            onClick={
              onClose
            }
          >
            {
              ordersCopy
                .historyCta
            }
          </Link>
        </footer>
      </aside>
    </div>
  );
}