"use client";

import {
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontCartCopy,
} from "../../i18n/storefront-cart-copy";
import {
  emitBrowserCartChanged,
  getBrowserCartExperience,
} from "../../features/cart/browser-cart-runtime";

import styles from "./add-to-cart-control.module.css";

type AddState =
  | "idle"
  | "adding"
  | "added"
  | "error";

type AddToCartControlProps =
  Readonly<{
    locale:
      StorefrontLocale;
    productVariantId:
      string;
    available:
      boolean;
  }>;

export function AddToCartControl({
  locale,
  productVariantId,
  available,
}: AddToCartControlProps) {
  const copy =
    getStorefrontCartCopy(
      locale,
    );

  const [
    state,
    setState,
  ] =
    useState<
      AddState
    >("idle");

  const pending =
    state ===
    "adding";

  const feedback =
    state === "added"
      ? copy.added
      : state === "error"
        ? copy.error
        : "";

  async function handleAdd() {
    if (
      !available ||
      pending
    ) {
      return;
    }

    setState(
      "adding",
    );

    try {
      await getBrowserCartExperience()
        .add(
          productVariantId,
        );

      emitBrowserCartChanged();

      setState(
        "added",
      );
    } catch {
      setState(
        "error",
      );
    }
  }

  return (
    <div
      className={styles.root}
    >
      <button
        type="button"
        className={
          styles.button
        }
        disabled={
          !available ||
          pending
        }
        onClick={
          () => {
            void handleAdd();
          }
        }
      >
        {
          !available
            ? copy.unavailable
            : pending
              ? copy.adding
              : copy.addToCart
        }
      </button>

      <span
        className={
          styles.feedback
        }
        role="status"
        aria-live="polite"
      >
        {feedback}
      </span>
    </div>
  );
}