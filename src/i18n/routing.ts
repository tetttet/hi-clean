import { defineRouting } from "next-intl/routing";

export const locales = ["tr", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: false,
  localePrefix: "always",
});

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
