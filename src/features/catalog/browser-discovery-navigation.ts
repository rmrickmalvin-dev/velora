import type {
  ProductDiscoveryCategory,
} from "../../presentation/storefront/product-discovery-model";

export type BrowserDiscoveryState =
  Readonly<{
    query: string;
    category:
      ProductDiscoveryCategory;
  }>;

const supportedCategories =
  new Set<
    ProductDiscoveryCategory
  >([
    "all",
    "smartphone",
    "audio",
    "power",
    "protection",
  ]);

export function parseBrowserDiscoveryState(
  url: string,
): BrowserDiscoveryState {
  const target =
    new URL(url);

  const query =
    target.searchParams
      .get("q")
      ?.trim() ??
    "";

  const rawCategory =
    target.searchParams
      .get("category") ??
    "all";

  const category:
    ProductDiscoveryCategory =
      supportedCategories.has(
        rawCategory as
          ProductDiscoveryCategory,
      )
        ? rawCategory as
            ProductDiscoveryCategory
        : "all";

  return Object.freeze({
    query,
    category,
  });
}

export function buildBrowserDiscoveryUrl(
  url: string,
  state:
    BrowserDiscoveryState,
): string {
  const target =
    new URL(url);

  const query =
    state.query.trim();

  if (query) {
    target.searchParams.set(
      "q",
      query,
    );
  } else {
    target.searchParams.delete(
      "q",
    );
  }

  if (
    state.category ===
    "all"
  ) {
    target.searchParams.delete(
      "category",
    );
  } else {
    target.searchParams.set(
      "category",
      state.category,
    );
  }

  return (
    target.pathname +
    target.search +
    target.hash
  );
}

export function readBrowserDiscoveryState():
  BrowserDiscoveryState {
  if (
    typeof window ===
    "undefined"
  ) {
    return Object.freeze({
      query: "",
      category:
        "all",
    });
  }

  return parseBrowserDiscoveryState(
    window.location.href,
  );
}

export function writeBrowserDiscoveryState(
  state:
    BrowserDiscoveryState,
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.history.replaceState(
    window.history.state,
    "",
    buildBrowserDiscoveryUrl(
      window.location.href,
      state,
    ),
  );
}

export function subscribeBrowserDiscoveryNavigation(
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
    "popstate",
    listener,
  );

  return () => {
    window.removeEventListener(
      "popstate",
      listener,
    );
  };
}