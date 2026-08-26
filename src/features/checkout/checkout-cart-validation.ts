import type {
  CartExperienceSnapshot,
} from "../cart/cart-experience";

export type CheckoutCartIssue =
  | "EMPTY_CART"
  | "INVALID_QUANTITY"
  | "MISSING_SUBTOTAL"
  | "CURRENCY_MISMATCH";

export type CheckoutCartValidation =
  Readonly<{
    ready: boolean;
    issues:
      readonly CheckoutCartIssue[];
  }>;

export function validateCheckoutCart(
  snapshot:
    CartExperienceSnapshot,
): CheckoutCartValidation {
  const issues:
    CheckoutCartIssue[] =
    [];

  if (
    snapshot.lines.length ===
    0
  ) {
    issues.push(
      "EMPTY_CART",
    );
  }

  if (
    snapshot.lines.some(
      (line) =>
        !Number.isSafeInteger(
          line.quantity,
        ) ||
        line.quantity < 1,
    )
  ) {
    issues.push(
      "INVALID_QUANTITY",
    );
  }

  if (
    snapshot.lines.length >
      0 &&
    (
      snapshot.subtotalMinorUnits ===
        null ||
      snapshot.currency ===
        null
    )
  ) {
    issues.push(
      "MISSING_SUBTOTAL",
    );
  }

  if (
    snapshot.currency !==
      null &&
    snapshot.lines.some(
      (line) =>
        line.currency !==
        snapshot.currency,
    )
  ) {
    issues.push(
      "CURRENCY_MISMATCH",
    );
  }

  return Object.freeze({
    ready:
      issues.length ===
      0,
    issues:
      Object.freeze(
        issues,
      ),
  });
}