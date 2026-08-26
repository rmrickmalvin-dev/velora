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
  "Browser Demo Orders boundaries",
  () => {
    it("selects browser persistence through the Infrastructure composition root", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("does not import IndexedDbProvider directly", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("guards browser-only history access", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        'typeof window ===',
      );
    });

    it("loads history through the Application facade", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        ".listDemoOrders()",
      );
    });

    it("resets through the existing runtime resetDemo operation", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        ".resetDemo()",
      );
    });

    it("refreshes visible Cart state after demo reset", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        "emitBrowserCartChanged",
      );
    });
  },
);