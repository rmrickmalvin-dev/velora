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
  "Admin Product Editor boundaries",
  () => {
    it("uses Feature validation for Product details", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).toContain(
        "validateAdminProductDetails",
      );
    });

    it("uses Feature parsing for Variant price", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).toContain(
        "parseAdminPriceInput",
      );
    });

    it("mutates through the browser Admin adapter", async () => {
      const content =
        await source(
          "src/components/admin/admin-product-editor.tsx",
        );

      expect(content).toContain(
        "updateBrowserAdminProduct",
      );

      expect(content).toContain(
        "updateBrowserAdminVariantPrice",
      );
    });

    it("requires explicit Product confirmation before mutation", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).toContain(
        "confirmDetails",
      );
    });

    it("requires explicit price confirmation before mutation", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).toContain(
        "pendingPriceId",
      );
    });

    it("does not import repositories into React editor", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).not.toContain(
        "Repository",
      );
    });

    it("does not import IndexedDbProvider into React editor", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("refreshes Admin data after successful mutation", async () => {
      expect(
        await source(
          "src/components/admin/admin-product-editor.tsx",
        ),
      ).toContain(
        "await onChanged()",
      );
    });
  },
);