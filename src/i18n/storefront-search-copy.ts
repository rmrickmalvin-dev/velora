import type {
  StorefrontLocale,
} from "./storefront-copy";

export type StorefrontSearchCopy =
  Readonly<{
    hint: string;
    suggestions: string;
    clear: string;
    urlState: string;
  }>;

const copies:
  Record<
    StorefrontLocale,
    StorefrontSearchCopy
  > = {
    "pt-BR": {
      hint:
        "Busque por nome, marca, categoria ou identificador do produto.",
      suggestions:
        "Sugest\u00f5es",
      clear:
        "Limpar busca e filtros",
      urlState:
        "A busca fica refletida na URL para preservar a navega\u00e7\u00e3o local.",
    },
    en: {
      hint:
        "Search by Product name, Brand, Category or Product identifier.",
      suggestions:
        "Suggestions",
      clear:
        "Clear search and filters",
      urlState:
        "Search state is reflected in the URL to preserve local navigation.",
    },
    es: {
      hint:
        "Busca por nombre, marca, categor\u00eda o identificador del producto.",
      suggestions:
        "Sugerencias",
      clear:
        "Limpiar b\u00fasqueda y filtros",
      urlState:
        "El estado de b\u00fasqueda se refleja en la URL para preservar la navegaci\u00f3n local.",
    },
  };

export function getStorefrontSearchCopy(
  locale:
    StorefrontLocale,
): StorefrontSearchCopy {
  return copies[
    locale
  ];
}