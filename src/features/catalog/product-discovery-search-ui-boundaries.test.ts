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
  "Product Discovery Search UI boundaries",
  () => {
    it("uses ranked Storefront Search Intelligence", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "buildStorefrontSearchExperience",
      );
    });

    it("reads Discovery state from the browser URL", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "readBrowserDiscoveryState",
      );
    });

    it("writes Search state through the Navigation adapter", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "writeBrowserDiscoveryState",
      );
    });

    it("routes Category controls through the shared Discovery updater", async () => {
      const content =
        await source(
          "src/components/commerce/product-discovery.tsx",
        );

      const labelIndex =
        content.indexOf(
          "item.label",
        );

      expect(
        labelIndex,
      ).toBeGreaterThan(0);

      const nearby =
        content.slice(
          Math.max(
            0,
            labelIndex - 900,
          ),
          labelIndex + 100,
        );

      expect(
        nearby,
      ).toContain(
        "updateDiscovery(",
      );

      expect(
        nearby,
      ).toContain(
        "item.key",
      );
    });

    it("subscribes to browser back and forward navigation", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "subscribeBrowserDiscoveryNavigation",
      );
    });

    it("renders Suggestions and query-aware Category counts", async () => {
      const content =
        await source(
          "src/components/commerce/product-discovery.tsx",
        );

      expect(
        content,
      ).toContain(
        "searchExperience.suggestions",
      );

      expect(
        content,
      ).toContain(
        "searchExperience.categoryCounts",
      );
    });

    it("does not access localStorage from Product Discovery", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).not.toContain(
        "localStorage",
      );
    });

    it("keeps Product Discovery marked as a Search region", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        'role="search"',
      );
    });
  },
);