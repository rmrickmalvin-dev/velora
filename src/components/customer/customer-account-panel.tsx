"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import type {
  StorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  getStorefrontAccountCopy,
} from "../../i18n/storefront-account-copy";
import {
  formatStorefrontMoney,
} from "../../presentation/storefront/storefront-home-model";
import type {
  DemoOrderHistoryItem,
} from "../../presentation/orders/demo-order-history-model";
import {
  loadBrowserDemoOrders,
} from "../../features/orders/browser-demo-orders";
import {
  defaultDemoCustomerProfile,
  validateDemoCustomerProfile,
  type DemoCustomerProfile,
  type DemoCustomerProfileError,
  type DemoCustomerProfileField,
} from "../../features/customer/demo-customer-profile-model";
import {
  readBrowserDemoCustomerProfile,
  resetBrowserDemoCustomerProfile,
  subscribeBrowserDemoCustomerProfile,
  writeBrowserDemoCustomerProfile,
} from "../../features/customer/browser-demo-customer-profile";

import styles from "./customer-account-panel.module.css";

type CustomerAccountPanelProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

export function CustomerAccountPanel({
  locale,
}: CustomerAccountPanelProps) {
  const copy =
    getStorefrontAccountCopy(
      locale,
    );

  const [
    profile,
    setProfile,
  ] =
    useState<
      DemoCustomerProfile
    >(
      defaultDemoCustomerProfile,
    );

  const [
    draft,
    setDraft,
  ] =
    useState<
      DemoCustomerProfile
    >(
      defaultDemoCustomerProfile,
    );

  const [
    errors,
    setErrors,
  ] =
    useState<
      Readonly<
        Partial<
          Record<
            DemoCustomerProfileField,
            DemoCustomerProfileError
          >
        >
      >
    >({});

  const [
    orders,
    setOrders,
  ] =
    useState<
      readonly DemoOrderHistoryItem[]
    >([]);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  useEffect(
    () => {
      let active =
        true;

      const syncProfile =
        () => {
          const next =
            readBrowserDemoCustomerProfile();

          setProfile(
            next,
          );

          setDraft(
            next,
          );
        };

      syncProfile();

      queueMicrotask(
        () => {
          void loadBrowserDemoOrders()
            .then(
              (next) => {
                if (active) {
                  setOrders(
                    next,
                  );
                }
              },
            )
            .catch(
              () =>
                undefined,
            );
        },
      );

      const unsubscribe =
        subscribeBrowserDemoCustomerProfile(
          syncProfile,
        );

      return () => {
        active = false;
        unsubscribe();
      };
    },
    [],
  );

  function errorMessage(
    code:
      DemoCustomerProfileError |
      undefined,
  ): string {
    if (
      code ===
      "INVALID_EMAIL"
    ) {
      return copy.invalidEmail;
    }

    if (
      code ===
      "INVALID_PHONE"
    ) {
      return copy.invalidPhone;
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
      "REQUIRED"
    ) {
      return copy.required;
    }

    return "";
  }

  function save(
    event:
      React.FormEvent<
        HTMLFormElement
      >,
  ) {
    event.preventDefault();

    const validation =
      validateDemoCustomerProfile(
        draft,
      );

    setErrors(
      validation.errors,
    );

    setFeedback("");

    if (
      !validation.valid
    ) {
      return;
    }

    try {
      const saved =
        writeBrowserDemoCustomerProfile(
          validation.values,
        );

      setProfile(
        saved,
      );

      setDraft(
        saved,
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

  function restore() {
    const restored =
      resetBrowserDemoCustomerProfile();

    setProfile(
      restored,
    );

    setDraft(
      restored,
    );

    setErrors({});
    setFeedback(
      copy.restored,
    );
  }

  return (
    <section
      className={
        styles.root
      }
      aria-labelledby="velora-customer-account-title"
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
          id="velora-customer-account-title"
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
            copy.localNotice
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
            styles.profile
          }
          noValidate
          onSubmit={save}
        >
          <div
            className={
              styles.profileHeading
            }
          >
            <div>
              <span>
                {
                  copy.profileTitle
                }
              </span>

              <strong>
                {
                  profile.fullName
                }
              </strong>
            </div>
          </div>

          {([
            [
              "fullName",
              copy.fullName,
              "text",
            ],
            [
              "email",
              copy.email,
              "email",
            ],
            [
              "phone",
              copy.phone,
              "tel",
            ],
            [
              "city",
              copy.city,
              "text",
            ],
          ] as const).map(
            (
              [
                field,
                label,
                type,
              ],
            ) => (
              <label
                key={field}
              >
                <span>
                  {label}
                </span>

                <input
                  type={type}
                  value={
                    draft[field]
                  }
                  aria-invalid={
                    Boolean(
                      errors[field],
                    )
                  }
                  onChange={
                    (event) => {
                      setDraft(
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

          <div
            className={
              styles.actions
            }
          >
            <button
              type="submit"
              className={
                styles.primary
              }
            >
              {
                copy.save
              }
            </button>

            <button
              type="button"
              className={
                styles.secondary
              }
              onClick={restore}
            >
              {
                copy.restore
              }
            </button>
          </div>

          <div
            className={
              styles.feedback
            }
            role="status"
            aria-live="polite"
          >
            {feedback}
          </div>
        </form>

        <section
          className={
            styles.orders
          }
          aria-labelledby="velora-customer-orders-title"
        >
          <h3
            id="velora-customer-orders-title"
          >
            {
              copy.ordersTitle
            }
          </h3>

          <p>
            {
              copy.ordersBody
            }
          </p>

          {orders.length ===
          0 ? (
            <div
              className={
                styles.empty
              }
            >
              <p>
                {
                  copy.noOrders
                }
              </p>

              <Link
                href={
                  `/${locale}`
                }
              >
                {
                  copy.browseStore
                }
              </Link>
            </div>
          ) : (
            <ol
              className={
                styles.orderList
              }
            >
              {orders.map(
                (order) => (
                  <li
                    key={
                      order.orderId
                    }
                  >
                    <div>
                      <span>
                        {
                          copy.orderRef
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
                          copy.status
                        }
                      </span>

                      <strong>
                        {
                          order.status
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
                  </li>
                ),
              )}
            </ol>
          )}
        </section>
      </div>
    </section>
  );
}