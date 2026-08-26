"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontCartCopy,
} from "../../i18n/storefront-cart-copy";
import {
  getBrowserCartExperience,
  subscribeBrowserCartChanged,
} from "../../features/cart/browser-cart-runtime";

import {
  CartDrawer,
} from "./cart-drawer";

import styles from "./cart-indicator.module.css";

type CartIndicatorProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

export function CartIndicator({
  locale,
}: CartIndicatorProps) {
  const copy =
    getStorefrontCartCopy(
      locale,
    );

  const [
    count,
    setCount,
  ] = useState(0);

  const [
    open,
    setOpen,
  ] = useState(false);

  const refresh =
    useCallback(
      () => {
        void getBrowserCartExperience()
          .load()
          .then(
            (snapshot) => {
              setCount(
                snapshot.totalItems,
              );
            },
          )
          .catch(
            () => {
              setCount(0);
            },
          );
      },
      [],
    );

  useEffect(
    () => {
      queueMicrotask(
        refresh,
      );

      return subscribeBrowserCartChanged(
        refresh,
      );
    },
    [
      refresh,
    ],
  );

  return (
    <>
      <button
        type="button"
        className={styles.root}
        aria-live="polite"
        aria-haspopup="dialog"
        aria-expanded={
          open
        }
        aria-label={
          `${copy.cartLabel}: ${count}`
        }
        title={
          count === 0
            ? copy.emptyCart
            : copy.cartLabel
        }
        onClick={
          () => {
            setOpen(true);
          }
        }
      >
        <span
          aria-hidden="true"
          className={
            styles.label
          }
        >
          {
            copy.cartLabel
          }
        </span>

        <strong>
          {count}
        </strong>
      </button>

      <CartDrawer
        locale={locale}
        open={open}
        onClose={
          () => {
            setOpen(false);
          }
        }
      />
    </>
  );
}