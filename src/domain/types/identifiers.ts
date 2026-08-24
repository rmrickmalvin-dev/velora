/*
 * IDs permanecem independentes da tecnologia
 * de persistência.
 *
 * O domínio não sabe se futuramente eles virão de:
 *
 * - UUID;
 * - PostgreSQL;
 * - Supabase;
 * - API própria;
 * - seed local.
 */

export type UserId = string;
export type CustomerId = string;

export type ProductId = string;
export type ProductVariantId = string;

export type InventoryId = string;
export type InventoryMovementId = string;

export type CartId = string;
export type OrderId = string;

export type PromotionId = string;
export type AddressId = string;