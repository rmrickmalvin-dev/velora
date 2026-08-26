import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  createCartExperience,
  type CartExperience,
} from "./cart-experience";

export const VELORA_CART_CHANGED_EVENT =
  "velora:cart-changed";

let browserCartExperience:
  CartExperience | null =
  null;

export function getBrowserCartExperience():
  CartExperience {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Browser Cart Experience requires a browser runtime.",
    );
  }

  if (
    browserCartExperience ===
    null
  ) {
    browserCartExperience =
      createCartExperience(
        createBrowserVeloraRuntime(
          "velora-demo",
        ).application,
      );
  }

  return browserCartExperience;
}

export function emitBrowserCartChanged():
  void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new Event(
      VELORA_CART_CHANGED_EVENT,
    ),
  );
}

export function subscribeBrowserCartChanged(
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
    VELORA_CART_CHANGED_EVENT,
    listener,
  );

  return () => {
    window.removeEventListener(
      VELORA_CART_CHANGED_EVENT,
      listener,
    );
  };
}