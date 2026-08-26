import type {
  CartRepository,
} from "../domain/repositories/cart-repository";
import type {
  InventoryMovementRepository,
} from "../domain/repositories/inventory-movement-repository";
import type {
  InventoryRepository,
} from "../domain/repositories/inventory-repository";
import type {
  OrderRepository,
} from "../domain/repositories/order-repository";
import type {
  ProductMediaRepository,
} from "../domain/repositories/product-media-repository";
import type {
  ProductRepository,
} from "../domain/repositories/product-repository";
import type {
  ProductVariantRepository,
} from "../domain/repositories/product-variant-repository";
import type {
  CartId,
  CustomerId,
} from "../domain/types/identifiers";
import type {
  Slug,
} from "../domain/value-objects/slug";
import {
  adjustInventory,
  type AdjustInventoryInput,
} from "./use-cases/adjust-inventory";
import {
  addProductToCart,
  getCartSummary,
  removeProductFromCart,
  updateCartQuantity,
  type AddProductToCartInput,
} from "./use-cases/cart-use-cases";
import {
  changeOrderStatus,
  listCustomerOrders,
} from "./use-cases/order-use-cases";
import {
  getStorefrontProductBySlug,
  listStorefrontProducts,
} from "./use-cases/storefront-query";

export type VeloraApplicationDependencies =
  Readonly<{
    products:
      ProductRepository;
    productVariants:
      ProductVariantRepository;
    productMedia:
      ProductMediaRepository;
    inventory:
      InventoryRepository;
    inventoryMovements:
      InventoryMovementRepository;
    carts:
      CartRepository;
    orders:
      OrderRepository;
  }>;

export type UpdateCartQuantityInput =
  Readonly<{
    cartId: CartId;
    cartItemId: string;
    quantity: number;
  }>;

export type RemoveProductFromCartInput =
  Readonly<{
    cartId: CartId;
    cartItemId: string;
  }>;

export type ChangeOrderStatusInput =
  Parameters<
    typeof changeOrderStatus
  >[1];

export type VeloraApplication =
  Readonly<{
    listStorefrontProducts:
      typeof listStorefrontProducts extends (
        dependencies: never,
        ...args: infer TArgs
      ) => infer TResult
        ? (...args: TArgs) => TResult
        : never;

    getStorefrontProductBySlug:
      (
        slug: Slug,
      ) => ReturnType<
        typeof getStorefrontProductBySlug
      >;

    addProductToCart:
      (
        input:
          AddProductToCartInput,
      ) => ReturnType<
        typeof addProductToCart
      >;

    updateCartQuantity:
      (
        input:
          UpdateCartQuantityInput,
      ) => ReturnType<
        typeof updateCartQuantity
      >;

    removeProductFromCart:
      (
        input:
          RemoveProductFromCartInput,
      ) => ReturnType<
        typeof removeProductFromCart
      >;

    getCartSummary:
      (
        cartId: CartId,
      ) => ReturnType<
        typeof getCartSummary
      >;

    adjustInventory:
      (
        input:
          AdjustInventoryInput,
      ) => ReturnType<
        typeof adjustInventory
      >;

    changeOrderStatus:
      (
        input:
          ChangeOrderStatusInput,
      ) => ReturnType<
        typeof changeOrderStatus
      >;

    listCustomerOrders:
      (
        customerId:
          CustomerId,
      ) => ReturnType<
        typeof listCustomerOrders
      >;
  }>;

export function createVeloraApplication(
  dependencies:
    VeloraApplicationDependencies,
): VeloraApplication {
  return Object.freeze({
    listStorefrontProducts:
      () =>
        listStorefrontProducts(
          dependencies,
        ),

    getStorefrontProductBySlug:
      (slug) =>
        getStorefrontProductBySlug(
          dependencies,
          slug,
        ),

    addProductToCart:
      (input) =>
        addProductToCart(
          dependencies,
          input,
        ),

    updateCartQuantity:
      (input) =>
        updateCartQuantity(
          dependencies,
          input,
        ),

    removeProductFromCart:
      (input) =>
        removeProductFromCart(
          dependencies.carts,
          input,
        ),

    getCartSummary:
      (cartId) =>
        getCartSummary(
          dependencies.carts,
          cartId,
        ),

    adjustInventory:
      (input) =>
        adjustInventory(
          dependencies,
          input,
        ),

    changeOrderStatus:
      (input) =>
        changeOrderStatus(
          dependencies.orders,
          input,
        ),

    listCustomerOrders:
      (customerId) =>
        listCustomerOrders(
          dependencies.orders,
          customerId,
        ),
  });
}