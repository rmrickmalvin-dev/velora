import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createInventory,
} from "../entities/inventory";
import {
  createInventoryMovement,
} from "../entities/inventory-movement";
import {
  applyInventoryMovement,
} from "./inventory-service";

function inventory(
  quantityOnHand = 5,
) {
  return createInventory({
    id: "inventory-001",
    productVariantId:
      "variant-001",
    quantityOnHand,
  });
}

describe("Inventory Service", () => {
  it("applies an ENTRY movement", () => {
    const result =
      applyInventoryMovement(
        inventory(),
        createInventoryMovement({
          id: "movement-001",
          inventoryId:
            "inventory-001",
          type: "ENTRY",
          delta: 10,
          reason: "Restock",
        }),
      );

    expect(
      result.quantityOnHand,
    ).toBe(15);
  });

  it("applies an EXIT movement", () => {
    const result =
      applyInventoryMovement(
        inventory(),
        createInventoryMovement({
          id: "movement-002",
          inventoryId:
            "inventory-001",
          type: "EXIT",
          delta: -2,
          reason: "Sale",
        }),
      );

    expect(
      result.quantityOnHand,
    ).toBe(3);
  });

  it("applies a negative ADJUSTMENT movement", () => {
    const result =
      applyInventoryMovement(
        inventory(),
        createInventoryMovement({
          id: "movement-003",
          inventoryId:
            "inventory-001",
          type: "ADJUSTMENT",
          delta: -3,
          reason:
            "Physical count",
        }),
      );

    expect(
      result.quantityOnHand,
    ).toBe(2);
  });

  it("rejects a movement from another inventory", () => {
    expect(() =>
      applyInventoryMovement(
        inventory(),
        createInventoryMovement({
          id: "movement-004",
          inventoryId:
            "inventory-other",
          type: "ENTRY",
          delta: 1,
          reason: "Restock",
        }),
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_MOVEMENT_INVENTORY_MISMATCH",
      }),
    );
  });

  it("rejects a movement that would create negative stock", () => {
    expect(() =>
      applyInventoryMovement(
        inventory(1),
        createInventoryMovement({
          id: "movement-005",
          inventoryId:
            "inventory-001",
          type: "EXIT",
          delta: -2,
          reason: "Sale",
        }),
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_RESULT_NEGATIVE",
      }),
    );
  });

  it("rejects a movement that would create an unsafe integer quantity", () => {
    expect(() =>
      applyInventoryMovement(
        inventory(
          Number.MAX_SAFE_INTEGER,
        ),
        createInventoryMovement({
          id: "movement-006",
          inventoryId:
            "inventory-001",
          type: "ENTRY",
          delta: 1,
          reason: "Restock",
        }),
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "INVENTORY_RESULT_UNSAFE",
      }),
    );
  });
});