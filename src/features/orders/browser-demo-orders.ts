import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  emitBrowserCartChanged,
} from "../cart/browser-cart-runtime";
import {
  buildDemoOrderHistory,
  type DemoOrderHistoryItem,
} from "../../presentation/orders/demo-order-history-model";

function assertBrowser() {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Demo Order history requires a browser runtime.",
    );
  }
}

export async function loadBrowserDemoOrders():
  Promise<
    readonly DemoOrderHistoryItem[]
  > {
  assertBrowser();

  const runtime =
    createBrowserVeloraRuntime(
      "velora-demo",
    );

  const orders =
    await runtime.application
      .listDemoOrders();

  return buildDemoOrderHistory(
    orders,
  );
}

export async function resetBrowserDemoData():
  Promise<void> {
  assertBrowser();

  await createBrowserVeloraRuntime(
    "velora-demo",
  ).resetDemo();

  emitBrowserCartChanged();
}