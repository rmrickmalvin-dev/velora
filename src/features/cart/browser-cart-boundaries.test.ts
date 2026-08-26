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
  "BUILD 03 browser Cart boundaries",
  () => {
    it("keeps IndexedDB out of Cart UI components", async () => {
      for (
        const file
        of [
          "src/components/commerce/cart-indicator.tsx",
          "src/components/commerce/add-to-cart-control.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).not.toContain(
          "indexeddb",
        );
      }
    });

    it("keeps localStorage out of Cart UI components", async () => {
      for (
        const file
        of [
          "src/components/commerce/cart-indicator.tsx",
          "src/components/commerce/add-to-cart-control.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).not.toContain(
          "localStorage",
        );
      }
    });

    it("selects browser persistence only through the Infrastructure composition root", async () => {
      const content =
        await source(
          "src/features/cart/browser-cart-runtime.ts",
        );

      expect(content).toContain(
        "createBrowserVeloraRuntime",
      );

      expect(content).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("guards browser Cart composition from server execution", async () => {
      expect(
        await source(
          "src/features/cart/browser-cart-runtime.ts",
        ),
      ).toContain(
        'typeof window ===',
      );
    });

    it("keeps the browser runtime lazy instead of creating it at module import", async () => {
      const content =
        await source(
          "src/features/cart/browser-cart-runtime.ts",
        );

      expect(content).toContain(
        "browserCartExperience ===",
      );

      expect(content).toContain(
        "getBrowserCartExperience",
      );
    });

    it("uses a stable same-document Cart change event", async () => {
      expect(
        await source(
          "src/features/cart/browser-cart-runtime.ts",
        ),
      ).toContain(
        "velora:cart-changed",
      );
    });

    it("integrates add-to-cart into Product detail", async () => {
      expect(
        await source(
          "src/components/commerce/product-detail.tsx",
        ),
      ).toContain(
        "<AddToCartControl",
      );
    });

    it("keeps Cart indicators in all major Storefront journeys", async () => {
      for (
        const file
        of [
          "src/components/commerce/storefront-shell.tsx",
          "src/components/commerce/category-page.tsx",
          "src/components/commerce/product-detail.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).toContain(
          "<CartIndicator",
        );
      }
    });
  },
);