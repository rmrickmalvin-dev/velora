"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  OrderStatus,
} from "../../domain/types/statuses";
import {
  changeBrowserAdminOrderStatus,
  loadBrowserAdminOrders,
} from "../../features/admin/browser-admin-orders";
import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontAdminOrdersCopy,
} from "../../i18n/storefront-admin-orders-copy";
import {
  filterAdminOrders,
  type AdminOrderFilter,
  type AdminOrdersModel,
} from "../../presentation/admin/admin-orders-model";
import {
  formatStorefrontMoney,
} from "../../presentation/storefront/storefront-home-model";

import styles from "./admin-orders-panel.module.css";

type AdminOrdersPanelProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

type PendingTransition =
  Readonly<{
    orderId: string;
    nextStatus:
      OrderStatus;
  }>;

const statusFilters:
  readonly OrderStatus[] =
    Object.freeze([
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ]);

export function AdminOrdersPanel({
  locale,
}: AdminOrdersPanelProps) {
  const copy =
    getStorefrontAdminOrdersCopy(
      locale,
    );

  const [
    model,
    setModel,
  ] =
    useState<
      AdminOrdersModel |
      null
    >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    filter,
    setFilter,
  ] =
    useState<
      AdminOrderFilter
    >("ALL");

  const [
    drafts,
    setDrafts,
  ] =
    useState<
      Readonly<
        Record<
          string,
          OrderStatus |
          ""
        >
      >
    >({});

  const [
    pending,
    setPending,
  ] =
    useState<
      PendingTransition |
      null
    >(null);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  const load =
    useCallback(
      async () => {
        const next =
          await loadBrowserAdminOrders();

        setModel(
          next,
        );
      },
      [],
    );

  useEffect(
    () => {
      let active =
        true;

      queueMicrotask(
        () => {
          void load()
            .catch(
              () =>
                undefined,
            )
            .finally(
              () => {
                if (active) {
                  setLoading(
                    false,
                  );
                }
              },
            );
        },
      );

      return () => {
        active = false;
      };
    },
    [
      load,
    ],
  );

  const visibleOrders =
    useMemo(
      () =>
        filterAdminOrders(
          model?.orders ??
            [],
          filter,
        ),
      [
        model,
        filter,
      ],
    );

  function review(
    orderId: string,
  ) {
    const nextStatus =
      drafts[
        orderId
      ];

    if (!nextStatus) {
      return;
    }

    setPending({
      orderId,
      nextStatus,
    });

    setFeedback("");
  }

  async function confirm() {
    if (
      !pending ||
      saving
    ) {
      return;
    }

    setSaving(true);
    setFeedback("");

    try {
      await changeBrowserAdminOrderStatus(
        pending.orderId,
        pending.nextStatus,
      );

      await load();

      setDrafts(
        (current) => ({
          ...current,
          [pending.orderId]:
            "",
        }),
      );

      setPending(
        null,
      );

      setFeedback(
        copy.updated,
      );
    } catch {
      setFeedback(
        copy.updateError,
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
      aria-labelledby="velora-admin-orders-title"
      aria-busy={
        loading
      }
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
          id="velora-admin-orders-title"
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
            copy.noPaymentNotice
          }
        </div>
      </header>

      <div
        className={
          styles.toolbar
        }
      >
        <label>
          <span>
            {
              copy.filterLabel
            }
          </span>

          <select
            value={
              filter
            }
            onChange={
              (event) => {
                setFilter(
                  event.target
                    .value as
                    AdminOrderFilter,
                );
              }
            }
          >
            <option value="ALL">
              {
                copy.allStatuses
              }
            </option>

            {statusFilters.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {
                    copy.statusLabels[
                      status
                    ]
                  }
                </option>
              ),
            )}
          </select>
        </label>

        <strong>
          {
            model?.totalOrders ??
            0
          }
        </strong>
      </div>

      {loading ? (
        <p
          className={
            styles.loading
          }
        >
          Loading...
        </p>
      ) : visibleOrders.length ===
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
        <div
          className={
            styles.list
          }
        >
          {visibleOrders.map(
            (order) => (
              <article
                key={
                  order.orderId
                }
                className={
                  styles.card
                }
              >
                <div
                  className={
                    styles.summary
                  }
                >
                  <div>
                    <span>
                      {
                        copy.reference
                      }
                    </span>

                    <strong>
                      {
                        order.orderId
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      {
                        copy.identity
                      }
                    </span>

                    <strong>
                      {
                        order.customerKind ===
                          "CUSTOMER"
                          ? copy.customer
                          : copy.guest
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      {
                        copy.status
                      }
                    </span>

                    <strong>
                      {
                        copy.statusLabels[
                          order.status
                        ]
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      {
                        copy.items
                      }
                    </span>

                    <strong>
                      {
                        order.totalItems
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      {
                        copy.lines
                      }
                    </span>

                    <strong>
                      {
                        order.lineCount
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      {
                        copy.subtotal
                      }
                    </span>

                    <strong>
                      {
                        formatStorefrontMoney(
                          locale,
                          order.subtotalMinorUnits,
                          order.currency,
                        )
                      }
                    </strong>
                  </div>
                </div>

                {order.nextStatuses
                  .length === 0 ? (
                  <div
                    className={
                      styles.terminal
                    }
                  >
                    {
                      copy.terminal
                    }
                  </div>
                ) : (
                  <div
                    className={
                      styles.operation
                    }
                  >
                    <label>
                      <span>
                        {
                          copy.nextStatus
                        }
                      </span>

                      <select
                        value={
                          drafts[
                            order.orderId
                          ] ??
                          ""
                        }
                        onChange={
                          (event) => {
                            setDrafts(
                              (
                                current,
                              ) => ({
                                ...current,
                                [order.orderId]:
                                  event.target
                                    .value as
                                    OrderStatus,
                              }),
                            );

                            setPending(
                              null,
                            );
                          }
                        }
                      >
                        <option value="">
                          -
                        </option>

                        {order.nextStatuses.map(
                          (
                            status,
                          ) => (
                            <option
                              key={
                                status
                              }
                              value={
                                status
                              }
                            >
                              {
                                copy.statusLabels[
                                  status
                                ]
                              }
                            </option>
                          ),
                        )}
                      </select>
                    </label>

                    {pending?.orderId ===
                    order.orderId ? (
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
                          {": "}
                          {
                            copy.statusLabels[
                              pending.nextStatus
                            ]
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
                    ) : (
                      <button
                        type="button"
                        className={
                          styles.primary
                        }
                        disabled={
                          !drafts[
                            order.orderId
                          ] ||
                          saving
                        }
                        onClick={
                          () => {
                            review(
                              order.orderId,
                            );
                          }
                        }
                      >
                        {
                          copy.review
                        }
                      </button>
                    )}
                  </div>
                )}
              </article>
            ),
          )}
        </div>
      )}

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