"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { FlipLink } from "./flip-link";
import { useSiteContent } from "@/i18n/use-site-content";
import { locales, type Locale } from "@/i18n/routing";
import { normalizeLocale, switchLocalePath, withLocale } from "@/i18n/paths";

const handleAnchorClick = (
  e: MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const localeLabels: Record<Locale, string> = {
  tr: "TR",
  ru: "RU",
  en: "EN",
};

const getHomeAnchor = (hash: string, isHomePage: boolean, locale: Locale) =>
  isHomePage ? hash : `/${locale}${hash}`;

const Navigation = ({
  isHomePage = false,
  tone = "default",
  compact = false,
}: {
  isHomePage?: boolean;
  tone?: "default" | "dark";
  compact?: boolean;
}) => {
  const locale = normalizeLocale(useLocale());
  const content = useSiteContent();
  const linkClass = tone === "dark" ? "text-[#f7f8f4]" : "text-foreground";
  const navItems = [
    { label: content.nav.services, href: withLocale(locale, "/services") },
    {
      label: content.nav.results,
      href: getHomeAnchor("#results", isHomePage, locale),
    },
    {
      label: content.nav.reviews,
      href: getHomeAnchor("#reviews", isHomePage, locale),
    },
  ];
  const contactHref = withLocale(locale, "/contact");
  const navFrameClass = isHomePage
    ? "flex items-center justify-between gap-3 px-6 pt-8 sm:gap-6 sm:px-10 lg:px-[4.5rem] lg:pt-12"
    : `mx-auto grid w-[94%] max-w-[1440px] grid-cols-[auto_auto] items-center gap-x-3 gap-y-3 sm:flex sm:w-[90%] sm:justify-between sm:gap-6 ${
        compact ? "py-3 sm:py-4" : "py-7 sm:py-10"
      }`;
  const mobileDividerClass =
    tone === "dark" ? "border-[#f7f8f4]/14" : "border-[#151a17]/10";
  const navListClass = isHomePage
    ? "flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:text-base"
    : `col-span-2 flex w-full items-center justify-center gap-4 border-t pt-3 text-xs font-semibold sm:w-auto sm:border-t-0 sm:pt-0 sm:text-base sm:gap-6 ${mobileDividerClass}`;

  return (
    <nav className={navFrameClass}>
      {!isHomePage && (
        <FlipLink
          href={withLocale(locale, "/")}
          className={`font-anton-sc text-2xl uppercase leading-none sm:text-3xl ${linkClass}`}
        >
          HI-<span className="text-[#d0a850]">Clean</span>
        </FlipLink>
      )}

      <ul className={navListClass}>
        {navItems.map((item) => (
          <li key={item.href} className="leading-none">
            <FlipLink
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className={linkClass}
            >
              {item.label}
            </FlipLink>
          </li>
        ))}
      </ul>

      <div className="col-start-2 row-start-1 flex items-center justify-self-end text-sm font-semibold leading-none sm:col-auto sm:row-auto sm:gap-4 sm:text-base">
        <div className="hidden list-none sm:block">
          <FlipLink
            href={contactHref}
            onClick={(e) => handleAnchorClick(e, contactHref)}
            className={linkClass}
          >
            {content.nav.contact}
          </FlipLink>
        </div>
        <LanguageSwitcher
          currentLocale={locale}
          label={content.nav.languageLabel}
          tone={tone}
        />
      </div>
    </nav>
  );
};

export default Navigation;

function LanguageSwitcher({
  currentLocale,
  label,
  tone,
}: {
  currentLocale: Locale;
  label: string;
  tone: "default" | "dark";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const selectClass =
    tone === "dark"
      ? "border-[#f7f8f4]/24 bg-[#f7f8f4]/8 text-[#f7f8f4] focus:border-[#d0a850] focus:ring-[#d0a850]/20"
      : "border-[#151a17]/16 bg-white/70 text-[#151a17] focus:border-accent focus:ring-accent/20";
  const arrowClass =
    tone === "dark"
      ? "text-[#f7f8f4]/72"
      : "text-[#151a17]/58";

  return (
    <label className="relative block shrink-0" aria-label={label}>
      <select
        aria-label={label}
        value={currentLocale}
        onChange={(event) => {
          router.push(switchLocalePath(pathname, event.target.value as Locale));
        }}
        className={`h-9 w-16 appearance-none rounded-md border px-3 pr-8 text-xs font-black uppercase leading-none outline-none transition focus:ring-4 ${selectClass}`}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale} className="text-[#151a17]">
            {localeLabels[locale]}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 ${arrowClass}`}
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
    </label>
  );
}
