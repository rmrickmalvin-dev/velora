import type {
  MetadataRoute,
} from "next";

import {
  createStaticVeloraRuntime,
} from "../infrastructure/composition/create-static-velora-runtime";
import {
  getVeloraSiteOrigin,
} from "../lib/site-origin";

const locales =
  [
    "pt-BR",
    "en",
    "es",
  ] as const;

const categories =
  [
    "smartphone",
    "audio",
    "power",
    "protection",
  ] as const;

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {
  const origin =
    getVeloraSiteOrigin();

  if (!origin) {
    return [];
  }

  const products =
    await createStaticVeloraRuntime()
      .application
      .listStorefrontProducts();

  const entries:
    MetadataRoute.Sitemap =
      [];

  for (const locale of locales) {
    entries.push({
      url:
        new URL(
          `/${locale}`,
          origin,
        ).toString(),
      changeFrequency:
        "weekly",
      priority:
        1,
    });

    for (
      const category
      of categories
    ) {
      entries.push({
        url:
          new URL(
            `/${locale}/categories/${category}`,
            origin,
          ).toString(),
        changeFrequency:
          "weekly",
        priority:
          0.8,
      });
    }

    for (const product of products) {
      entries.push({
        url:
          new URL(
            `/${locale}/products/${product.product.slug}`,
            origin,
          ).toString(),
        changeFrequency:
          "weekly",
        priority:
          0.7,
      });
    }
  }

  return entries;
}