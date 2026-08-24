import {
  describe,
  expect,
  it,
} from "vitest";

import {
  BRL,
  createCurrencyCode,
} from "./currency-code";

describe("CurrencyCode", () => {
  it("normalizes a currency code", () => {
    expect(
      createCurrencyCode(" brl "),
    ).toBe("BRL");
  });

  it("provides BRL as the project baseline currency", () => {
    expect(BRL).toBe("BRL");
  });

  it("rejects an invalid currency code format", () => {
    expect(() =>
      createCurrencyCode("REAL"),
    ).toThrowError(
      expect.objectContaining({
        code: "CURRENCY_CODE_INVALID",
      }),
    );
  });
});