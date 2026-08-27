import type {
  VeloraApplication,
} from "../../application/create-velora-application";
import type {
  OrderStatus,
} from "../../domain/types/statuses";
import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  buildAdminOrdersModel,
  type AdminOrdersModel,
} from "../../presentation/admin/admin-orders-model";

type ChangeOrderStatusInput =
  Parameters<
    VeloraApplication[
      "changeOrderStatus"
    ]
  >[0];

function application():
  VeloraApplication {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Admin Order operations require a browser runtime.",
    );
  }

  return createBrowserVeloraRuntime(
    "velora-demo",
  ).application;
}

export async function loadBrowserAdminOrders():
  Promise<
    AdminOrdersModel
  > {
  const orders =
    await application()
      .listAdminOrders();

  return buildAdminOrdersModel(
    orders,
  );
}

export async function changeBrowserAdminOrderStatus(
  orderId: string,
  nextStatus:
    OrderStatus,
): Promise<void> {
  await application()
    .changeOrderStatus({
      orderId:
        orderId as
          ChangeOrderStatusInput[
            "orderId"
          ],
      nextStatus,
    });
}