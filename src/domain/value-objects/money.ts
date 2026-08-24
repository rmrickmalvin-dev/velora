import { DomainValidationError } from "../errors/domain-validation-error";
import type { CurrencyCode } from "./currency-code";

export type Money = Readonly<{
  minorUnits: number;
  currency: CurrencyCode;
}>;

function assertMinorUnits(
  minorUnits: number,
) {
  if (
    !Number.isSafeInteger(minorUnits)
  ) {
    throw new DomainValidationError(
      "MONEY_MINOR_UNITS_INVALID",
      "Money minorUnits must be a safe integer.",
    );
  }
}

function assertSameCurrency(
  left: Money,
  right: Money,
) {
  if (
    left.currency !== right.currency
  ) {
    throw new DomainValidationError(
      "MONEY_CURRENCY_MISMATCH",
      `Cannot operate on ${left.currency} and ${right.currency}.`,
    );
  }
}

export function createMoney(
  minorUnits: number,
  currency: CurrencyCode,
): Money {
  assertMinorUnits(minorUnits);

  return Object.freeze({
    minorUnits,
    currency,
  });
}

export function zeroMoney(
  currency: CurrencyCode,
): Money {
  return createMoney(
    0,
    currency,
  );
}

export function addMoney(
  left: Money,
  right: Money,
): Money {
  assertSameCurrency(left, right);

  return createMoney(
    left.minorUnits +
      right.minorUnits,
    left.currency,
  );
}

export function subtractMoney(
  left: Money,
  right: Money,
): Money {
  assertSameCurrency(left, right);

  return createMoney(
    left.minorUnits -
      right.minorUnits,
    left.currency,
  );
}

export function multiplyMoneyByInteger(
  money: Money,
  multiplier: number,
): Money {
  if (
    !Number.isSafeInteger(multiplier) ||
    multiplier < 0
  ) {
    throw new DomainValidationError(
      "MONEY_MULTIPLIER_INVALID",
      "Money multiplier must be a non-negative safe integer.",
    );
  }

  return createMoney(
    money.minorUnits * multiplier,
    money.currency,
  );
}

export function compareMoney(
  left: Money,
  right: Money,
): -1 | 0 | 1 {
  assertSameCurrency(left, right);

  if (
    left.minorUnits <
    right.minorUnits
  ) {
    return -1;
  }

  if (
    left.minorUnits >
    right.minorUnits
  ) {
    return 1;
  }

  return 0;
}

export function moneyEquals(
  left: Money,
  right: Money,
): boolean {
  return (
    left.currency === right.currency &&
    left.minorUnits === right.minorUnits
  );
}

export function isNegativeMoney(
  money: Money,
): boolean {
  return money.minorUnits < 0;
}