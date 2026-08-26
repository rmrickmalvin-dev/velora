import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateCheckoutForm,
} from "./checkout-form-model";

const valid = {
  fullName:
    "Richard Alves",
  email:
    "richard@example.com",
  addressLine:
    "Rua Exemplo 100",
  city:
    "Sao Paulo",
  postalCode:
    "01001-000",
} as const;

describe(
  "Checkout Form Model",
  () => {
    it("accepts a complete valid form", () => {
      expect(
        validateCheckoutForm(
          valid,
        ).valid,
      ).toBe(true);
    });

    it("normalizes surrounding whitespace", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          fullName:
            "  Richard   Alves  ",
        }).values.fullName,
      ).toBe(
        "Richard Alves",
      );
    });

    it("normalizes email case", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          email:
            "RICHARD@EXAMPLE.COM",
        }).values.email,
      ).toBe(
        "richard@example.com",
      );
    });

    it("rejects empty required fields", () => {
      const result =
        validateCheckoutForm({
          ...valid,
          city: "",
        });

      expect(
        result.errors.city,
      ).toBe(
        "REQUIRED",
      );
    });

    it("rejects malformed email", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          email:
            "invalid-email",
        }).errors.email,
      ).toBe(
        "INVALID_EMAIL",
      );
    });

    it("rejects a too-short full name", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          fullName: "R",
        }).errors.fullName,
      ).toBe(
        "TOO_SHORT",
      );
    });

    it("rejects a too-short address", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          addressLine: "Rua",
        }).errors.addressLine,
      ).toBe(
        "TOO_SHORT",
      );
    });

    it("rejects a too-short city", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          city: "S",
        }).errors.city,
      ).toBe(
        "TOO_SHORT",
      );
    });

    it("accepts postal codes with spaces or dashes", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          postalCode:
            "SW1A 1AA",
        }).valid,
      ).toBe(true);
    });

    it("rejects malformed postal code", () => {
      expect(
        validateCheckoutForm({
          ...valid,
          postalCode: "@",
        }).errors.postalCode,
      ).toBe(
        "INVALID_POSTAL",
      );
    });
  },
);