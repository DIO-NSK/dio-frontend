"use client";

import { useServicesPage } from "@/app/(customer)/(site)/(inner-pages)/services/page.hooks";
import Loading from "@/components/mobile/loading/Loading";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import ServicePopup from "@/components/organisms/popups/service/ServicePopup";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import dynamic from "next/dynamic";

const ServiceContentBlock = dynamic(
  () => import("@/components/organisms/loading-blocks/services/ServiceContentBlock"),
  { loading: () => <Loading className={"col-span-9"} />, ssr: false },
);

const ClientServicesScreen = () => {
  const context = useServicesPage();

  return (
    <InnerPageWrapper classNames={{ mobileWrapper: "pt-0 col-span-full md:grid md:grid-cols-6" }}>
      <ServicePopup />
      <SideTabBar {...context.sidebar} />
      <ServiceContentBlock services={context.serviceGroup?.items} {...context.selectInput} />
    </InnerPageWrapper>
  );
};

export default ClientServicesScreen;
