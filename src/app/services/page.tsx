import ServicesPageInject from "@/components/ui/services";
import type { Metadata } from "next";

const title = "Services and Prices | HI-Clean";
const description =
  "Choose a HI-Clean service, calculate an estimate, and send a cleaning request for Istanbul.";
const previewImage = {
  url: "/images/logo.jpeg",
  width: 1254,
  height: 536,
  alt: "HI-Clean cleaning service logo",
};

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title,
    description,
    url: "/services",
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage.url],
  },
};

export default function ServicesPage() {
  return <ServicesPageInject />;
}
