import {
  expect,
  test,
} from "@playwright/test";

const cartTriggerSelector =
  '[aria-haspopup="dialog"][aria-controls="velora-cart-dialog"]';

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

test.beforeEach(
  async ({
    page,
  }) => {
    await page.goto(
      "/pt-BR",
      {
        waitUntil:
          "domcontentloaded",
      },
    );
  },
);

test(
  "Cart opens with focus inside the controlled dialog",
  async ({
    page,
  }) => {
    const trigger =
      page.locator(
        cartTriggerSelector,
      ).first();

    await trigger.click();

    await expect(
      trigger,
    ).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    const dialog =
      page.locator(
        "#velora-cart-dialog",
      );

    await expect(
      dialog,
    ).toBeVisible();

    await expect(
      dialog.locator(
        "button",
      ).first(),
    ).toBeFocused();
  },
);

test(
  "Cart traps reverse and forward Tab navigation inside the dialog",
  async ({
    page,
  }) => {
    await page.locator(
      cartTriggerSelector,
    ).first().click();

    const dialog =
      page.locator(
        "#velora-cart-dialog",
      );

    const focusable =
      dialog.locator(
        focusableSelector,
      );

    const first =
      focusable.first();

    const last =
      focusable.last();

    await expect(
      first,
    ).toBeFocused();

    await page.keyboard.press(
      "Shift+Tab",
    );

    await expect(
      last,
    ).toBeFocused();

    await page.keyboard.press(
      "Tab",
    );

    await expect(
      first,
    ).toBeFocused();
  },
);

test(
  "Escape closes Cart and restores focus to its trigger",
  async ({
    page,
  }) => {
    const trigger =
      page.locator(
        cartTriggerSelector,
      ).first();

    await trigger.click();

    await expect(
      page.locator(
        "#velora-cart-dialog",
      ),
    ).toBeVisible();

    await page.keyboard.press(
      "Escape",
    );

    await expect(
      page.locator(
        "#velora-cart-dialog",
      ),
    ).toHaveCount(0);

    await expect(
      trigger,
    ).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    await expect(
      trigger,
    ).toBeFocused();
  },
);

test(
  "Product Discovery category filter remains keyboard operable and URL-backed",
  async ({
    page,
  }) => {
    const categoryFilter =
      page.locator(
        'button[aria-pressed]',
      ).filter({
        hasText:
          "Smartphones",
      }).first();

    await expect(
      categoryFilter,
    ).toBeVisible();

    await categoryFilter.focus();

    await expect(
      categoryFilter,
    ).toBeFocused();

    await categoryFilter.press(
      "Enter",
    );

    await expect(
      categoryFilter,
    ).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await expect(
      page,
    ).toHaveURL(
      /[?&]category=smartphone(?:&|$)/,
    );
  },
);