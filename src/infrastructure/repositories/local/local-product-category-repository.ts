import type {
  ProductCategory,
} from "../../../domain/entities/product-category";
import type {
  ProductCategoryRepository,
} from "../../../domain/repositories/product-category-repository";
import type {
  ProductCategoryId,
} from "../../../domain/types/identifiers";
import type {
  Slug,
} from "../../../domain/value-objects/slug";

export class LocalProductCategoryRepository
  implements ProductCategoryRepository
{
  private readonly items =
    new Map<
      ProductCategoryId,
      ProductCategory
    >();

  constructor(
    initial:
      readonly ProductCategory[] =
        [],
  ) {
    for (const category of initial) {
      this.items.set(
        category.id,
        category,
      );
    }
  }

  async findById(
    id: ProductCategoryId,
  ): Promise<ProductCategory | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async findBySlug(
    slug: Slug,
  ): Promise<ProductCategory | null> {
    for (
      const category
      of this.items.values()
    ) {
      if (
        category.slug === slug
      ) {
        return category;
      }
    }

    return null;
  }

  async list(): Promise<
    readonly ProductCategory[]
  > {
    return Object.freeze(
      Array.from(
        this.items.values(),
      ),
    );
  }

  async save(
    category: ProductCategory,
  ): Promise<void> {
    this.items.set(
      category.id,
      category,
    );
  }
}