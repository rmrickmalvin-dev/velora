import {
  readFile,
} from "node:fs/promises";
import {
  join,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

async function source(
  relativePath: string,
) {
  return readFile(
    join(
      process.cwd(),
      relativePath,
    ),
    "utf8",
  );
}

describe(
  "Demo Session UI boundaries",
  () => {
    it("renders a global SessionIndicator inside the existing Cart cluster", async () => {
      expect(
        await source(
          "src/components/commerce/cart-indicator.tsx",
        ),
      ).toContain(
        "<SessionIndicator",
      );
    });

    it("uses useSyncExternalStore for role-aware shared UI", async () => {
      expect(
        await source(
          "src/components/session/session-indicator.tsx",
        ),
      ).toContain(
        "useSyncExternalStore",
      );
    });

    it("creates localized login, account and admin routes", async () => {
      for (
        const file
        of [
          "src/app/[locale]/login/page.tsx",
          "src/app/[locale]/account/page.tsx",
          "src/app/[locale]/admin/page.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).toContain(
          "generateStaticParams",
        );
      }
    });

    it("marks demo role routes noindex", async () => {
      expect(
        await source(
          "src/features/session/demo-session-route-metadata.ts",
        ),
      ).toContain(
        "index: false",
      );
    });

    it("offers quick Customer and Admin role entry without credentials", async () => {
      const content =
        await source(
          "src/components/session/demo-login-page.tsx",
        );

      expect(content).toContain(
        '"CUSTOMER"',
      );

      expect(content).toContain(
        '"ADMIN"',
      );

      expect(
        content.toLowerCase(),
      ).not.toContain(
        "password",
      );
    });

    it("keeps account and admin areas as experience gates rather than security claims", async () => {
      const content =
        await source(
          "src/components/session/demo-role-area-page.tsx",
        );

      expect(content).toContain(
        "canAccessDemoRoleArea",
      );

      expect(
        content.toLowerCase(),
      ).not.toContain(
        "secure",
      );
    });

    it("keeps session state outside IndexedDB repositories", async () => {
      for (
        const file
        of [
          "src/components/session/session-indicator.tsx",
          "src/components/session/demo-login-page.tsx",
          "src/components/session/demo-role-area-page.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).not.toContain(
          "IndexedDbProvider",
        );
      }
    });

    it("preserves reduced-motion behavior on role selection cards", async () => {
      expect(
        await source(
          "src/components/session/demo-session-page.module.css",
        ),
      ).toContain(
        "prefers-reduced-motion: reduce",
      );
    });
  },
);