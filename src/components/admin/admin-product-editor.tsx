"use client";

import {
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontAdminEditCopy,
} from "../../i18n/storefront-admin-edit-copy";
import {
  updateBrowserAdminProduct,
  updateBrowserAdminVariantPrice,
} from "../../features/admin/browser-admin-catalog-mutations";
import {
  formatAdminPriceInput,
  parseAdminPriceInput,
  validateAdminProductDetails,
  type AdminEditErrorCode,
  type AdminProductDetailsField,
  type AdminProductDetailsInput,
} from "../../features/admin/admin-product-edit-model";
import type {
  AdminCatalogProductModel,
} from "../../presentation/admin/admin-catalog-model";

import styles from "./admin-product-editor.module.css";

type AdminProductEditorProps =
  Readonly<{
    locale:
      StorefrontLocale;
    product:
      AdminCatalogProductModel;
    onChanged:
      () => Promise<void>;
    onClose:
      () => void;
  }>;

export function AdminProductEditor({
  locale,
  product,
  onChanged,
  onClose,
}: AdminProductEditorProps) {
  const copy =
    getStorefrontAdminEditCopy(
      locale,
    );

  const [
    details,
    setDetails,
  ] =
    useState<
      AdminProductDetailsInput
    >({
      name: product.name,
      brand: product.brand,
      model: product.model,
      featured:
        product.featured,
    });

  const [
    errors,
    setErrors,
  ] =
    useState<
      Readonly<
        Partial<
          Record<
            AdminProductDetailsField,
            AdminEditErrorCode
          >
        >
      >
    >({});

  const [
    prices,
    setPrices,
  ] =
    useState<
      Readonly<
        Record<
          string,
          string
        >
      >
    >(
      Object.fromEntries(
        product.variants.map(
          (variant) => [
            variant.variantId,
            formatAdminPriceInput(
              variant.priceMinorUnits,
            ),
          ],
        ),
      ),
    );

  const [
    priceErrors,
    setPriceErrors,
  ] =
    useState<
      Readonly<
        Record<
          string,
          string
        >
      >
    >({});

  const [
    confirmDetails,
    setConfirmDetails,
  ] = useState(false);

  const [
    pendingPriceId,
    setPendingPriceId,
  ] =
    useState<
      string | null
    >(null);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  function errorMessage(
    code:
      AdminEditErrorCode |
      undefined,
  ): string {
    if (!code) {
      return "";
    }

    if (
      code ===
      "TOO_SHORT"
    ) {
      return copy.tooShort;
    }

    if (
      code ===
      "TOO_LONG"
    ) {
      return copy.tooLong;
    }

    if (
      code ===
      "INVALID_PRICE"
    ) {
      return copy.invalidPrice;
    }

    return copy.required;
  }

  function reviewDetails(
    event:
      React.FormEvent<
        HTMLFormElement
      >,
  ) {
    event.preventDefault();

    const validation =
      validateAdminProductDetails(
        details,
      );

    setDetails(
      validation.values,
    );

    setErrors(
      validation.errors,
    );

    setFeedback("");

    if (
      validation.valid
    ) {
      setConfirmDetails(
        true,
      );
    }
  }

  async function saveDetails() {
    const validation =
      validateAdminProductDetails(
        details,
      );

    if (
      !validation.valid ||
      saving
    ) {
      setErrors(
        validation.errors,
      );
      return;
    }

    setSaving(true);
    setFeedback("");

    try {
      await updateBrowserAdminProduct({
        productId:
          product.productId,
        name:
          validation.values.name,
        brand:
          validation.values.brand,
        model:
          validation.values.model,
        featured:
          validation.values.featured,
      });

      await onChanged();

      setConfirmDetails(
        false,
      );

      setFeedback(
        copy.saved,
      );
    } catch {
      setFeedback(
        copy.mutationError,
      );
    } finally {
      setSaving(false);
    }
  }

  function reviewPrice(
    variantId: string,
  ) {
    const validation =
      parseAdminPriceInput(
        prices[variantId] ??
        "",
      );

    setFeedback("");

    if (
      !validation.valid
    ) {
      setPriceErrors(
        (current) => ({
          ...current,
          [variantId]:
            copy.invalidPrice,
        }),
      );

      setPendingPriceId(
        null,
      );

      return;
    }

    setPriceErrors(
      (current) => ({
        ...current,
        [variantId]:
          "",
      }),
    );

    setPendingPriceId(
      variantId,
    );
  }

  async function savePrice(
    variantId: string,
  ) {
    const validation =
      parseAdminPriceInput(
        prices[variantId] ??
        "",
      );

    if (
      !validation.valid ||
      validation.minorUnits ===
        null ||
      saving
    ) {
      setPriceErrors(
        (current) => ({
          ...current,
          [variantId]:
            copy.invalidPrice,
        }),
      );

      return;
    }

    setSaving(true);
    setFeedback("");

    try {
      await updateBrowserAdminVariantPrice({
        productVariantId:
          variantId,
        priceMinorUnits:
          validation.minorUnits,
      });

      await onChanged();

      setPendingPriceId(
        null,
      );

      setFeedback(
        copy.priceSaved,
      );
    } catch {
      setFeedback(
        copy.mutationError,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      className={
        styles.root
      }
      aria-labelledby="admin-product-editor-title"
    >
      <header
        className={
          styles.header
        }
      >
        <div>
          <span>
            ADMIN / EDIT
          </span>

          <h3
            id="admin-product-editor-title"
          >
            {
              copy.editorTitle
            }
          </h3>

          <p>
            {
              copy.editorBody
            }
          </p>
        </div>

        <button
          type="button"
          className={
            styles.close
          }
          onClick={
            onClose
          }
        >
          {
            copy.close
          }
        </button>
      </header>

      <div
        className={
          styles.notice
        }
        role="note"
      >
        {
          copy.persistentNotice
        }
      </div>

      <form
        className={
          styles.details
        }
        noValidate
        onSubmit={
          reviewDetails
        }
      >
        <fieldset>
          <legend>
            {
              copy.productDetails
            }
          </legend>

          <div
            className={
              styles.fieldGrid
            }
          >
            {([
              [
                "name",
                copy.name,
              ],
              [
                "brand",
                copy.brand,
              ],
              [
                "model",
                copy.model,
              ],
            ] as const).map(
              (
                [
                  field,
                  label,
                ],
              ) => (
                <label
                  key={field}
                >
                  <span>
                    {label}
                  </span>

                  <input
                    value={
                      details[field]
                    }
                    aria-invalid={
                      Boolean(
                        errors[field],
                      )
                    }
                    onChange={
                      (event) => {
                        setConfirmDetails(
                          false,
                        );

                        setDetails(
                          (
                            current,
                          ) => ({
                            ...current,
                            [field]:
                              event.target
                                .value,
                          }),
                        );
                      }
                    }
                  />

                  <small>
                    {
                      errorMessage(
                        errors[field],
                      )
                    }
                  </small>
                </label>
              ),
            )}
          </div>

          <label
            className={
              styles.checkbox
            }
          >
            <input
              type="checkbox"
              checked={
                details.featured
              }
              onChange={
                (event) => {
                  setConfirmDetails(
                    false,
                  );

                  setDetails(
                    (
                      current,
                    ) => ({
                      ...current,
                      featured:
                        event.target
                          .checked,
                    }),
                  );
                }
              }
            />

            <span>
              {
                copy.featured
              }
            </span>
          </label>
        </fieldset>

        <div
          className={
            styles.actions
          }
        >
          {confirmDetails ? (
            <>
              <button
                type="button"
                className={
                  styles.confirm
                }
                disabled={
                  saving
                }
                onClick={
                  () => {
                    void saveDetails();
                  }
                }
              >
                {
                  copy.confirmProduct
                }
              </button>

              <button
                type="button"
                className={
                  styles.secondary
                }
                disabled={
                  saving
                }
                onClick={
                  () => {
                    setConfirmDetails(
                      false,
                    );
                  }
                }
              >
                {
                  copy.cancel
                }
              </button>
            </>
          ) : (
            <button
              type="submit"
              className={
                styles.primary
              }
              disabled={
                saving
              }
            >
              {
                copy.reviewProduct
              }
            </button>
          )}
        </div>
      </form>

      <section
        className={
          styles.prices
        }
      >
        <h4>
          {
            copy.variantPrices
          }
        </h4>

        <p>
          {
            copy.currencyHint
          }
        </p>

        <div
          className={
            styles.priceList
          }
        >
          {product.variants.map(
            (variant) => (
              <div
                key={
                  variant.variantId
                }
                className={
                  styles.priceRow
                }
              >
                <div>
                  <strong>
                    {
                      variant.sku
                    }
                  </strong>

                  <span>
                    {
                      variant.currency
                    }
                  </span>
                </div>

                <label>
                  <span>
                    {
                      variant.priceLabel
                    }
                  </span>

                  <input
                    inputMode="decimal"
                    value={
                      prices[
                        variant.variantId
                      ] ??
                      ""
                    }
                    aria-invalid={
                      Boolean(
                        priceErrors[
                          variant.variantId
                        ],
                      )
                    }
                    onChange={
                      (event) => {
                        setPendingPriceId(
                          null,
                        );

                        setPrices(
                          (
                            current,
                          ) => ({
                            ...current,
                            [variant.variantId]:
                              event.target
                                .value,
                          }),
                        );
                      }
                    }
                  />

                  <small>
                    {
                      priceErrors[
                        variant.variantId
                      ] ??
                      ""
                    }
                  </small>
                </label>

                <div
                  className={
                    styles.priceActions
                  }
                >
                  {pendingPriceId ===
                  variant.variantId ? (
                    <>
                      <button
                        type="button"
                        className={
                          styles.confirm
                        }
                        disabled={
                          saving
                        }
                        onClick={
                          () => {
                            void savePrice(
                              variant.variantId,
                            );
                          }
                        }
                      >
                        {
                          copy.confirmPrice
                        }
                      </button>

                      <button
                        type="button"
                        className={
                          styles.secondary
                        }
                        disabled={
                          saving
                        }
                        onClick={
                          () => {
                            setPendingPriceId(
                              null,
                            );
                          }
                        }
                      >
                        {
                          copy.cancel
                        }
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className={
                        styles.secondary
                      }
                      disabled={
                        saving
                      }
                      onClick={
                        () => {
                          reviewPrice(
                            variant.variantId,
                          );
                        }
                      }
                    >
                      {
                        copy.reviewPrice
                      }
                    </button>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <div
        className={
          styles.feedback
        }
        role="status"
        aria-live="polite"
      >
        {feedback}
      </div>
    </section>
  );
}