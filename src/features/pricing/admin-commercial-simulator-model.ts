export type AdminCommercialField =
  | "label"
  | "code"
  | "cost"
  | "discount";

export type AdminCommercialError =
  | "REQUIRED"
  | "TOO_SHORT"
  | "TOO_LONG"
  | "INVALID_CODE"
  | "INVALID_COST"
  | "INVALID_DISCOUNT";

export type AdminCommercialSimulationInput =
  Readonly<{
    label: string;
    code: string;
    productVariantId: string;
    basePriceMinorUnits: number;
    currency: string;
    costText: string;
    discountText: string;
  }>;

export type DemoPromotionScenarioDraft =
  Readonly<{
    label: string;
    code: string;
    productVariantId: string;
    basePriceMinorUnits: number;
    currency: string;
    costMinorUnits: number;
    discountBasisPoints: number;
    discountMinorUnits: number;
    promotionalPriceMinorUnits: number;
    grossProfitMinorUnits: number;
    grossMarginBasisPoints: number;
  }>;

export type DemoPromotionScenario =
  DemoPromotionScenarioDraft &
  Readonly<{
    id: string;
  }>;

export type AdminCommercialSimulation =
  Readonly<{
    valid: boolean;
    errors:
      Readonly<
        Partial<
          Record<
            AdminCommercialField,
            AdminCommercialError
          >
        >
      >;
    draft:
      DemoPromotionScenarioDraft |
      null;
  }>;

function normalizeText(
  value: string,
): string {
  return value
    .trim()
    .replace(
      /\s+/g,
      " ",
    );
}

export function parseCommercialMoneyMinorUnits(
  value: string,
): number | null {
  const normalized =
    value
      .trim()
      .replace(
        ",",
        ".",
      );

  if (
    !/^\d+(?:\.\d{1,2})?$/.test(
      normalized,
    )
  ) {
    return null;
  }

  const [
    whole,
    fraction = "",
  ] =
    normalized.split(".");

  const minorUnits =
    Number(whole) *
      100 +
    Number(
      fraction.padEnd(
        2,
        "0",
      ),
    );

  return Number.isSafeInteger(
    minorUnits,
  )
    ? minorUnits
    : null;
}

export function parseDiscountBasisPoints(
  value: string,
): number | null {
  const normalized =
    value
      .trim()
      .replace(
        ",",
        ".",
      );

  if (
    !/^\d+(?:\.\d{1,2})?$/.test(
      normalized,
    )
  ) {
    return null;
  }

  const basisPoints =
    Math.round(
      Number(normalized) *
        100,
    );

  if (
    !Number.isSafeInteger(
      basisPoints,
    ) ||
    basisPoints < 1 ||
    basisPoints > 9500
  ) {
    return null;
  }

  return basisPoints;
}

export function formatBasisPoints(
  basisPoints: number,
): string {
  return (
    basisPoints /
    100
  ).toFixed(2);
}

export function buildAdminCommercialSimulation(
  input:
    AdminCommercialSimulationInput,
): AdminCommercialSimulation {
  const label =
    normalizeText(
      input.label,
    );

  const code =
    input.code
      .trim()
      .toUpperCase();

  const errors:
    Partial<
      Record<
        AdminCommercialField,
        AdminCommercialError
      >
    > = {};

  if (!label) {
    errors.label =
      "REQUIRED";
  } else if (
    label.length < 3
  ) {
    errors.label =
      "TOO_SHORT";
  } else if (
    label.length > 60
  ) {
    errors.label =
      "TOO_LONG";
  }

  if (!code) {
    errors.code =
      "REQUIRED";
  } else if (
    !/^[A-Z0-9-]{3,24}$/.test(
      code,
    )
  ) {
    errors.code =
      "INVALID_CODE";
  }

  const costMinorUnits =
    parseCommercialMoneyMinorUnits(
      input.costText,
    );

  if (
    costMinorUnits ===
      null
  ) {
    errors.cost =
      "INVALID_COST";
  }

  const discountBasisPoints =
    parseDiscountBasisPoints(
      input.discountText,
    );

  if (
    discountBasisPoints ===
      null
  ) {
    errors.discount =
      "INVALID_DISCOUNT";
  }

  if (
    !Number.isSafeInteger(
      input.basePriceMinorUnits,
    ) ||
    input.basePriceMinorUnits <
      0
  ) {
    errors.discount =
      "INVALID_DISCOUNT";
  }

  if (
    Object.keys(
      errors,
    ).length > 0 ||
    costMinorUnits ===
      null ||
    discountBasisPoints ===
      null
  ) {
    return Object.freeze({
      valid: false,
      errors:
        Object.freeze(
          errors,
        ),
      draft: null,
    });
  }

  const discountMinorUnits =
    Math.round(
      (
        input.basePriceMinorUnits *
        discountBasisPoints
      ) /
        10000,
    );

  const promotionalPriceMinorUnits =
    input.basePriceMinorUnits -
    discountMinorUnits;

  const grossProfitMinorUnits =
    promotionalPriceMinorUnits -
    costMinorUnits;

  const grossMarginBasisPoints =
    promotionalPriceMinorUnits >
      0
      ? Math.round(
          (
            grossProfitMinorUnits *
            10000
          ) /
            promotionalPriceMinorUnits,
        )
      : 0;

  return Object.freeze({
    valid: true,
    errors:
      Object.freeze({}),
    draft:
      Object.freeze({
        label,
        code,
        productVariantId:
          input.productVariantId,
        basePriceMinorUnits:
          input.basePriceMinorUnits,
        currency:
          input.currency,
        costMinorUnits,
        discountBasisPoints,
        discountMinorUnits,
        promotionalPriceMinorUnits,
        grossProfitMinorUnits,
        grossMarginBasisPoints,
      }),
  });
}

export function parseDemoPromotionScenarioList(
  value: unknown,
): readonly DemoPromotionScenario[] {
  if (!Array.isArray(value)) {
    return Object.freeze([]);
  }

  const scenarios:
    DemoPromotionScenario[] =
      [];

  for (const item of value) {
    if (
      !item ||
      typeof item !==
        "object"
    ) {
      continue;
    }

    const record =
      item as
        Record<
          string,
          unknown
        >;

    if (
      typeof record.id !==
        "string" ||
      typeof record.label !==
        "string" ||
      typeof record.code !==
        "string" ||
      typeof record.productVariantId !==
        "string" ||
      typeof record.currency !==
        "string" ||
      typeof record.basePriceMinorUnits !==
        "number" ||
      typeof record.costMinorUnits !==
        "number" ||
      typeof record.discountBasisPoints !==
        "number" ||
      typeof record.discountMinorUnits !==
        "number" ||
      typeof record.promotionalPriceMinorUnits !==
        "number" ||
      typeof record.grossProfitMinorUnits !==
        "number" ||
      typeof record.grossMarginBasisPoints !==
        "number"
    ) {
      continue;
    }

    scenarios.push(
      Object.freeze({
        id:
          record.id,
        label:
          record.label,
        code:
          record.code,
        productVariantId:
          record.productVariantId,
        currency:
          record.currency,
        basePriceMinorUnits:
          record.basePriceMinorUnits,
        costMinorUnits:
          record.costMinorUnits,
        discountBasisPoints:
          record.discountBasisPoints,
        discountMinorUnits:
          record.discountMinorUnits,
        promotionalPriceMinorUnits:
          record.promotionalPriceMinorUnits,
        grossProfitMinorUnits:
          record.grossProfitMinorUnits,
        grossMarginBasisPoints:
          record.grossMarginBasisPoints,
      }),
    );
  }

  return Object.freeze(
    scenarios,
  );
}