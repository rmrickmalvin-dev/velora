import { DomainValidationError } from "../errors/domain-validation-error";

declare const skuBrand:
  unique symbol;

export type SKU =
  string & {
    readonly [skuBrand]: "SKU";
  };

const MIN_SKU_LENGTH = 3;
const MAX_SKU_LENGTH = 64;

const SKU_PATTERN =
  /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

function normalizeSku(
  value: string,
) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createSku(
  value: string,
): SKU {
  const normalized =
    normalizeSku(value);

  if (
    normalized.length <
      MIN_SKU_LENGTH ||
    normalized.length >
      MAX_SKU_LENGTH
  ) {
    throw new DomainValidationError(
      "SKU_LENGTH_INVALID",
      `SKU must contain between ${MIN_SKU_LENGTH} and ${MAX_SKU_LENGTH} characters.`,
    );
  }

  if (
    !SKU_PATTERN.test(normalized)
  ) {
    throw new DomainValidationError(
      "SKU_FORMAT_INVALID",
      `Invalid SKU format: ${value}`,
    );
  }

  return normalized as SKU;
}