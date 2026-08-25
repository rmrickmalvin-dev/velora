import type {
  Order,
} from "../../domain/entities/order";
import type {
  OrderRepository,
} from "../../domain/repositories/order-repository";
import {
  transitionOrderStatus,
} from "../../domain/services/order-service";
import type {
  CustomerId,
  OrderId,
} from "../../domain/types/identifiers";
import type {
  OrderStatus,
} from "../../domain/types/statuses";
import {
  ApplicationError,
} from "../errors/application-error";

export async function changeOrderStatus(
  orders: OrderRepository,
  input:
    Readonly<{
      orderId: OrderId;
      nextStatus:
        OrderStatus;
    }>,
): Promise<Order> {
  const current =
    await orders.findById(
      input.orderId,
    );

  if (!current) {
    throw new ApplicationError(
      "APPLICATION_ORDER_NOT_FOUND",
      "Order was not found.",
    );
  }

  const next =
    transitionOrderStatus(
      current,
      input.nextStatus,
    );

  await orders.save(next);

  return next;
}

export async function listCustomerOrders(
  orders: OrderRepository,
  customerId: CustomerId,
): Promise<
  readonly Order[]
> {
  return orders.listByCustomerId(
    customerId,
  );
}