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
  "Admin Commercial UI boundaries",
  () => {
    it("renders the Commercial panel inside ADMIN role area", async () => {
      expect(
        await source(
          "src/components/session/demo-role-area-page.tsx",
        ),
      ).toContain(
        "<AdminCommercialPanel",
      );
    });

    it("loads base prices through the existing Admin Catalog adapter", async () => {
      expect(
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        ),
      ).toContain(
        "loadBrowserAdminCatalog",
      );
    });

    it("simulates before local scenario save", async () => {
      const content =
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        );

      expect(content).toContain(
        "buildAdminCommercialSimulation",
      );

      expect(content).toContain(
        "pending",
      );
    });

    it("persists scenarios through a Feature adapter", async () => {
      expect(
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        ),
      ).toContain(
        "saveBrowserDemoPromotion",
      );
    });

    it("does not access localStorage from React", async () => {
      expect(
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        ),
      ).not.toContain(
        "localStorage",
      );
    });

    it("does not mutate Product price from the simulator UI", async () => {
      expect(
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        ),
      ).not.toContain(
        "updateAdminVariantPrice",
      );
    });

    it("does not import checkout runtime", async () => {
      expect(
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        ),
      ).not.toContain(
        "checkout-runtime",
      );
    });

    it("shows the explicit simulation notice", async () => {
      expect(
        await source(
          "src/components/admin/admin-commercial-panel.tsx",
        ),
      ).toContain(
        "simulationNotice",
      );
    });
  },
);