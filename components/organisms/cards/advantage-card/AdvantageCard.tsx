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
        "flex-col gap-3 sm:gap-[15px] hoverable pointer", classNames?.wrapper
    ]

    return (
        <div className={cn(wrapperCV)}>
            <img
                className={"w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] object-fill"}
                src={card.icon} alt={'/'}
            />
            <Text
                className={cn("text-black text-[14px] font-medium", classNames?.text)}
                text={card.header}
            />
        </div>
    )
}

export default AdvantageCard
