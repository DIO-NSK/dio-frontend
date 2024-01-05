import style from "./AdvantageCard.module.css"
import {IconHeaderCard} from "@/types/cards";
import Image from "next/image";
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
        "col-span-3 p-[30px] rounded-xl bg-bg-light-blue flex",
        "flex-col gap-[15px] hoverable pointer", classNames?.wrapper
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Image
                src={card.icon} alt={'/'}
                className={"w-[30px] h-[30px] object-fill"} width={40}
                height={40} quality={100}
            />
            <Text
                text={card.header}
                className={cn("text-black text-base", classNames?.text)}
            />
        </div>
    )
}

export default AdvantageCard
