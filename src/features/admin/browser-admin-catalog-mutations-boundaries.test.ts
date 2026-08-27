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
  "Browser Admin Catalog Mutation boundaries",
  () => {
    it("selects persistence through browser composition", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("updates Product through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).toContain(
        ".updateAdminProduct",
      );
    });

    it("updates Variant price through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).toContain(
        ".updateAdminVariantPrice",
      );
    });

    it("emits Catalog refresh after Product mutation", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).toContain(
        "emitBrowserCatalogChanged",
      );
    });

    it("does not import repositories", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider directly", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("guards browser-only mutation access", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).toContain(
        'typeof window ===',
      );
    });

    it("keeps mutation inputs derived from VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-catalog-mutations.ts",
        ),
      ).toContain(
        "Parameters<",
      );
    });
  },
);