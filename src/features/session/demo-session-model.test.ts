import {
  describe,
  expect,
  it,
} from "vitest";

import {
  defaultDemoSessionRole,
  getDemoRoleDestination,
  getDemoRoleLoginPath,
  isDemoSessionRole,
  parseDemoSessionRole,
} from "./demo-session-model";

describe(
  "Demo Session Model",
  () => {
    it("uses GUEST as the default role", () => {
      expect(
        defaultDemoSessionRole,
      ).toBe("GUEST");
    });

    it("recognizes GUEST", () => {
      expect(
        isDemoSessionRole(
          "GUEST",
        ),
      ).toBe(true);
    });

    it("recognizes CUSTOMER", () => {
      expect(
        isDemoSessionRole(
          "CUSTOMER",
        ),
      ).toBe(true);
    });

    it("recognizes ADMIN", () => {
      expect(
        isDemoSessionRole(
          "ADMIN",
        ),
      ).toBe(true);
    });

    it("rejects unknown role values", () => {
      expect(
        isDemoSessionRole(
          "OWNER",
        ),
      ).toBe(false);
    });

    it("falls back to GUEST for missing persisted state", () => {
      expect(
        parseDemoSessionRole(
          null,
        ),
      ).toBe("GUEST");
    });

    it("routes CUSTOMER and ADMIN to different workspaces", () => {
      expect(
        getDemoRoleDestination(
          "pt-BR",
          "CUSTOMER",
        ),
      ).toBe(
        "/pt-BR/account",
      );

      expect(
        getDemoRoleDestination(
          "pt-BR",
          "ADMIN",
        ),
      ).toBe(
        "/pt-BR/admin",
      );
    });

    it("builds a locale-safe login path", () => {
      expect(
        getDemoRoleLoginPath(
          "es",
        ),
      ).toBe(
        "/es/login",
      );
    });
  },
);