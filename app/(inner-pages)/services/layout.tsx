"use client"

import React, {useEffect, useState} from 'react';
import style from "../InnerPages.module.css"
import ServiceTabBar from "@/components/organisms/service-tab-bar/ServiceTabBar";
import {TextLink} from "@/types/links";

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
        <div style={{padding: "0 100px 0 100px"}} className={style.innerLayout}>
            <ServiceTabBar
                tabs={mockTabList}
                activeTab={activeTab}
                setActive={(item: TextLink) => setActive(item)}
            />
            {children}
        </div>
    )

}

export default ServicesLayout
