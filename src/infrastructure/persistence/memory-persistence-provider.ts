import {
  PersistenceError,
} from "./persistence-error";
import type {
  PersistenceProvider,
  PersistenceRecord,
  PersistenceStoreName,
} from "./persistence-provider";
import {
  persistenceStoreNames,
} from "./persistence-provider";

function cloneValue<T>(
  value: T,
): T {
  return structuredClone(value);
}

export class MemoryPersistenceProvider
  implements PersistenceProvider
{
  private readonly stores =
    new Map<
      PersistenceStoreName,
      Map<string, unknown>
    >();

  constructor() {
    for (
      const store
      of persistenceStoreNames
    ) {
      this.stores.set(
        store,
        new Map(),
      );
    }
  }

  private store(
    name: PersistenceStoreName,
  ): Map<string, unknown> {
    const store =
      this.stores.get(name);

    if (!store) {
      throw new PersistenceError(
        "PERSISTENCE_STORE_NOT_FOUND",
        `Persistence store not found: ${name}`,
      );
    }

    return store;
  }

  async get<T>(
    store: PersistenceStoreName,
    id: string,
  ): Promise<T | null> {
    const value =
      this.store(store).get(id);

    return value === undefined
      ? null
      : cloneValue(value as T);
  }

  async getAll<T>(
    store: PersistenceStoreName,
  ): Promise<readonly T[]> {
    return Object.freeze(
      Array.from(
        this.store(store).values(),
      ).map(
        (value) =>
          cloneValue(value as T),
      ),
    );
  }

  async put<T extends PersistenceRecord>(
    store: PersistenceStoreName,
    value: T,
  ): Promise<void> {
    this.store(store).set(
      value.id,
      cloneValue(value),
    );
  }

  async add<T extends PersistenceRecord>(
    store: PersistenceStoreName,
    value: T,
  ): Promise<void> {
    const target =
      this.store(store);

    if (target.has(value.id)) {
      throw new PersistenceError(
        "PERSISTENCE_DUPLICATE_ID",
        `Persistence record already exists: ${value.id}`,
      );
    }

    target.set(
      value.id,
      cloneValue(value),
    );
  }

  async delete(
    store: PersistenceStoreName,
    id: string,
  ): Promise<void> {
    this.store(store).delete(id);
  }

  async clear(
    store: PersistenceStoreName,
  ): Promise<void> {
    this.store(store).clear();
  }
}