"use client"

import React, {useState} from 'react';
import {TextLink} from "@/types/links";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {SelectItem} from "@/types/props/SelectItem";

const ServicesLayout = ({children}: {
    children: React.ReactNode
}) => {

    const mockTabList: TextLink[] = [
        {text: "Все услуги", path: "/"},
        {text: "Подписка на воду «DIO»", path: "/"},
        {text: "Аренда кулеров и пурифаеров", path: "/"},
        {text: "Бесплатное пользование кулеров", path: "/"},
        {text: "Ремонт кулеров, пурифайеров", path: "/"},
        {text: "Санитарная обработка оборудования", path: "/"},
        {text: "Сервисное обслуживание пурифайеров", path: "/"},
    ]

    const selectedItems : SelectItem<string>[] = [
        {name : "Все услуги", value : "all"},
        {name : "Подписка на воду «DIO»", value : "subscribe"},
        {name : "Аренда кулеров и пурифаеров", value : "rent"},
        {name : "Бесплатное пользование кулеров", value : "free_use"},
        {name : "Ремонт кулеров, пурифайеров", value : "fixing"},
    ]

    const [
        activeTab,
        setActive
    ] = useState<TextLink>(mockTabList[0])

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectedItems[0])

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>
            <SideTabBar
                setActive={(item: TextLink) => setActive(item)}
                activeTab={activeTab}
                tabs={mockTabList}
            />
            <SelectInput
                className={"sm:hidden"}
                selectedItem={activeSelectItem}
                onSelect={setActiveSelectItem}
                items={selectedItems}
            />
            {children}
        </InnerPageWrapper>
    )

}

export default ServicesLayout
