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
  getStorefrontCheckoutCopy,
} from "../../i18n/storefront-checkout-copy";
import {
  getStorefrontOrdersCopy,
} from "../../i18n/storefront-orders-copy";
import {
  emitBrowserCartChanged,
  getBrowserCartExperience,
} from "../../features/cart/browser-cart-runtime";
import type {
  CartExperienceSnapshot,
} from "../../features/cart/cart-experience";
import {
  completeBrowserDemoOrder,
  type DemoOrderConfirmation,
} from "../../features/checkout/browser-checkout-runtime";
import {
  validateCheckoutCart,
} from "../../features/checkout/checkout-cart-validation";
import {
  validateCheckoutForm,
  type CheckoutFormErrorCode,
  type CheckoutFormField,
  type CheckoutFormInput,
} from "../../features/checkout/checkout-form-model";
import {
  formatStorefrontMoney,
} from "../../presentation/storefront/storefront-home-model";

import {
  CartIndicator,
} from "./cart-indicator";

import styles from "./checkout-page.module.css";

type CheckoutPageProps =
  Readonly<{
    locale:
      StorefrontLocale;
  }>;

const emptyCart:
  CartExperienceSnapshot =
    Object.freeze({
      totalItems: 0,
      lineCount: 0,
      subtotalMinorUnits:
        null,
      currency: null,
      lines:
        Object.freeze([]),
    });

const initialForm:
  CheckoutFormInput =
  Object.freeze({
    fullName: "",
    email: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });

export function CheckoutPage({
  locale,
}: CheckoutPageProps) {
  const copy =
    getStorefrontCheckoutCopy(
      locale,
    );

  const ordersCopy =
    getStorefrontOrdersCopy(
      locale,
    );

  const [
    cart,
    setCart,
  ] =
    useState<
      CartExperienceSnapshot
    >(
      emptyCart,
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    form,
    setForm,
  ] =
    useState<
      CheckoutFormInput
    >(
      initialForm,
    );

  const [
    errors,
    setErrors,
  ] =
    useState<
      Readonly<
        Partial<
          Record<
            CheckoutFormField,
            CheckoutFormErrorCode
          >
        >
      >
    >({});

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    confirmation,
    setConfirmation,
  ] =
    useState<
      DemoOrderConfirmation |
      null
    >(null);

  const [
    completionError,
    setCompletionError,
  ] = useState("");

  useEffect(
    () => {
      queueMicrotask(
        () => {
          void getBrowserCartExperience()
            .load()
            .then(
              (snapshot) => {
                setCart(
                  snapshot,
                );
              },
            )
            .finally(
              () => {
                setLoading(
                  false,
                );
              },
            );
        },
      );
    },
    [],
  );

  const cartValidation =
    validateCheckoutCart(
      cart,
    );

  function errorMessage(
    code:
      CheckoutFormErrorCode |
      undefined,
  ): string {
    if (!code) {
      return "";
    }

    if (
      code ===
      "INVALID_EMAIL"
    ) {
      return copy.errorEmail;
    }

    if (
      code ===
      "INVALID_POSTAL"
    ) {
      return copy.errorPostal;
    }

    if (
      code ===
      "TOO_SHORT"
    ) {
      return copy.errorShort;
    }

    return copy.errorRequired;
  }

  function updateField(
    field:
      CheckoutFormField,
    value: string,
  ) {
    setCompletionError("");

    setForm(
      (
        current,
      ) => ({
        ...current,
        [field]:
          value,
      }),
    );
  }

  function handleSubmit(
    event:
      React.FormEvent<
        HTMLFormElement
      >,
  ) {
    event.preventDefault();

    const validation =
      validateCheckoutForm(
        form,
      );

    setForm(
      validation.values,
    );

    setErrors(
      validation.errors,
    );

    setCompletionError("");

    if (
      !validation.valid ||
      !cartValidation.ready ||
      submitting
    ) {
      return;
    }

    setSubmitting(true);

    void completeBrowserDemoOrder()
      .then(
        (result) => {
          setConfirmation(
            result,
          );

          setCart(
            emptyCart,
          );

          emitBrowserCartChanged();
        },
      )
      .catch(
        () => {
          setCompletionError(
            copy.completionError,
          );
        },
      )
      .finally(
        () => {
          setSubmitting(
            false,
          );
        },
      );
  }

  const subtotal =
    cart.subtotalMinorUnits !==
      null &&
    cart.currency !==
      null
      ? formatStorefrontMoney(
          locale,
          cart.subtotalMinorUnits,
          cart.currency,
        )
      : "-";

  return (
    <main
      className={styles.page}
    >
      <a
        className="velora-skip-link"
        href="#checkout-main-content"
      >
        {
          locale === "en"
            ? "Skip to content"
            : locale === "es"
              ? "Saltar al contenido"
              : "Pular para o conteudo"
        }
      </a>

      <header
        className={styles.header}
      >
        <div
          className={
            styles.headerInner
          }
        >
          <Link
            className={styles.brand}
            href={
              `/${locale}`
            }
          >
            VELORA
          </Link>

          <Link
            className={styles.back}
            href={
              `/${locale}`
            }
          >
            <span
              aria-hidden="true"
            >
              &larr;
            </span>
            {
              copy.backToStore
            }
          </Link>

          <CartIndicator
            locale={locale}
          />
        </div>
      </header>

      <section
        id="checkout-main-content"
        tabIndex={-1}
        className={styles.hero}
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

        <h1>
          {
            copy.title
          }
        </h1>

        <p
          className={
            styles.body
          }
        >
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
            copy.demoNotice
          }
        </div>
      </section>

      {confirmation ? (
        <section
          className={
            styles.confirmation
          }
          aria-labelledby="demo-order-confirmation-title"
        >
          <p
            className={
              styles.eyebrow
            }
          >
            {
              copy.confirmationEyebrow
            }
          </p>

          <h2
            id="demo-order-confirmation-title"
          >
            {
              copy.confirmationTitle
            }
          </h2>

          <p>
            {
              copy.confirmationBody
            }
          </p>

          <dl
            className={
              styles.confirmationData
            }
          >
            <div>
              <dt>
                {
                  copy.reference
                }
              </dt>
              <dd>
                {
                  confirmation.orderId
                }
              </dd>
            </div>

            <div>
              <dt>
                {
                  copy.orderStatus
                }
              </dt>
              <dd>
                {
                  confirmation.status
                }
              </dd>
            </div>
          </dl>

          <div
            className={
              styles.confirmationActions
            }
          >
            <Link
              className={
                styles.historyLink
              }
              href={
                `/${locale}/orders`
              }
            >
              {
                ordersCopy
                  .historyCta
              }
            </Link>

            <Link
              className={
                styles.continue
              }
              href={
                `/${locale}`
              }
            >
              {
                copy.continueShopping
              }
              <span
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </section>
      ) : loading ? (
        <section
          className={
            styles.state
          }
        >
          <p>
            Loading...
          </p>
        </section>
      ) : cart.lines.length ===
        0 ? (
        <section
          className={
            styles.state
          }
        >
          <span
            aria-hidden="true"
          >
            00
          </span>

          <h2>
            {
              copy.emptyTitle
            }
          </h2>

          <p>
            {
              copy.emptyBody
            }
          </p>

          <Link
            href={
              `/${locale}`
            }
          >
            {
              copy.backToStore
            }
          </Link>
        </section>
      ) : !cartValidation.ready ? (
        <section
          className={
            styles.state
          }
        >
          <span
            aria-hidden="true"
          >
            !
          </span>

          <h2>
            {
              copy.invalidCartTitle
            }
          </h2>

          <p>
            {
              copy.invalidCartBody
            }
          </p>
        </section>
      ) : (
        <div
          className={
            styles.checkout
          }
        >
          <aside
            className={
              styles.summary
            }
          >
            <p
              className={
                styles.eyebrow
              }
            >
              VELORA / CART
            </p>

            <h2>
              {
                copy.summaryTitle
              }
            </h2>

            <div
              className={
                styles.lines
              }
            >
              {cart.lines.map(
                (line) => (
                  <article
                    key={
                      line.cartItemId
                    }
                    className={
                      styles.line
                    }
                  >
                    <div>
                      <span>
                        {
                          line.sku
                        }
                      </span>

                      <h3>
                        {
                          line.productName
                        }
                      </h3>

                      <p>
                        {
                          line.quantity
                        }
                        {" x "}
                        {
                          formatStorefrontMoney(
                            locale,
                            line.unitPriceMinorUnits,
                            line.currency,
                          )
                        }
                      </p>
                    </div>

                    <strong>
                      {
                        formatStorefrontMoney(
                          locale,
                          line.unitPriceMinorUnits *
                            line.quantity,
                          line.currency,
                        )
                      }
                    </strong>
                  </article>
                ),
              )}
            </div>

            <div
              className={
                styles.subtotal
              }
            >
              <span>
                {
                  copy.subtotal
                }
              </span>

              <strong>
                {
                  subtotal
                }
              </strong>
            </div>
          </aside>

          <form
            className={
              styles.form
            }
            noValidate
            onSubmit={
              handleSubmit
            }
          >
            <fieldset>
              <legend>
                {
                  copy.contactTitle
                }
              </legend>

              <label>
                <span>
                  {
                    copy.fullName
                  }
                </span>

                <input
                  name="fullName"
                  autoComplete="name"
                  value={
                    form.fullName
                  }
                  aria-invalid={
                    Boolean(
                      errors.fullName,
                    )
                  }
                  onChange={
                    (event) =>
                      updateField(
                        "fullName",
                        event.target
                          .value,
                      )
                  }
                />

                <small>
                  {
                    errorMessage(
                      errors.fullName,
                    )
                  }
                </small>
              </label>

              <label>
                <span>
                  {
                    copy.email
                  }
                </span>

                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={
                    form.email
                  }
                  aria-invalid={
                    Boolean(
                      errors.email,
                    )
                  }
                  onChange={
                    (event) =>
                      updateField(
                        "email",
                        event.target
                          .value,
                      )
                  }
                />

                <small>
                  {
                    errorMessage(
                      errors.email,
                    )
                  }
                </small>
              </label>
            </fieldset>

            <fieldset>
              <legend>
                {
                  copy.deliveryTitle
                }
              </legend>

              <label>
                <span>
                  {
                    copy.addressLine
                  }
                </span>

                <input
                  name="addressLine"
                  autoComplete="street-address"
                  value={
                    form.addressLine
                  }
                  aria-invalid={
                    Boolean(
                      errors.addressLine,
                    )
                  }
                  onChange={
                    (event) =>
                      updateField(
                        "addressLine",
                        event.target
                          .value,
                      )
                  }
                />

                <small>
                  {
                    errorMessage(
                      errors.addressLine,
                    )
                  }
                </small>
              </label>

              <div
                className={
                  styles.fieldRow
                }
              >
                <label>
                  <span>
                    {
                      copy.city
                    }
                  </span>

                  <input
                    name="city"
                    autoComplete="address-level2"
                    value={
                      form.city
                    }
                    aria-invalid={
                      Boolean(
                        errors.city,
                      )
                    }
                    onChange={
                      (event) =>
                        updateField(
                          "city",
                          event.target
                            .value,
                        )
                    }
                  />

                  <small>
                    {
                      errorMessage(
                        errors.city,
                      )
                    }
                  </small>
                </label>

                <label>
                  <span>
                    {
                      copy.postalCode
                    }
                  </span>

                  <input
                    name="postalCode"
                    autoComplete="postal-code"
                    value={
                      form.postalCode
                    }
                    aria-invalid={
                      Boolean(
                        errors.postalCode,
                      )
                    }
                    onChange={
                      (event) =>
                        updateField(
                          "postalCode",
                          event.target
                            .value,
                        )
                    }
                  />

                  <small>
                    {
                      errorMessage(
                        errors.postalCode,
                      )
                    }
                  </small>
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className={
                styles.submit
              }
              disabled={
                submitting
              }
            >
              {
                submitting
                  ? copy.completingOrder
                  : copy.submit
              }
            </button>

            <div
              className={
                styles.feedback
              }
              role="status"
              aria-live="polite"
            >
              {
                completionError
              }
            </div>
          </form>
        </div>
      )}
    </main>
  );
}