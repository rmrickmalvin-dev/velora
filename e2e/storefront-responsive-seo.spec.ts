import {
  expect,
  test,
} from "@playwright/test";

const viewports =
  [
    {
      label:
        "compact",
      width:
        320,
      height:
        800,
    },
    {
      label:
        "tablet",
      width:
        768,
      height:
        1024,
    },
    {
      label:
        "desktop",
      width:
        1440,
      height:
        900,
    },
  ] as const;

const journeys =
  [
    {
      label:
        "home",
      path:
        "/pt-BR",
    },
    {
      label:
        "category",
      path:
        "/pt-BR/categories/smartphone",
    },
    {
      label:
        "product",
      path:
        "/pt-BR/products/aster-air",
    },
  ] as const;

for (const viewport of viewports) {
  for (const journey of journeys) {
    test(
      `${viewport.label} ${journey.label} avoids page-level horizontal overflow`,
      async ({
        page,
      }) => {
        await page.setViewportSize({
          width:
            viewport.width,
          height:
            viewport.height,
        });

        await page.goto(
          journey.path,
          {
            waitUntil:
              "domcontentloaded",
          },
        );

        const main =
          page.locator(
            "main",
          ).first();

        await expect(
          main,
        ).toBeVisible();

        const metrics =
          await page.evaluate(
            () => ({
              documentClientWidth:
                document
                  .documentElement
                  .clientWidth,
              documentScrollWidth:
                document
                  .documentElement
                  .scrollWidth,
              bodyScrollWidth:
                document.body
                  .scrollWidth,
            }),
          );

        expect(
          metrics
            .documentScrollWidth,
        ).toBeLessThanOrEqual(
          metrics
            .documentClientWidth +
            1,
        );

        expect(
          metrics
            .bodyScrollWidth,
        ).toBeLessThanOrEqual(
          metrics
            .documentClientWidth +
            1,
        );

        const box =
          await main
            .boundingBox();

        expect(box).not
          .toBeNull();

        if (box) {
          expect(
            box.x,
          ).toBeGreaterThanOrEqual(
            -1,
          );

          expect(
            box.x +
              box.width,
          ).toBeLessThanOrEqual(
            viewport.width +
              1,
          );
        }
      },
    );
  }
}

for (const journey of journeys) {
  test(
    `${journey.label} exposes public social metadata`,
    async ({
      page,
    }) => {
      await page.goto(
        journey.path,
        {
          waitUntil:
            "domcontentloaded",
        },
      );

      await expect(
        page.locator(
          'meta[property="og:title"]',
        ),
      ).toHaveCount(1);

      await expect(
        page.locator(
          'meta[property="og:type"]',
        ),
      ).toHaveAttribute(
        "content",
        "website",
      );

      await expect(
        page.locator(
          'meta[name="twitter:card"]',
        ),
      ).toHaveAttribute(
        "content",
        "summary",
      );

      await expect(
        page.locator(
          'link[rel="canonical"]',
        ),
      ).toHaveCount(1);

      await expect(
        page.locator(
          'link[hreflang="x-default"]',
        ),
      ).toHaveCount(1);
    },
  );
}