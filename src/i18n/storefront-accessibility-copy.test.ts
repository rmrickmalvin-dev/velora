import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontAccessibilityCopy,
} from "./storefront-accessibility-copy";

describe(
  "Storefront Accessibility Copy",
  () => {
    it("provides PT-BR skip-link copy", () => {
      expect(
        getStorefrontAccessibilityCopy(
          "pt-BR",
        ).skipToContent,
      ).toBe(
        "Pular para o conte\u00fado",
      );
    });

    it("provides English skip-link copy", () => {
      expect(
        getStorefrontAccessibilityCopy(
          "en",
        ).skipToContent,
      ).toBe(
        "Skip to content",
      );
    });

    it("provides Spanish skip-link copy", () => {
      expect(
        getStorefrontAccessibilityCopy(
          "es",
        ).skipToContent,
      ).toBe(
        "Saltar al contenido",
      );
    });

    it("provides localized primary navigation labels", () => {
      expect(
        getStorefrontAccessibilityCopy(
          "pt-BR",
        ).primaryNavigation,
      ).toContain(
        "Navega",
      );
    });

    it("provides localized language navigation labels", () => {
      expect(
        getStorefrontAccessibilityCopy(
          "en",
        ).languageNavigation,
      ).toBe(
        "Select language",
      );
    });

    it("returns stable readonly-shaped copy", () => {
      const copy =
        getStorefrontAccessibilityCopy(
          "es",
        );

      expect(
        Object.keys(copy),
      ).toEqual([
        "skipToContent",
        "primaryNavigation",
        "languageNavigation",
      ]);
    });
  },
);