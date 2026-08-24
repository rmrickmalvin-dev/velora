import { DomainValidationError } from "../errors/domain-validation-error";

declare const currencyCodeBrand:
  unique symbol;

export type CurrencyCode =
  string & {
    readonly [currencyCodeBrand]:
      "CurrencyCode";
  };

const CURRENCY_CODE_PATTERN =
  /^[A-Z]{3}$/;

/**
 * Cria um código monetário estruturalmente válido.
 *
 * Exemplos:
 *
 * brl -> BRL
 * usd -> USD
 * eur -> EUR
 *
 * Esta validação garante o formato de três letras.
 * Ela não pretende ser, nesta fase, um catálogo
 * completo da ISO 4217.
 */
export function createCurrencyCode(
  value: string,
): CurrencyCode {
  const normalized =
    value.trim().toUpperCase();

  if (
    !CURRENCY_CODE_PATTERN.test(
      normalized,
    )
  ) {
    throw new DomainValidationError(
      "CURRENCY_CODE_INVALID",
      `Invalid currency code: ${value}`,
    );
  }

  return normalized as CurrencyCode;
}

export const BRL =
  createCurrencyCode("BRL");