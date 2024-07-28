import {ImageHeaderDescrCard} from "@/types/cards";
import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const wrapperStyles : ClassValue[] = [
    "w-full sm:col-span-6 sm:max-h-[180px] flex flex-row p-6 sm:p-[40px]",
    "sm:gap-[40px] rounded-xl bg-bg-light-blue"
]

const circleStyles : ClassValue[] = [
    "hidden w-[90px] h-[90px] rounded-full bg-light-gray sm:flex",
    "items-center justify-center flex-shrink-0"
]

const BonusCard = ({bonusCard}: { bonusCard: ImageHeaderDescrCard }) => (
    <article className={cn(wrapperStyles)}>
        <div className={cn(circleStyles)}>
            <img
                className={"w-[40px] h-[40px] object-fill"}
                src={bonusCard.image} alt={'Иконка'}
            />
        </div>
        <div className={"flex flex-col gap-2 sm:gap-3"}>
            <h3 className={"text-[16px] sm:text-[24px] font-semibold text-link-blue"}>{bonusCard.header}</h3>
            <p className={"text-[14px] sm:text-lg font-medium"}>{bonusCard.descr}</p>
        </div>
    </article>
)

export default BonusCard
