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
  "BUILD 04 readiness",
  () => {
    it("keeps the explicit Guest Customer and Admin demo roles", async () => {
      const content =
        await source(
          "src/features/session/demo-session-model.ts",
        );

      expect(
        content,
      ).toContain("GUEST");

      expect(
        content,
      ).toContain("CUSTOMER");

      expect(
        content,
      ).toContain("ADMIN");
    });

    it("keeps persistent Admin Catalog editing", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("keeps Admin Inventory operations behind the browser feature boundary", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("keeps Customer profile state isolated behind its browser adapter", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "velora.demo.customer-profile.v1",
      );
    });

    it("keeps Admin Order operations on the Application boundary", async () => {
      const content =
        await source(
          "src/features/admin/browser-admin-orders.ts",
        );

      expect(
        content,
      ).toContain(
        "listAdminOrders",
      );

      expect(
        content,
      ).toContain(
        "changeOrderStatus",
      );
    });

    it("keeps commercial scenarios explicitly local and demonstrative", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        "velora.demo.promotions.v1",
      );
    });

    it("keeps ranked Search and URL-backed Discovery active", async () => {
      const search =
        await source(
          "src/presentation/storefront/storefront-search-intelligence.ts",
        );

      const navigation =
        await source(
          "src/features/catalog/browser-discovery-navigation.ts",
        );

      expect(
        search,
      ).toContain(
        "normalizeStorefrontSearchText",
      );

      expect(
        navigation,
      ).toContain(
        "history.replaceState",
      );
    });

    it("requires Product Detail runtime sync and localization regression contracts before BUILD 04 closes", async () => {
      const detail =
        await source(
          "src/features/catalog/product-detail-runtime-sync-boundaries.test.ts",
        );

      const localization =
        await source(
          "src/i18n/storefront-localization-integrity.test.ts",
        );

      expect(
        detail,
      ).toContain(
        "subscribeBrowserStorefrontDataChanged",
      );

      expect(
        localization,
      ).toContain(
        "Storefront localization integrity",
      );
    });
  },
);