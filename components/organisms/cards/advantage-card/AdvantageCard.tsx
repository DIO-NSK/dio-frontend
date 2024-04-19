import {IconHeaderCard} from "@/types/cards";
import React from "react";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";

type AdvantageCardClassnames = {
    wrapper?: string,
    text?: string
}

const AdvantageCard = ({card, classNames}: {
    card: IconHeaderCard,
    classNames?: AdvantageCardClassnames
}) => {

    const wrapperCV: ClassValue[] = [
        "sm:col-span-3 col-span-1 sm:p-[30px] p-6 rounded-xl bg-bg-light-blue flex",
        "hover:bg-transparent border-2 border-light-gray group",
        "flex-col gap-3 sm:gap-[15px] hoverable pointer", classNames?.wrapper
    ]

    const iconWrapperCV : ClassValue[] = [
        "text-link-blue group-hover:bg-blue-100",
        "w-fit p-2 rounded-lg hoverable"
    ]

    const textCV = [
        "group-hover:text-link-blue text-black sm:leading-none",
        "sm:text-lg text-[14px] font-medium", classNames?.text
    ]

    return (
        <div className={cn(wrapperCV)}>
            <div className={cn(iconWrapperCV)}>
                {card.icon}
            </div>
            <Text className={cn(textCV)} text={card.header}/>
        </div>
    )

}

export default AdvantageCard
