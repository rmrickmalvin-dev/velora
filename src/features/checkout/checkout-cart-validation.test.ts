import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CartExperienceSnapshot,
} from "../cart/cart-experience";
import {
  validateCheckoutCart,
} from "./checkout-cart-validation";

const ready:
  CartExperienceSnapshot =
  Object.freeze({
    totalItems: 1,
    lineCount: 1,
    subtotalMinorUnits:
      1000,
    currency: "BRL",
    lines:
      Object.freeze([
        Object.freeze({
          cartItemId: "item-1",
          productVariantId:
            "variant-1",
          productName:
            "Product",
          sku: "VEL-1",
          quantity: 1,
          unitPriceMinorUnits:
            1000,
          currency: "BRL",
        }),
      ]),
  });

describe(
  "Checkout Cart Validation",
  () => {
    it("accepts a coherent non-empty Cart", () => {
      expect(
        validateCheckoutCart(
          ready,
        ).ready,
      ).toBe(true);
    });

    it("rejects an empty Cart", () => {
      expect(
        validateCheckoutCart({
          ...ready,
          totalItems: 0,
          lineCount: 0,
          subtotalMinorUnits:
            null,
          currency: null,
          lines: [],
        }).issues,
      ).toContain(
        "EMPTY_CART",
      );
    });

    it("rejects zero quantity", () => {
      expect(
        validateCheckoutCart({
          ...ready,
          lines: [
            {
              ...ready.lines[0],
              quantity: 0,
            },
          ],
        }).issues,
      ).toContain(
        "INVALID_QUANTITY",
      );
    });

    it("rejects unsafe quantity", () => {
      expect(
        validateCheckoutCart({
          ...ready,
          lines: [
            {
              ...ready.lines[0],
              quantity:
                Number.MAX_SAFE_INTEGER +
                1,
            },
          ],
        }).issues,
      ).toContain(
        "INVALID_QUANTITY",
      );
    });

    it("requires subtotal for a non-empty Cart", () => {
      expect(
        validateCheckoutCart({
          ...ready,
          subtotalMinorUnits:
            null,
        }).issues,
      ).toContain(
        "MISSING_SUBTOTAL",
      );
    });

    it("requires currency for a non-empty Cart", () => {
      expect(
        validateCheckoutCart({
          ...ready,
          currency: null,
        }).issues,
      ).toContain(
        "MISSING_SUBTOTAL",
      );
    });

    it("rejects line currency mismatch", () => {
      expect(
        validateCheckoutCart({
          ...ready,
          lines: [
            {
              ...ready.lines[0],
              currency: "USD",
            },
          ],
        }).issues,
      ).toContain(
        "CURRENCY_MISMATCH",
      );
    });
  },
);