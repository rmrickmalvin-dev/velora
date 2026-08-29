import type {
  MetadataRoute,
} from "next";

import {
  getVeloraSiteOrigin,
} from "../lib/site-origin";

const locales =
  [
    "pt-BR",
    "en",
    "es",
  ] as const;

const privateRoutes =
  [
    "account",
    "admin",
    "checkout",
    "login",
    "orders",
  ] as const;

export default function robots():
  MetadataRoute.Robots {
  const origin =
    getVeloraSiteOrigin();

  const disallow =
    locales.flatMap(
      (locale) =>
        privateRoutes.map(
          (route) =>
            `/${locale}/${route}`,
        ),
    );

  return {
    rules: {
      userAgent:
        "*",
      allow:
        "/",
      disallow,
    },
    ...(
      origin
        ? {
            sitemap:
              new URL(
                "/sitemap.xml",
                origin,
              ).toString(),
          }
        : {}
    ),
  };
}