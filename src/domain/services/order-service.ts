import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  OrderStatus,
} from "../types/statuses";
import {
  addMoney,
  multiplyMoneyByInteger,
  type Money,
} from "../value-objects/money";
import {
  createOrder,
  type Order,
} from "../entities/order";

const allowedTransitions: Readonly<
  Record<
    OrderStatus,
    readonly OrderStatus[]
  >
> = {
  PENDING: [
    "CONFIRMED",
    "CANCELLED",
  ],
  CONFIRMED: [
    "PREPARING",
    "CANCELLED",
  ],
  PREPARING: [
    "SHIPPED",
    "CANCELLED",
  ],
  SHIPPED: [
    "DELIVERED",
  ],
  DELIVERED: [],
  CANCELLED: [],
};

export function getAllowedOrderStatusTransitions(
  status: OrderStatus,
): readonly OrderStatus[] {
  return Object.freeze([
    ...allowedTransitions[
      status
    ],
  ]);
}

export function calculateOrderSubtotal(
  order: Order,
): Money {
  const lineTotals =
    order.items.map(
      (item) =>
        multiplyMoneyByInteger(
          item.unitPriceSnapshot,
          item.quantity,
        ),
    );

  let subtotal =
    lineTotals[0];

  for (
    let index = 1;
    index < lineTotals.length;
    index += 1
  ) {
    subtotal = addMoney(
      subtotal,
      lineTotals[index],
    );
  }

  return subtotal;
}

export function transitionOrderStatus(
  order: Order,
  nextStatus: OrderStatus,
): Order {
  const allowed =
    allowedTransitions[
      order.status
    ];

  if (
    !allowed.includes(
      nextStatus,
    )
  ) {
    throw new DomainValidationError(
      "ORDER_STATUS_TRANSITION_INVALID",
      `Cannot transition Order from ${order.status} to ${nextStatus}.`,
    );
  }

  return createOrder({
    id: order.id,
    ...(order.customerId
      ? {
          customerId:
            order.customerId,
        }
      : {}),
    status: nextStatus,
    items: order.items,
  });
}