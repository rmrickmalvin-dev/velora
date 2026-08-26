import type {
  VeloraApplication,
} from "../../application/create-velora-application";

export const VELORA_DEMO_CART_ID =
  "velora-demo-cart";

type CartApplication =
  Pick<
    VeloraApplication,
    | "addProductToCart"
    | "updateCartQuantity"
    | "removeProductFromCart"
    | "getCartSummary"
    | "listStorefrontProducts"
  >;

type AddInput =
  Parameters<
    VeloraApplication[
      "addProductToCart"
    ]
  >[0];

type UpdateInput =
  Parameters<
    VeloraApplication[
      "updateCartQuantity"
    ]
  >[0];

type RemoveInput =
  Parameters<
    VeloraApplication[
      "removeProductFromCart"
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

export type CartExperienceLine =
  Readonly<{
    cartItemId: string;
    productVariantId: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPriceMinorUnits:
      number;
    currency: string;
  }>;

export type CartExperienceSnapshot =
  Readonly<{
    totalItems: number;
    lineCount: number;
    subtotalMinorUnits:
      number | null;
    currency:
      string | null;
    lines:
      readonly CartExperienceLine[];
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
    update:
      (
        cartItemId:
          string,
        productVariantId:
          string,
        quantity: number,
      ) =>
        Promise<
          CartExperienceSnapshot
        >;
    remove:
      (
        cartItemId:
          string,
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
    lines:
      Object.freeze([]),
  });
}

async function snapshotCartExperience(
  application:
    CartApplication,
  summary:
    CartSummary,
): Promise<
  CartExperienceSnapshot
> {
  if (!summary) {
    return emptySnapshot();
  }

  const products =
    await application
      .listStorefrontProducts();

  const variantDetails =
    new Map<
      string,
      Readonly<{
        productName: string;
        sku: string;
      }>
    >();

  for (
    const product
    of products
  ) {
    for (
      const entry
      of product.variants
    ) {
      variantDetails.set(
        entry.variant.id,
        Object.freeze({
          productName:
            product.product.name,
          sku:
            entry.variant.sku,
        }),
      );
    }
  }

  const lines =
    summary.cart.items.map(
      (
        item,
      ): CartExperienceLine => {
        const details =
          variantDetails.get(
            item.productVariantId,
          );

        return Object.freeze({
          cartItemId:
            item.id,
          productVariantId:
            item.productVariantId,
          productName:
            details?.productName ??
            "VELORA Product",
          sku:
            details?.sku ??
            item.productVariantId,
          quantity:
            item.quantity,
          unitPriceMinorUnits:
            item.unitPrice
              .minorUnits,
          currency:
            item.unitPrice
              .currency,
        });
      },
    );

  const totalItems =
    lines.reduce(
      (
        total,
        line,
      ) =>
        total +
        line.quantity,
      0,
    );

  return Object.freeze({
    totalItems,
    lineCount:
      lines.length,
    subtotalMinorUnits:
      summary.subtotal
        ?.minorUnits ??
      null,
    currency:
      summary.subtotal
        ?.currency ??
      null,
    lines:
      Object.freeze(
        lines,
      ),
  });
}

export function createCartExperience(
  application:
    CartApplication,
): CartExperience {
  const cartId =
    VELORA_DEMO_CART_ID as
      AddInput["cartId"];

  const load =
    async () =>
      snapshotCartExperience(
        application,
        await application
          .getCartSummary(
            cartId,
          ),
      );

  return Object.freeze({
    load,

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

        return load();
      },

    update:
      async (
        cartItemId,
        productVariantId,
        quantity,
      ) => {
        const input = {
          cartId,
          cartItemId,
          productVariantId,
          quantity,
        } as unknown as
          UpdateInput;

        await application
          .updateCartQuantity(
            input,
          );

        return load();
      },

    remove:
      async (
        cartItemId,
        productVariantId,
      ) => {
        const input = {
          cartId,
          cartItemId,
          productVariantId,
        } as unknown as
          RemoveInput;

        await application
          .removeProductFromCart(
            input,
          );

        return load();
      },
  });
}