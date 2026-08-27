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
  "Storefront Search Integration Contract",
  () => {
    it("continues loading browser-persistent Catalog overrides", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "loadBrowserStorefrontProductCards",
      );
    });

    it("continues reacting to Catalog and Inventory updates", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "subscribeBrowserStorefrontDataChanged",
      );
    });

    it("preserves contextual Admin Storefront controls", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "<AdminStorefrontControls",
      );
    });

    it("keeps Search Intelligence free from browser APIs", async () => {
      const content =
        await source(
          "src/presentation/storefront/storefront-search-intelligence.ts",
        );

      expect(content).not.toContain(
        "window",
      );

      expect(content).not.toContain(
        "localStorage",
      );
    });

    it("keeps Discovery Navigation free from persistent storage", async () => {
      expect(
        await source(
          "src/features/catalog/browser-discovery-navigation.ts",
        ),
      ).not.toContain(
        "localStorage",
      );
    });

    it("uses history replacement instead of forcing route navigation on each keystroke", async () => {
      expect(
        await source(
          "src/features/catalog/browser-discovery-navigation.ts",
        ),
      ).toContain(
        "history.replaceState",
      );
    });
  },
);