"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isLocale,
  localeMeta,
  locales,
  type Locale,
} from "@/i18n/config";

import styles from "./locale-switcher.module.css";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  ariaLabel: string;
};

/**
 * Substitui somente o segmento de idioma da URL.
 *
 * Exemplos:
 *
 * /pt-BR
 * -> /en
 *
 * /pt-BR/product/aster-one-x-pro
 * -> /en/product/aster-one-x-pro
 *
 * A navegação equivalente é preservada.
 */
function buildLocalizedPath(
  pathname: string,
  nextLocale: Locale,
) {
  const segments = pathname.split("/");

  /*
   * pathname:
   *
   * /pt-BR/product/example
   *
   * split:
   *
   * ["", "pt-BR", "product", "example"]
   */

  const currentLocaleSegment = segments[1];

  if (
    currentLocaleSegment &&
    isLocale(currentLocaleSegment)
  ) {
    segments[1] = nextLocale;

    return segments.join("/") || `/${nextLocale}`;
  }

  /*
   * Fallback defensivo.
   *
   * Normalmente o Proxy garantirá que as rotas
   * públicas possuam locale.
   */

  if (pathname === "/") {
    return `/${nextLocale}`;
  }

  return `/${nextLocale}${pathname}`;
}

export function LocaleSwitcher({
  currentLocale,
  ariaLabel,
}: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      className={styles.switcher}
      aria-label={ariaLabel}
    >
      {locales.map((locale) => {
        const metadata = localeMeta[locale];

        const isActive =
          locale === currentLocale;

        const href = buildLocalizedPath(
          pathname,
          locale,
        );

        return (
          <Link
            key={locale}
            href={href}
            className={styles.locale}
            data-active={isActive}
            aria-current={
              isActive ? "page" : undefined
            }
            hrefLang={metadata.htmlLang}
            title={metadata.label}
          >
            <span
              className={styles.flag}
              aria-hidden="true"
            >
              {metadata.flag}
            </span>

            <span className={styles.label}>
              {metadata.label}
            </span>

            <span
              className={styles.shortLabel}
              aria-hidden="true"
            >
              {metadata.shortLabel}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}