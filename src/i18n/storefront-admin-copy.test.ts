import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontAdminCopy,
} from "./storefront-admin-copy";

describe(
  "Storefront Admin Copy",
  () => {
    it("provides PT-BR Admin mode copy", () => {
      expect(
        getStorefrontAdminCopy(
          "pt-BR",
        ).adminMode,
      ).toBe(
        "Modo Admin",
      );
    });

    it("provides English product edit copy", () => {
      expect(
        getStorefrontAdminCopy(
          "en",
        ).editProduct,
      ).toBe(
        "Edit product",
      );
    });

    it("provides Spanish Inventory copy", () => {
      expect(
        getStorefrontAdminCopy(
          "es",
        ).inventory,
      ).toBe(
        "Inventario",
      );
    });

    it("provides a localized Dashboard title", () => {
      expect(
        getStorefrontAdminCopy(
          "en",
        ).dashboardTitle,
      ).toContain(
        "Operational",
      );
    });

    it("provides SKU terminology", () => {
      expect(
        getStorefrontAdminCopy(
          "pt-BR",
        ).sku,
      ).toBe("SKU");
    });

    it("provides Low stock terminology", () => {
      expect(
        getStorefrontAdminCopy(
          "en",
        ).lowStock,
      ).toBe(
        "Low stock",
      );
    });

    it("marks this step as read-only", () => {
      expect(
        getStorefrontAdminCopy(
          "en",
        ).readOnlyNotice,
      ).toContain(
        "read-only",
      );
    });

    it("provides a loading state", () => {
      expect(
        getStorefrontAdminCopy(
          "es",
        ).loading,
      ).toContain(
        "Cargando",
      );
    });
  },
);