import { DomainValidationError } from "../errors/domain-validation-error";
import type {
  CustomerId,
  OrderId,
} from "../types/identifiers";
import {
  isOrderStatus,
  type OrderStatus,
} from "../types/statuses";
import type {
  OrderItem,
} from "./order-item";

export type Order = Readonly<{
  id: OrderId;
  customerId?: CustomerId;
  status: OrderStatus;
  items: readonly OrderItem[];
}>;

export type CreateOrderInput = {
  id: string;
  customerId?: string;
  status: OrderStatus;
  items: readonly OrderItem[];
};

function requireOrderId(
  value: string,
): OrderId {
  const normalized = value.trim();

  if (!normalized) {
    throw new DomainValidationError(
      "ORDER_ID_REQUIRED",
      "Order id cannot be empty.",
    );
  }

  return normalized as OrderId;
}

function normalizeCustomerId(
  value: string | undefined,
): CustomerId | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalized = value.trim();

  if (!normalized) {
    throw new DomainValidationError(
      "ORDER_CUSTOMER_ID_INVALID",
      "Order customerId cannot be empty when provided.",
    );
  }

  return normalized as CustomerId;
}

function assertItems(
  items: readonly OrderItem[],
) {
  if (items.length === 0) {
    throw new DomainValidationError(
      "ORDER_ITEMS_REQUIRED",
      "Order must contain at least one OrderItem.",
    );
  }

  const ids = new Set<string>();

  for (const item of items) {
    if (ids.has(item.id)) {
      throw new DomainValidationError(
        "ORDER_ITEM_ID_DUPLICATED",
        `OrderItem id is duplicated: ${item.id}`,
      );
    }

    ids.add(item.id);
  }
}

export function createOrder(
  input: CreateOrderInput,
): Order {
  const id =
    requireOrderId(
      input.id,
    );

  const customerId =
    normalizeCustomerId(
      input.customerId,
    );

  if (
    !isOrderStatus(
      input.status,
    )
  ) {
    throw new DomainValidationError(
      "ORDER_STATUS_INVALID",
      `Invalid Order status: ${input.status}`,
    );
  }

  const items = [
    ...input.items,
  ];

  assertItems(items);

  return Object.freeze({
    id,
    ...(customerId
      ? { customerId }
      : {}),
    status: input.status,
    items:
      Object.freeze(items),
  });
}