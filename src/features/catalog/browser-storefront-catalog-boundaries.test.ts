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
  "Browser Storefront Catalog boundaries",
  () => {
    it("loads through browser composition root", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("reads through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        ".listStorefrontProducts()",
      );
    });

    it("reuses the Storefront Home Presentation model", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "buildStorefrontHomeModel",
      );
    });

    it("does not import concrete repositories", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("publishes a catalog-changed event", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "velora:catalog-changed",
      );
    });

    it("supports Storefront subscriptions without a second state library", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "subscribeBrowserCatalogChanged",
      );
    });
  },
);