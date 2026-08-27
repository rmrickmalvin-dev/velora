import {
  defaultDemoCustomerProfile,
  parseDemoCustomerProfile,
  validateDemoCustomerProfile,
  type DemoCustomerProfile,
} from "./demo-customer-profile-model";

export const VELORA_DEMO_CUSTOMER_PROFILE_KEY =
  "velora.demo.customer-profile.v1";

export const VELORA_DEMO_CUSTOMER_PROFILE_EVENT =
  "velora:customer-profile-changed";

export function readBrowserDemoCustomerProfile():
  DemoCustomerProfile {
  if (
    typeof window ===
    "undefined"
  ) {
    return defaultDemoCustomerProfile;
  }

  const raw =
    window.localStorage.getItem(
      VELORA_DEMO_CUSTOMER_PROFILE_KEY,
    );

  if (!raw) {
    return defaultDemoCustomerProfile;
  }

  try {
    return parseDemoCustomerProfile(
      JSON.parse(raw),
    );
  } catch {
    return defaultDemoCustomerProfile;
  }
}

function emitChanged() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new Event(
      VELORA_DEMO_CUSTOMER_PROFILE_EVENT,
    ),
  );
}

export function writeBrowserDemoCustomerProfile(
  profile:
    DemoCustomerProfile,
): DemoCustomerProfile {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Demo Customer Profile requires a browser runtime.",
    );
  }

  const validation =
    validateDemoCustomerProfile(
      profile,
    );

  if (
    !validation.valid
  ) {
    throw new Error(
      "Demo Customer Profile is invalid.",
    );
  }

  window.localStorage.setItem(
    VELORA_DEMO_CUSTOMER_PROFILE_KEY,
    JSON.stringify(
      validation.values,
    ),
  );

  emitChanged();

  return validation.values;
}

export function resetBrowserDemoCustomerProfile():
  DemoCustomerProfile {
  if (
    typeof window !==
    "undefined"
  ) {
    window.localStorage.removeItem(
      VELORA_DEMO_CUSTOMER_PROFILE_KEY,
    );

    emitChanged();
  }

  return defaultDemoCustomerProfile;
}

export function subscribeBrowserDemoCustomerProfile(
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

  const storageListener =
    (
      event:
        StorageEvent,
    ) => {
      if (
        event.key ===
          VELORA_DEMO_CUSTOMER_PROFILE_KEY
      ) {
        listener();
      }
    };

  window.addEventListener(
    VELORA_DEMO_CUSTOMER_PROFILE_EVENT,
    listener,
  );

  window.addEventListener(
    "storage",
    storageListener,
  );

  return () => {
    window.removeEventListener(
      VELORA_DEMO_CUSTOMER_PROFILE_EVENT,
      listener,
    );

    window.removeEventListener(
      "storage",
      storageListener,
    );
  };
}