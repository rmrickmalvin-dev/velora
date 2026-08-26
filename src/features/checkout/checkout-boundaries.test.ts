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
  "Demo Checkout boundaries",
  () => {
    it("creates a localized checkout route", async () => {
      const content =
        await source(
          "src/app/[locale]/checkout/page.tsx",
        );

      expect(content).toContain(
        "generateStaticParams",
      );

      expect(content).toContain(
        "<CheckoutPage",
      );
    });

    it("keeps Checkout metadata on the shared SEO model", async () => {
      expect(
        await source(
          "src/app/[locale]/checkout/page.tsx",
        ),
      ).toContain(
        "buildStorefrontSeoModel",
      );
    });

    it("loads Cart through Browser Cart Experience", async () => {
      const content =
        await source(
          "src/components/commerce/checkout-page.tsx",
        );

      expect(content).toContain(
        "getBrowserCartExperience",
      );

      expect(content).not.toContain(
        "IndexedDbProvider",
      );
    });

    it("validates Cart before rendering the form journey", async () => {
      expect(
        await source(
          "src/components/commerce/checkout-page.tsx",
        ),
      ).toContain(
        "validateCheckoutCart",
      );
    });

    it("validates form data through a pure Feature model", async () => {
      const content =
        await source(
          "src/components/commerce/checkout-page.tsx",
        );

      expect(content).toContain(
        "validateCheckoutForm",
      );

      expect(content).not.toContain(
        "fetch(",
      );
    });

    it("does not persist personal checkout form fields", async () => {
      const content =
        await source(
          "src/components/commerce/checkout-page.tsx",
        );

      expect(content).not.toContain(
        "localStorage",
      );

      expect(content).not.toContain(
        "sessionStorage",
      );
    });

    it("states that no real order or charge is created", async () => {
      expect(
        await source(
          "src/i18n/storefront-checkout-copy.ts",
        ),
      ).toContain(
        "No charge, payment or real order",
      );
    });

    it("connects the Cart Drawer to checkout without a payment integration", async () => {
      const content =
        await source(
          "src/components/commerce/cart-drawer.tsx",
        );

      expect(content).toContain(
        "/checkout",
      );

      expect(content).not.toContain(
        "payment",
      );
    });

    it("completes demo Order through the browser Checkout adapter", async () => {
      const content =
        await source(
          "src/components/commerce/checkout-page.tsx",
        );

      expect(content).toContain(
        "completeBrowserDemoOrder",
      );

      expect(content).not.toContain(
        "createOrder(",
      );
    });

    it("clears visible Cart state only after demo Order confirmation", async () => {
      const content =
        await source(
          "src/components/commerce/checkout-page.tsx",
        );

      expect(content).toContain(
        "setConfirmation",
      );

      expect(content).toContain(
        "emitBrowserCartChanged",
      );
    });
  },
);