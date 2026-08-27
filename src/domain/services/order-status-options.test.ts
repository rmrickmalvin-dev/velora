import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getAllowedOrderStatusTransitions,
} from "./order-service";

describe(
  "Order Status Transition Options",
  () => {
    it("offers confirmation and cancellation from PENDING", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "PENDING",
        ),
      ).toEqual([
        "CONFIRMED",
        "CANCELLED",
      ]);
    });

    it("offers preparation and cancellation from CONFIRMED", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "CONFIRMED",
        ),
      ).toEqual([
        "PREPARING",
        "CANCELLED",
      ]);
    });

    it("offers shipping and cancellation from PREPARING", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "PREPARING",
        ),
      ).toEqual([
        "SHIPPED",
        "CANCELLED",
      ]);
    });

    it("offers delivery from SHIPPED", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "SHIPPED",
        ),
      ).toEqual([
        "DELIVERED",
      ]);
    });

    it("treats DELIVERED as terminal", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "DELIVERED",
        ),
      ).toEqual([]);
    });

    it("treats CANCELLED as terminal", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "CANCELLED",
        ),
      ).toEqual([]);
    });

    it("returns a frozen transition collection", () => {
      expect(
        Object.isFrozen(
          getAllowedOrderStatusTransitions(
            "PENDING",
          ),
        ),
      ).toBe(true);
    });

    it("returns a fresh immutable snapshot", () => {
      expect(
        getAllowedOrderStatusTransitions(
          "PENDING",
        ),
      ).not.toBe(
        getAllowedOrderStatusTransitions(
          "PENDING",
        ),
      );
    });
  },
);