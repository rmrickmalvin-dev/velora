import {
  access,
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

async function exists(
  relativePath: string,
) {
  await access(
    join(
      process.cwd(),
      relativePath,
    ),
  );

  return true;
}

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
  "BUILD 02 readiness",
  () => {
    it("keeps all three public Storefront route foundations", async () => {
      await expect(
        exists(
          "src/app/[locale]/page.tsx",
        ),
      ).resolves.toBe(true);

      await expect(
        exists(
          "src/app/[locale]/categories/[category]/page.tsx",
        ),
      ).resolves.toBe(true);

      await expect(
        exists(
          "src/app/[locale]/products/[slug]/page.tsx",
        ),
      ).resolves.toBe(true);
    });

    it("keeps all four local Product visual fallback assets", async () => {
      for (
        const asset
        of [
          "smartphone.svg",
          "audio.svg",
          "power.svg",
          "protection.svg",
        ]
      ) {
        await expect(
          exists(
            `public/images/velora/${asset}`,
          ),
        ).resolves.toBe(true);
      }
    });

    it("keeps Product discovery connected to the Storefront shell", async () => {
      expect(
        await source(
          "src/components/commerce/storefront-shell.tsx",
        ),
      ).toContain(
        "<ProductDiscovery",
      );
    });

    it("keeps category pages statically enumerable", async () => {
      expect(
        await source(
          "src/app/[locale]/categories/[category]/page.tsx",
        ),
      ).toContain(
        "generateStaticParams",
      );
    });

    it("keeps Product pages statically enumerable", async () => {
      expect(
        await source(
          "src/app/[locale]/products/[slug]/page.tsx",
        ),
      ).toContain(
        "generateStaticParams",
      );
    });

    it("keeps SEO and accessibility foundations active before BUILD 03", async () => {
      await expect(
        exists(
          "src/presentation/storefront/storefront-seo-model.ts",
        ),
      ).resolves.toBe(true);

      await expect(
        exists(
          "src/i18n/storefront-accessibility-copy.ts",
        ),
      ).resolves.toBe(true);
    });
  },
);