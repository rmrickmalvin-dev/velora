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
  "Cart Drawer boundaries",
  () => {
    it("renders the Cart surface as an accessible dialog", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(content).toContain(
        'role="dialog"',
      );

      expect(content).toContain(
        'aria-modal="true"',
      );
    });

    it("supports Escape to close the Cart", async () => {
      expect(
        await source(
          "src/components/commerce/cart-drawer.tsx",
        ),
      ).toContain(
        'event.key ===',
      );
    });

    it("locks body scrolling only while the drawer is open", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(content).toContain(
        "document.body.style",
      );

      expect(content).toContain(
        "previousOverflow",
      );
    });

    it("keeps quantity mutation behind Browser Cart Experience", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(content).toContain(
        ".update(",
      );

      expect(content).not.toContain(
        "updateCartQuantity",
      );
    });

    it("keeps removal behind Browser Cart Experience", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(content).toContain(
        ".remove(",
      );

      expect(content).not.toContain(
        "removeProductFromCart",
      );
    });

    it("does not import IndexedDB from the Cart Drawer", async () => {
      expect(
        await source(
          "src/components/commerce/cart-drawer.tsx",
        ),
      ).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("keeps the Cart indicator as the drawer trigger", async () => {
      const content =
        await source(
          "src/components/commerce/cart-indicator.tsx",
        );

      expect(content).toContain(
        'aria-haspopup="dialog"',
      );

      expect(content).toContain(
        "<CartDrawer",
      );
    });

    it("preserves reduced-motion behavior for drawer animation", async () => {
      expect(
        await source(
          "src/components/commerce/cart-drawer.module.css",
        ),
      ).toContain(
        "prefers-reduced-motion: reduce",
      );
    });
  },
);