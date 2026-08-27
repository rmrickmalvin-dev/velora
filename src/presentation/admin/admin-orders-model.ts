import type {
  Order,
} from "../../domain/entities/order";
import {
  calculateOrderSubtotal,
  getAllowedOrderStatusTransitions,
} from "../../domain/services/order-service";
import type {
  OrderStatus,
} from "../../domain/types/statuses";

export type AdminOrderFilter =
  | "ALL"
  | OrderStatus;

export type AdminOrderModel =
  Readonly<{
    orderId: string;
    customerId:
      string | null;
    customerKind:
      "GUEST" |
      "CUSTOMER";
    status:
      OrderStatus;
    totalItems: number;
    lineCount: number;
    subtotalMinorUnits:
      number;
    currency: string;
    nextStatuses:
      readonly OrderStatus[];
  }>;

export type AdminOrdersModel =
  Readonly<{
    totalOrders: number;
    statusCounts:
      Readonly<
        Record<
          OrderStatus,
          number
        >
      >;
    orders:
      readonly AdminOrderModel[];
  }>;

const statuses:
  readonly OrderStatus[] =
    Object.freeze([
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ]);

export function buildAdminOrdersModel(
  orders:
    readonly Order[],
): AdminOrdersModel {
  const statusCounts =
    Object.fromEntries(
      statuses.map(
        (status) => [
          status,
          0,
        ],
      ),
    ) as
      Record<
        OrderStatus,
        number
      >;

  const items =
    orders.map(
      (order) => {
        statusCounts[
          order.status
        ] += 1;

        const subtotal =
          calculateOrderSubtotal(
            order,
          );

        return Object.freeze({
          orderId:
            order.id,
          customerId:
            order.customerId ??
            null,
          customerKind:
            order.customerId
              ? "CUSTOMER" as const
              : "GUEST" as const,
          status:
            order.status,
          totalItems:
            order.items.reduce(
              (
                total,
                item,
              ) =>
                total +
                item.quantity,
              0,
            ),
          lineCount:
            order.items.length,
          subtotalMinorUnits:
            subtotal.minorUnits,
          currency:
            subtotal.currency,
          nextStatuses:
            getAllowedOrderStatusTransitions(
              order.status,
            ),
        });
      },
    );

  return Object.freeze({
    totalOrders:
      items.length,
    statusCounts:
      Object.freeze({
        ...statusCounts,
      }),
    orders:
      Object.freeze(
        items,
      ),
  });
}

export function filterAdminOrders(
  orders:
    readonly AdminOrderModel[],
  filter:
    AdminOrderFilter,
): readonly AdminOrderModel[] {
  if (
    filter ===
    "ALL"
  ) {
    return Object.freeze([
      ...orders,
    ]);
  }

  return Object.freeze(
    orders.filter(
      (order) =>
        order.status ===
        filter,
    ),
  );
}