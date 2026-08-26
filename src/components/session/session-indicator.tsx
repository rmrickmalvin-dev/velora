"use client";

import Link from "next/link";
import {
  useSyncExternalStore,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getDemoRoleLabel,
  getStorefrontSessionCopy,
} from "../../i18n/storefront-session-copy";
import {
  getDemoRoleDestination,
  getDemoRoleLoginPath,
} from "../../features/session/demo-session-model";
import {
  getServerDemoSessionRole,
  readBrowserDemoSessionRole,
  subscribeBrowserDemoSession,
} from "../../features/session/browser-demo-session";

import styles from "./session-indicator.module.css";

type SessionIndicatorProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

export function SessionIndicator({
  locale,
}: SessionIndicatorProps) {
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

  const roleLabel =
    getDemoRoleLabel(
      locale,
      role,
    );

  const href =
    role === "GUEST"
      ? getDemoRoleLoginPath(
          locale,
        )
      : getDemoRoleDestination(
          locale,
          role,
        );

  return (
    <Link
      className={
        styles.root
      }
      href={href}
      aria-label={
        `${copy.sessionLabel}: ${roleLabel}. ${copy.switchRole}`
      }
      data-demo-role={
        role
      }
    >
      <span
        className={
          styles.status
        }
        aria-hidden="true"
      />

      <span
        className={
          styles.copy
        }
      >
        <small>
          {
            copy.sessionModeNotice
          }
        </small>

        <strong>
          {roleLabel}
        </strong>
      </span>
    </Link>
  );
}