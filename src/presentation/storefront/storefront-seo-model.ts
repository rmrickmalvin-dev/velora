import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";

export type StorefrontSeoModel =
  Readonly<{
    title: string;
    description: string;
    canonicalPath: string;
    languageAlternates:
      Readonly<
        Record<string, string>
      >;
    robots:
      Readonly<{
        index: true;
        follow: true;
      }>;
  }>;

function normalizeSuffix(
  suffix: string,
): string {
  const trimmed =
    suffix.trim();

  if (
    trimmed.length === 0 ||
    trimmed === "/"
  ) {
    return "";
  }

  return trimmed.startsWith("/")
    ? trimmed
    : `/${trimmed}`;
}

export function buildStorefrontSeoModel(
  locale:
    StorefrontLocale,
  title: string,
  description: string,
  suffix = "",
): StorefrontSeoModel {
  const normalizedSuffix =
    normalizeSuffix(
      suffix,
    );

  const localizedPath =
    (
      target:
        StorefrontLocale,
    ) =>
      `/${target}${normalizedSuffix}`;

  const languageAlternates =
    Object.freeze({
      "pt-BR":
        localizedPath(
          "pt-BR",
        ),
      en:
        localizedPath(
          "en",
        ),
      es:
        localizedPath(
          "es",
        ),
      "x-default":
        localizedPath(
          "pt-BR",
        ),
    });

  return Object.freeze({
    title,
    description,
    canonicalPath:
      localizedPath(
        locale,
      ),
    languageAlternates,
    robots:
      Object.freeze({
        index: true as const,
        follow: true as const,
      }),
  });
}