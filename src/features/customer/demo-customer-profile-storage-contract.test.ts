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
  "Demo Customer Profile storage contract",
  () => {
    it("keeps Profile separate from session role storage", async () => {
      const profile =
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        );

      expect(profile).not.toContain(
        "velora.demo.session.v1",
      );
    });

    it("keeps Profile separate from IndexedDB runtime", async () => {
      const profile =
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        );

      expect(profile).not.toContain(
        "createBrowserVeloraRuntime",
      );
    });

    it("keeps Profile explicitly browser-local", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "typeof window",
      );
    });

    it("keeps default identity fictional", async () => {
      expect(
        await source(
          "src/features/customer/demo-customer-profile-model.ts",
        ),
      ).toContain(
        "example.com",
      );
    });

    it("does not turn Profile into checkout identity yet", async () => {
      const checkout =
        await source(
          "src/features/checkout/browser-checkout-runtime.ts",
        );

      expect(checkout).not.toContain(
        "customer-profile",
      );
    });

    it("keeps existing Orders as demo Orders rather than verified Customer Orders", async () => {
      const orders =
        await source(
          "src/application/use-cases/list-demo-orders.ts",
        );

      expect(orders).toContain(
        "customerId ===",
      );
    });
  },
);