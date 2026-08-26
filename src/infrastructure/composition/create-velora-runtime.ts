import {
  createVeloraApplication,
  type VeloraApplication,
} from "../../application/create-velora-application";
import {
  IndexedDbProvider,
} from "../persistence/indexeddb-provider";
import type {
  PersistenceProvider,
} from "../persistence/persistence-provider";
import {
  createPersistentRepositories,
  resetPersistentOverrides,
  type PersistentRepositories,
} from "../repositories/persistent/create-persistent-repositories";

export type VeloraRuntime =
  Readonly<{
    application:
      VeloraApplication;
    repositories:
      PersistentRepositories;
    resetDemo:
      () => Promise<void>;
  }>;

export function createVeloraRuntime(
  provider:
    PersistenceProvider,
): VeloraRuntime {
  const repositories =
    createPersistentRepositories(
      provider,
    );

  const application =
    createVeloraApplication(
      repositories,
    );

  return Object.freeze({
    application,
    repositories,
    resetDemo:
      () =>
        resetPersistentOverrides(
          provider,
        ),
  });
}

export function createBrowserVeloraRuntime(
  databaseName =
    "velora-demo",
): VeloraRuntime {
  return createVeloraRuntime(
    new IndexedDbProvider({
      databaseName,
    }),
  );
}