import React, {useEffect} from 'react';
import {WaterCardDTO} from "@/types/cards";
import Water19LImage from "@/public/images/static/water-19l.png";
import Water5LImage from "@/public/images/static/water-5l.png";
import Water1LImage from "@/public/images/static/water-1l.png";
import Water05LImage from "@/public/images/static/water-05l.png";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import {useUnit} from "effector-react";
import {$userOurWaters, getUserOurWatersEvent} from "@/app/(customer)/(site)/model";

const wrapperCV = [
    "mx-5 sm:mx-0 flex flex-col gap-5 sm:col-span-full sm:grid sm:grid-cols-12",
    "sm:gap-x-5 sm:gap-y-10 pb-5 sm:pb-[50px] border-b-2 border-light-gray"
]

const ThirdBlock = () => {

    const [waters, getWaters] = useUnit([$userOurWaters, getUserOurWatersEvent])

    useEffect(() => {
        getWaters()
    }, [])

    return (
        <div className={cn(wrapperCV)}>
            <Text
                text={"Большой выбор продукции"}
                className={"w-full text-[22px] sm:col-span-6 sm:text-[32px] font-semibold text-link-blue"}
            />
            <Text
                className={"w-full text-[16px] sm:col-start-8 sm:col-span-5 sm:text-[18px] text-black"}
                text={"Для удобства пользования 19-литровыми бутылями предлагается" +
                    "специальное оборудование: кулеры и помпы различных моделей"}
            />
            <div className={"hidden col-span-full sm:grid grid-cols-12 gap-x-10"}>
                {waters.map((waterCard, key) => {
                    return <WaterCard waterCard={waterCard} key={key}/>
                })}
            </div>
            <MobileHeaderWrapper classNames={{
                contentWrapper: "w-[300vw] flex flex-row gap-3",
                mainWrapper: "-mt-5"
            }}>
                {waters.map((waterCard, key) => {
                    return <WaterCard key={key} className={"w-[100vw]"} waterCard={waterCard}/>
                })}
            </MobileHeaderWrapper>
        </div>
    )

}

export default ThirdBlock;
