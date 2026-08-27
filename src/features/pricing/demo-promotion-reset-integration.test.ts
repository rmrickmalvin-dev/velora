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
  "Demo Promotion reset integration",
  () => {
    it("clears Promotion scenarios during global browser reset", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        "resetBrowserDemoPromotions",
      );
    });

    it("preserves Customer Profile reset", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        "resetBrowserDemoCustomerProfile",
      );
    });

    it("preserves IndexedDB reset", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        ".resetDemo()",
      );
    });

    it("preserves Cart refresh after reset", async () => {
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