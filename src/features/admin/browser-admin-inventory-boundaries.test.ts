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
  "Browser Admin Inventory boundaries",
  () => {
    it("selects browser persistence through composition root", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("adjusts stock through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        ".adjustInventory",
      );
    });

    it("reads movement history through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        ".listInventoryMovements",
      );
    });

    it("does not import concrete repositories", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider directly", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("creates explicit movement references", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        "movement-admin-",
      );
    });

    it("refreshes Storefront Inventory after successful write", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        "emitBrowserInventoryChanged",
      );
    });

    it("reverses append history for newest-first Admin presentation", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-inventory.ts",
        ),
      ).toContain(
        ".reverse()",
      );
    });
  },
);