import {
  readFile,
  readdir,
  stat,
} from "node:fs/promises";
import {
  extname,
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

async function walkTsx(
  directory: string,
): Promise<string[]> {
  const absolute =
    join(
      process.cwd(),
      directory,
    );

  const entries =
    await readdir(
      absolute,
      {
        withFileTypes:
          true,
      },
    );

  const files:
    string[] =
      [];

  for (const entry of entries) {
    const relative =
      join(
        directory,
        entry.name,
      );

    if (entry.isDirectory()) {
      files.push(
        ...(
          await walkTsx(
            relative,
          )
        ),
      );

      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(
        ".tsx",
      )
    ) {
      files.push(
        relative,
      );
    }
  }

  return files;
}

describe(
  "BUILD 05 performance responsive and SEO hardening",
  () => {
    it("holds the current Client Component budget at eighteen surfaces", async () => {
      const files =
        await walkTsx(
          "src/components",
        );

      const clients:
        string[] =
          [];

      for (const file of files) {
        const content =
          await source(file);

        if (
          content
            .trimStart()
            .startsWith(
              '"use client"',
            ) ||
          content
            .trimStart()
            .startsWith(
              "'use client'",
            )
        ) {
          clients.push(file);
        }
      }

      expect(
        clients.length,
      ).toBeLessThanOrEqual(
        18,
      );
    });

    it("keeps current VELORA visual assets SVG-only and lightweight", async () => {
      const directory =
        join(
          process.cwd(),
          "public/images/velora",
        );

      const names =
        await readdir(
          directory,
        );

      let totalBytes =
        0;

      for (const name of names) {
        expect(
          extname(name),
        ).toBe(
          ".svg",
        );

        const info =
          await stat(
            join(
              directory,
              name,
            ),
          );

        totalBytes +=
          info.size;

        expect(
          info.size,
        ).toBeLessThan(
          4096,
        );
      }

      expect(
        totalBytes,
      ).toBeLessThan(
        8192,
      );
    });

    it("keeps public Storefront route files as Server Components", async () => {
      for (
        const file
        of [
          "src/app/[locale]/page.tsx",
          "src/app/[locale]/categories/[category]/page.tsx",
          "src/app/[locale]/products/[slug]/page.tsx",
        ]
      ) {
        const content =
          await source(file);

        expect(
          content
            .trimStart()
            .startsWith(
              '"use client"',
            ),
        ).toBe(false);
      }
    });

    it("connects Open Graph and Twitter metadata only at public Storefront entry routes", async () => {
      for (
        const file
        of [
          "src/app/[locale]/page.tsx",
          "src/app/[locale]/categories/[category]/page.tsx",
          "src/app/[locale]/products/[slug]/page.tsx",
        ]
      ) {
        const content =
          await source(file);

        expect(
          content,
        ).toContain(
          "openGraph:",
        );

        expect(
          content,
        ).toContain(
          "twitter:",
        );
      }
    });

    it("keeps deployment origin configuration explicit instead of inventing a production host", async () => {
      const content =
        await source(
          "src/lib/site-origin.ts",
        );

      expect(
        content,
      ).toContain(
        "NEXT_PUBLIC_SITE_URL",
      );

      expect(
        content,
      ).not.toContain(
        ".vercel.app",
      );
    });

    it("keeps private demo journeys out of robots discovery", async () => {
      const content =
        await source(
          "src/app/robots.ts",
        );

      for (
        const route
        of [
          "account",
          "admin",
          "checkout",
          "login",
          "orders",
        ]
      ) {
        expect(
          content,
        ).toContain(
          `"${route}"`,
        );
      }

      expect(
        content,
      ).toContain(
        "/sitemap.xml",
      );
    });

    it("limits sitemap discovery to Home Category and Product public journeys", async () => {
      const content =
        await source(
          "src/app/sitemap.ts",
        );

      expect(
        content,
      ).toContain(
        "listStorefrontProducts",
      );

      expect(
        content,
      ).toContain(
        "/categories/",
      );

      expect(
        content,
      ).toContain(
        "/products/",
      );

      expect(
        content,
      ).not.toContain(
        "/admin",
      );
    });

    it("preserves responsive overflow containment while adding runtime viewport evidence", async () => {
      const globalCss =
        await source(
          "src/styles/design-tokens.css",
        );

      const discoveryCss =
        await source(
          "src/components/commerce/product-discovery.module.css",
        );

      const e2e =
        await source(
          "e2e/storefront-responsive-seo.spec.ts",
        );

      expect(
        globalCss,
      ).toContain(
        "overflow-x: clip",
      );

      expect(
        discoveryCss,
      ).toContain(
        "overflow-x: auto",
      );

      for (
        const width
        of [
          "320",
          "768",
          "1440",
        ]
      ) {
        expect(
          e2e,
        ).toContain(width);
      }
    });
  },
);