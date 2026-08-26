export const persistenceStoreNames = [
  "productCategories",
  "products",
  "productVariants",
  "productMedia",
  "inventory",
  "inventoryMovements",
  "carts",
  "orders",
] as const;

export type PersistenceStoreName =
  (typeof persistenceStoreNames)[number];

export type PersistenceRecord =
  Readonly<{
    id: string;
  }>;

export interface PersistenceProvider {
  get<T>(
    store: PersistenceStoreName,
    id: string,
  ): Promise<T | null>;

  getAll<T>(
    store: PersistenceStoreName,
  ): Promise<readonly T[]>;

  put<T extends PersistenceRecord>(
    store: PersistenceStoreName,
    value: T,
  ): Promise<void>;

  add<T extends PersistenceRecord>(
    store: PersistenceStoreName,
    value: T,
  ): Promise<void>;

  delete(
    store: PersistenceStoreName,
    id: string,
  ): Promise<void>;

  clear(
    store: PersistenceStoreName,
  ): Promise<void>;
}