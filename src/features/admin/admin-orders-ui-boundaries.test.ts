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
  "Admin Orders UI boundaries",
  () => {
    it("renders Admin Orders inside the ADMIN role area", async () => {
      expect(
        await source(
          "src/components/session/demo-role-area-page.tsx",
        ),
      ).toContain(
        "<AdminOrdersPanel",
      );
    });

    it("loads Orders through the Admin browser adapter", async () => {
      expect(
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        ),
      ).toContain(
        "loadBrowserAdminOrders",
      );
    });

    it("changes status through the Admin browser adapter", async () => {
      expect(
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        ),
      ).toContain(
        "changeBrowserAdminOrderStatus",
      );
    });

    it("requires explicit review before confirmation", async () => {
      const content =
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        );

      expect(content).toContain(
        "review(",
      );

      expect(content).toContain(
        "pending",
      );
    });

    it("only renders nextStatuses provided by Presentation Domain mapping", async () => {
      expect(
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        ),
      ).toContain(
        "order.nextStatuses",
      );
    });

    it("does not import repositories into React Order UI", async () => {
      expect(
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider into React Order UI", async () => {
      expect(
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("shows a transparent non-payment notice", async () => {
      expect(
        await source(
          "src/components/admin/admin-orders-panel.tsx",
        ),
      ).toContain(
        "noPaymentNotice",
      );
    });
  },
);