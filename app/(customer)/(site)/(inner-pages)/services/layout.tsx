"use client"

import React, {useState} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";

const ServicesLayout = ({children}: {
    children: React.ReactNode
}) => {

    const mockTabList: TabBarItem[] = [
        {text: "Все услуги"},
        {text: "Подписка на воду «DIO»"},
        {text: "Аренда кулеров и пурифаеров"},
        {text: "Бесплатное пользование кулеров"},
        {text: "Ремонт кулеров, пурифайеров"},
        {text: "Санитарная обработка оборудования"},
        {text: "Сервисное обслуживание пурифайеров"},
    ]

    const [
        activeTab,
        setActive
    ] = useState<TabBarItem>(mockTabList[0])

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>
            <SideTabBar
                setActive={setActive}
                activeTab={activeTab}
                tabs={mockTabList}
            />
            {children}
        </InnerPageWrapper>
    )

}

export default ServicesLayout
