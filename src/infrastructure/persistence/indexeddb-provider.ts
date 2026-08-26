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

export type IndexedDbProviderOptions =
  Readonly<{
    databaseName?: string;
    version?: number;
  }>;

function requestToPromise<T>(
  request: IDBRequest<T>,
): Promise<T> {
  return new Promise(
    (resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(
          request.error ??
            new PersistenceError(
              "INDEXEDDB_REQUEST_FAILED",
              "IndexedDB request failed.",
            ),
        );
      };
    },
  );
}

function transactionToPromise(
  transaction: IDBTransaction,
): Promise<void> {
  return new Promise(
    (resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(
          transaction.error ??
            new PersistenceError(
              "INDEXEDDB_TRANSACTION_FAILED",
              "IndexedDB transaction failed.",
            ),
        );
      };

      transaction.onabort = () => {
        reject(
          transaction.error ??
            new PersistenceError(
              "INDEXEDDB_TRANSACTION_ABORTED",
              "IndexedDB transaction was aborted.",
            ),
        );
      };
    },
  );
}

export function isIndexedDbAvailable(): boolean {
  return (
    typeof globalThis !==
      "undefined" &&
    "indexedDB" in globalThis &&
    globalThis.indexedDB !==
      undefined
  );
}

export class IndexedDbProvider
  implements PersistenceProvider
{
  private readonly databaseName:
    string;

  private readonly version:
    number;

  private databasePromise:
    Promise<IDBDatabase> | null =
      null;

  constructor(
    options:
      IndexedDbProviderOptions = {},
  ) {
    this.databaseName =
      options.databaseName ??
      "velora-demo";

    this.version =
      options.version ?? 1;
  }

  private open(): Promise<IDBDatabase> {
    if (!isIndexedDbAvailable()) {
      return Promise.reject(
        new PersistenceError(
          "INDEXEDDB_UNAVAILABLE",
          "IndexedDB is unavailable in the current runtime.",
        ),
      );
    }

    if (this.databasePromise) {
      return this.databasePromise;
    }

    this.databasePromise =
      new Promise(
        (resolve, reject) => {
          const request =
            globalThis.indexedDB.open(
              this.databaseName,
              this.version,
            );

          request.onupgradeneeded =
            () => {
              const database =
                request.result;

              for (
                const store
                of persistenceStoreNames
              ) {
                if (
                  !database
                    .objectStoreNames
                    .contains(store)
                ) {
                  database
                    .createObjectStore(
                      store,
                      {
                        keyPath: "id",
                      },
                    );
                }
              }
            };

          request.onsuccess = () => {
            const database =
              request.result;

            database.onversionchange =
              () => {
                database.close();
                this.databasePromise =
                  null;
              };

            resolve(database);
          };

          request.onerror = () => {
            this.databasePromise =
              null;

            reject(
              request.error ??
                new PersistenceError(
                  "INDEXEDDB_OPEN_FAILED",
                  "Unable to open VELORA IndexedDB database.",
                ),
            );
          };

          request.onblocked = () => {
            this.databasePromise =
              null;

            reject(
              new PersistenceError(
                "INDEXEDDB_OPEN_BLOCKED",
                "IndexedDB upgrade is blocked by another open connection.",
              ),
            );
          };
        },
      );

    return this.databasePromise;
  }

  private async objectStore(
    name: PersistenceStoreName,
    mode: IDBTransactionMode,
  ): Promise<
    Readonly<{
      store: IDBObjectStore;
      done: Promise<void>;
    }>
  > {
    const database =
      await this.open();

    const transaction =
      database.transaction(
        name,
        mode,
      );

    return Object.freeze({
      store:
        transaction.objectStore(
          name,
        ),
      done:
        transactionToPromise(
          transaction,
        ),
    });
  }

  async get<T>(
    storeName: PersistenceStoreName,
    id: string,
  ): Promise<T | null> {
    const transaction =
      await this.objectStore(
        storeName,
        "readonly",
      );

    const request =
      transaction.store.get(id);

    const result =
      await requestToPromise(
        request,
      );

    await transaction.done;

    return result === undefined
      ? null
      : (result as T);
  }

  async getAll<T>(
    storeName: PersistenceStoreName,
  ): Promise<readonly T[]> {
    const transaction =
      await this.objectStore(
        storeName,
        "readonly",
      );

    const result =
      await requestToPromise(
        transaction.store.getAll(),
      );

    await transaction.done;

    return Object.freeze(
      result as T[],
    );
  }

  async put<T extends PersistenceRecord>(
    storeName: PersistenceStoreName,
    value: T,
  ): Promise<void> {
    const transaction =
      await this.objectStore(
        storeName,
        "readwrite",
      );

    await requestToPromise(
      transaction.store.put(value),
    );

    await transaction.done;
  }

  async add<T extends PersistenceRecord>(
    storeName: PersistenceStoreName,
    value: T,
  ): Promise<void> {
    const transaction =
      await this.objectStore(
        storeName,
        "readwrite",
      );

    try {
      await requestToPromise(
        transaction.store.add(value),
      );

      await transaction.done;
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name ===
          "ConstraintError"
      ) {
        throw new PersistenceError(
          "PERSISTENCE_DUPLICATE_ID",
          `Persistence record already exists: ${value.id}`,
        );
      }

      throw error;
    }
  }

  async delete(
    storeName: PersistenceStoreName,
    id: string,
  ): Promise<void> {
    const transaction =
      await this.objectStore(
        storeName,
        "readwrite",
      );

    await requestToPromise(
      transaction.store.delete(id),
    );

    await transaction.done;
  }

  async clear(
    storeName: PersistenceStoreName,
  ): Promise<void> {
    const transaction =
      await this.objectStore(
        storeName,
        "readwrite",
      );

    await requestToPromise(
      transaction.store.clear(),
    );

    await transaction.done;
  }
}