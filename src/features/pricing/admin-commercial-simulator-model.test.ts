import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildAdminCommercialSimulation,
  formatBasisPoints,
  parseCommercialMoneyMinorUnits,
  parseDemoPromotionScenarioList,
  parseDiscountBasisPoints,
} from "./admin-commercial-simulator-model";

function input() {
  return {
    label:
      "Launch discount",
    code:
      "launch-10",
    productVariantId:
      "variant-demo",
    basePriceMinorUnits:
      500000,
    currency:
      "BRL",
    costText:
      "3000,00",
    discountText:
      "10",
  } as const;
}

describe(
  "Admin Commercial Simulator Model",
  () => {
    it("parses comma money input", () => {
      expect(
        parseCommercialMoneyMinorUnits(
          "123,45",
        ),
      ).toBe(12345);
    });

    it("parses dot money input", () => {
      expect(
        parseCommercialMoneyMinorUnits(
          "123.4",
        ),
      ).toBe(12340);
    });

    it("rejects money with more than two decimals", () => {
      expect(
        parseCommercialMoneyMinorUnits(
          "123.456",
        ),
      ).toBeNull();
    });

    it("parses percentage to basis points", () => {
      expect(
        parseDiscountBasisPoints(
          "12.5",
        ),
      ).toBe(1250);
    });

    it("parses comma percentage input", () => {
      expect(
        parseDiscountBasisPoints(
          "7,25",
        ),
      ).toBe(725);
    });

    it("rejects discount above 95 percent", () => {
      expect(
        parseDiscountBasisPoints(
          "95.01",
        ),
      ).toBeNull();
    });

    it("calculates promotional price", () => {
      expect(
        buildAdminCommercialSimulation(
          input(),
        ).draft
          ?.promotionalPriceMinorUnits,
      ).toBe(450000);
    });

    it("calculates gross profit", () => {
      expect(
        buildAdminCommercialSimulation(
          input(),
        ).draft
          ?.grossProfitMinorUnits,
      ).toBe(150000);
    });

    it("allows negative simulated gross profit", () => {
      expect(
        buildAdminCommercialSimulation({
          ...input(),
          costText:
            "6000",
        }).draft
          ?.grossProfitMinorUnits,
      ).toBe(-150000);
    });

    it("calculates gross margin basis points", () => {
      expect(
        buildAdminCommercialSimulation(
          input(),
        ).draft
          ?.grossMarginBasisPoints,
      ).toBe(3333);
    });

    it("normalizes promotional code to uppercase", () => {
      expect(
        buildAdminCommercialSimulation(
          input(),
        ).draft?.code,
      ).toBe(
        "LAUNCH-10",
      );
    });

    it("formats basis points for Presentation", () => {
      expect(
        formatBasisPoints(
          3333,
        ),
      ).toBe(
        "33.33",
      );
    });

    it("filters malformed persisted scenarios", () => {
      expect(
        parseDemoPromotionScenarioList([
          {
            nope: true,
          },
        ]),
      ).toEqual([]);
    });
  },
);