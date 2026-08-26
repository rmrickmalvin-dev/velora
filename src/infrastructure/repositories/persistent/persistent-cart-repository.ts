import type {
  Cart,
} from "../../../domain/entities/cart";
import type {
  CartRepository,
} from "../../../domain/repositories/cart-repository";
import type {
  CartId,
} from "../../../domain/types/identifiers";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateCart,
} from "./domain-hydrators";

export class PersistentCartRepository
  implements CartRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
  ) {}

  async findById(
    id: CartId,
  ): Promise<Cart | null> {
    const record =
      await this.provider.get<
        Cart
      >(
        "carts",
        id,
      );

    return record
      ? hydrateCart(record)
      : null;
  }

  async save(
    cart: Cart,
  ): Promise<void> {
    await this.provider.put(
      "carts",
      cart,
    );
  }

  async remove(
    id: CartId,
  ): Promise<void> {
    await this.provider.delete(
      "carts",
      id,
    );
  }
}