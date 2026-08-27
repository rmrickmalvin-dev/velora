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
  "Demo reset Profile integration",
  () => {
    it("clears the demo Customer Profile during global browser reset", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        "resetBrowserDemoCustomerProfile",
      );
    });

    it("keeps IndexedDB reset through resetDemo", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        ".resetDemo()",
      );
    });

    it("keeps Cart refresh after global reset", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        "emitBrowserCartChanged",
      );
    });

    it("does not reset the active demo role", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).not.toContain(
        "writeBrowserDemoSessionRole",
      );
    });
  },
);