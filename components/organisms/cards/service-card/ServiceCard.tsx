import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {TextLink} from "@/types/dto/text";
import Link from "next/link";
import React from "react";

type ServiceCardProps = {
    item: TextLink & { icon: React.ReactNode }
}

const wrapperCV: ClassValue[] = [
    "sm:hover:bg-white sm:hover:border-[2px] sm:hover:border-light-gray cursor-pointer",
    "w-full col-span-4 flex flex-col p-5 sm:p-[40px] rounded-xl border-2 border-light-gray bg-bg-light-blue"
]

const ServiceCard = ({item}: ServiceCardProps) => (
    <Link className={cn(wrapperCV)} href={`/services?type=${item.link}`}>
        <div className={"w-full flex flex-row items-center sm:items-start sm:flex-col gap-5 sm:gap-4"}>
            {item.icon}
            <p className={"text-[15px] sm:text-[20px] font-semibold break-words"}>{item.text}</p>
        </div>
    </Link>
)

export default ServiceCard
