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
  "Browser Demo Customer Profile boundaries",
  () => {
    it("keeps localStorage inside the Feature adapter", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "window.localStorage",
      );
    });

    it("uses a versioned Profile key", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "velora.demo.customer-profile.v1",
      );
    });

    it("validates before persisting", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "validateDemoCustomerProfile",
      );
    });

    it("uses a same-document change event", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "velora:customer-profile-changed",
      );
    });

    it("supports cross-tab storage updates", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        '"storage"',
      );
    });

    it("offers explicit Profile reset", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).toContain(
        "resetBrowserDemoCustomerProfile",
      );
    });

    it("does not import repositories", async () => {
      expect(
        await source(
          "src/features/customer/browser-demo-customer-profile.ts",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not claim real authentication", async () => {
      expect(
        (
          await source(
            "src/features/customer/browser-demo-customer-profile.ts",
          )
        ).toLowerCase(),
      ).not.toContain(
        "password",
      );
    });
  },
);