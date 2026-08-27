import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  buildAdminCatalogModel,
  type AdminCatalogModel,
} from "../../presentation/admin/admin-catalog-model";

export async function loadBrowserAdminCatalog(
  locale:
    StorefrontLocale,
): Promise<
  AdminCatalogModel
> {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Admin Catalog requires a browser runtime.",
    );
  }

  const runtime =
    createBrowserVeloraRuntime(
      "velora-demo",
    );

  const products =
    await runtime.application
      .listStorefrontProducts();

  return buildAdminCatalogModel(
    locale,
    products,
  );
}