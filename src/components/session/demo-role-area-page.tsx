"use client";

import Link from "next/link";
import {
  useSyncExternalStore,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontSessionCopy,
} from "../../i18n/storefront-session-copy";
import {
  getDemoRoleLoginPath,
} from "../../features/session/demo-session-model";
import {
  canAccessDemoRoleArea,
  type DemoRoleArea,
} from "../../features/session/demo-role-access-model";
import {
  getServerDemoSessionRole,
  readBrowserDemoSessionRole,
  subscribeBrowserDemoSession,
} from "../../features/session/browser-demo-session";

import {
  AdminCatalogDashboard,
} from "../admin/admin-catalog-dashboard";
import {
  AdminOrdersPanel,
} from "../admin/admin-orders-panel";
import {
  CartIndicator,
} from "../commerce/cart-indicator";
import {
  CustomerAccountPanel,
} from "../customer/customer-account-panel";

import styles from "./demo-session-page.module.css";

type DemoRoleAreaPageProps =
  Readonly<{
    locale:
      StorefrontLocale;
    area:
      DemoRoleArea;
  }>;

export function DemoRoleAreaPage({
  locale,
  area,
}: DemoRoleAreaPageProps) {
  const role =
    useSyncExternalStore(
      subscribeBrowserDemoSession,
      readBrowserDemoSessionRole,
      getServerDemoSessionRole,
    );

  const copy =
    getStorefrontSessionCopy(
      locale,
    );

  const allowed =
    canAccessDemoRoleArea(
      role,
      area,
    );

  const eyebrow =
    area ===
      "CUSTOMER"
      ? copy.accountEyebrow
      : copy.adminEyebrow;

  const title =
    area ===
      "CUSTOMER"
      ? copy.accountTitle
      : copy.adminTitle;

  const body =
    area ===
      "CUSTOMER"
      ? copy.accountBody
      : copy.adminBody;

  return (
    <main
      className={
        styles.page
      }
    >
      <header
        className={
          styles.header
        }
      >
        <Link
          className={
            styles.brand
          }
          href={
            `/${locale}`
          }
        >
          VELORA
        </Link>

        <CartIndicator
          locale={locale}
        />
      </header>

      <section
        className={
          styles.hero
        }
      >
        <p
          className={
            styles.eyebrow
          }
        >
          {eyebrow}
        </p>

        {allowed ? (
          <>
            <h1>
              {title}
            </h1>

            <p
              className={
                styles.body
              }
            >
              {body}
            </p>

            <div
              className={
                styles.notice
              }
              role="note"
            >
              {
                copy.demoNotice
              }
            </div>

            <div
              className={
                styles.workspace
              }
            >
              <span>
                {
                  area ===
                    "ADMIN"
                    ? "ADMIN / FOUNDATION"
                    : "CUSTOMER / FOUNDATION"
                }
              </span>

              <p>
                {
                  copy.sessionModeNotice
                }
              </p>

              <div
                className={
                  styles.actions
                }
              >
                <Link
                  href={
                    `/${locale}`
                  }
                >
                  {
                    copy.storeCta
                  }
                </Link>

                <Link
                  href={
                    `/${locale}/orders`
                  }
                >
                  {
                    copy.ordersCta
                  }
                </Link>

                <Link
                  href={
                    getDemoRoleLoginPath(
                      locale,
                    )
                  }
                >
                  {
                    copy.switchRole
                  }
                </Link>
              </div>
            </div>

            {area ===
            "CUSTOMER" ? (
              <CustomerAccountPanel
                locale={locale}
              />
            ) : null}

            {area ===
            "ADMIN" ? (
              <>
                <AdminCatalogDashboard
                  locale={locale}
                />

                <AdminOrdersPanel
                  locale={locale}
                />
              </>
            ) : null}
          </>
        ) : (
          <div
            className={
              styles.access
            }
          >
            <h1>
              {
                copy.accessTitle
              }
            </h1>

            <p>
              {
                copy.accessBody
              }
            </p>

            <Link
              href={
                getDemoRoleLoginPath(
                  locale,
                )
              }
            >
              {
                copy.chooseRole
              }
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}