import type {
  Order,
} from "../../domain/entities/order";
import type {
  OrderRepository,
} from "../../domain/repositories/order-repository";

export async function listDemoOrders(
  orders:
    OrderRepository,
): Promise<
  readonly Order[]
> {
  const records =
    await orders.list();

  return Object.freeze(
    records.filter(
      (order) =>
        order.customerId ===
        undefined,
    ),
  );
}