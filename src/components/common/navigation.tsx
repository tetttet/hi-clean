"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
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

  return (
    <nav
      className={`flex items-center justify-between gap-6 ${
        isHomePage
          ? "px-6 pt-8 sm:px-10 lg:px-[4.5rem] lg:pt-12"
          : `mx-auto w-[90%] max-w-[1440px] ${compact ? "py-4" : "py-10"}`
      }`}
    >
      {!isHomePage && (
        <FlipLink
          href={withLocale(locale, "/")}
          className={`font-anton-sc text-3xl uppercase leading-none ${linkClass}`}
        >
          HI-<span className="text-[#d0a850]">Clean</span>
        </FlipLink>
      )}

      <ul className="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:text-base">
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

      <div className="flex items-center gap-3 text-sm font-semibold leading-none sm:gap-4 sm:text-base">
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
  const baseClass =
    tone === "dark"
      ? "border-[#f7f8f4]/24 text-[#f7f8f4]/72 hover:border-[#d0a850] hover:text-[#d0a850]"
      : "border-[#151a17]/16 text-[#151a17]/58 hover:border-accent hover:text-accent";
  const activeClass =
    tone === "dark"
      ? "border-[#d0a850] bg-[#d0a850] text-[#151a17]"
      : "border-[#151a17] bg-[#151a17] text-[#f7f8f4]";

  return (
    <div
      aria-label={label}
      className="flex shrink-0 overflow-hidden rounded-md border border-current/10 text-[10px] font-black uppercase leading-none sm:text-xs"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            className={`px-2.5 py-2 transition sm:px-3 ${
              isActive ? activeClass : baseClass
            }`}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
