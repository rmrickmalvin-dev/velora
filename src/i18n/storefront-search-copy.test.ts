import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontSearchCopy,
} from "./storefront-search-copy";

describe(
  "Storefront Search Copy",
  () => {
    it("provides PT-BR Search guidance", () => {
      expect(
        getStorefrontSearchCopy(
          "pt-BR",
        ).hint,
      ).toContain(
        "marca",
      );
    });

    it("provides English Search guidance", () => {
      expect(
        getStorefrontSearchCopy(
          "en",
        ).hint,
      ).toContain(
        "Product",
      );
    });

    it("provides Spanish Search guidance", () => {
      expect(
        getStorefrontSearchCopy(
          "es",
        ).hint,
      ).toContain(
        "marca",
      );
    });

    it("provides localized Suggestions label", () => {
      expect(
        getStorefrontSearchCopy(
          "pt-BR",
        ).suggestions,
      ).toContain(
        "Sugest",
      );
    });

    it("provides a clear action", () => {
      expect(
        getStorefrontSearchCopy(
          "en",
        ).clear,
      ).toContain(
        "Clear",
      );
    });

    it("documents URL navigation state in PT-BR", () => {
      expect(
        getStorefrontSearchCopy(
          "pt-BR",
        ).urlState,
      ).toContain(
        "URL",
      );
    });

    it("documents URL navigation state in English", () => {
      expect(
        getStorefrontSearchCopy(
          "en",
        ).urlState,
      ).toContain(
        "URL",
      );
    });

    it("documents URL navigation state in Spanish", () => {
      expect(
        getStorefrontSearchCopy(
          "es",
        ).urlState,
      ).toContain(
        "URL",
      );
    });
  },
);