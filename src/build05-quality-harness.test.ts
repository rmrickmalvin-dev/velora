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
  "BUILD 05 browser quality harness",
  () => {
    it("registers Playwright and axe as development quality dependencies", async () => {
      const packageJson =
        JSON.parse(
          await source(
            "package.json",
          ),
        ) as {
          devDependencies?: Record<
            string,
            string
          >;
        };

      expect(
        packageJson.devDependencies?.[
          "@playwright/test"
        ],
      ).toBeTruthy();

      expect(
        packageJson.devDependencies?.[
          "@axe-core/playwright"
        ],
      ).toBeTruthy();
    });

    it("exposes separate E2E and aggregate quality scripts", async () => {
      const packageJson =
        JSON.parse(
          await source(
            "package.json",
          ),
        ) as {
          scripts?: Record<
            string,
            string
          >;
        };

      expect(
        packageJson.scripts?.[
          "test:e2e"
        ],
      ).toBe(
        "playwright test",
      );

      expect(
        packageJson.scripts?.quality,
      ).toContain(
        "npm run check",
      );

      expect(
        packageJson.scripts?.quality,
      ).toContain(
        "npm run test:e2e",
      );
    });

    it("uses an isolated Chromium Playwright project", async () => {
      const content =
        await source(
          "playwright.config.ts",
        );

      expect(
        content,
      ).toContain(
        '"chromium"',
      );

      expect(
        content,
      ).toContain(
        '"http://127.0.0.1:3100"',
      );
    });

    it("starts Next through the Playwright webServer boundary", async () => {
      expect(
        await source(
          "playwright.config.ts",
        ),
      ).toContain(
        "npx next dev -p 3100",
      );
    });

    it("runs axe against PT-BR EN and ES Storefront journeys", async () => {
      const content =
        await source(
          "e2e/storefront-accessibility.spec.ts",
        );

      expect(
        content,
      ).toContain(
        '"pt-BR"',
      );

      expect(
        content,
      ).toContain(
        '"en"',
      );

      expect(
        content,
      ).toContain(
        '"es"',
      );
    });

    it("covers Home Category and Product public journeys", async () => {
      const content =
        await source(
          "e2e/storefront-accessibility.spec.ts",
        );

      expect(
        content,
      ).toContain(
        "/categories/smartphone",
      );

      expect(
        content,
      ).toContain(
        "/products/aster-air",
      );
    });

    it("checks WCAG A and AA tags in the browser", async () => {
      const content =
        await source(
          "e2e/storefront-accessibility.spec.ts",
        );

      expect(
        content,
      ).toContain(
        '"wcag2a"',
      );

      expect(
        content,
      ).toContain(
        '"wcag2aa"',
      );

      expect(
        content,
      ).toContain(
        '"wcag21aa"',
      );
    });

    it("preserves existing global focus and reduced-motion quality foundations", async () => {
      const content =
        await source(
          "src/styles/globals.css",
        );

      expect(
        content,
      ).toContain(
        ":focus-visible",
      );

      expect(
        content,
      ).toContain(
        "prefers-reduced-motion: reduce",
      );
    });
  },
);