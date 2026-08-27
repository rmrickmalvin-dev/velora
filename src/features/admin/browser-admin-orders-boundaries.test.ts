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
  "Browser Admin Orders boundaries",
  () => {
    it("uses the browser Infrastructure composition root", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("lists Orders through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).toContain(
        ".listAdminOrders()",
      );
    });

    it("changes status through VeloraApplication", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).toContain(
        ".changeOrderStatus",
      );
    });

    it("does not import repositories", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider directly", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("does not mutate Inventory from the browser Order adapter", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).not.toContain(
        "adjustInventory",
      );
    });

    it("does not mutate Cart from the browser Order adapter", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).not.toContain(
        "Cart",
      );
    });

    it("guards browser-only access", async () => {
      expect(
        await source(
          "src/features/admin/browser-admin-orders.ts",
        ),
      ).toContain(
        'typeof window ===',
      );
    });
  },
);