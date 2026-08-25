import { DomainValidationError } from "../errors/domain-validation-error";

declare const slugBrand:
  unique symbol;

export type Slug =
  string & {
    readonly [slugBrand]: "Slug";
  };

const MAX_SLUG_LENGTH = 96;

const SLUG_PATTERN =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeSlug(
  value: string,
) {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

export function createSlug(
  value: string,
): Slug {
  const normalized =
    normalizeSlug(value);

  if (!normalized) {
    throw new DomainValidationError(
      "SLUG_EMPTY",
      "Slug cannot be empty.",
    );
  }

  if (
    normalized.length >
    MAX_SLUG_LENGTH
  ) {
    throw new DomainValidationError(
      "SLUG_LENGTH_INVALID",
      `Slug cannot exceed ${MAX_SLUG_LENGTH} characters.`,
    );
  }

  if (
    !SLUG_PATTERN.test(normalized)
  ) {
    throw new DomainValidationError(
      "SLUG_FORMAT_INVALID",
      `Invalid slug format: ${value}`,
    );
  }

  return normalized as Slug;
}