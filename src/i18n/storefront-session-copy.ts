import type {
  StorefrontLocale,
} from "./storefront-copy";
import type {
  DemoSessionRole,
} from "../features/session/demo-session-model";

export type StorefrontSessionCopy =
  Readonly<{
    sessionLabel: string;
    guestLabel: string;
    customerLabel: string;
    adminLabel: string;
    switchRole: string;
    loginEyebrow: string;
    loginTitle: string;
    loginBody: string;
    demoNotice: string;
    customerCta: string;
    adminCta: string;
    guestCta: string;
    storageError: string;
    accountEyebrow: string;
    accountTitle: string;
    accountBody: string;
    adminEyebrow: string;
    adminTitle: string;
    adminBody: string;
    accessTitle: string;
    accessBody: string;
    chooseRole: string;
    storeCta: string;
    ordersCta: string;
    sessionModeNotice: string;
  }>;

const sessionCopy:
  Record<
    StorefrontLocale,
    StorefrontSessionCopy
  > = {
    "pt-BR": {
      sessionLabel:
        "Sess\u00e3o demo",
      guestLabel:
        "Visitante",
      customerLabel:
        "Cliente",
      adminLabel:
        "Admin",
      switchRole:
        "Trocar perfil",
      loginEyebrow:
        "Acesso demonstrativo",
      loginTitle:
        "Escolha como explorar.",
      loginBody:
        "A VELORA permite alternar entre experi\u00eancias de visitante, cliente e administrador.",
      demoNotice:
        "Este seletor simula pap\u00e9is de interface para o portf\u00f3lio. N\u00e3o \u00e9 autentica\u00e7\u00e3o real e n\u00e3o protege dados sens\u00edveis.",
      customerCta:
        "Explorar como cliente",
      adminCta:
        "Explorar painel administrativo",
      guestCta:
        "Continuar como visitante",
      storageError:
        "N\u00e3o foi poss\u00edvel salvar o perfil demonstrativo neste navegador.",
      accountEyebrow:
        "Experi\u00eancia do cliente",
      accountTitle:
        "Sua \u00e1rea VELORA.",
      accountBody:
        "Esta \u00e9 a base da experi\u00eancia de cliente demonstrativo. Dados de conta reais ainda n\u00e3o s\u00e3o utilizados.",
      adminEyebrow:
        "Experi\u00eancia administrativa",
      adminTitle:
        "Painel VELORA.",
      adminBody:
        "Esta \u00e9 a entrada do administrador demonstrativo. Controles de cat\u00e1logo, estoque e opera\u00e7\u00e3o ser\u00e3o conectados em unidades posteriores.",
      accessTitle:
        "Selecione o perfil adequado.",
      accessBody:
        "Esta \u00e1rea muda a experi\u00eancia visual, mas n\u00e3o representa uma barreira de seguran\u00e7a real.",
      chooseRole:
        "Escolher perfil",
      storeCta:
        "Explorar loja",
      ordersCta:
        "Pedidos demonstrativos",
      sessionModeNotice:
        "Modo demonstrativo local",
    },
    en: {
      sessionLabel:
        "Demo session",
      guestLabel:
        "Guest",
      customerLabel:
        "Customer",
      adminLabel:
        "Admin",
      switchRole:
        "Switch role",
      loginEyebrow:
        "Demo access",
      loginTitle:
        "Choose how to explore.",
      loginBody:
        "VELORA can switch between Guest, Customer and Admin interface experiences.",
      demoNotice:
        "This selector simulates interface roles for the portfolio. It is not real authentication and does not protect sensitive data.",
      customerCta:
        "Explore as customer",
      adminCta:
        "Explore admin dashboard",
      guestCta:
        "Continue as guest",
      storageError:
        "The demo role could not be saved in this browser.",
      accountEyebrow:
        "Customer experience",
      accountTitle:
        "Your VELORA area.",
      accountBody:
        "This is the foundation of the demo Customer experience. Real account data is not used yet.",
      adminEyebrow:
        "Admin experience",
      adminTitle:
        "VELORA dashboard.",
      adminBody:
        "This is the demo Admin entry. Catalog, Inventory and operations controls will be connected in later verifiable units.",
      accessTitle:
        "Select the appropriate role.",
      accessBody:
        "This area changes the interface experience but is not a real security boundary.",
      chooseRole:
        "Choose role",
      storeCta:
        "Explore store",
      ordersCta:
        "Demo orders",
      sessionModeNotice:
        "Local demo mode",
    },
    es: {
      sessionLabel:
        "Sesi\u00f3n demo",
      guestLabel:
        "Visitante",
      customerLabel:
        "Cliente",
      adminLabel:
        "Admin",
      switchRole:
        "Cambiar perfil",
      loginEyebrow:
        "Acceso demostrativo",
      loginTitle:
        "Elige c\u00f3mo explorar.",
      loginBody:
        "VELORA permite alternar entre experiencias de visitante, cliente y administrador.",
      demoNotice:
        "Este selector simula roles de interfaz para el portfolio. No es autenticaci\u00f3n real ni protege datos sensibles.",
      customerCta:
        "Explorar como cliente",
      adminCta:
        "Explorar panel administrativo",
      guestCta:
        "Continuar como visitante",
      storageError:
        "No fue posible guardar el perfil demostrativo en este navegador.",
      accountEyebrow:
        "Experiencia del cliente",
      accountTitle:
        "Tu \u00e1rea VELORA.",
      accountBody:
        "Esta es la base de la experiencia de cliente demostrativo. Todav\u00eda no se utilizan datos de cuenta reales.",
      adminEyebrow:
        "Experiencia administrativa",
      adminTitle:
        "Panel VELORA.",
      adminBody:
        "Esta es la entrada del administrador demostrativo. Los controles de cat\u00e1logo, inventario y operaci\u00f3n se conectar\u00e1n en unidades posteriores.",
      accessTitle:
        "Selecciona el perfil adecuado.",
      accessBody:
        "Esta \u00e1rea cambia la experiencia de interfaz, pero no representa una barrera de seguridad real.",
      chooseRole:
        "Elegir perfil",
      storeCta:
        "Explorar tienda",
      ordersCta:
        "Pedidos demostrativos",
      sessionModeNotice:
        "Modo demostrativo local",
    },
  };

export function getStorefrontSessionCopy(
  locale:
    StorefrontLocale,
): StorefrontSessionCopy {
  return sessionCopy[
    locale
  ];
}

export function getDemoRoleLabel(
  locale:
    StorefrontLocale,
  role:
    DemoSessionRole,
): string {
  const copy =
    getStorefrontSessionCopy(
      locale,
    );

  if (
    role ===
    "CUSTOMER"
  ) {
    return copy.customerLabel;
  }

  if (
    role ===
    "ADMIN"
  ) {
    return copy.adminLabel;
  }

  return copy.guestLabel;
}