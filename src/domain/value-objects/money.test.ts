import {
  describe,
  expect,
  it,
} from "vitest";

import {
  BRL,
  createCurrencyCode,
} from "./currency-code";

import {
  addMoney,
  compareMoney,
  createMoney,
  isNegativeMoney,
  moneyEquals,
  multiplyMoneyByInteger,
  subtractMoney,
  zeroMoney,
} from "./money";

describe("Money", () => {
  it("creates money using minor units", () => {
    const value =
      createMoney(1990, BRL);

    expect(value).toEqual({
      minorUnits: 1990,
      currency: "BRL",
    });
  });

  it("rejects fractional minor units", () => {
    expect(() =>
      createMoney(1990.5, BRL),
    ).toThrowError(
      expect.objectContaining({
        code: "MONEY_MINOR_UNITS_INVALID",
      }),
    );
  });

  it("adds values with the same currency", () => {
    const left =
      createMoney(9990, BRL);

    const right =
      createMoney(1000, BRL);

    expect(
      addMoney(left, right),
    ).toEqual({
      minorUnits: 10990,
      currency: "BRL",
    });
  });

  it("rejects arithmetic between different currencies", () => {
    const USD =
      createCurrencyCode("USD");

    const brl =
      createMoney(1000, BRL);

    const usd =
      createMoney(1000, USD);

    expect(() =>
      addMoney(brl, usd),
    ).toThrowError(
      expect.objectContaining({
        code:
          "MONEY_CURRENCY_MISMATCH",
      }),
    );
  });

  it("allows negative results", () => {
    const revenue =
      createMoney(10000, BRL);

    const costs =
      createMoney(12000, BRL);

    const result =
      subtractMoney(
        revenue,
        costs,
      );

    expect(result.minorUnits)
      .toBe(-2000);

    expect(
      isNegativeMoney(result),
    ).toBe(true);
  });

  it("multiplies money by an integer quantity", () => {
    const unitPrice =
      createMoney(9990, BRL);

    expect(
      multiplyMoneyByInteger(
        unitPrice,
        3,
      ),
    ).toEqual({
      minorUnits: 29970,
      currency: "BRL",
    });
  });

  it("rejects fractional multipliers", () => {
    const value =
      createMoney(1000, BRL);

    expect(() =>
      multiplyMoneyByInteger(
        value,
        1.5,
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "MONEY_MULTIPLIER_INVALID",
      }),
    );
  });

  it("creates zero money", () => {
    expect(
      zeroMoney(BRL),
    ).toEqual({
      minorUnits: 0,
      currency: "BRL",
    });
  });

  it("compares money of the same currency", () => {
    const smaller =
      createMoney(1000, BRL);

    const greater =
      createMoney(2000, BRL);

    expect(
      compareMoney(
        smaller,
        greater,
      ),
    ).toBe(-1);

    expect(
      compareMoney(
        greater,
        smaller,
      ),
    ).toBe(1);

    expect(
      compareMoney(
        smaller,
        createMoney(1000, BRL),
      ),
    ).toBe(0);
  });

  it("compares equality", () => {
    expect(
      moneyEquals(
        createMoney(1000, BRL),
        createMoney(1000, BRL),
      ),
    ).toBe(true);
  });
});