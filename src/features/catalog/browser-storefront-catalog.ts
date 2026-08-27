import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  buildStorefrontHomeModel,
  type StorefrontProductCard,
} from "../../presentation/storefront/storefront-home-model";

export const VELORA_CATALOG_CHANGED_EVENT =
  "velora:catalog-changed";

export const VELORA_INVENTORY_CHANGED_EVENT =
  "velora:inventory-changed";

export async function loadBrowserStorefrontProductCards(
  locale:
    StorefrontLocale,
): Promise<
  readonly StorefrontProductCard[]
> {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Browser Storefront catalog requires a browser runtime.",
    );
  }

  const products =
    await createBrowserVeloraRuntime(
      "velora-demo",
    ).application
      .listStorefrontProducts();

  return buildStorefrontHomeModel(
    locale,
    products,
  ).products;
}

export function emitBrowserCatalogChanged():
  void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new Event(
      VELORA_CATALOG_CHANGED_EVENT,
    ),
  );
}

export function emitBrowserInventoryChanged():
  void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new Event(
      VELORA_INVENTORY_CHANGED_EVENT,
    ),
  );
}

export function subscribeBrowserCatalogChanged(
  listener:
    () => void,
): () => void {
  if (
    typeof window ===
    "undefined"
  ) {
    return () =>
      undefined;
  }

  window.addEventListener(
    VELORA_CATALOG_CHANGED_EVENT,
    listener,
  );

  return () => {
    window.removeEventListener(
      VELORA_CATALOG_CHANGED_EVENT,
      listener,
    );
  };
}

export function subscribeBrowserStorefrontDataChanged(
  listener:
    () => void,
): () => void {
  if (
    typeof window ===
    "undefined"
  ) {
    return () =>
      undefined;
  }

  const unsubscribeCatalog =
    subscribeBrowserCatalogChanged(
      listener,
    );

  window.addEventListener(
    VELORA_INVENTORY_CHANGED_EVENT,
    listener,
  );

  return () => {
    unsubscribeCatalog();

    window.removeEventListener(
      VELORA_INVENTORY_CHANGED_EVENT,
      listener,
    );
  };
}
