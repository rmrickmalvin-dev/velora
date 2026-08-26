import type {
  StorefrontProduct,
} from "../../application/use-cases/storefront-query";

export type StorefrontVisualCategory =
  | "smartphone"
  | "audio"
  | "power"
  | "protection";

export type StorefrontProductVisual =
  Readonly<{
    canonicalMediaUrl:
      string | null;
    canonicalAlt:
      string | null;
    fallbackAsset: string;
  }>;

const fallbackAssets:
  Record<
    StorefrontVisualCategory,
    string
  > = {
    smartphone:
      "/images/velora/smartphone.svg",
    audio:
      "/images/velora/audio.svg",
    power:
      "/images/velora/power.svg",
    protection:
      "/images/velora/protection.svg",
  };

export function getStorefrontFallbackAsset(
  category:
    StorefrontVisualCategory,
): string {
  return fallbackAssets[
    category
  ];
}

export function buildStorefrontProductVisual(
  product:
    StorefrontProduct,
  category:
    StorefrontVisualCategory,
): StorefrontProductVisual {
  const primaryMedia =
    [...product.media]
      .sort(
        (left, right) =>
          left.position -
          right.position,
      )[0] ?? null;

  return Object.freeze({
    canonicalMediaUrl:
      primaryMedia?.url ??
      null,
    canonicalAlt:
      primaryMedia?.alt ??
      null,
    fallbackAsset:
      getStorefrontFallbackAsset(
        category,
      ),
  });
}