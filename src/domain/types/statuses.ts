export const productStatuses = [
  "ACTIVE",
  "INACTIVE",
  "ARCHIVED",
] as const;

export type ProductStatus =
  (typeof productStatuses)[number];

export const orderStatuses = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export type OrderStatus =
  (typeof orderStatuses)[number];

export const inventoryMovementTypes = [
  "ENTRY",
  "EXIT",
  "ADJUSTMENT",
] as const;

export type InventoryMovementType =
  (typeof inventoryMovementTypes)[number];

export const promotionStatuses = [
  "SCHEDULED",
  "ACTIVE",
  "INACTIVE",
  "EXPIRED",
] as const;

export type PromotionStatus =
  (typeof promotionStatuses)[number];