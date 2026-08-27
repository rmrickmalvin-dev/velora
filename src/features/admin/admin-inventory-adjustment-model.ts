export type AdminInventoryAction =
  | "ENTRY"
  | "EXIT"
  | "ADJUSTMENT";

export type AdminInventoryAdjustmentError =
  | "INVALID_AMOUNT"
  | "REASON_REQUIRED"
  | "REASON_TOO_SHORT"
  | "REASON_TOO_LONG";

export type AdminInventoryAdjustmentInput =
  Readonly<{
    type:
      AdminInventoryAction;
    amount: string;
    reason: string;
  }>;

export type AdminInventoryAdjustmentValidation =
  Readonly<{
    valid: boolean;
    type:
      AdminInventoryAction;
    delta:
      number | null;
    reason: string;
    errors:
      Readonly<{
        amount?:
          AdminInventoryAdjustmentError;
        reason?:
          AdminInventoryAdjustmentError;
      }>;
  }>;

export function validateAdminInventoryAdjustment(
  input:
    AdminInventoryAdjustmentInput,
): AdminInventoryAdjustmentValidation {
  const amount =
    input.amount.trim();

  const reason =
    input.reason
      .trim()
      .replace(
        /\s+/g,
        " ",
      );

  const errors: {
    amount?:
      AdminInventoryAdjustmentError;
    reason?:
      AdminInventoryAdjustmentError;
  } = {};

  const amountPattern =
    input.type ===
      "ADJUSTMENT"
      ? /^[+-]?\d+$/
      : /^\d+$/;

  let delta:
    number | null =
      null;

  if (
    !amountPattern.test(
      amount,
    )
  ) {
    errors.amount =
      "INVALID_AMOUNT";
  } else {
    const parsed =
      Number(amount);

    if (
      !Number.isSafeInteger(
        parsed,
      ) ||
      parsed === 0
    ) {
      errors.amount =
        "INVALID_AMOUNT";
    } else if (
      input.type !==
        "ADJUSTMENT" &&
      parsed < 1
    ) {
      errors.amount =
        "INVALID_AMOUNT";
    } else {
      delta =
        input.type ===
          "EXIT"
          ? -parsed
          : parsed;
    }
  }

  if (!reason) {
    errors.reason =
      "REASON_REQUIRED";
  } else if (
    reason.length < 3
  ) {
    errors.reason =
      "REASON_TOO_SHORT";
  } else if (
    reason.length > 160
  ) {
    errors.reason =
      "REASON_TOO_LONG";
  }

  return Object.freeze({
    valid:
      Object.keys(
        errors,
      ).length === 0,
    type:
      input.type,
    delta,
    reason,
    errors:
      Object.freeze(
        errors,
      ),
  });
}