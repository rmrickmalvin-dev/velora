import {
  createOrder,
  type Order,
} from "../../domain/entities/order";
import {
  createOrderItem,
} from "../../domain/entities/order-item";
import type {
  CartRepository,
} from "../../domain/repositories/cart-repository";
import type {
  OrderRepository,
} from "../../domain/repositories/order-repository";
import type {
  ProductRepository,
} from "../../domain/repositories/product-repository";
import type {
  ProductVariantRepository,
} from "../../domain/repositories/product-variant-repository";
import type {
  CartId,
  OrderId,
} from "../../domain/types/identifiers";
import {
  ApplicationError,
} from "../errors/application-error";

export type CreateDemoOrderDependencies =
  Readonly<{
    carts:
      CartRepository;
    orders:
      OrderRepository;
    products:
      ProductRepository;
    productVariants:
      ProductVariantRepository;
  }>;

export type CreateDemoOrderFromCartInput =
  Readonly<{
    cartId: CartId;
    orderId: OrderId;
  }>;

export async function createDemoOrderFromCart(
  dependencies:
    CreateDemoOrderDependencies,
  input:
    CreateDemoOrderFromCartInput,
): Promise<Order> {
  const existing =
    await dependencies.orders
      .findById(
        input.orderId,
      );

  if (existing) {
    throw new ApplicationError(
      "APPLICATION_ORDER_ID_CONFLICT",
      "Order id already exists.",
    );
  }

  const cart =
    await dependencies.carts
      .findById(
        input.cartId,
      );

  if (
    !cart ||
    cart.items.length ===
      0
  ) {
    throw new ApplicationError(
      "APPLICATION_CART_EMPTY",
      "Cart must contain at least one item before creating an Order.",
    );
  }

  const orderItems = [];

  for (
    let index = 0;
    index < cart.items.length;
    index += 1
  ) {
    const cartItem =
      cart.items[index];

    const variant =
      await dependencies
        .productVariants
        .findById(
          cartItem
            .productVariantId,
        );

    if (!variant) {
      throw new ApplicationError(
        "APPLICATION_PRODUCT_VARIANT_NOT_FOUND",
        "Product Variant was not found while creating Order.",
      );
    }

    const product =
      await dependencies.products
        .findById(
          variant.productId,
        );

    if (!product) {
      throw new ApplicationError(
        "APPLICATION_PRODUCT_NOT_FOUND",
        "Product was not found while creating Order.",
      );
    }

    orderItems.push(
      createOrderItem({
        id:
          `${input.orderId}-item-${index + 1}`,
        productId:
          product.id,
        productVariantId:
          variant.id,
        productNameSnapshot:
          product.name,
        skuSnapshot:
          variant.sku,
        unitPriceSnapshot:
          cartItem.unitPrice,
        quantity:
          cartItem.quantity,
      }),
    );
  }

  const order =
    createOrder({
      id: input.orderId,
      status: "PENDING",
      items:
        orderItems,
    });

  await dependencies.orders
    .save(order);

  await dependencies.carts
    .remove(
      input.cartId,
    );

  return order;
}