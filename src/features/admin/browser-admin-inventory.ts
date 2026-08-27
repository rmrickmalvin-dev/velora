import type {
  VeloraApplication,
} from "../../application/create-velora-application";
import {
  createBrowserVeloraRuntime,
} from "../../infrastructure/composition/create-velora-runtime";
import {
  emitBrowserInventoryChanged,
} from "../catalog/browser-storefront-catalog";

type AdjustInventoryInput =
  Parameters<
    VeloraApplication[
      "adjustInventory"
    ]
  >[0];

type InventoryId =
  AdjustInventoryInput[
    "inventoryId"
  ];

type InventoryMovementId =
  AdjustInventoryInput[
    "movementId"
  ];

export type AdminInventoryMovementItem =
  Readonly<{
    id: string;
    type:
      AdjustInventoryInput[
        "type"
      ];
    delta: number;
    reason: string;
  }>;

export type BrowserAdminInventoryAdjustment =
  Readonly<{
    inventoryId: string;
    type:
      AdjustInventoryInput[
        "type"
      ];
    delta: number;
    reason: string;
  }>;

function runtime() {
  if (
    typeof window ===
    "undefined"
  ) {
    throw new Error(
      "Admin Inventory operations require a browser runtime.",
    );
  }

  return createBrowserVeloraRuntime(
    "velora-demo",
  );
}

export function createAdminInventoryMovementReference(
  inventoryId: string,
  now = Date.now(),
  entropy = "",
): InventoryMovementId {
  const normalized =
    entropy
      .trim()
      .replace(
        /[^a-zA-Z0-9-]/g,
        "",
      )
      .slice(
        0,
        24,
      ) ||
    "local";

  return (
    `movement-admin-${inventoryId}-${now}-${normalized}`
  ) as InventoryMovementId;
}

export async function loadBrowserAdminInventoryMovements(
  inventoryId: string,
): Promise<
  readonly AdminInventoryMovementItem[]
> {
  const movements =
    await runtime()
      .application
      .listInventoryMovements(
        inventoryId as
          InventoryId,
      );

  return Object.freeze(
    [...movements]
      .reverse()
      .map(
        (movement) =>
          Object.freeze({
            id:
              movement.id,
            type:
              movement.type,
            delta:
              movement.delta,
            reason:
              movement.reason,
          }),
      ),
  );
}

export async function adjustBrowserAdminInventory(
  input:
    BrowserAdminInventoryAdjustment,
): Promise<void> {
  const entropy =
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
      ? crypto.randomUUID()
      : Math.random()
          .toString(36)
          .slice(2);

  await runtime()
    .application
    .adjustInventory({
      inventoryId:
        input.inventoryId as
          InventoryId,
      movementId:
        createAdminInventoryMovementReference(
          input.inventoryId,
          Date.now(),
          entropy,
        ),
      type:
        input.type,
      delta:
        input.delta,
      reason:
        input.reason,
    });

  emitBrowserInventoryChanged();
}