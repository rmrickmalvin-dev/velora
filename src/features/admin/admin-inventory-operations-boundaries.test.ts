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
  "Admin Inventory Operations UI boundaries",
  () => {
    it("renders Inventory operations from the Admin Catalog Dashboard", async () => {
      expect(
        await source(
          "src/components/admin/admin-catalog-dashboard.tsx",
        ),
      ).toContain(
        "<AdminInventoryOperations",
      );
    });

    it("uses Feature validation before Inventory mutation", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).toContain(
        "validateAdminInventoryAdjustment",
      );
    });

    it("requires explicit movement confirmation", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).toContain(
        "pendingDelta",
      );
    });

    it("requires a movement reason field", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).toContain(
        "reason",
      );
    });

    it("shows movement history", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).toContain(
        "movementHistory",
      );
    });

    it("does not import repositories into Inventory React UI", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider into Inventory React UI", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("refreshes Admin Catalog after successful stock mutation", async () => {
      expect(
        await source(
          "src/components/admin/admin-inventory-operations.tsx",
        ),
      ).toContain(
        "onChanged()",
      );
    });
  },
);