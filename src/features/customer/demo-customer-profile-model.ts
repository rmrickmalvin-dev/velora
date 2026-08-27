export type DemoCustomerProfile =
  Readonly<{
    fullName: string;
    email: string;
    phone: string;
    city: string;
  }>;

export type DemoCustomerProfileField =
  keyof DemoCustomerProfile;

export type DemoCustomerProfileError =
  | "REQUIRED"
  | "TOO_SHORT"
  | "TOO_LONG"
  | "INVALID_EMAIL"
  | "INVALID_PHONE";

export type DemoCustomerProfileValidation =
  Readonly<{
    valid: boolean;
    values:
      DemoCustomerProfile;
    errors:
      Readonly<
        Partial<
          Record<
            DemoCustomerProfileField,
            DemoCustomerProfileError
          >
        >
      >;
  }>;

export const defaultDemoCustomerProfile:
  DemoCustomerProfile =
    Object.freeze({
      fullName:
        "Marina Costa",
      email:
        "marina.costa@example.com",
      phone:
        "(11) 99999-0000",
      city:
        "S\u00e3o Paulo",
    });

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

export function validateDemoCustomerProfile(
  input:
    DemoCustomerProfile,
): DemoCustomerProfileValidation {
  const values =
    Object.freeze({
      fullName:
        normalizeText(
          input.fullName,
        ),
      email:
        input.email
          .trim()
          .toLowerCase(),
      phone:
        normalizeText(
          input.phone,
        ),
      city:
        normalizeText(
          input.city,
        ),
    });

  const errors:
    Partial<
      Record<
        DemoCustomerProfileField,
        DemoCustomerProfileError
      >
    > = {};

  if (!values.fullName) {
    errors.fullName =
      "REQUIRED";
  } else if (
    values.fullName.length <
      2
  ) {
    errors.fullName =
      "TOO_SHORT";
  } else if (
    values.fullName.length >
      80
  ) {
    errors.fullName =
      "TOO_LONG";
  }

  if (!values.email) {
    errors.email =
      "REQUIRED";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email,
    )
  ) {
    errors.email =
      "INVALID_EMAIL";
  } else if (
    values.email.length >
      120
  ) {
    errors.email =
      "TOO_LONG";
  }

  if (!values.phone) {
    errors.phone =
      "REQUIRED";
  } else if (
    !/^[0-9()+\-\s]{8,24}$/.test(
      values.phone,
    )
  ) {
    errors.phone =
      "INVALID_PHONE";
  }

  if (!values.city) {
    errors.city =
      "REQUIRED";
  } else if (
    values.city.length <
      2
  ) {
    errors.city =
      "TOO_SHORT";
  } else if (
    values.city.length >
      80
  ) {
    errors.city =
      "TOO_LONG";
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

export function parseDemoCustomerProfile(
  value: unknown,
): DemoCustomerProfile {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return defaultDemoCustomerProfile;
  }

  const record =
    value as
      Partial<
        Record<
          DemoCustomerProfileField,
          unknown
        >
      >;

  const candidate =
    Object.freeze({
      fullName:
        typeof record.fullName ===
          "string"
          ? record.fullName
          : "",
      email:
        typeof record.email ===
          "string"
          ? record.email
          : "",
      phone:
        typeof record.phone ===
          "string"
          ? record.phone
          : "",
      city:
        typeof record.city ===
          "string"
          ? record.city
          : "",
    });

  const validation =
    validateDemoCustomerProfile(
      candidate,
    );

  return validation.valid
    ? validation.values
    : defaultDemoCustomerProfile;
}