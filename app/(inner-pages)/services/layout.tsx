"use client"

import React, {useState} from 'react';
import ServiceTabBar from "@/components/organisms/service-tab-bar/ServiceTabBar";
import {TextLink} from "@/types/links";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";

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

    const [activeTab, setActive] = useState<TextLink>(mockTabList[0])

    return (
        <InnerPageWrapper>
            <ServiceTabBar
                tabs={mockTabList}
                activeTab={activeTab}
                setActive={(item: TextLink) => setActive(item)}
            />
            {children}
        </InnerPageWrapper>
    )

}

export default ServicesLayout
