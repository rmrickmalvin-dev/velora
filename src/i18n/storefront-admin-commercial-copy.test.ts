import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontAdminCommercialCopy,
} from "./storefront-admin-commercial-copy";

describe(
  "Storefront Admin Commercial Copy",
  () => {
    it("provides PT-BR simulator title", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "pt-BR",
        ).title,
      ).toContain(
        "Simulador",
      );
    });

    it("provides English Promotion language", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "en",
        ).title,
      ).toContain(
        "promotion",
      );
    });

    it("provides Spanish discount label", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "es",
        ).discount,
      ).toContain(
        "Descuento",
      );
    });

    it("explicitly says scenarios do not change Product price", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "en",
        ).simulationNotice,
      ).toContain(
        "do not change Product price",
      );
    });

    it("explicitly excludes real charges", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "en",
        ).simulationNotice,
      ).toContain(
        "real charge",
      );
    });

    it("provides gross margin copy", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "pt-BR",
        ).grossMargin,
      ).toContain(
        "Margem",
      );
    });

    it("provides local scenario save copy", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "en",
        ).confirmSave,
      ).toContain(
        "local",
      );
    });

    it("documents global reset behavior", () => {
      expect(
        getStorefrontAdminCommercialCopy(
          "es",
        ).resetNotice,
      ).toContain(
        "reset",
      );
    });
  },
);