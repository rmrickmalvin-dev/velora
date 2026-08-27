import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateAdminInventoryAdjustment,
} from "./admin-inventory-adjustment-model";

describe(
  "Admin Inventory Adjustment Model",
  () => {
    it("maps ENTRY quantity to positive delta", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "5",
          reason:
            "Warehouse restock",
        }).delta,
      ).toBe(5);
    });

    it("maps EXIT quantity to negative delta", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "EXIT",
          amount: "3",
          reason:
            "Damaged units",
        }).delta,
      ).toBe(-3);
    });

    it("keeps positive ADJUSTMENT delta", () => {
      expect(
        validateAdminInventoryAdjustment({
          type:
            "ADJUSTMENT",
          amount: "+2",
          reason:
            "Cycle count",
        }).delta,
      ).toBe(2);
    });

    it("keeps negative ADJUSTMENT delta", () => {
      expect(
        validateAdminInventoryAdjustment({
          type:
            "ADJUSTMENT",
          amount: "-2",
          reason:
            "Cycle count",
        }).delta,
      ).toBe(-2);
    });

    it("rejects zero quantity", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "0",
          reason:
            "Warehouse restock",
        }).errors.amount,
      ).toBe(
        "INVALID_AMOUNT",
      );
    });

    it("rejects decimal Inventory quantity", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "1.5",
          reason:
            "Warehouse restock",
        }).valid,
      ).toBe(false);
    });

    it("rejects negative ENTRY input", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "-2",
          reason:
            "Warehouse restock",
        }).valid,
      ).toBe(false);
    });

    it("requires a reason", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "2",
          reason: " ",
        }).errors.reason,
      ).toBe(
        "REASON_REQUIRED",
      );
    });

    it("normalizes reason whitespace", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "2",
          reason:
            "  Manual   restock  ",
        }).reason,
      ).toBe(
        "Manual restock",
      );
    });

    it("rejects overly long reason", () => {
      expect(
        validateAdminInventoryAdjustment({
          type: "ENTRY",
          amount: "2",
          reason:
            "x".repeat(161),
        }).errors.reason,
      ).toBe(
        "REASON_TOO_LONG",
      );
    });
  },
);