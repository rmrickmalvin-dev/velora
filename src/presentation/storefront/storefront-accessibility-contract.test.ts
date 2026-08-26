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
  "Storefront accessibility contracts",
  () => {
    it("defines a global skip-link treatment", async () => {
      expect(
        await source(
          "src/styles/design-tokens.css",
        ),
      ).toContain(
        ".velora-skip-link",
      );
    });

    it("defines a global focus-visible treatment", async () => {
      expect(
        await source(
          "src/styles/design-tokens.css",
        ),
      ).toContain(
        ":focus-visible",
      );
    });

    it("adds skip links to all major Storefront page components", async () => {
      for (
        const file
        of [
          "src/components/commerce/storefront-shell.tsx",
          "src/components/commerce/category-page.tsx",
          "src/components/commerce/product-detail.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).toContain(
          "velora-skip-link",
        );
      }
    });

    it("uses localized accessibility copy in all major Storefront page components", async () => {
      for (
        const file
        of [
          "src/components/commerce/storefront-shell.tsx",
          "src/components/commerce/category-page.tsx",
          "src/components/commerce/product-detail.tsx",
        ]
      ) {
        expect(
          await source(file),
        ).toContain(
          "getStorefrontAccessibilityCopy",
        );
      }
    });

    it("keeps discovery result announcements polite", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        'aria-live="polite"',
      );
    });

    it("keeps category filters exposed as pressed-state buttons", async () => {
      expect(
        await source(
          "src/components/commerce/product-discovery.tsx",
        ),
      ).toContain(
        "aria-pressed",
      );
    });

    it("preserves reduced-motion support", async () => {
      expect(
        await source(
          "src/styles/design-tokens.css",
        ),
      ).toContain(
        "prefers-reduced-motion: reduce",
      );
    });

    it("adds increased-contrast token support", async () => {
      expect(
        await source(
          "src/styles/design-tokens.css",
        ),
      ).toContain(
        "prefers-contrast: more",
      );
    });
  },
);