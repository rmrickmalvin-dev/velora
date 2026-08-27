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
  "Browser Storefront Inventory refresh boundaries",
  () => {
    it("defines a dedicated Inventory changed event", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "velora:inventory-changed",
      );
    });

    it("keeps Catalog changed event for Product and price mutations", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "velora:catalog-changed",
      );
    });

    it("offers a combined Storefront data subscription", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "subscribeBrowserStorefrontDataChanged",
      );
    });

    it("subscribes Product Discovery to combined Storefront data changes", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "subscribeBrowserStorefrontDataChanged",
      );
    });

    it("keeps Product Discovery browser data loading through the Feature adapter", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "loadBrowserStorefrontProductCards",
      );
    });

    it("does not move persistence into Product Discovery", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });
  },
);