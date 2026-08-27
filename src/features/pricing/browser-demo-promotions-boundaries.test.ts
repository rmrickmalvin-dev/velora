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
  "Browser Demo Promotions boundaries",
  () => {
    it("uses a versioned browser-local key", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        "velora.demo.promotions.v1",
      );
    });

    it("keeps localStorage inside the Feature adapter", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        "window.localStorage",
      );
    });

    it("emits a same-document scenario event", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        "velora:demo-promotions-changed",
      );
    });

    it("supports cross-tab storage updates", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        '"storage"',
      );
    });

    it("supports explicit scenario deletion", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        "deleteBrowserDemoPromotion",
      );
    });

    it("supports global demo reset", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).toContain(
        "resetBrowserDemoPromotions",
      );
    });

    it("does not import repositories", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import checkout runtime", async () => {
      expect(
        await source(
          "src/features/pricing/browser-demo-promotions.ts",
        ),
      ).not.toContain(
        "checkout",
      );
    });
  },
);