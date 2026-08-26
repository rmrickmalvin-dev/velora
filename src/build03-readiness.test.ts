import {
  access,
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

async function exists(
  relativePath: string,
) {
  await access(
    join(
      process.cwd(),
      relativePath,
    ),
  );

  return true;
}

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
  "BUILD 03 readiness",
  () => {
    it("keeps persistent Cart interaction available", async () => {
      await expect(
        exists(
          "src/features/cart/cart-experience.ts",
        ),
      ).resolves.toBe(true);

      await expect(
        exists(
          "src/components/commerce/cart-drawer.tsx",
        ),
      ).resolves.toBe(true);
    });

    it("keeps transparent demo Checkout available", async () => {
      await expect(
        exists(
          "src/app/[locale]/checkout/page.tsx",
        ),
      ).resolves.toBe(true);
    });

    it("keeps Application demo Order creation available", async () => {
      await expect(
        exists(
          "src/application/use-cases/create-demo-order.ts",
        ),
      ).resolves.toBe(true);
    });

    it("keeps guest demo Order history available", async () => {
      await expect(
        exists(
          "src/app/[locale]/orders/page.tsx",
        ),
      ).resolves.toBe(true);
    });

    it("keeps browser persistence selection out of commerce UI components", async () => {
      for (
        const file
        of [
          "src/components/commerce/cart-drawer.tsx",
          "src/components/commerce/checkout-page.tsx",
          "src/components/commerce/demo-orders-page.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).not.toContain(
          "IndexedDbProvider",
        );
      }
    });

    it("saves Order before removing Cart in the completion use case", async () => {
      const content =
        await source(
          "src/application/use-cases/create-demo-order.ts",
        );

      expect(
        content.indexOf(
          "orders\n    .save",
        ),
      ).toBeLessThan(
        content.indexOf(
          "carts\n    .remove",
        ),
      );
    });

    it("keeps real payment integration absent from Checkout runtime", async () => {
      const content =
        await source(
          "src/features/checkout/browser-checkout-runtime.ts",
        );

      expect(
        content.toLowerCase(),
      ).not.toContain(
        "stripe",
      );

      expect(
        content.toLowerCase(),
      ).not.toContain(
        "paypal",
      );
    });

    it("keeps demo reset behind the existing runtime reset operation", async () => {
      expect(
        await source(
          "src/features/orders/browser-demo-orders.ts",
        ),
      ).toContain(
        ".resetDemo()",
      );
    });
  },
);