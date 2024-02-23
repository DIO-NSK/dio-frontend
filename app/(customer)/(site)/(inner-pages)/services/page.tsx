"use client"

import {mockServiceCardArray} from "@/data/serviceCardData";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import React, {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";

const ServiceCatalogScreen = () => {

    const selectedItems : SelectItem<string>[] = [
        {name : "Все услуги", value : "all"},
        {name : "Подписка на воду «DIO»", value : "subscribe"},
        {name : "Аренда кулеров и пурифаеров", value : "rent"},
        {name : "Бесплатное пользование кулеров", value : "free_use"},
        {name : "Ремонт кулеров, пурифайеров", value : "fixing"},
    ]

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectedItems[0])

    return (
        <>
            <SelectInput
                className={"sm:hidden"}
                selectedItem={activeSelectItem}
                onSelect={setActiveSelectItem}
                items={selectedItems}
            />
            <div className={"w-full sm:col-span-9 flex flex-col gap-5 mb-7"}>
                {
                    mockServiceCardArray.map((card) => {
                        return <ServiceFullCard card={card} />
                    })
                }
            </div>
        </>
    )

}

export default ServiceCatalogScreen
