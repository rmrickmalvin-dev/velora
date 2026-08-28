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
  "Product Detail runtime synchronization boundaries",
  () => {
    it("exposes a browser Product Detail loader", async () => {
      expect(
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        ),
      ).toContain(
        "loadBrowserStorefrontProductDetail",
      );
    });

    it("loads Product Detail through the browser composition root and Application", async () => {
      const content =
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        );

      expect(
        content,
      ).toContain(
        "createBrowserVeloraRuntime",
      );

      expect(
        content,
      ).toContain(
        ".listStorefrontProducts()",
      );
    });

    it("reuses the canonical Product Detail Presentation model", async () => {
      const content =
        await source(
          "src/features/catalog/browser-storefront-catalog.ts",
        );

      expect(
        content,
      ).toContain(
        "buildStorefrontProductDetailModel",
      );

      expect(
        content,
      ).toContain(
        "StorefrontProductDetailModel",
      );
    });

    it("keeps the Product Detail component as a client-synchronized view", async () => {
      const content =
        await source(
          "src/components/commerce/product-detail.tsx",
        );

      expect(
        content.startsWith(
          '"use client";',
        ),
      ).toBe(true);

      expect(
        content,
      ).toContain(
        "loadBrowserStorefrontProductDetail",
      );
    });

    it("reacts to both Catalog and Inventory changes", async () => {
      expect(
        await source(
          "src/components/commerce/product-detail.tsx",
        ),
      ).toContain(
        "subscribeBrowserStorefrontDataChanged",
      );
    });

    it("renders the synchronized runtime model without direct persistence access", async () => {
      const content =
        await source(
          "src/components/commerce/product-detail.tsx",
        );

      expect(
        content,
      ).toContain(
        "runtimeModel.variants",
      );

      expect(
        content,
      ).not.toContain(
        "localStorage",
      );

      expect(
        content,
      ).not.toContain(
        "Repository",
      );
    });

    it("preserves the statically generated Product route as the initial shell", async () => {
      const content =
        await source(
          "src/app/[locale]/products/[slug]/page.tsx",
        );

      expect(
        content,
      ).toContain(
        "generateStaticParams",
      );

      expect(
        content,
      ).toContain(
        "createStaticVeloraRuntime",
      );

      expect(
        content,
      ).toContain(
        "<ProductDetail",
      );
    });

    it("preserves Admin context and Add-to-Cart interaction in Product Detail", async () => {
      const content =
        await source(
          "src/components/commerce/product-detail.tsx",
        );

      expect(
        content,
      ).toContain(
        "AdminStorefrontControls",
      );

      expect(
        content,
      ).toContain(
        "AddToCartControl",
      );
    });
  },
);