import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test,
} from "@playwright/test";

const journeys = [
  {
    locale:
      "pt-BR",
    routes: [
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
    ],
  },
  {
    locale:
      "en",
    routes: [
      {
        label:
          "home",
        path:
          "/en",
      },
      {
        label:
          "category",
        path:
          "/en/categories/smartphone",
      },
      {
        label:
          "product",
        path:
          "/en/products/aster-air",
      },
    ],
  },
  {
    locale:
      "es",
    routes: [
      {
        label:
          "home",
        path:
          "/es",
      },
      {
        label:
          "category",
        path:
          "/es/categories/smartphone",
      },
      {
        label:
          "product",
        path:
          "/es/products/aster-air",
      },
    ],
  },
] as const;

for (
  const journey of
  journeys
) {
  for (
    const route of
    journey.routes
  ) {
    test(
      `${journey.locale} ${route.label} has no WCAG A or AA violations`,
      async ({
        page,
      }) => {
        await page.goto(
          route.path,
          {
            waitUntil:
              "domcontentloaded",
          },
        );

        await expect(
          page.locator(
            "main",
          ).first(),
        ).toBeVisible();

        const result =
          await new AxeBuilder({
            page,
          })
            .withTags([
              "wcag2a",
              "wcag2aa",
              "wcag21a",
              "wcag21aa",
            ])
            .analyze();

        expect(
          result.violations,
        ).toEqual([]);
      },
    );
  }
}