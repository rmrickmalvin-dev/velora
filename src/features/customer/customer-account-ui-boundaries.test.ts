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
  "Customer Account UI boundaries",
  () => {
    it("renders Customer Account inside CUSTOMER role area", async () => {
      expect(
        await source(
          "src/components/session/demo-role-area-page.tsx",
        ),
      ).toContain(
        "<CustomerAccountPanel",
      );
    });

    it("loads Profile through Feature adapter", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).toContain(
        "readBrowserDemoCustomerProfile",
      );
    });

    it("writes Profile through Feature adapter", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).toContain(
        "writeBrowserDemoCustomerProfile",
      );
    });

    it("loads Orders through existing browser Order adapter", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).toContain(
        "loadBrowserDemoOrders",
      );
    });

    it("does not import localStorage into React Account UI", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).not.toContain(
        "localStorage",
      );
    });

    it("does not import repositories into React Account UI", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("shows explicit demo identity notice", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).toContain(
        "localNotice",
      );
    });

    it("offers fictional Profile restoration", async () => {
      expect(
        await source(
          "src/components/customer/customer-account-panel.tsx",
        ),
      ).toContain(
        "resetBrowserDemoCustomerProfile",
      );
    });
  },
);