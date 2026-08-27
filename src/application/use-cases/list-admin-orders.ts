import type {
  Order,
} from "../../domain/entities/order";
import type {
  OrderRepository,
} from "../../domain/repositories/order-repository";

export async function listAdminOrders(
  orders:
    OrderRepository,
): Promise<
  readonly Order[]
> {
  return orders.list();
}