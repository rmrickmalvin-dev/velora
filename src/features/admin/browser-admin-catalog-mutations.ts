import type {
  VeloraApplication,
} from "../../application/create-velora-application";
import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  emitBrowserCatalogChanged,
} from "../catalog/browser-storefront-catalog";

type UpdateProductInput =
  Parameters<
    VeloraApplication[
      "updateAdminProduct"
    ]
  >[0];

type UpdateVariantPriceInput =
  Parameters<
    VeloraApplication[
      "updateAdminVariantPrice"
    ]
  >[0];

function application():
  VeloraApplication {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Admin Catalog mutation requires a browser runtime.",
    );
  }

  return createBrowserVeloraRuntime(
    "velora-demo",
  ).application;
}

export async function updateBrowserAdminProduct(
  input:
    UpdateProductInput,
): Promise<void> {
  await application()
    .updateAdminProduct(
      input,
    );

  emitBrowserCatalogChanged();
}

export async function updateBrowserAdminVariantPrice(
  input:
    UpdateVariantPriceInput,
): Promise<void> {
  await application()
    .updateAdminVariantPrice(
      input,
    );

  emitBrowserCatalogChanged();
}