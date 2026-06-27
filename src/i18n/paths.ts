import { defaultLocale, isLocale, type Locale } from "./routing";

export function withoutLocale(pathname: string) {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (!isLocale(maybeLocale)) {
    return pathname || "/";
  }

  const path = `/${segments.slice(2).join("/")}`;
  return path === "/" ? "/" : path.replace(/\/$/, "");
}

export function withLocale(locale: Locale, href: string) {
  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const path = withoutLocale(pathname);
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function normalizeLocale(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}
