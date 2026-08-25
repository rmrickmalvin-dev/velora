import type {
  Cart,
} from "../../../domain/entities/cart";
import type {
  CartRepository,
} from "../../../domain/repositories/cart-repository";
import type {
  CartId,
} from "../../../domain/types/identifiers";

export class LocalCartRepository
  implements CartRepository
{
  private readonly items =
    new Map<
      CartId,
      Cart
    >();

  constructor(
    initial:
      readonly Cart[] =
        [],
  ) {
    for (const cart of initial) {
      this.items.set(
        cart.id,
        cart,
      );
    }
  }

  async findById(
    id: CartId,
  ): Promise<Cart | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async save(
    cart: Cart,
  ): Promise<void> {
    this.items.set(
      cart.id,
      cart,
    );
  }

  async remove(
    id: CartId,
  ): Promise<void> {
    this.items.delete(id);
  }
}