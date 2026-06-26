import ServicesPageInject from "@/components/ui/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | HI-Clean",
  description:
    "Choose a HI-Clean service, estimate the scope, and send a cleaning request.",
};

export default function ServicesPage() {
  return <ServicesPageInject />;
}
