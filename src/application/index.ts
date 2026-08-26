export {
  createVeloraApplication,
  type ChangeOrderStatusInput,
  type RemoveProductFromCartInput,
  type UpdateCartQuantityInput,
  type VeloraApplication,
  type VeloraApplicationDependencies,
} from "./create-velora-application";

export {
  ApplicationError,
} from "./errors/application-error";

export {
  getStorefrontProductBySlug,
  listStorefrontProducts,
  type StorefrontProduct,
  type StorefrontQueryDependencies,
  type StorefrontVariant,
} from "./use-cases/storefront-query";

export {
  addProductToCart,
  getCartSummary,
  removeProductFromCart,
  updateCartQuantity,
  type AddProductToCartDependencies,
  type AddProductToCartInput,
  type CartSummary,
  type UpdateCartQuantityDependencies,
} from "./use-cases/cart-use-cases";

export {
  adjustInventory,
  type AdjustInventoryDependencies,
  type AdjustInventoryInput,
  type AdjustInventoryResult,
} from "./use-cases/adjust-inventory";

export {
  changeOrderStatus,
  listCustomerOrders,
} from "./use-cases/order-use-cases";