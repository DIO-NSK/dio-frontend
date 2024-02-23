"use client"

import SCHeaderDescrCol from "@/components/organisms/cards/service-full-card/sc-header-descr-col/SCHeaderDescrCol";
import SCContentCol from "@/components/organisms/cards/service-full-card/sc-content-col/SCContentCol";
import SCPriceCard from "@/components/organisms/cards/service-full-card/sc-price-card/SCPriceCard";
import {mockServiceCardArray} from "@/data/serviceCardData";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import SCSettingsBlock from "@/components/organisms/blocks/sc-settings-block/SCSettingsBlock";

const ServicePage = ({params} : {
    params : {
        serviceId : number
    }
}) => {

    const card = mockServiceCardArray[+params.serviceId]

    return (
        <div className={"w-full flex flex-col gap-7 sm:grid sm:col-span-9 sm:grid-cols-9 sm:gap-x-[40px]"}>

            <div className={"w-full sm:col-span-6 flex flex-col gap-5"}>

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
