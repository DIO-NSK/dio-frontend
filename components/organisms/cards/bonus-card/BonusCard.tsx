import {ImageHeaderDescrCard} from "@/types/cards";
import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const BonusCard = ({bonusCard}: { bonusCard: ImageHeaderDescrCard }) => {

    const wrapperCV : ClassValue[] = [
        "w-full sm:col-span-6 sm:max-h-[180px] flex flex-row p-6 sm:p-[40px]",
        "sm:gap-[40px] rounded-xl bg-bg-light-blue"
    ]

    const circleCV : ClassValue[] = [
        "hidden w-[90px] h-[90px] rounded-full bg-light-gray sm:flex",
        "items-center justify-center flex-shrink-0"
    ]

    return (
        <div className={cn(wrapperCV)}>

            <div className={cn(circleCV)}>
                <img
                    src={bonusCard.image} alt={'/'}
                    className={"w-[40px] h-[40px] object-fill"}
                />
            </div>

            <div className={"flex flex-col gap-2 sm:gap-[15px]"}>
                <Text text={bonusCard.header} className={"text-[16px] sm:text-[24px] font-semibold text-link-blue"}/>
                <Text text={bonusCard.descr} className={"text-[14px] sm:text-[20px] font-medium"}/>
            </div>

        </div>
    )
}

export default BonusCard
