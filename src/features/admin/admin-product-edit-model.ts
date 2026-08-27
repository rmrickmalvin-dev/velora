export type AdminProductDetailsInput =
  Readonly<{
    name: string;
    brand: string;
    model: string;
    featured: boolean;
  }>;

export type AdminProductDetailsField =
  | "name"
  | "brand"
  | "model";

export type AdminEditErrorCode =
  | "REQUIRED"
  | "TOO_SHORT"
  | "TOO_LONG"
  | "INVALID_PRICE";

export type AdminProductDetailsValidation =
  Readonly<{
    valid: boolean;
    values:
      AdminProductDetailsInput;
    errors:
      Readonly<
        Partial<
          Record<
            AdminProductDetailsField,
            AdminEditErrorCode
          >
        >
      >;
  }>;

export type AdminPriceValidation =
  Readonly<{
    valid: boolean;
    minorUnits:
      number | null;
    error:
      AdminEditErrorCode |
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

export function validateAdminProductDetails(
  input:
    AdminProductDetailsInput,
): AdminProductDetailsValidation {
  const values =
    Object.freeze({
      name:
        normalizeText(
          input.name,
        ),
      brand:
        normalizeText(
          input.brand,
        ),
      model:
        normalizeText(
          input.model,
        ),
      featured:
        input.featured,
    });

  const errors:
    Partial<
      Record<
        AdminProductDetailsField,
        AdminEditErrorCode
      >
    > = {};

  for (
    const field
    of [
      "name",
      "brand",
      "model",
    ] as const
  ) {
    const value =
      values[field];

    if (!value) {
      errors[field] =
        "REQUIRED";
    } else if (
      value.length < 2
    ) {
      errors[field] =
        "TOO_SHORT";
    } else if (
      value.length > 120
    ) {
      errors[field] =
        "TOO_LONG";
    }
  }

  return Object.freeze({
    valid:
      Object.keys(
        errors,
      ).length === 0,
    values,
    errors:
      Object.freeze(
        errors,
      ),
  });
}

export function parseAdminPriceInput(
  value: string,
): AdminPriceValidation {
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
    return Object.freeze({
      valid: false,
      minorUnits: null,
      error:
        "INVALID_PRICE",
    });
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

  if (
    !Number.isSafeInteger(
      minorUnits,
    ) ||
    minorUnits < 0
  ) {
    return Object.freeze({
      valid: false,
      minorUnits: null,
      error:
        "INVALID_PRICE",
    });
  }

  return Object.freeze({
    valid: true,
    minorUnits,
    error: null,
  });
}

export function formatAdminPriceInput(
  minorUnits: number,
): string {
  return (
    minorUnits / 100
  ).toFixed(2);
}