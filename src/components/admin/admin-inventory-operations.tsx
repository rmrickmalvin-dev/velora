"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontAdminInventoryCopy,
} from "../../i18n/storefront-admin-inventory-copy";
import {
  validateAdminInventoryAdjustment,
  type AdminInventoryAction,
  type AdminInventoryAdjustmentError,
} from "../../features/admin/admin-inventory-adjustment-model";
import {
  adjustBrowserAdminInventory,
  loadBrowserAdminInventoryMovements,
  type AdminInventoryMovementItem,
} from "../../features/admin/browser-admin-inventory";

import styles from "./admin-inventory-operations.module.css";

type AdminInventoryOperationsProps =
  Readonly<{
    locale:
      StorefrontLocale;
    inventoryId: string;
    sku: string;
    quantityOnHand: number;
    onChanged:
      () => Promise<void>;
  }>;

export function AdminInventoryOperations({
  locale,
  inventoryId,
  sku,
  quantityOnHand,
  onChanged,
}: AdminInventoryOperationsProps) {
  const copy =
    getStorefrontAdminInventoryCopy(
      locale,
    );

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    type,
    setType,
  ] =
    useState<
      AdminInventoryAction
    >("ENTRY");

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    reason,
    setReason,
  ] = useState("");

  const [
    errors,
    setErrors,
  ] =
    useState<
      Readonly<{
        amount?:
          AdminInventoryAdjustmentError;
        reason?:
          AdminInventoryAdjustmentError;
      }>
    >({});

  const [
    pendingDelta,
    setPendingDelta,
  ] =
    useState<
      number | null
    >(null);

  const [
    movements,
    setMovements,
  ] =
    useState<
      readonly AdminInventoryMovementItem[]
    >([]);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  async function refreshHistory() {
    const next =
      await loadBrowserAdminInventoryMovements(
        inventoryId,
      );

    setMovements(
      next,
    );
  }

  useEffect(
    () => {
      if (!open) {
        return;
      }

      queueMicrotask(
        () => {
          void refreshHistory();
        },
      );
    },
    [
      open,
      inventoryId,
    ],
  );

  function errorMessage(
    code:
      AdminInventoryAdjustmentError |
      undefined,
  ): string {
    if (
      code ===
      "REASON_REQUIRED"
    ) {
      return copy.reasonRequired;
    }

    if (
      code ===
      "REASON_TOO_SHORT"
    ) {
      return copy.reasonTooShort;
    }

    if (
      code ===
      "REASON_TOO_LONG"
    ) {
      return copy.reasonTooLong;
    }

    if (
      code ===
      "INVALID_AMOUNT"
    ) {
      return copy.invalidAmount;
    }

    return "";
  }

  function review(
    event:
      React.FormEvent<
        HTMLFormElement
      >,
  ) {
    event.preventDefault();

    const validation =
      validateAdminInventoryAdjustment({
        type,
        amount,
        reason,
      });

    setErrors(
      validation.errors,
    );

    setFeedback("");

    if (
      validation.valid &&
      validation.delta !==
        null
    ) {
      setReason(
        validation.reason,
      );

      setPendingDelta(
        validation.delta,
      );
    } else {
      setPendingDelta(
        null,
      );
    }
  }

  async function confirm() {
    if (
      pendingDelta ===
        null ||
      saving
    ) {
      return;
    }

    setSaving(true);
    setFeedback("");

    try {
      await adjustBrowserAdminInventory({
        inventoryId,
        type,
        delta:
          pendingDelta,
        reason,
      });

      await Promise.all([
        refreshHistory(),
        onChanged(),
      ]);

      setAmount("");
      setReason("");
      setPendingDelta(
        null,
      );
      setErrors({});
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

  return (
    <section
      className={
        styles.root
      }
      data-inventory-id={
        inventoryId
      }
    >
      <button
        type="button"
        className={
          styles.trigger
        }
        aria-expanded={
          open
        }
        onClick={
          () => {
            setOpen(
              (current) =>
                !current,
            );
          }
        }
      >
        <span>
          {
            copy.adjustStock
          }
        </span>

        <strong>
          {
            quantityOnHand
          }
        </strong>
      </button>

      {open ? (
        <div
          className={
            styles.panel
          }
        >
          <header
            className={
              styles.header
            }
          >
            <div>
              <span>
                {sku}
              </span>
              <h4>
                {
                  copy.title
                }
              </h4>
            </div>

            <button
              type="button"
              className={
                styles.close
              }
              onClick={
                () => {
                  setOpen(false);
                }
              }
            >
              {
                copy.close
              }
            </button>
          </header>

          <p
            className={
              styles.current
            }
          >
            {
              copy.currentStock
            }
            {": "}
            <strong>
              {
                quantityOnHand
              }
            </strong>
          </p>

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
                  copy.movementType
                }
              </span>

              <select
                value={type}
                onChange={
                  (event) => {
                    setType(
                      event.target
                        .value as
                        AdminInventoryAction,
                    );

                    setPendingDelta(
                      null,
                    );
                  }
                }
              >
                <option value="ENTRY">
                  {
                    copy.entry
                  }
                </option>
                <option value="EXIT">
                  {
                    copy.exit
                  }
                </option>
                <option value="ADJUSTMENT">
                  {
                    copy.adjustment
                  }
                </option>
              </select>
            </label>

            <label>
              <span>
                {
                  copy.amount
                }
              </span>

              <input
                inputMode={
                  type ===
                    "ADJUSTMENT"
                    ? "text"
                    : "numeric"
                }
                value={amount}
                aria-invalid={
                  Boolean(
                    errors.amount,
                  )
                }
                onChange={
                  (event) => {
                    setAmount(
                      event.target
                        .value,
                    );

                    setPendingDelta(
                      null,
                    );
                  }
                }
              />

              <small>
                {
                  errorMessage(
                    errors.amount,
                  )
                }
              </small>
            </label>

            <label
              className={
                styles.reason
              }
            >
              <span>
                {
                  copy.reason
                }
              </span>

              <textarea
                value={reason}
                aria-invalid={
                  Boolean(
                    errors.reason,
                  )
                }
                onChange={
                  (event) => {
                    setReason(
                      event.target
                        .value,
                    );

                    setPendingDelta(
                      null,
                    );
                  }
                }
              />

              <small>
                {
                  errorMessage(
                    errors.reason,
                  )
                }
              </small>
            </label>

            <div
              className={
                styles.actions
              }
            >
              {pendingDelta !==
              null ? (
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
                        void confirm();
                      }
                    }
                  >
                    {
                      copy.confirm
                    }
                    {" "}
                    (
                    {
                      pendingDelta >
                      0
                        ? "+"
                        : ""
                    }
                    {
                      pendingDelta
                    }
                    )
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
                        setPendingDelta(
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
                  type="submit"
                  className={
                    styles.primary
                  }
                  disabled={
                    saving
                  }
                >
                  {
                    copy.review
                  }
                </button>
              )}
            </div>
          </form>

          <div
            className={
              styles.feedback
            }
            role="status"
            aria-live="polite"
          >
            {feedback}
          </div>

          <section
            className={
              styles.history
            }
          >
            <h5>
              {
                copy.movementHistory
              }
            </h5>

            <p>
              {
                copy.historyNotice
              }
            </p>

            {movements.length ===
            0 ? (
              <p>
                {
                  copy.noMovements
                }
              </p>
            ) : (
              <ol>
                {movements.map(
                  (movement) => (
                    <li
                      key={
                        movement.id
                      }
                    >
                      <span>
                        {
                          movement.type
                        }
                      </span>

                      <strong>
                        {
                          copy.delta
                        }
                        {": "}
                        {
                          movement.delta >
                          0
                            ? "+"
                            : ""
                        }
                        {
                          movement.delta
                        }
                      </strong>

                      <p>
                        {
                          movement.reason
                        }
                      </p>
                    </li>
                  ),
                )}
              </ol>
            )}
          </section>
        </div>
      ) : null}
    </section>
  );
}