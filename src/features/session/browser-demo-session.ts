import {
  defaultDemoSessionRole,
  parseDemoSessionRole,
  type DemoSessionRole,
} from "./demo-session-model";

export const VELORA_DEMO_SESSION_KEY =
  "velora.demo.session.v1";

export const VELORA_DEMO_SESSION_EVENT =
  "velora:session-changed";

export function getServerDemoSessionRole():
  DemoSessionRole {
  return defaultDemoSessionRole;
}

export function readBrowserDemoSessionRole():
  DemoSessionRole {
  if (
    typeof window ===
    "undefined"
  ) {
    return defaultDemoSessionRole;
  }

  return parseDemoSessionRole(
    window.localStorage
      .getItem(
        VELORA_DEMO_SESSION_KEY,
      ),
  );
}

export function writeBrowserDemoSessionRole(
  role:
    DemoSessionRole,
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Demo session requires a browser runtime.",
    );
  }

  if (
    role ===
    "GUEST"
  ) {
    window.localStorage
      .removeItem(
        VELORA_DEMO_SESSION_KEY,
      );
  } else {
    window.localStorage
      .setItem(
        VELORA_DEMO_SESSION_KEY,
        role,
      );
  }

  window.dispatchEvent(
    new Event(
      VELORA_DEMO_SESSION_EVENT,
    ),
  );
}

export function subscribeBrowserDemoSession(
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

  const onStorage =
    (
      event:
        StorageEvent,
    ) => {
      if (
        event.key ===
        VELORA_DEMO_SESSION_KEY
      ) {
        listener();
      }
    };

  window.addEventListener(
    VELORA_DEMO_SESSION_EVENT,
    listener,
  );

  window.addEventListener(
    "storage",
    onStorage,
  );

  return () => {
    window.removeEventListener(
      VELORA_DEMO_SESSION_EVENT,
      listener,
    );

    window.removeEventListener(
      "storage",
      onStorage,
    );
  };
}