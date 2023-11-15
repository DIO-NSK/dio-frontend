"use client"

import {mockServiceCardArray} from "@/data/serviceCardData";
import ServiceCard from "@/components/wrappers/service-card/ServiceCard";

const Page = () => {
    return (
        <div className={"col-span-9 flex flex-col gap-[20px] mb-[30px]"}>
            {
                mockServiceCardArray.map((serviceCard) => {
                    return <ServiceCard serviceCard={serviceCard} />
                })
            }
        </div>
    )
}

export default Page
