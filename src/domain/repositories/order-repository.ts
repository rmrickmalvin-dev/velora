import type {
  Order,
} from "../entities/order";
import type {
  CustomerId,
  OrderId,
} from "../types/identifiers";

export interface OrderRepository {
  findById(
    id: OrderId,
  ): Promise<Order | null>;

  list():
    Promise<
      readonly Order[]
    >;

  listByCustomerId(
    customerId: CustomerId,
  ): Promise<
    readonly Order[]
  >;

  save(
    order: Order,
  ): Promise<void>;
}