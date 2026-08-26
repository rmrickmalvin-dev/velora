import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";

export type DemoSessionRole =
  | "GUEST"
  | "CUSTOMER"
  | "ADMIN";

export const defaultDemoSessionRole:
  DemoSessionRole =
  "GUEST";

export function isDemoSessionRole(
  value:
    unknown,
): value is
  DemoSessionRole {
  return (
    value === "GUEST" ||
    value === "CUSTOMER" ||
    value === "ADMIN"
  );
}

export function parseDemoSessionRole(
  value:
    string | null |
    undefined,
): DemoSessionRole {
  return isDemoSessionRole(
    value,
  )
    ? value
    : defaultDemoSessionRole;
}

export function getDemoRoleDestination(
  locale:
    StorefrontLocale,
  role:
    DemoSessionRole,
): string {
  if (
    role ===
    "CUSTOMER"
  ) {
    return `/${locale}/account`;
  }

  if (
    role ===
    "ADMIN"
  ) {
    return `/${locale}/admin`;
  }

  return `/${locale}`;
}

export function getDemoRoleLoginPath(
  locale:
    StorefrontLocale,
): string {
  return `/${locale}/login`;
}