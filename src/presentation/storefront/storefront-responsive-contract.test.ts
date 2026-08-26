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

async function css(
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
  "BUILD 02 responsive contracts",
  () => {
    it("prevents page-level horizontal overflow", async () => {
      expect(
        await css(
          "src/styles/design-tokens.css",
        ),
      ).toContain(
        "overflow-x: clip",
      );
    });

    it("provides an overflow fallback for browsers without clip", async () => {
      expect(
        await css(
          "src/styles/design-tokens.css",
        ),
      ).toContain(
        "@supports not (overflow: clip)",
      );
    });

    it("uses a fixed desktop vertical Storefront rail", async () => {
      const content =
        await css(
          "src/components/commerce/storefront-shell.module.css",
        );

      expect(content).toContain(
        "width: 15.5rem",
      );

      expect(content).toContain(
        "position: fixed",
      );
    });

    it("restores the Storefront header to sticky layout below desktop", async () => {
      const content =
        await css(
          "src/components/commerce/storefront-shell.module.css",
        );

      expect(content).toContain(
        "@media (max-width: 64rem)",
      );

      expect(content).toContain(
        "position: sticky",
      );
    });

    it("uses the same vertical navigation breakpoint on category pages", async () => {
      expect(
        await css(
          "src/components/commerce/category-page.module.css",
        ),
      ).toContain(
        "padding-left: 15.5rem",
      );
    });

    it("uses the same vertical navigation breakpoint on Product pages", async () => {
      expect(
        await css(
          "src/components/commerce/product-detail.module.css",
        ),
      ).toContain(
        "padding-left: 15.5rem",
      );
    });

    it("keeps Product discovery overflow local to its filter strip", async () => {
      const content =
        await css(
          "src/components/commerce/product-discovery.module.css",
        );

      expect(content).toContain(
        "overflow-x: auto",
      );

      expect(content).toContain(
        "overscroll-behavior-inline: contain",
      );
    });

    it("raises locale switch touch targets on compact layouts", async () => {
      for (
        const file
        of [
          "src/components/commerce/storefront-shell.module.css",
          "src/components/commerce/category-page.module.css",
          "src/components/commerce/product-detail.module.css",
        ]
      ) {
        expect(
          await css(file),
        ).toContain(
          "min-height: 2.75rem",
        );
      }
    });
  },
);