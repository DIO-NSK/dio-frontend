"use client"

import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import ServicePopup from "@/components/organisms/popups/service/ServicePopup";
import {useServicesPage} from "@/app/(customer)/(site)/(inner-pages)/services/page.hooks";

const ServiceCatalogScreen = () => {

    const context = useServicesPage()

    if (context.sidebar.activeTab && context.selectInput.selectedItem) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <ServicePopup/>
            <SideTabBar {...context.sidebar}/>
            <section className={"w-full sm:col-span-9 flex flex-col gap-5"}>
                <SelectInput className={"sm:hidden"} {...context.selectInput}/>
                <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
                    {context.serviceGroup?.items.map((card, key) => (
                        <ServiceFullCard card={card} key={key}/>
                    ))}
                </section>
            </section>
        </InnerPageWrapper>
    )

}

export default ServiceCatalogScreen
