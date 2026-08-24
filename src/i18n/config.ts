export const locales = ["pt-BR", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-BR";

export const localeMeta = {
  "pt-BR": {
    code: "pt-BR",
    label: "Português",
    shortLabel: "PT",
    flag: "🇧🇷",
    htmlLang: "pt-BR",
  },

  en: {
    code: "en",
    label: "English",
    shortLabel: "EN",
    flag: "🇬🇧",
    htmlLang: "en",
  },

  es: {
    code: "es",
    label: "Español",
    shortLabel: "ES",
    flag: "🇪🇸",
    htmlLang: "es",
  },
} satisfies Record<
  Locale,
  {
    code: Locale;
    label: string;
    shortLabel: string;
    flag: string;
    htmlLang: string;
  }
>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }

  return value;
}