"use client"

import {mockServiceCardArray} from "@/data/serviceCardData";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";

const ServiceCatalogScreen = () => {
    return (
        <div className={"w-full sm:col-span-9 flex flex-col gap-5 mb-7"}>
            {
                mockServiceCardArray.map((card) => {
                    return <ServiceFullCard card={card} />
                })
            }
        </div>
    )
}

export default ServiceCatalogScreen
