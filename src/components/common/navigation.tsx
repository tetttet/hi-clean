"use client";

import type { MouseEvent } from "react";
import { FlipLink } from "./flip-link";

const handleAnchorClick = (
  e: MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const getHomeAnchor = (hash: string, isHomePage: boolean) =>
  isHomePage ? hash : `/${hash}`;

const Navigation = ({
  isHomePage = false,
  tone = "default",
  compact = false,
}: {
  isHomePage?: boolean;
  tone?: "default" | "dark";
  compact?: boolean;
}) => {
  const linkClass = tone === "dark" ? "text-[#f7f8f4]" : "text-foreground";
  const navItems = [
    { label: "Services", href: "/services" },
    { label: "Results", href: getHomeAnchor("#results", isHomePage) },
    { label: "Reviews", href: getHomeAnchor("#reviews", isHomePage) },
  ];
  const contactHref = "/contact";

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
          href="/"
          className={`font-anton-sc text-3xl uppercase leading-none ${linkClass}`}
        >
          HI-<span className="text-[#d0a850]">Clean</span>
        </FlipLink>
      )}

      <ul className="flex items-center gap-4 text-sm font-semibold sm:gap-6 sm:text-base">
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

      <div className="hidden list-none text-sm font-semibold leading-none sm:block sm:text-base">
        <FlipLink
          href={contactHref}
          onClick={(e) => handleAnchorClick(e, contactHref)}
          className={linkClass}
        >
          Contact
        </FlipLink>
      </div>
    </nav>
  );
};

export default Navigation;
