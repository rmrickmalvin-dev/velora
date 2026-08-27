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
  "Browser Admin Catalog boundaries",
  () => {
    it("selects browser data through the Infrastructure composition root", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("loads data through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).toContain(
        ".listStorefrontProducts()",
      );
    });

    it("does not import concrete repositories", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider directly", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("guards browser-only Admin catalog loading", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).toContain(
        'typeof window ===',
      );
    });

    it("delegates Presentation shaping to the Admin Catalog model", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog.ts",
        ),
      ).toContain(
        "buildAdminCatalogModel",
      );
    });
  },
);