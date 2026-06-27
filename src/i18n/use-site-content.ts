"use client";

import { useLocale } from "next-intl";
import { getContent } from "./content";
import { normalizeLocale } from "./paths";

export function useSiteContent() {
  return getContent(normalizeLocale(useLocale()));
}
