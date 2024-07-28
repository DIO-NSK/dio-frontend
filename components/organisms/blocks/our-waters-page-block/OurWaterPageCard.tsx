import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import Link from "next/link";
import Text from "@/components/atoms/text/text-base/Text";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";

type OurWaterPageCardProps = {
    ourWater: ResponseOurWater
}

const wrapperCV: ClassValue[] = [
    "w-full sm:col-span-4 h-fit flex flex-col items-center justify-center gap-4 p-5 bg-bg-light-blue",
    "sm:gap-7 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-lg sm:hover:shadow-gray-200/50",
    "sm:hover:scale-[1.01] sm:hoverable pointer border-2 border-light-gray group",
]

const OurWaterPageCard = ({ourWater}: OurWaterPageCardProps) => (
    <Link
        href={`/our-waters/category/${ourWater.id}`}
        className={cn(wrapperCV)}
    >
        <img
            className={'w-[100px] h-[100px] rounded-xl object-scale-down'}
            alt={ourWater.name} src={ourWater.image}
        />
        <Text text={ourWater.name} className={'text-link-blue group-hover:text-blue-500'}/>
    </Link>
);

export default OurWaterPageCard;