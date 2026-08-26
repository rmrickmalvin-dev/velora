export type CheckoutFormField =
  | "fullName"
  | "email"
  | "addressLine"
  | "city"
  | "postalCode";

export type CheckoutFormInput =
  Readonly<
    Record<
      CheckoutFormField,
      string
    >
  >;

export type CheckoutFormErrorCode =
  | "REQUIRED"
  | "INVALID_EMAIL"
  | "TOO_SHORT"
  | "INVALID_POSTAL";

export type CheckoutFormValidation =
  Readonly<{
    valid: boolean;
    values:
      CheckoutFormInput;
    errors:
      Readonly<
        Partial<
          Record<
            CheckoutFormField,
            CheckoutFormErrorCode
          >
        >
      >;
  }>;

function normalize(
  value: string,
): string {
  return value
    .trim()
    .replace(
      /\s+/g,
      " ",
    );
}

function normalizeEmail(
  value: string,
): string {
  return normalize(
    value,
  ).toLowerCase();
}

function validEmail(
  value: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

function validPostalCode(
  value: string,
): boolean {
  const compact =
    value.replace(
      /[\s-]/g,
      "",
    );

  return /^[A-Za-z0-9]{3,12}$/.test(
    compact,
  );
}

export function validateCheckoutForm(
  input:
    CheckoutFormInput,
): CheckoutFormValidation {
  const values:
    CheckoutFormInput =
    Object.freeze({
      fullName:
        normalize(
          input.fullName,
        ),
      email:
        normalizeEmail(
          input.email,
        ),
      addressLine:
        normalize(
          input.addressLine,
        ),
      city:
        normalize(
          input.city,
        ),
      postalCode:
        normalize(
          input.postalCode,
        ),
    });

  const errors:
    Partial<
      Record<
        CheckoutFormField,
        CheckoutFormErrorCode
      >
    > = {};

  for (
    const field
    of [
      "fullName",
      "email",
      "addressLine",
      "city",
      "postalCode",
    ] as const
  ) {
    if (
      values[field].length ===
      0
    ) {
      errors[field] =
        "REQUIRED";
    }
  }

  if (
    !errors.fullName &&
    values.fullName.length <
      3
  ) {
    errors.fullName =
      "TOO_SHORT";
  }

  if (
    !errors.email &&
    !validEmail(
      values.email,
    )
  ) {
    errors.email =
      "INVALID_EMAIL";
  }

  if (
    !errors.addressLine &&
    values.addressLine.length <
      5
  ) {
    errors.addressLine =
      "TOO_SHORT";
  }

  if (
    !errors.city &&
    values.city.length <
      2
  ) {
    errors.city =
      "TOO_SHORT";
  }

  if (
    !errors.postalCode &&
    !validPostalCode(
      values.postalCode,
    )
  ) {
    errors.postalCode =
      "INVALID_POSTAL";
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