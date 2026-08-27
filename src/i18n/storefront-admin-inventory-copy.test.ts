import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontAdminInventoryCopy,
} from "./storefront-admin-inventory-copy";

describe(
  "Storefront Admin Inventory Copy",
  () => {
    it("provides PT-BR Inventory operation title", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "pt-BR",
        ).title,
      ).toContain(
        "estoque",
      );
    });

    it("provides English Entry action", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "en",
        ).entry,
      ).toBe("Entry");
    });

    it("provides Spanish Exit action", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "es",
        ).exit,
      ).toBe("Salida");
    });

    it("provides explicit movement confirmation copy", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "en",
        ).confirm,
      ).toContain(
        "Confirm",
      );
    });

    it("provides invalid amount guidance", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "en",
        ).invalidAmount,
      ).toContain(
        "integer",
      );
    });

    it("provides reason guidance", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "pt-BR",
        ).reasonRequired,
      ).toContain(
        "motivo",
      );
    });

    it("documents lack of Domain timestamp honestly", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "en",
        ).historyNotice,
      ).toContain(
        "does not contain a timestamp",
      );
    });

    it("provides localized success feedback", () => {
      expect(
        getStorefrontAdminInventoryCopy(
          "es",
        ).saved,
      ).toContain(
        "actualizado",
      );
    });
  },
);