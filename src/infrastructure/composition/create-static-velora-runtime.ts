import {
  createVeloraApplication,
  type VeloraApplication,
} from "../../application/create-velora-application";
import {
  createLocalRepositories,
  type LocalRepositories,
} from "../repositories/local/create-local-repositories";

export type StaticVeloraRuntime =
  Readonly<{
    application:
      VeloraApplication;
    repositories:
      LocalRepositories;
  }>;

export function createStaticVeloraRuntime():
  StaticVeloraRuntime {
  const repositories =
    createLocalRepositories();

  return Object.freeze({
    application:
      createVeloraApplication(
        repositories,
      ),
    repositories,
  });
}