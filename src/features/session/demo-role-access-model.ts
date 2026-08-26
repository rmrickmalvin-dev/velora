import type {
  DemoSessionRole,
} from "./demo-session-model";
import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";

export type DemoRoleArea =
  | "CUSTOMER"
  | "ADMIN";

export function canAccessDemoRoleArea(
  role:
    DemoSessionRole,
  area:
    DemoRoleArea,
): boolean {
  return role === area;
}

export function getDemoRoleAreaPath(
  locale:
    StorefrontLocale,
  area:
    DemoRoleArea,
): string {
  return area ===
    "CUSTOMER"
    ? `/${locale}/account`
    : `/${locale}/admin`;
}