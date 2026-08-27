"use client";

import Link from "next/link";
import {
  useSyncExternalStore,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontAdminCopy,
} from "../../i18n/storefront-admin-copy";
import {
  getServerDemoSessionRole,
  readBrowserDemoSessionRole,
  subscribeBrowserDemoSession,
} from "../../features/session/browser-demo-session";

import styles from "./admin-storefront-controls.module.css";

type AdminStorefrontControlsProps =
  Readonly<{
    locale:
      StorefrontLocale;
    productId:
      string;
    productSlug:
      string;
    stockUnits:
      number;
  }>;

export function AdminStorefrontControls({
  locale,
  productId,
  productSlug,
  stockUnits,
}: AdminStorefrontControlsProps) {
  const role =
    useSyncExternalStore(
      subscribeBrowserDemoSession,
      readBrowserDemoSessionRole,
      getServerDemoSessionRole,
    );

  if (
    role !== "ADMIN"
  ) {
    return null;
  }

  const copy =
    getStorefrontAdminCopy(
      locale,
    );

  const productQuery =
    encodeURIComponent(
      productId,
    );

  return (
    <aside
      className={
        styles.root
      }
      aria-label={
        `${copy.adminMode}: ${productSlug}`
      }
    >
      <span
        className={
          styles.mode
        }
      >
        {
          copy.adminMode
        }
      </span>

      <span
        className={
          styles.stock
        }
      >
        {
          stockUnits
        }
        {" "}
        {
          copy.stockUnits
        }
      </span>

      <div
        className={
          styles.actions
        }
      >
        <Link
          href={
            `/${locale}/admin?view=catalog&product=${productQuery}`
          }
        >
          {
            copy.editProduct
          }
        </Link>

        <Link
          href={
            `/${locale}/admin?view=inventory&product=${productQuery}`
          }
        >
          {
            copy.inventory
          }
        </Link>
      </div>
    </aside>
  );
}