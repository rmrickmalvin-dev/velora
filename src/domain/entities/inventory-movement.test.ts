import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  InventoryMovementType,
} from "../types/statuses";

import {
  createInventoryMovement,
} from "./inventory-movement";

const validEntry = {
  id: "movement-entry-001",
  inventoryId:
    "inventory-aster-xp-256-graphite",
  type: "ENTRY" as const,
  delta: 10,
  reason: "Initial stock",
};

describe("InventoryMovement", () => {
  it("creates an ENTRY movement", () => {
    expect(
      createInventoryMovement(
        validEntry,
      ),
    ).toEqual(
      validEntry,
    );
  });

  it("creates an EXIT movement", () => {
    const movement =
      createInventoryMovement({
        ...validEntry,
        id: "movement-exit-001",
        type: "EXIT",
        delta: -2,
        reason:
          "Order fulfillment",
      });

    expect(
      movement.delta,
    ).toBe(-2);
  });

  it("creates a negative ADJUSTMENT movement", () => {
    const movement =
      createInventoryMovement({
        ...validEntry,
        id:
          "movement-adjustment-001",
        type: "ADJUSTMENT",
        delta: -3,
        reason:
          "Physical count correction",
      });

    expect(
      movement.type,
    ).toBe(
      "ADJUSTMENT",
    );
  });

  it("rejects an empty id", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty inventory id", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        inventoryId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_INVENTORY_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty reason", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        reason: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_REASON_REQUIRED",
      }),
    );
  });

  it("rejects an unsupported movement type at runtime", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        type:
          "TRANSFER" as InventoryMovementType,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_TYPE_INVALID",
      }),
    );
  });

  it("rejects a zero delta", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        delta: 0,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_DELTA_INVALID",
      }),
    );
  });

  it("rejects a fractional delta", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        delta: 1.5,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_DELTA_INVALID",
      }),
    );
  });

  it("rejects a negative ENTRY delta", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        delta: -1,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_ENTRY_DELTA_INVALID",
      }),
    );
  });

  it("rejects a positive EXIT delta", () => {
    expect(() =>
      createInventoryMovement({
        ...validEntry,
        type: "EXIT",
        delta: 1,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_EXIT_DELTA_INVALID",
      }),
    );
  });

  it("creates an immutable movement", () => {
    const movement =
      createInventoryMovement(
        validEntry,
      );

    expect(
      Object.isFrozen(
        movement,
      ),
    ).toBe(true);
  });
});