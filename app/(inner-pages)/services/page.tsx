"use client"

import {mockServiceCardArray} from "@/data/serviceCardData";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";

const Page = () => {
    return (
        <div className={"col-span-9 flex flex-col gap-[20px] mb-[30px]"}>
            {
                mockServiceCardArray.map((card) => {
                    return <ServiceFullCard card={card} />
                })
            }
        </div>
    )
}

export default Page
