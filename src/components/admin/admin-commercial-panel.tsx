"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loadBrowserAdminCatalog,
} from "../../features/admin/browser-admin-catalog";
import {
  buildAdminCommercialSimulation,
  formatBasisPoints,
  type DemoPromotionScenario,
  type DemoPromotionScenarioDraft,
} from "../../features/pricing/admin-commercial-simulator-model";
import {
  deleteBrowserDemoPromotion,
  readBrowserDemoPromotions,
  saveBrowserDemoPromotion,
  subscribeBrowserDemoPromotions,
} from "../../features/pricing/browser-demo-promotions";
import {
  getStorefrontAdminCommercialCopy,
} from "../../i18n/storefront-admin-commercial-copy";
import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import type {
  AdminCatalogModel,
} from "../../presentation/admin/admin-catalog-model";
import {
  formatStorefrontMoney,
} from "../../presentation/storefront/storefront-home-model";

import styles from "./admin-commercial-panel.module.css";

type AdminCommercialPanelProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

type VariantOption =
  Readonly<{
    id: string;
    label: string;
    priceMinorUnits: number;
    currency: string;
  }>;

export function AdminCommercialPanel({
  locale,
}: AdminCommercialPanelProps) {
  const copy =
    getStorefrontAdminCommercialCopy(
      locale,
    );

  const [
    catalog,
    setCatalog,
  ] =
    useState<
      AdminCatalogModel |
      null
    >(null);

  const [
    variantId,
    setVariantId,
  ] = useState("");

  const [
    label,
    setLabel,
  ] = useState(
    "Launch discount",
  );

  const [
    code,
    setCode,
  ] = useState(
    "LAUNCH-10",
  );

  const [
    costText,
    setCostText,
  ] = useState(
    "0,00",
  );

  const [
    discountText,
    setDiscountText,
  ] = useState(
    "10",
  );

  const [
    pending,
    setPending,
  ] =
    useState<
      DemoPromotionScenarioDraft |
      null
    >(null);

  const [
    scenarios,
    setScenarios,
  ] =
    useState<
      readonly DemoPromotionScenario[]
    >([]);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  const loadCatalog =
    useCallback(
      async () => {
        const next =
          await loadBrowserAdminCatalog(
            locale,
          );

        setCatalog(
          next,
        );

        const firstVariant =
          next.products[0]
            ?.variants[0];

        if (
          firstVariant
        ) {
          setVariantId(
            (
              current,
            ) =>
              current ||
              firstVariant.variantId,
          );
        }
      },
      [
        locale,
      ],
    );

  const refreshScenarios =
    useCallback(
      () => {
        setScenarios(
          readBrowserDemoPromotions(),
        );
      },
      [],
    );

  useEffect(
    () => {
      queueMicrotask(
        () => {
          void loadCatalog();
          refreshScenarios();
        },
      );

      return subscribeBrowserDemoPromotions(
        refreshScenarios,
      );
    },
    [
      loadCatalog,
      refreshScenarios,
    ],
  );

  const variants =
    useMemo(
      () => {
        const options:
          VariantOption[] =
            [];

        for (
          const product of
          catalog?.products ??
          []
        ) {
          for (
            const variant of
            product.variants
          ) {
            options.push({
              id:
                variant.variantId,
              label:
                `${product.name} / ${variant.sku}`,
              priceMinorUnits:
                variant.priceMinorUnits,
              currency:
                variant.currency,
            });
          }
        }

        return options;
      },
      [
        catalog,
      ],
    );

  const selected =
    variants.find(
      (variant) =>
        variant.id ===
        variantId,
    ) ??
    variants[0] ??
    null;

  function review(
    event:
      FormEvent<
        HTMLFormElement
      >,
  ) {
    event.preventDefault();
    setFeedback("");

    if (!selected) {
      setPending(
        null,
      );
      setFeedback(
        copy.invalidField,
      );
      return;
    }

    const simulation =
      buildAdminCommercialSimulation({
        label,
        code,
        productVariantId:
          selected.id,
        basePriceMinorUnits:
          selected.priceMinorUnits,
        currency:
          selected.currency,
        costText,
        discountText,
      });

    if (
      !simulation.valid ||
      !simulation.draft
    ) {
      setPending(
        null,
      );
      setFeedback(
        copy.invalidField,
      );
      return;
    }

    setPending(
      simulation.draft,
    );
  }

  function save() {
    if (!pending) {
      return;
    }

    try {
      saveBrowserDemoPromotion(
        pending,
      );

      setPending(
        null,
      );

      setFeedback(
        copy.saved,
      );
    } catch {
      setFeedback(
        copy.saveError,
      );
    }
  }

  return (
    <section
      className={
        styles.root
      }
      aria-labelledby="velora-admin-commercial-title"
    >
      <header
        className={
          styles.heading
        }
      >
        <p
          className={
            styles.eyebrow
          }
        >
          {
            copy.eyebrow
          }
        </p>

        <h2
          id="velora-admin-commercial-title"
        >
          {
            copy.title
          }
        </h2>

        <p>
          {
            copy.body
          }
        </p>

        <div
          className={
            styles.notice
          }
          role="note"
        >
          {
            copy.simulationNotice
          }
        </div>
      </header>

      <div
        className={
          styles.grid
        }
      >
        <form
          className={
            styles.form
          }
          noValidate
          onSubmit={
            review
          }
        >
          <label>
            <span>
              {
                copy.variant
              }
            </span>

            <select
              value={
                selected?.id ??
                ""
              }
              onChange={
                (event) => {
                  setVariantId(
                    event.target
                      .value,
                  );
                  setPending(
                    null,
                  );
                }
              }
            >
              {variants.map(
                (variant) => (
                  <option
                    key={
                      variant.id
                    }
                    value={
                      variant.id
                    }
                  >
                    {
                      variant.label
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span>
              {
                copy.label
              }
            </span>

            <input
              value={label}
              onChange={
                (event) => {
                  setLabel(
                    event.target
                      .value,
                  );
                  setPending(
                    null,
                  );
                }
              }
            />
          </label>

          <label>
            <span>
              {
                copy.code
              }
            </span>

            <input
              value={code}
              onChange={
                (event) => {
                  setCode(
                    event.target
                      .value,
                  );
                  setPending(
                    null,
                  );
                }
              }
            />
          </label>

          <label>
            <span>
              {
                copy.cost
              }
            </span>

            <input
              inputMode="decimal"
              value={
                costText
              }
              onChange={
                (event) => {
                  setCostText(
                    event.target
                      .value,
                  );
                  setPending(
                    null,
                  );
                }
              }
            />
          </label>

          <label>
            <span>
              {
                copy.discount
              }
            </span>

            <input
              inputMode="decimal"
              value={
                discountText
              }
              onChange={
                (event) => {
                  setDiscountText(
                    event.target
                      .value,
                  );
                  setPending(
                    null,
                  );
                }
              }
            />
          </label>

          <button
            type="submit"
            className={
              styles.primary
            }
          >
            {
              copy.simulate
            }
          </button>
        </form>

        <section
          className={
            styles.preview
          }
          aria-live="polite"
        >
          <div>
            <span>
              {
                copy.basePrice
              }
            </span>

            <strong>
              {selected
                ? formatStorefrontMoney(
                    locale,
                    selected.priceMinorUnits,
                    selected.currency,
                  )
                : "-"}
            </strong>
          </div>

          {pending ? (
            <>
              <div>
                <span>
                  {
                    copy.promotionalPrice
                  }
                </span>

                <strong>
                  {
                    formatStorefrontMoney(
                      locale,
                      pending.promotionalPriceMinorUnits,
                      pending.currency,
                    )
                  }
                </strong>
              </div>

              <div>
                <span>
                  {
                    copy.grossProfit
                  }
                </span>

                <strong>
                  {
                    formatStorefrontMoney(
                      locale,
                      pending.grossProfitMinorUnits,
                      pending.currency,
                    )
                  }
                </strong>
              </div>

              <div>
                <span>
                  {
                    copy.grossMargin
                  }
                </span>

                <strong>
                  {
                    formatBasisPoints(
                      pending.grossMarginBasisPoints,
                    )
                  }
                  {"%"}
                </strong>
              </div>

              <div
                className={
                  styles.actions
                }
              >
                <button
                  type="button"
                  className={
                    styles.confirm
                  }
                  onClick={save}
                >
                  {
                    copy.confirmSave
                  }
                </button>

                <button
                  type="button"
                  className={
                    styles.secondary
                  }
                  onClick={
                    () => {
                      setPending(
                        null,
                      );
                    }
                  }
                >
                  {
                    copy.cancel
                  }
                </button>
              </div>
            </>
          ) : null}

          <div
            className={
              styles.feedback
            }
            role="status"
          >
            {feedback}
          </div>
        </section>
      </div>

      <section
        className={
          styles.scenarios
        }
      >
        <h3>
          {
            copy.scenarios
          }
        </h3>

        <p>
          {
            copy.resetNotice
          }
        </p>

        {scenarios.length ===
        0 ? (
          <div
            className={
              styles.empty
            }
          >
            {
              copy.empty
            }
          </div>
        ) : (
          <ol>
            {scenarios.map(
              (scenario) => (
                <li
                  key={
                    scenario.id
                  }
                >
                  <div>
                    <strong>
                      {
                        scenario.label
                      }
                    </strong>

                    <span>
                      {
                        scenario.code
                      }
                    </span>
                  </div>

                  <div>
                    <span>
                      {
                        copy.promotionalPrice
                      }
                    </span>

                    <strong>
                      {
                        formatStorefrontMoney(
                          locale,
                          scenario.promotionalPriceMinorUnits,
                          scenario.currency,
                        )
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      {
                        copy.grossMargin
                      }
                    </span>

                    <strong>
                      {
                        formatBasisPoints(
                          scenario.grossMarginBasisPoints,
                        )
                      }
                      {"%"}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className={
                      styles.secondary
                    }
                    onClick={
                      () => {
                        deleteBrowserDemoPromotion(
                          scenario.id,
                        );
                      }
                    }
                  >
                    {
                      copy.delete
                    }
                  </button>
                </li>
              ),
            )}
          </ol>
        )}
      </section>
    </section>
  );
}