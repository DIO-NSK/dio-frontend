import React from 'react';
import {IconHeaderCard} from "@/types/cards";
import CrownIcon from "@/public/icons/crown-icon.png";
import WaterIcon from "@/public/icons/water-icon.png";
import SettingsIcon from "@/public/icons/settings-icon.png";
import {cn} from "@/utlis/cn";
import AdvantageCard from "@/components/organisms/cards/advantage-card/AdvantageCard";
import {ClassValue} from "clsx";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import {CrossIcon, DropletIcon, WavesIcon} from "lucide-react";

const FourthBlock = () => {

    const cardData: IconHeaderCard[] = [
        {icon: <WavesIcon size={28}/>, header: "Поддерживает водно-солевой баланс минеральных и органических веществ"},
        {icon: <DropletIcon size={28}/>, header: "При кипячении не теряет своих свойств, так как не оставляет накипи"},
        {icon: <CrossIcon size={28}/>, header: "Оптимальная для сибиряков. Обогащена кальцием, магнием и калием"},
    ]

    const wrapperCV: ClassValue[] = [
        "hidden py-5 md:-ml-[24px] lg:-ml-[90px] xl:-ml-[100px] sm:w-screen sm:pt-[50px] bg-light-gray w-full",
        "md:px-[24px] sm:px-[90px] xl:px-[100px]",
        "sm:grid sm:grid-cols-12 sm:gap-x-5 sm:gap-y-10 sm:pb-[50px] border-b-2 border-light-gray"
    ]

    const cardWrapperCV = [
        "border-2 border-white hover:bg-bg-light-blue",
        "hover:border-blue-200 w-full sm:col-span-4 bg-white"
    ]

    return (
        <div className={"w-full relative sm:col-span-full"}>
            <div className={cn(wrapperCV)}>
                {
                    cardData.map((item) => <AdvantageCard
                        classNames={{
                            wrapper: cn(cardWrapperCV),
                            text: "font-medium"
                        }}
                        card={item}
                    />)
                }
            </div>
            <MobileHeaderWrapper classNames={{
                mainWrapper: "bg-light-gray pb-5",
                contentWrapper: "flex flex-row gap-3 w-full"
            }}>
                {
                    cardData.map((item) => <AdvantageCard
                        classNames={{wrapper: cn(cardWrapperCV), text: "font-medium"}}
                        card={item}
                    />)
                }
            </MobileHeaderWrapper>
        </div>
    )

}

export default FourthBlock;
