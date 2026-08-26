"use client";

import {
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

  useEffect(
    () => {
      let active = true;

      const load =
        () => {
          void getBrowserCartExperience()
            .load()
            .then(
              (snapshot) => {
                if (active) {
                  setCount(
                    snapshot.totalItems,
                  );
                }
              },
            )
            .catch(
              () => {
                if (active) {
                  setCount(0);
                }
              },
            );
        };

      queueMicrotask(load);

      const unsubscribe =
        subscribeBrowserCartChanged(
          load,
        );

      return () => {
        active = false;
        unsubscribe();
      };
    },
    [],
  );

  return (
    <span
      className={styles.root}
      aria-live="polite"
      aria-label={
        `${copy.cartLabel}: ${count}`
      }
      title={
        count === 0
          ? copy.emptyCart
          : copy.cartLabel
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
    </span>
  );
}