import type {
  VeloraApplication,
} from "../../application/create-velora-application";
import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  VELORA_DEMO_CART_ID,
} from "../cart/cart-experience";

type DemoOrderApplication =
  Pick<
    VeloraApplication,
    "createDemoOrderFromCart"
  >;

type CreateDemoOrderInput =
  Parameters<
    VeloraApplication[
      "createDemoOrderFromCart"
    ]
  >[0];

export type DemoOrderConfirmation =
  Readonly<{
    orderId: string;
    status: string;
    totalItems: number;
    lineCount: number;
  }>;

export function createDemoOrderReference(
  now: number,
  entropy: string,
): string {
  const normalizedEntropy =
    entropy
      .trim()
      .replace(
        /[^a-zA-Z0-9]/g,
        "",
      )
      .slice(
        0,
        12,
      );

  const suffix =
    normalizedEntropy ||
    "local";

  return (
    `demo-order-${now}-${suffix}`
  );
}

export async function completeDemoOrder(
  application:
    DemoOrderApplication,
  orderId: string,
): Promise<
  DemoOrderConfirmation
> {
  const input = {
    cartId:
      VELORA_DEMO_CART_ID,
    orderId,
  } as unknown as
    CreateDemoOrderInput;

  const order =
    await application
      .createDemoOrderFromCart(
        input,
      );

  const totalItems =
    order.items.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.quantity,
      0,
    );

  return Object.freeze({
    orderId:
      order.id,
    status:
      order.status,
    totalItems,
    lineCount:
      order.items.length,
  });
}

export async function completeBrowserDemoOrder():
  Promise<
    DemoOrderConfirmation
  > {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Demo Order completion requires a browser runtime.",
    );
  }

  const entropy =
    globalThis.crypto
      ?.randomUUID?.() ??
    Math.random()
      .toString(36)
      .slice(2);

  const orderId =
    createDemoOrderReference(
      Date.now(),
      entropy,
    );

  return completeDemoOrder(
    createBrowserVeloraRuntime(
      "velora-demo",
    ).application,
    orderId,
  );
}