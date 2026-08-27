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
  updateAdminProduct,
  updateAdminVariantPrice,
  type UpdateAdminProductInput,
  type UpdateAdminVariantPriceInput,
} from "./use-cases/admin-catalog-mutations";

export {
  createDemoOrderFromCart,
  type CreateDemoOrderDependencies,
  type CreateDemoOrderFromCartInput,
} from "./use-cases/create-demo-order";

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
  listInventoryMovements,
} from "./use-cases/list-inventory-movements";

export {
  changeOrderStatus,
  listCustomerOrders,
} from "./use-cases/order-use-cases";