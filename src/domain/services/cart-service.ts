import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  CartItemId,
} from "../types/identifiers";
import {
  addMoney,
  multiplyMoneyByInteger,
  type Money,
} from "../value-objects/money";
import {
  createCartItem,
  type CartItem,
} from "../entities/cart-item";
import {
  createCart,
  type Cart,
} from "../entities/cart";

export function addCartItem(
  cart: Cart,
  item: CartItem,
): Cart {
  return createCart({
    id: cart.id,
    items: [
      ...cart.items,
      item,
    ],
  });
}

export function removeCartItem(
  cart: Cart,
  itemId: CartItemId,
): Cart {
  const exists = cart.items.some(
    (item) =>
      item.id === itemId,
  );

  if (!exists) {
    throw new DomainValidationError(
      "CART_ITEM_NOT_FOUND",
      `CartItem not found: ${itemId}`,
    );
  }

  return createCart({
    id: cart.id,
    items:
      cart.items.filter(
        (item) =>
          item.id !== itemId,
      ),
  });
}

export function updateCartItemQuantity(
  cart: Cart,
  itemId: CartItemId,
  quantity: number,
): Cart {
  const existing =
    cart.items.find(
      (item) =>
        item.id === itemId,
    );

  if (!existing) {
    throw new DomainValidationError(
      "CART_ITEM_NOT_FOUND",
      `CartItem not found: ${itemId}`,
    );
  }

  const updated =
    createCartItem({
      id: existing.id,
      productVariantId:
        existing.productVariantId,
      unitPrice:
        existing.unitPrice,
      quantity,
    });

  return createCart({
    id: cart.id,
    items:
      cart.items.map(
        (item) =>
          item.id === itemId
            ? updated
            : item,
      ),
  });
}

export function calculateCartSubtotal(
  cart: Cart,
): Money | null {
  if (
    cart.items.length === 0
  ) {
    return null;
  }

  const lineTotals =
    cart.items.map(
      (item) =>
        multiplyMoneyByInteger(
          item.unitPrice,
          item.quantity,
        ),
    );

  let subtotal = lineTotals[0];

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