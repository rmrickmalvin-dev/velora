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
  "Commercial Simulation storage contract",
  () => {
    it("keeps simulation state separate from Product price persistence", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).not.toContain(
        "updateAdminVariantPrice",
      );
    });

    it("keeps scenarios separate from the Cart runtime", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).not.toContain(
        "browser-cart",
      );
    });

    it("keeps scenarios separate from Order mutation", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).not.toContain(
        "changeOrderStatus",
      );
    });

    it("does not mutate Storefront Product Discovery", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).not.toContain(
        "emitBrowserCatalogChanged",
      );
    });

    it("keeps tax assumptions out of simulation code", async () => {
      expect(
        (
          await source(
            "src/features/pricing/admin-commercial-simulator-model.ts",
          )
        ).toLowerCase(),
      ).not.toContain(
        "tax",
      );
    });

    it("keeps shipping assumptions out of simulation code", async () => {
      expect(
        (
          await source(
            "src/features/pricing/admin-commercial-simulator-model.ts",
          )
        ).toLowerCase(),
      ).not.toContain(
        "shipping",
      );
    });
  },
);