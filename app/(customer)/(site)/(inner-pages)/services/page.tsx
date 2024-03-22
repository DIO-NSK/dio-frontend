"use client"

import {mockServiceCardArray} from "@/data/serviceCardData";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import React, {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";

const ServiceCatalogScreen = () => {

    const selectedItems: SelectItem<string>[] = [
        {name: "Все услуги", value: "all"},
        {name: "Подписка на воду «DIO»", value: "subscribe"},
        {name: "Аренда кулеров и пурифаеров", value: "rent"},
        {name: "Бесплатное пользование кулеров", value: "free_use"},
        {name: "Ремонт кулеров, пурифайеров", value: "fixing"},
    ]

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectedItems[0])

    return (
        <React.Fragment>
            <SelectInput
                className={"sm:hidden"}
                selectedItem={activeSelectItem}
                onSelect={setActiveSelectItem}
                items={selectedItems}
            />
            <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
                {
                    mockServiceCardArray.map((card) => (
                        <ServiceFullCard card={card}/>
                    ))
                }
            </section>
        </React.Fragment>
    )

}

export default ServiceCatalogScreen
