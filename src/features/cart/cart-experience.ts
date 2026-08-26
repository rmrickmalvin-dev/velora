import type {
  VeloraApplication,
} from "../../application/create-velora-application";

export const VELORA_DEMO_CART_ID =
  "velora-demo-cart";

type CartApplication =
  Pick<
    VeloraApplication,
    | "addProductToCart"
    | "getCartSummary"
  >;

type AddInput =
  Parameters<
    VeloraApplication[
      "addProductToCart"
    ]
  >[0];

type CartSummary =
  Awaited<
    ReturnType<
      VeloraApplication[
        "getCartSummary"
      ]
    >
  >;

export type CartExperienceSnapshot =
  Readonly<{
    totalItems: number;
    lineCount: number;
    subtotalMinorUnits:
      number | null;
    currency:
      string | null;
  }>;

export type CartExperience =
  Readonly<{
    load:
      () =>
        Promise<
          CartExperienceSnapshot
        >;
    add:
      (
        productVariantId:
          string,
      ) =>
        Promise<
          CartExperienceSnapshot
        >;
  }>;

function emptySnapshot():
  CartExperienceSnapshot {
  return Object.freeze({
    totalItems: 0,
    lineCount: 0,
    subtotalMinorUnits:
      null,
    currency: null,
  });
}

export function snapshotCartExperience(
  summary:
    CartSummary,
): CartExperienceSnapshot {
  if (!summary) {
    return emptySnapshot();
  }

  const totalItems =
    summary.cart.items.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.quantity,
      0,
    );

  return Object.freeze({
    totalItems,
    lineCount:
      summary.cart.items.length,
    subtotalMinorUnits:
      summary.subtotal
        ?.minorUnits ??
      null,
    currency:
      summary.subtotal
        ?.currency ??
      null,
  });
}

export function createCartExperience(
  application:
    CartApplication,
): CartExperience {
  const cartId =
    VELORA_DEMO_CART_ID as
      AddInput["cartId"];

  return Object.freeze({
    load:
      async () =>
        snapshotCartExperience(
          await application
            .getCartSummary(
              cartId,
            ),
        ),

    add:
      async (
        productVariantId,
      ) => {
        const input:
          AddInput = {
            cartId,
            cartItemId:
              `cart-item-${productVariantId}`,
            productVariantId:
              productVariantId as
                AddInput[
                  "productVariantId"
                ],
            quantity: 1,
          };

        await application
          .addProductToCart(
            input,
          );

        return snapshotCartExperience(
          await application
            .getCartSummary(
              cartId,
            ),
        );
      },
  });
}