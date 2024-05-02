"use client"

import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import ServicePopup from "@/components/organisms/popups/service/ServicePopup";
import {useServicesPage} from "@/app/(customer)/(site)/(inner-pages)/services/page.hooks";

import dynamic from "next/dynamic";
import Loading from "@/components/mobile/loading/Loading";

const ServiceContentBlock = dynamic(
    () => import("@/components/organisms/loading-blocks/services/ServiceContentBlock"),
    {loading: () => <Loading className={"col-span-9"}/>, ssr: false}
)

const ServiceCatalogScreen = () => {

    const context = useServicesPage()

    return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <ServicePopup/>
            <SideTabBar {...context.sidebar}/>
            <ServiceContentBlock
                services={context.serviceGroup?.items}
                {...context.selectInput}
            />
        </InnerPageWrapper>
    )

}

export default ServiceCatalogScreen
