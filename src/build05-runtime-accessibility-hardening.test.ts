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
  "BUILD 05 runtime accessibility hardening",
  () => {
    it("registers the Playwright loopback origin in Next development configuration", async () => {
      const content =
        await source(
          "next.config.ts",
        );

      expect(
        content,
      ).toContain(
        "allowedDevOrigins",
      );

      expect(
        content,
      ).toContain(
        '"127.0.0.1"',
      );
    });

    it("connects the Cart trigger to the controlled dialog", async () => {
      const content =
        await source(
          "src/components/commerce/cart-indicator.tsx",
        );

      expect(
        content,
      ).toContain(
        'aria-controls="velora-cart-dialog"',
      );

      expect(
        content,
      ).toContain(
        'aria-haspopup="dialog"',
      );

      expect(
        content,
      ).toContain(
        "aria-expanded",
      );
    });

    it("gives the Cart dialog a stable id and DOM ref", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(
        content,
      ).toContain(
        'id="velora-cart-dialog"',
      );

      expect(
        content,
      ).toContain(
        "const drawer =",
      );
    });

    it("captures and restores the previously focused element", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(
        content,
      ).toContain(
        "previousFocus.current",
      );

      expect(
        content,
      ).toContain(
        "target.focus();",
      );

      expect(
        content,
      ).toContain(
        "target?.isConnected",
      );
    });

    it("keeps initial dialog focus on the close control", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(
        content,
      ).toContain(
        "closeButton.current",
      );

      expect(
        content,
      ).toContain(
        "?.focus();",
      );
    });

    it("prevents default Escape behavior before closing the modal surface", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(
        content,
      ).toContain(
        '"Escape"',
      );

      expect(
        content,
      ).toContain(
        "event.preventDefault();",
      );
    });

    it("traps Tab navigation inside the active Cart dialog", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(
        content,
      ).toContain(
        '"Tab"',
      );

      expect(
        content,
      ).toContain(
        "querySelectorAll<HTMLElement>",
      );

      expect(
        content,
      ).toContain(
        "last.focus();",
      );

      expect(
        content,
      ).toContain(
        "first.focus();",
      );
    });

    it("preserves the existing browser Cart boundary and reduced-motion contract", async () => {
      const drawer =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      const css =
        await source(
          "src/components/commerce/cart-drawer.module.css",
        );

      expect(
        drawer,
      ).toContain(
        "getBrowserCartExperience",
      );

      expect(
        drawer,
      ).not.toContain(
        "IndexedDbProvider",
      );

      expect(
        css,
      ).toContain(
        "prefers-reduced-motion: reduce",
      );
    });
  },
);