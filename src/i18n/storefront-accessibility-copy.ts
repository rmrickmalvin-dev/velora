import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontAccessibilityCopy =
  Readonly<{
    skipToContent: string;
    primaryNavigation: string;
    languageNavigation: string;
  }>;

const accessibilityCopy:
  Record<
    StorefrontLocale,
    StorefrontAccessibilityCopy
  > = {
    "pt-BR": {
      skipToContent:
        "Pular para o conte\u00fado",
      primaryNavigation:
        "Navega\u00e7\u00e3o principal",
      languageNavigation:
        "Selecionar idioma",
    },
    en: {
      skipToContent:
        "Skip to content",
      primaryNavigation:
        "Primary navigation",
      languageNavigation:
        "Select language",
    },
    es: {
      skipToContent:
        "Saltar al contenido",
      primaryNavigation:
        "Navegaci\u00f3n principal",
      languageNavigation:
        "Seleccionar idioma",
    },
  };

export function getStorefrontAccessibilityCopy(
  locale:
    StorefrontLocale,
): StorefrontAccessibilityCopy {
  return accessibilityCopy[
    locale
  ];
}