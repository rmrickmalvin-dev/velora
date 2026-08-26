import {
  describe,
  expect,
  it,
} from "vitest";

import {
  canAccessDemoRoleArea,
  getDemoRoleAreaPath,
} from "./demo-role-access-model";

describe(
  "Demo Role Access Model",
  () => {
    it("allows CUSTOMER into the Customer area", () => {
      expect(
        canAccessDemoRoleArea(
          "CUSTOMER",
          "CUSTOMER",
        ),
      ).toBe(true);
    });

    it("rejects GUEST from the Customer area", () => {
      expect(
        canAccessDemoRoleArea(
          "GUEST",
          "CUSTOMER",
        ),
      ).toBe(false);
    });

    it("rejects ADMIN from the Customer area", () => {
      expect(
        canAccessDemoRoleArea(
          "ADMIN",
          "CUSTOMER",
        ),
      ).toBe(false);
    });

    it("allows ADMIN into the Admin area", () => {
      expect(
        canAccessDemoRoleArea(
          "ADMIN",
          "ADMIN",
        ),
      ).toBe(true);
    });

    it("rejects GUEST from the Admin area", () => {
      expect(
        canAccessDemoRoleArea(
          "GUEST",
          "ADMIN",
        ),
      ).toBe(false);
    });

    it("rejects CUSTOMER from the Admin area", () => {
      expect(
        canAccessDemoRoleArea(
          "CUSTOMER",
          "ADMIN",
        ),
      ).toBe(false);
    });

    it("builds a locale-safe Customer path", () => {
      expect(
        getDemoRoleAreaPath(
          "en",
          "CUSTOMER",
        ),
      ).toBe(
        "/en/account",
      );
    });

    it("builds a locale-safe Admin path", () => {
      expect(
        getDemoRoleAreaPath(
          "es",
          "ADMIN",
        ),
      ).toBe(
        "/es/admin",
      );
    });
  },
);