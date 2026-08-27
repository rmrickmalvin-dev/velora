import {
  describe,
  expect,
  it,
} from "vitest";

import {
  defaultDemoCustomerProfile,
  parseDemoCustomerProfile,
  validateDemoCustomerProfile,
} from "./demo-customer-profile-model";

describe(
  "Demo Customer Profile Model",
  () => {
    it("provides a fictional default Customer", () => {
      expect(
        defaultDemoCustomerProfile
          .email,
      ).toBe(
        "marina.costa@example.com",
      );
    });

    it("normalizes Profile whitespace", () => {
      expect(
        validateDemoCustomerProfile({
          ...defaultDemoCustomerProfile,
          fullName:
            "  Marina   Costa  ",
        }).values.fullName,
      ).toBe(
        "Marina Costa",
      );
    });

    it("normalizes Email casing", () => {
      expect(
        validateDemoCustomerProfile({
          ...defaultDemoCustomerProfile,
          email:
            "MARINA@EXAMPLE.COM",
        }).values.email,
      ).toBe(
        "marina@example.com",
      );
    });

    it("requires Full Name", () => {
      expect(
        validateDemoCustomerProfile({
          ...defaultDemoCustomerProfile,
          fullName: "",
        }).errors.fullName,
      ).toBe(
        "REQUIRED",
      );
    });

    it("rejects invalid Email", () => {
      expect(
        validateDemoCustomerProfile({
          ...defaultDemoCustomerProfile,
          email:
            "not-an-email",
        }).errors.email,
      ).toBe(
        "INVALID_EMAIL",
      );
    });

    it("rejects invalid Phone characters", () => {
      expect(
        validateDemoCustomerProfile({
          ...defaultDemoCustomerProfile,
          phone:
            "phone@example",
        }).errors.phone,
      ).toBe(
        "INVALID_PHONE",
      );
    });

    it("requires City", () => {
      expect(
        validateDemoCustomerProfile({
          ...defaultDemoCustomerProfile,
          city: "",
        }).errors.city,
      ).toBe(
        "REQUIRED",
      );
    });

    it("accepts the default Profile", () => {
      expect(
        validateDemoCustomerProfile(
          defaultDemoCustomerProfile,
        ).valid,
      ).toBe(true);
    });

    it("falls back when persisted data is malformed", () => {
      expect(
        parseDemoCustomerProfile({
          fullName: 1,
        }),
      ).toEqual(
        defaultDemoCustomerProfile,
      );
    });

    it("returns a valid persisted Profile", () => {
      expect(
        parseDemoCustomerProfile({
          fullName:
            "Alex Demo",
          email:
            "alex@example.com",
          phone:
            "+55 11 98888-0000",
          city:
            "Campinas",
        }).fullName,
      ).toBe(
        "Alex Demo",
      );
    });
  },
);