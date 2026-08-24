import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  defaultLocale,
  isLocale,
} from "./i18n/config";

/**
 * Retorna o primeiro segmento real da URL.
 *
 * /pt-BR             -> pt-BR
 * /en/product/test   -> en
 * /                  -> undefined
 */
function getFirstPathSegment(pathname: string) {
  const [, firstSegment] = pathname.split("/");

  return firstSegment;
}

/**
 * VELORA LOCALE PROXY
 *
 * Responsabilidade:
 *
 * 1. permitir URLs que já possuem locale;
 * 2. adicionar o locale padrão quando estiver ausente;
 * 3. preservar pathname e query string;
 * 4. não interferir nos assets internos do Next.js.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment =
    getFirstPathSegment(pathname);

  /*
   * A URL já possui um locale suportado.
   *
   * Exemplos:
   *
   * /pt-BR
   * /en
   * /es/product/example
   */

  if (
    firstSegment &&
    isLocale(firstSegment)
  ) {
    return NextResponse.next();
  }

  /*
   * A URL ainda não possui locale.
   *
   * Clonamos nextUrl para preservar automaticamente
   * informações importantes como search params.
   */

  const destination =
    request.nextUrl.clone();

  destination.pathname =
    pathname === "/"
      ? `/${defaultLocale}`
      : `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(destination);
}

/**
 * O Proxy não precisa executar para:
 *
 * - APIs;
 * - arquivos internos do Next.js;
 * - favicon;
 * - robots/sitemap;
 * - assets com extensão.
 */

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};