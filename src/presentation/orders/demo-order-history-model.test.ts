import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createOrder,
} from "../../domain/entities/order";
import {
  createOrderItem,
} from "../../domain/entities/order-item";
import {
  BRL,
} from "../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../domain/value-objects/money";
import {
  buildDemoOrderHistory,
} from "./demo-order-history-model";

function order(
  id: string,
  quantity = 1,
) {
  return createOrder({
    id,
    status: "PENDING",
    items: [
      createOrderItem({
        id:
          `${id}-item`,
        productId:
          "product-1",
        productVariantId:
          "variant-1",
        productNameSnapshot:
          "VELORA Product",
        skuSnapshot:
          "VEL-1",
        unitPriceSnapshot:
          createMoney(
            2500,
            BRL,
          ),
        quantity,
      }),
    ],
  });
}

describe(
  "Demo Order History Model",
  () => {
    it("supports an empty history", () => {
      expect(
        buildDemoOrderHistory(
          [],
        ),
      ).toEqual([]);
    });

    it("preserves Order identity", () => {
      expect(
        buildDemoOrderHistory([
          order(
            "demo-order-10-a",
          ),
        ])[0].orderId,
      ).toBe(
        "demo-order-10-a",
      );
    });

    it("preserves Order status", () => {
      expect(
        buildDemoOrderHistory([
          order(
            "demo-order-10-b",
          ),
        ])[0].status,
      ).toBe("PENDING");
    });

    it("counts Order item quantity", () => {
      expect(
        buildDemoOrderHistory([
          order(
            "demo-order-10-c",
            3,
          ),
        ])[0].totalItems,
      ).toBe(3);
    });

    it("counts distinct Order lines", () => {
      expect(
        buildDemoOrderHistory([
          order(
            "demo-order-10-d",
          ),
        ])[0].lineCount,
      ).toBe(1);
    });

    it("derives subtotal from Order snapshots", () => {
      const item =
        buildDemoOrderHistory([
          order(
            "demo-order-10-e",
            2,
          ),
        ])[0];

      expect(
        item.subtotalMinorUnits,
      ).toBe(5000);

      expect(
        item.currency,
      ).toBe("BRL");
    });

    it("sorts demo references descending for newest-first presentation", () => {
      expect(
        buildDemoOrderHistory([
          order(
            "demo-order-100-a",
          ),
          order(
            "demo-order-300-c",
          ),
          order(
            "demo-order-200-b",
          ),
        ]).map(
          (item) =>
            item.orderId,
        ),
      ).toEqual([
        "demo-order-300-c",
        "demo-order-200-b",
        "demo-order-100-a",
      ]);
    });

    it("returns a frozen history and frozen items", () => {
      const history =
        buildDemoOrderHistory([
          order(
            "demo-order-10-f",
          ),
        ]);

      expect(
        Object.isFrozen(
          history,
        ),
      ).toBe(true);

      expect(
        Object.isFrozen(
          history[0],
        ),
      ).toBe(true);
    });
  },
);