import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontCopy,
  isStorefrontLocale,
  storefrontLocales,
} from "./storefront-copy";

describe(
  "Storefront copy",
  () => {
    it("exposes exactly the three official locales", () => {
      expect(
        storefrontLocales,
      ).toEqual([
        "pt-BR",
        "en",
        "es",
      ]);
    });

    it("recognizes supported locales", () => {
      expect(
        isStorefrontLocale(
          "pt-BR",
        ),
      ).toBe(true);

      expect(
        isStorefrontLocale("en"),
      ).toBe(true);

      expect(
        isStorefrontLocale("es"),
      ).toBe(true);
    });

    it("rejects unsupported locales", () => {
      expect(
        isStorefrontLocale(
          "fr",
        ),
      ).toBe(false);
    });

    it("keeps the official PT-BR slogan", () => {
      expect(
        getStorefrontCopy(
          "pt-BR",
        ).hero.title,
      ).toBe(
        "Tecnologia no seu ritmo.",
      );
    });

    it("keeps the official English slogan", () => {
      expect(
        getStorefrontCopy(
          "en",
        ).hero.title,
      ).toBe(
        "Technology at your pace.",
      );
    });

    it("keeps the official Spanish slogan", () => {
      expect(
        getStorefrontCopy(
          "es",
        ).hero.title,
      ).toBe(
        "Tecnologia a tu ritmo.",
      );
    });
  },
);