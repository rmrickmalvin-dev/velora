import type {
  Metadata,
} from "next";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontSessionCopy,
} from "../../i18n/storefront-session-copy";
import {
  buildStorefrontSeoModel,
} from "../../presentation/storefront/storefront-seo-model";

export type DemoSessionRouteKind =
  | "login"
  | "account"
  | "admin";

export function buildDemoSessionMetadata(
  locale:
    StorefrontLocale,
  kind:
    DemoSessionRouteKind,
): Metadata {
  const copy =
    getStorefrontSessionCopy(
      locale,
    );

  const title =
    kind === "login"
      ? copy.loginTitle
      : kind === "account"
        ? copy.accountTitle
        : copy.adminTitle;

  const description =
    kind === "login"
      ? copy.demoNotice
      : kind === "account"
        ? copy.accountBody
        : copy.adminBody;

  const seo =
    buildStorefrontSeoModel(
      locale,
      `${title} | VELORA`,
      description,
      `/${kind}`,
    );

  return {
    title:
      seo.title,
    description:
      seo.description,
    alternates: {
      canonical:
        seo.canonicalPath,
      languages:
        seo.languageAlternates,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}