import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontAccountCopy,
} from "./storefront-account-copy";

describe(
  "Storefront Account Copy",
  () => {
    it("labels PT-BR account as demo", () => {
      expect(
        getStorefrontAccountCopy(
          "pt-BR",
        ).eyebrow,
      ).toContain(
        "DEMO",
      );
    });

    it("does not claim real authentication in English", () => {
      expect(
        getStorefrontAccountCopy(
          "en",
        ).localNotice,
      ).toContain(
        "no real authentication",
      );
    });

    it("provides Spanish Profile copy", () => {
      expect(
        getStorefrontAccountCopy(
          "es",
        ).profileTitle,
      ).toContain(
        "Perfil",
      );
    });

    it("provides a local-save CTA", () => {
      expect(
        getStorefrontAccountCopy(
          "en",
        ).save,
      ).toContain(
        "local",
      );
    });

    it("provides a fictional Profile reset CTA", () => {
      expect(
        getStorefrontAccountCopy(
          "pt-BR",
        ).restore,
      ).toContain(
        "fict",
      );
    });

    it("states that Orders are browser-local", () => {
      expect(
        getStorefrontAccountCopy(
          "en",
        ).ordersBody,
      ).toContain(
        "browser-local",
      );
    });

    it("does not state that Orders are verified Customer Orders", () => {
      expect(
        getStorefrontAccountCopy(
          "en",
        ).ordersBody,
      ).toContain(
        "not yet linked",
      );
    });

    it("provides an empty Order state", () => {
      expect(
        getStorefrontAccountCopy(
          "es",
        ).noOrders.length,
      ).toBeGreaterThan(10);
    });
  },
);