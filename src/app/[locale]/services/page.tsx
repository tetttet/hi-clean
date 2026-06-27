import ServicesPageInject from "@/components/ui/services";
import { createPageMetadata } from "@/i18n/metadata";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return createPageMetadata(locale, "services", "/services");
}

export default function ServicesPage() {
  return <ServicesPageInject />;
}
