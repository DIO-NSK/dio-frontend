"use client"

import style from "./ServicePage.module.css"
import SCHeaderDescrCol from "@/components/organisms/cards/service-full-card/sc-header-descr-col/SCHeaderDescrCol";
import SCContentCol from "@/components/organisms/cards/service-full-card/sc-content-col/SCContentCol";
import SCPriceCard from "@/components/organisms/cards/service-full-card/sc-price-card/SCPriceCard";
import {useSearchParams} from "next/navigation";
import {mockServiceCardArray} from "@/data/serviceCardData";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import ServiceBlockWrapper from "@/components/wrappers/service-block-wrapper/ServiceBlockWrapper";
import DropdownInput from "@/components/atoms/inputs/dropdown-input/DropdownInput";
import {SelectedItem} from "@/types/select";
import {useState} from "react";
import SCSettingsBlock from "@/components/organisms/blocks/sc-settings-block/SCSettingsBlock";

const ServicePage = () => {

    const params = useSearchParams()
    const serviceId: string | null = params.get('service_id')

    if (serviceId === null) {
        return (
            <div>
                Не можем найти такой товар :(
            </div>
        )
    }

    const card = mockServiceCardArray[+serviceId]

    return (
        <div className={style.wrapper}>

            <div className={style.content}>

                <SCHeaderDescrCol header={card.header} descr={card.descr}/>
                <SCContentCol rentTime={card.rentTime} additional={card.additional}/>
                <SCSettingsBlock />

            </div>

            <StickyCardWrapper startCol={"col-start-7"}>
                <SCPriceCard
                    price={card.price} text={"В корзину"}
                    onClick={() => console.log("В корзине")}
                />
            </StickyCardWrapper>

        </div>
    )

}

export default ServicePage
