"use client"

import React, {useState} from 'react';
import {TextLink} from "@/types/links";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";

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

    const [
        activeTab,
        setActive
    ] = useState<TextLink>(mockTabList[0])

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>
            <SideTabBar
                setActive={(item: TextLink) => setActive(item)}
                activeTab={activeTab}
                tabs={mockTabList}
            />
            {children}
        </InnerPageWrapper>
    )

}

export default ServicesLayout
