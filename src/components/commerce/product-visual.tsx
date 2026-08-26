import type {
  CSSProperties,
} from "react";

import type {
  StorefrontProductVisual,
} from "../../presentation/storefront/storefront-product-media";

import styles from "./product-visual.module.css";

type ProductVisualProps =
  Readonly<{
    visual:
      StorefrontProductVisual;
    mode:
      "category" |
      "card" |
      "detail";
  }>;

export function ProductVisual({
  visual,
  mode,
}: ProductVisualProps) {
  const style:
    CSSProperties = {
      backgroundImage:
        `url("${visual.fallbackAsset}")`,
    };

  return (
    <span
      className={
        styles[mode]
      }
      style={style}
      aria-hidden="true"
      data-canonical-media={
        visual.canonicalMediaUrl ??
        undefined
      }
    />
  );
}