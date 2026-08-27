import {
  describe,
  expect,
  it,
} from "vitest";

import {
  formatAdminPriceInput,
  parseAdminPriceInput,
  validateAdminProductDetails,
} from "./admin-product-edit-model";

describe(
  "Admin Product Edit Model",
  () => {
    it("normalizes Product detail whitespace", () => {
      expect(
        validateAdminProductDetails({
          name:
            "  Aster   Air  ",
          brand:
            " Aster ",
          model:
            " Air ",
          featured: true,
        }).values.name,
      ).toBe(
        "Aster Air",
      );
    });

    it("accepts complete Product details", () => {
      expect(
        validateAdminProductDetails({
          name:
            "Aster Air",
          brand:
            "Aster",
          model:
            "Air",
          featured: true,
        }).valid,
      ).toBe(true);
    });

    it("rejects missing Product name", () => {
      expect(
        validateAdminProductDetails({
          name: "",
          brand:
            "Aster",
          model:
            "Air",
          featured: true,
        }).errors.name,
      ).toBe(
        "REQUIRED",
      );
    });

    it("rejects too-short Brand", () => {
      expect(
        validateAdminProductDetails({
          name:
            "Aster Air",
          brand: "A",
          model:
            "Air",
          featured: true,
        }).errors.brand,
      ).toBe(
        "TOO_SHORT",
      );
    });

    it("rejects overly long Model", () => {
      expect(
        validateAdminProductDetails({
          name:
            "Aster Air",
          brand:
            "Aster",
          model:
            "x".repeat(121),
          featured: true,
        }).errors.model,
      ).toBe(
        "TOO_LONG",
      );
    });

    it("parses decimal price with dot", () => {
      expect(
        parseAdminPriceInput(
          "4999.90",
        ).minorUnits,
      ).toBe(499990);
    });

    it("parses decimal price with comma", () => {
      expect(
        parseAdminPriceInput(
          "4999,90",
        ).minorUnits,
      ).toBe(499990);
    });

    it("parses whole-unit price", () => {
      expect(
        parseAdminPriceInput(
          "4999",
        ).minorUnits,
      ).toBe(499900);
    });

    it("rejects malformed price", () => {
      expect(
        parseAdminPriceInput(
          "49.99.90",
        ).valid,
      ).toBe(false);
    });

    it("formats minor units for Admin input", () => {
      expect(
        formatAdminPriceInput(
          499990,
        ),
      ).toBe(
        "4999.90",
      );
    });
  },
);