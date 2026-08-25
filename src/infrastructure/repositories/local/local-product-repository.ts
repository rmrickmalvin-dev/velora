import type {
  Product,
} from "../../../domain/entities/product";
import type {
  ProductRepository,
} from "../../../domain/repositories/product-repository";
import type {
  ProductId,
} from "../../../domain/types/identifiers";
import type {
  Slug,
} from "../../../domain/value-objects/slug";

export class LocalProductRepository
  implements ProductRepository
{
  private readonly items =
    new Map<
      ProductId,
      Product
    >();

  constructor(
    initial:
      readonly Product[] =
        [],
  ) {
    for (const product of initial) {
      this.items.set(
        product.id,
        product,
      );
    }
  }

  async findById(
    id: ProductId,
  ): Promise<Product | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async findBySlug(
    slug: Slug,
  ): Promise<Product | null> {
    for (
      const product
      of this.items.values()
    ) {
      if (
        product.slug === slug
      ) {
        return product;
      }
    }

    return null;
  }

  async list(): Promise<
    readonly Product[]
  > {
    return Object.freeze(
      Array.from(
        this.items.values(),
      ),
    );
  }

  async save(
    product: Product,
  ): Promise<void> {
    this.items.set(
      product.id,
      product,
    );
  }
}