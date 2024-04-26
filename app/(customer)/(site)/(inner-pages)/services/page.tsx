"use client"

import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import React, {useEffect, useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import ServicePopup from "@/components/organisms/popups/service/ServicePopup";
import {Group, services} from "@/data/static/services";
import {ServiceCardDTO} from "@/types/cards";

const ServiceCatalogScreen = () => {

    const tabBarItems = services.map(s => ({text: s.groupHeader} as TabBarItem))
    const selectedItems = services.map((s, index) => ({name: s.groupHeader, value: `${index}`} as SelectItem<string>))

    const [activeTab, setActive] = useState<TabBarItem>(tabBarItems[0])
    const [activeSelectItem, setActiveSelectItem] = useState<SelectItem<string>>(selectedItems[0])

    const [serviceGroup, setServiceGroup] = useState<Group<ServiceCardDTO>>()

    useEffect(() => {
        const activeServiceGroup = services.find(s => s.groupHeader === activeTab.text)
        setServiceGroup(activeServiceGroup!!)
    }, [activeTab])

    useEffect(() => {
        const activeServiceGroup = services.find(s => s.groupHeader === activeSelectItem.name)
        setServiceGroup(activeServiceGroup!!)
    }, [activeSelectItem])

    return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <ServicePopup/>
            <SideTabBar
                setActive={setActive}
                activeTab={activeTab}
                tabs={tabBarItems}
            />
            <section className={"w-full sm:col-span-9 flex flex-col gap-5"}>
                <SelectInput
                    className={"sm:hidden"}
                    selectedItem={activeSelectItem}
                    onSelect={setActiveSelectItem}
                    items={selectedItems}
                />
                <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
                    {serviceGroup?.items.map((card) => (
                        <ServiceFullCard card={card}/>
                    ))}
                </section>
            </section>
        </InnerPageWrapper>
    )

}

export default ServiceCatalogScreen
