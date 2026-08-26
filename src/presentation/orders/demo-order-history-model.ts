import type {
  Order,
} from "../../domain/entities/order";
import {
  calculateOrderSubtotal,
} from "../../domain/services/order-service";

export type DemoOrderHistoryItem =
  Readonly<{
    orderId: string;
    status: string;
    totalItems: number;
    lineCount: number;
    subtotalMinorUnits:
      number;
    currency: string;
  }>;

export function buildDemoOrderHistory(
  orders:
    readonly Order[],
): readonly DemoOrderHistoryItem[] {
  const items =
    orders.map(
      (
        order,
      ): DemoOrderHistoryItem => {
        const subtotal =
          calculateOrderSubtotal(
            order,
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
          subtotalMinorUnits:
            subtotal.minorUnits,
          currency:
            subtotal.currency,
        });
      },
    );

  items.sort(
    (
      left,
      right,
    ) =>
      right.orderId.localeCompare(
        left.orderId,
      ),
  );

  return Object.freeze(
    items,
  );
}