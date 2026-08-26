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

export class LocalOrderRepository
  implements OrderRepository
{
  private readonly items =
    new Map<
      OrderId,
      Order
    >();

  constructor(
    initial:
      readonly Order[] =
        [],
  ) {
    for (const order of initial) {
      this.items.set(
        order.id,
        order,
      );
    }
  }

  async findById(
    id: OrderId,
  ): Promise<Order | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async list(): Promise<
    readonly Order[]
  > {
    return Object.freeze(
      Array.from(
        this.items.values(),
      ),
    );
  }

  async listByCustomerId(
    customerId: CustomerId,
  ): Promise<
    readonly Order[]
  > {
    return Object.freeze(
      Array.from(
        this.items.values(),
      ).filter(
        (order) =>
          order.customerId ===
          customerId,
      ),
    );
  }

  async save(
    order: Order,
  ): Promise<void> {
    this.items.set(
      order.id,
      order,
    );
  }
}