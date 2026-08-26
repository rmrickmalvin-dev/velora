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
  "Demo Orders UI boundaries",
  () => {
    it("creates a localized static Orders route", async () => {
      const content =
        await source(
          "src/app/[locale]/orders/page.tsx",
        );

      expect(content).toContain(
        "generateStaticParams",
      );

      expect(content).toContain(
        "<DemoOrdersPage",
      );
    });

    it("marks browser-local history as noindex", async () => {
      const content =
        await source(
          "src/app/[locale]/orders/page.tsx",
        );

      expect(content).toContain(
        "index: false",
      );

      expect(content).toContain(
        "follow: false",
      );
    });

    it("loads persistent history through the browser Feature adapter", async () => {
      expect(
        await source(
          "src/components/commerce/demo-orders-page.tsx",
        ),
      ).toContain(
        "loadBrowserDemoOrders",
      );
    });

    it("uses a two-step reset interaction", async () => {
      const content =
        await source(
          "src/components/commerce/demo-orders-page.tsx",
        );

      expect(content).toContain(
        "confirmingReset",
      );

      expect(content).toContain(
        "confirmReset",
      );
    });

    it("keeps Cart status visible on the history page", async () => {
      expect(
        await source(
          "src/components/commerce/demo-orders-page.tsx",
        ),
      ).toContain(
        "<CartIndicator",
      );
    });

    it("keeps the no-payment explanation visible", async () => {
      expect(
        await source(
          "src/components/commerce/demo-orders-page.tsx",
        ),
      ).toContain(
        "noPaymentNotice",
      );
    });

    it("links the Cart Drawer to demo Order history", async () => {
      expect(
        await source(
          "src/components/commerce/cart-drawer.tsx",
        ),
      ).toContain(
        "/orders",
      );
    });

    it("preserves reduced-motion support on the history surface", async () => {
      expect(
        await source(
          "src/components/commerce/demo-orders-page.module.css",
        ),
      ).toContain(
        "prefers-reduced-motion: reduce",
      );
    });
  },
);