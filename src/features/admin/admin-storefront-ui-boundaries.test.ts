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
  "Admin Storefront UI boundaries",
  () => {
    it("shows contextual Admin controls inside Product discovery", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "<AdminStorefrontControls",
      );
    });

    it("shows contextual Admin controls on Product detail", async () => {
      expect(
        await source(
          "src/components/commerce/product-detail.tsx",
        ),
      ).toContain(
        "<AdminStorefrontControls",
      );
    });

    it("renders controls only for ADMIN role", async () => {
      expect(
        await source(
          "src/components/admin/admin-storefront-controls.tsx",
        ),
      ).toContain(
        'role !== "ADMIN"',
      );
    });

    it("keeps contextual controls as Admin navigation rather than mutation", async () => {
      const content =
        await source(
          "src/components/admin/admin-storefront-controls.tsx",
        );

      expect(content).toContain(
        "<Link",
      );

      expect(content).not.toContain(
        "save(",
      );
    });

    it("loads the Admin Dashboard from a Feature adapter", async () => {
      expect(
        await source(
          "src/components/admin/admin-catalog-dashboard.tsx",
        ),
      ).toContain(
        "loadBrowserAdminCatalog",
      );
    });

    it("keeps repositories out of Admin React components", async () => {
      for (
        const file
        of [
          "src/components/admin/admin-storefront-controls.tsx",
          "src/components/admin/admin-catalog-dashboard.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).not.toContain(
          "Repository",
        );
      }
    });

    it("adds Admin Catalog visibility to the ADMIN workspace only", async () => {
      const content =
        await source(
          "src/components/session/demo-role-area-page.tsx",
        );

      expect(content).toContain(
        '<AdminCatalogDashboard',
      );

      expect(content).toContain(
        'area ===',
      );
    });

    it("keeps Product card numeric stock available for Admin context", async () => {
      expect(
        await source(
          "src/presentation/storefront/storefront-home-model.ts",
        ),
      ).toContain(
        "stockUnits",
      );
    });
  },
);