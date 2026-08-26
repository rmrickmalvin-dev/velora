import {
  createCartItem,
  type CartItem,
} from "../../../domain/entities/cart-item";
import {
  createCart,
  type Cart,
} from "../../../domain/entities/cart";
import {
  createInventory,
  type Inventory,
} from "../../../domain/entities/inventory";
import {
  createInventoryMovement,
  type InventoryMovement,
} from "../../../domain/entities/inventory-movement";
import {
  createOrderItem,
  type OrderItem,
} from "../../../domain/entities/order-item";
import {
  createOrder,
  type Order,
} from "../../../domain/entities/order";
import {
  createProductCategory,
  type ProductCategory,
} from "../../../domain/entities/product-category";
import {
  createProductMedia,
  type ProductMedia,
} from "../../../domain/entities/product-media";
import {
  createProductVariant,
  type ProductVariant,
} from "../../../domain/entities/product-variant";
import {
  createProduct,
  type Product,
} from "../../../domain/entities/product";
import {
  createCurrencyCode,
} from "../../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../../domain/value-objects/money";

function money(
  value:
    Readonly<{
      minorUnits: number;
      currency: string;
    }>,
) {
  return createMoney(
    value.minorUnits,
    createCurrencyCode(
      value.currency,
    ),
  );
}

export function hydrateProductCategory(
  record: ProductCategory,
): ProductCategory {
  return createProductCategory({
    id: record.id,
    slug: record.slug,
    name: record.name,
    ...(record.description
      ? {
          description:
            record.description,
        }
      : {}),
  });
}

export function hydrateProduct(
  record: Product,
): Product {
  return createProduct({
    id: record.id,
    slug: record.slug,
    name: record.name,
    brand: record.brand,
    model: record.model,
    categoryId:
      record.categoryId,
    status: record.status,
    featured:
      record.featured,
  });
}

export function hydrateProductVariant(
  record: ProductVariant,
): ProductVariant {
  return createProductVariant({
    id: record.id,
    productId:
      record.productId,
    sku: record.sku,
    price: money(
      record.price,
    ),
    status:
      record.status,
    attributes: {
      ...record.attributes,
    },
  });
}

export function hydrateProductMedia(
  record: ProductMedia,
): ProductMedia {
  return createProductMedia({
    id: record.id,
    productId:
      record.productId,
    ...(record.variantId
      ? {
          variantId:
            record.variantId,
        }
      : {}),
    url: record.url,
    alt: record.alt,
    position:
      record.position,
  });
}

export function hydrateInventory(
  record: Inventory,
): Inventory {
  return createInventory({
    id: record.id,
    productVariantId:
      record.productVariantId,
    quantityOnHand:
      record.quantityOnHand,
  });
}

export function hydrateInventoryMovement(
  record: InventoryMovement,
): InventoryMovement {
  return createInventoryMovement({
    id: record.id,
    inventoryId:
      record.inventoryId,
    type: record.type,
    delta: record.delta,
    reason: record.reason,
  });
}

export function hydrateCartItem(
  record: CartItem,
): CartItem {
  return createCartItem({
    id: record.id,
    productVariantId:
      record.productVariantId,
    unitPrice:
      money(record.unitPrice),
    quantity:
      record.quantity,
  });
}

export function hydrateCart(
  record: Cart,
): Cart {
  return createCart({
    id: record.id,
    items:
      record.items.map(
        hydrateCartItem,
      ),
  });
}

export function hydrateOrderItem(
  record: OrderItem,
): OrderItem {
  return createOrderItem({
    id: record.id,
    productId:
      record.productId,
    productVariantId:
      record.productVariantId,
    productNameSnapshot:
      record.productNameSnapshot,
    skuSnapshot:
      record.skuSnapshot,
    unitPriceSnapshot:
      money(
        record.unitPriceSnapshot,
      ),
    quantity:
      record.quantity,
  });
}

export function hydrateOrder(
  record: Order,
): Order {
  return createOrder({
    id: record.id,
    ...(record.customerId
      ? {
          customerId:
            record.customerId,
        }
      : {}),
    status:
      record.status,
    items:
      record.items.map(
        hydrateOrderItem,
      ),
  });
}