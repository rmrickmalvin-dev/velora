import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getDemoRoleLabel,
  getStorefrontSessionCopy,
} from "./storefront-session-copy";

describe(
  "Storefront Session Copy",
  () => {
    it("provides PT-BR Customer quick entry", () => {
      expect(
        getStorefrontSessionCopy(
          "pt-BR",
        ).customerCta,
      ).toBe(
        "Explorar como cliente",
      );
    });

    it("provides PT-BR Admin quick entry", () => {
      expect(
        getStorefrontSessionCopy(
          "pt-BR",
        ).adminCta,
      ).toBe(
        "Explorar painel administrativo",
      );
    });

    it("provides an English demo-auth disclaimer", () => {
      expect(
        getStorefrontSessionCopy(
          "en",
        ).demoNotice,
      ).toContain(
        "not real authentication",
      );
    });

    it("provides a Spanish Guest action", () => {
      expect(
        getStorefrontSessionCopy(
          "es",
        ).guestCta,
      ).toContain(
        "visitante",
      );
    });

    it("labels GUEST by locale", () => {
      expect(
        getDemoRoleLabel(
          "en",
          "GUEST",
        ),
      ).toBe("Guest");
    });

    it("labels CUSTOMER by locale", () => {
      expect(
        getDemoRoleLabel(
          "pt-BR",
          "CUSTOMER",
        ),
      ).toBe("Cliente");
    });

    it("labels ADMIN by locale", () => {
      expect(
        getDemoRoleLabel(
          "es",
          "ADMIN",
        ),
      ).toBe("Admin");
    });

    it("keeps Admin copy explicit about later controls", () => {
      expect(
        getStorefrontSessionCopy(
          "en",
        ).adminBody,
      ).toContain(
        "later",
      );
    });
  },
);