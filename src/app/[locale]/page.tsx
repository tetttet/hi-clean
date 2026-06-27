import { HomeInject } from "@/components";
import { createPageMetadata } from "@/i18n/metadata";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return createPageMetadata(locale, "home", "/");
}

export default function Home() {
  return <HomeInject />;
}
