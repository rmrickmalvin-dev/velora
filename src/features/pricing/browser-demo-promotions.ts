import {
  parseDemoPromotionScenarioList,
  type DemoPromotionScenario,
  type DemoPromotionScenarioDraft,
} from "./admin-commercial-simulator-model";

export const VELORA_DEMO_PROMOTIONS_KEY =
  "velora.demo.promotions.v1";

export const VELORA_DEMO_PROMOTIONS_EVENT =
  "velora:demo-promotions-changed";

function assertBrowser() {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Demo Promotion scenarios require a browser runtime.",
    );
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
      VELORA_DEMO_PROMOTIONS_EVENT,
    ),
  );
}

export function readBrowserDemoPromotions():
  readonly DemoPromotionScenario[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return Object.freeze([]);
  }

  const raw =
    window.localStorage.getItem(
      VELORA_DEMO_PROMOTIONS_KEY,
    );

  if (!raw) {
    return Object.freeze([]);
  }

  try {
    return parseDemoPromotionScenarioList(
      JSON.parse(raw),
    );
  } catch {
    return Object.freeze([]);
  }
}

export function saveBrowserDemoPromotion(
  draft:
    DemoPromotionScenarioDraft,
): DemoPromotionScenario {
  assertBrowser();

  const entropy =
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
      ? crypto.randomUUID()
      : Math.random()
          .toString(36)
          .slice(2);

  const scenario =
    Object.freeze({
      id:
        `promotion-demo-${Date.now()}-${entropy}`,
      ...draft,
    });

  const current =
    readBrowserDemoPromotions();

  const next =
    Object.freeze([
      ...current,
      scenario,
    ]);

  window.localStorage.setItem(
    VELORA_DEMO_PROMOTIONS_KEY,
    JSON.stringify(
      next,
    ),
  );

  emitChanged();

  return scenario;
}

export function deleteBrowserDemoPromotion(
  id: string,
): void {
  assertBrowser();

  const next =
    readBrowserDemoPromotions()
      .filter(
        (scenario) =>
          scenario.id !== id,
      );

  window.localStorage.setItem(
    VELORA_DEMO_PROMOTIONS_KEY,
    JSON.stringify(
      next,
    ),
  );

  emitChanged();
}

export function resetBrowserDemoPromotions():
  void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.localStorage.removeItem(
    VELORA_DEMO_PROMOTIONS_KEY,
  );

  emitChanged();
}

export function subscribeBrowserDemoPromotions(
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
          VELORA_DEMO_PROMOTIONS_KEY
      ) {
        listener();
      }
    };

  window.addEventListener(
    VELORA_DEMO_PROMOTIONS_EVENT,
    listener,
  );

  window.addEventListener(
    "storage",
    storageListener,
  );

  return () => {
    window.removeEventListener(
      VELORA_DEMO_PROMOTIONS_EVENT,
      listener,
    );

    window.removeEventListener(
      "storage",
      storageListener,
    );
  };
}