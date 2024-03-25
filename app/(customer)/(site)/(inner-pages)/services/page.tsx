"use client"

import {mockServiceCardArray} from "@/data/serviceCardData";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import React, {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import ServicePopup from "@/components/organisms/popups/service/ServicePopup";

const mockTabList: TabBarItem[] = [
    {text: "Все услуги"},
    {text: "Подписка на воду «DIO»"},
    {text: "Аренда кулеров и пурифаеров"},
    {text: "Бесплатное пользование кулеров"},
    {text: "Ремонт кулеров, пурифайеров"},
    {text: "Санитарная обработка оборудования"},
    {text: "Сервисное обслуживание пурифайеров"},
]

const selectedItems: SelectItem<string>[] = [
    {name: "Все услуги", value: "all"},
    {name: "Подписка на воду «DIO»", value: "subscribe"},
    {name: "Аренда кулеров и пурифаеров", value: "rent"},
    {name: "Бесплатное пользование кулеров", value: "free_use"},
    {name: "Ремонт кулеров, пурифайеров", value: "fixing"},
]

const ServiceCatalogScreen = () => {

    const [activeTab, setActive] = useState<TabBarItem>(mockTabList[0])
    const [activeSelectItem, setActiveSelectItem] = useState<SelectItem<string>>(selectedItems[0])

    return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <ServicePopup/>
            <SideTabBar
                setActive={setActive}
                activeTab={activeTab}
                tabs={mockTabList}
            />
            <section className={"w-full sm:col-span-9 flex flex-col gap-5"}>
                <SelectInput
                    className={"sm:hidden"}
                    selectedItem={activeSelectItem}
                    onSelect={setActiveSelectItem}
                    items={selectedItems}
                />
                <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
                    {mockServiceCardArray.map((card) => (
                        <ServiceFullCard card={card}/>
                    ))}
                </section>
            </section>
        </InnerPageWrapper>
    )

}

export default ServiceCatalogScreen
