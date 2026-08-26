import type {
  Order,
} from "../../../domain/entities/order";
import type {
  OrderRepository,
} from "../../../domain/repositories/order-repository";
import type {
  CustomerId,
  OrderId,
} from "../../../domain/types/identifiers";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateOrder,
} from "./domain-hydrators";

export class PersistentOrderRepository
  implements OrderRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
  ) {}

  async findById(
    id: OrderId,
  ): Promise<Order | null> {
    const record =
      await this.provider.get<
        Order
      >(
        "orders",
        id,
      );

    return record
      ? hydrateOrder(record)
      : null;
  }

  async listByCustomerId(
    customerId: CustomerId,
  ): Promise<
    readonly Order[]
  > {
    const records =
      await this.provider.getAll<
        Order
      >(
        "orders",
      );

    return Object.freeze(
      records
        .map(hydrateOrder)
        .filter(
          (order) =>
            order.customerId ===
            customerId,
        ),
    );
  }

  async save(
    order: Order,
  ): Promise<void> {
    await this.provider.put(
      "orders",
      order,
    );
  }
}