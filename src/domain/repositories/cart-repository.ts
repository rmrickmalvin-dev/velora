import type {
  Cart,
} from "../entities/cart";
import type {
  CartId,
} from "../types/identifiers";

export interface CartRepository {
  findById(
    id: CartId,
  ): Promise<Cart | null>;

  save(
    cart: Cart,
  ): Promise<void>;

  remove(
    id: CartId,
  ): Promise<void>;
}