import {
  createCartItem,
} from "../../domain/entities/cart-item";
import {
  createCart,
  type Cart,
} from "../../domain/entities/cart";
import type {
  CartRepository,
} from "../../domain/repositories/cart-repository";
import type {
  InventoryRepository,
} from "../../domain/repositories/inventory-repository";
import type {
  ProductVariantRepository,
} from "../../domain/repositories/product-variant-repository";
import {
  addCartItem,
  calculateCartSubtotal,
  removeCartItem,
  updateCartItemQuantity,
} from "../../domain/services/cart-service";
import type {
  CartId,
  CartItemId,
  ProductVariantId,
} from "../../domain/types/identifiers";
import type {
  Money,
} from "../../domain/value-objects/money";
import {
  ApplicationError,
} from "../errors/application-error";

export type AddProductToCartDependencies =
  Readonly<{
    carts: CartRepository;
    productVariants:
      ProductVariantRepository;
    inventory:
      InventoryRepository;
  }>;

export type AddProductToCartInput =
  Readonly<{
    cartId: CartId;
    cartItemId: CartItemId;
    productVariantId:
      ProductVariantId;
    quantity: number;
  }>;

export async function addProductToCart(
  dependencies:
    AddProductToCartDependencies,
  input:
    AddProductToCartInput,
): Promise<Cart> {
  const variant =
    await dependencies
      .productVariants
      .findById(
        input.productVariantId,
      );

  if (!variant) {
    throw new ApplicationError(
      "APPLICATION_VARIANT_NOT_FOUND",
      "ProductVariant was not found.",
    );
  }

  if (
    variant.status !== "ACTIVE"
  ) {
    throw new ApplicationError(
      "APPLICATION_VARIANT_UNAVAILABLE",
      "ProductVariant is not available for sale.",
    );
  }

  const inventory =
    await dependencies
      .inventory
      .findByProductVariantId(
        variant.id,
      );

  if (!inventory) {
    throw new ApplicationError(
      "APPLICATION_INVENTORY_NOT_FOUND",
      "Inventory was not found for ProductVariant.",
    );
  }

  const current =
    (
      await dependencies
        .carts
        .findById(
          input.cartId,
        )
    ) ??
    createCart({
      id: input.cartId,
    });

  const existing =
    current.items.find(
      (item) =>
        item.productVariantId ===
        variant.id,
    );

  const nextQuantity =
    (existing?.quantity ?? 0) +
    input.quantity;

  if (
    nextQuantity >
    inventory.quantityOnHand
  ) {
    throw new ApplicationError(
      "APPLICATION_STOCK_INSUFFICIENT",
      "Requested Cart quantity exceeds available Inventory.",
    );
  }

  const next =
    existing
      ? updateCartItemQuantity(
          current,
          existing.id,
          nextQuantity,
        )
      : addCartItem(
          current,
          createCartItem({
            id:
              input.cartItemId,
            productVariantId:
              variant.id,
            unitPrice:
              variant.price,
            quantity:
              input.quantity,
          }),
        );

  await dependencies
    .carts
    .save(next);

  return next;
}

export type UpdateCartQuantityDependencies =
  Readonly<{
    carts: CartRepository;
    inventory:
      InventoryRepository;
  }>;

export async function updateCartQuantity(
  dependencies:
    UpdateCartQuantityDependencies,
  input:
    Readonly<{
      cartId: CartId;
      cartItemId: CartItemId;
      quantity: number;
    }>,
): Promise<Cart> {
  const cart =
    await dependencies
      .carts
      .findById(
        input.cartId,
      );

  if (!cart) {
    throw new ApplicationError(
      "APPLICATION_CART_NOT_FOUND",
      "Cart was not found.",
    );
  }

  const item =
    cart.items.find(
      (candidate) =>
        candidate.id ===
        input.cartItemId,
    );

  if (!item) {
    throw new ApplicationError(
      "APPLICATION_CART_ITEM_NOT_FOUND",
      "CartItem was not found.",
    );
  }

  const inventory =
    await dependencies
      .inventory
      .findByProductVariantId(
        item.productVariantId,
      );

  if (!inventory) {
    throw new ApplicationError(
      "APPLICATION_INVENTORY_NOT_FOUND",
      "Inventory was not found for CartItem.",
    );
  }

  if (
    input.quantity >
    inventory.quantityOnHand
  ) {
    throw new ApplicationError(
      "APPLICATION_STOCK_INSUFFICIENT",
      "Requested Cart quantity exceeds available Inventory.",
    );
  }

  const next =
    updateCartItemQuantity(
      cart,
      item.id,
      input.quantity,
    );

  await dependencies
    .carts
    .save(next);

  return next;
}

export async function removeProductFromCart(
  carts: CartRepository,
  input:
    Readonly<{
      cartId: CartId;
      cartItemId: CartItemId;
    }>,
): Promise<Cart> {
  const cart =
    await carts.findById(
      input.cartId,
    );

  if (!cart) {
    throw new ApplicationError(
      "APPLICATION_CART_NOT_FOUND",
      "Cart was not found.",
    );
  }

  const exists =
    cart.items.some(
      (item) =>
        item.id ===
        input.cartItemId,
    );

  if (!exists) {
    throw new ApplicationError(
      "APPLICATION_CART_ITEM_NOT_FOUND",
      "CartItem was not found.",
    );
  }

  const next =
    removeCartItem(
      cart,
      input.cartItemId,
    );

  await carts.save(next);

  return next;
}

export type CartSummary =
  Readonly<{
    cart: Cart;
    subtotal: Money | null;
  }>;

export async function getCartSummary(
  carts: CartRepository,
  cartId: CartId,
): Promise<
  CartSummary | null
> {
  const cart =
    await carts.findById(
      cartId,
    );

  if (!cart) {
    return null;
  }

  return Object.freeze({
    cart,
    subtotal:
      calculateCartSubtotal(
        cart,
      ),
  });
}