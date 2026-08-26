"use client";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";
import {
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontSessionCopy,
} from "../../i18n/storefront-session-copy";
import {
  getDemoRoleDestination,
  type DemoSessionRole,
} from "../../features/session/demo-session-model";
import {
  writeBrowserDemoSessionRole,
} from "../../features/session/browser-demo-session";

import {
  CartIndicator,
} from "../commerce/cart-indicator";

import styles from "./demo-session-page.module.css";

type DemoLoginPageProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

export function DemoLoginPage({
  locale,
}: DemoLoginPageProps) {
  const router =
    useRouter();

  const copy =
    getStorefrontSessionCopy(
      locale,
    );

  const [
    error,
    setError,
  ] = useState("");

  function selectRole(
    role:
      DemoSessionRole,
  ) {
    setError("");

    try {
      writeBrowserDemoSessionRole(
        role,
      );

      router.push(
        getDemoRoleDestination(
          locale,
          role,
        ),
      );
    } catch {
      setError(
        copy.storageError,
      );
    }
  }

  return (
    <main
      className={styles.page}
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
          {
            copy.loginEyebrow
          }
        </p>

        <h1>
          {
            copy.loginTitle
          }
        </h1>

        <p
          className={
            styles.body
          }
        >
          {
            copy.loginBody
          }
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
      </section>

      <section
        className={
          styles.roleGrid
        }
        aria-label={
          copy.chooseRole
        }
      >
        <button
          type="button"
          className={
            styles.roleCard
          }
          onClick={
            () => {
              selectRole(
                "CUSTOMER",
              );
            }
          }
        >
          <span>
            01 / CUSTOMER
          </span>

          <strong>
            {
              copy.customerCta
            }
          </strong>

          <p>
            {
              copy.accountBody
            }
          </p>
        </button>

        <button
          type="button"
          className={
            styles.roleCard
          }
          onClick={
            () => {
              selectRole(
                "ADMIN",
              );
            }
          }
        >
          <span>
            02 / ADMIN
          </span>

          <strong>
            {
              copy.adminCta
            }
          </strong>

          <p>
            {
              copy.adminBody
            }
          </p>
        </button>

        <button
          type="button"
          className={
            styles.guest
          }
          onClick={
            () => {
              selectRole(
                "GUEST",
              );
            }
          }
        >
          {
            copy.guestCta
          }
        </button>

        <div
          className={
            styles.feedback
          }
          role="status"
          aria-live="polite"
        >
          {error}
        </div>
      </section>
    </main>
  );
}