'use client'

import React, {useEffect} from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import {useUnit} from "effector-react";
import {$userOurWaters, getUserOurWatersEvent} from "@/app/(customer)/(site)/model";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";

const wrapperCV = [
    "sm:mx-0 flex flex-col gap-5 sm:col-span-full sm:grid sm:grid-cols-12",
    "sm:gap-x-5 sm:gap-y-10 md:pb-10 xl:pb-[50px]"
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
                className={"px-5 sm:px-0 w-full text-[22px] sm:col-span-6 md:text-[28px] sm:text-[32px] font-semibold text-link-blue"}
            />
            <Text
                className={"px-5 sm:px-0 w-full text-[16px] sm:col-start-8 sm:col-span-5 xl:text-[18px] text-black"}
                text={"Для удобства пользования 19-литровыми бутылями предлагается" +
                    " специальное оборудование: кулеры и помпы различных моделей"}
            />
            <div className={"hidden col-span-full sm:grid grid-cols-12 md:gap-5 lg:gap-10"}>
                {waters.slice(0,12).map((waterCard, key) => {
                    return <WaterCard className='md:col-span-4 lg:col-span-3' waterCard={waterCard} key={key}/>
                })}
            </div>
            <MobileHeaderWrapper>
                {waters.slice(0,12).map((waterCard, key) => {
                    return <WaterCard key={key} waterCard={waterCard}/>
                })}
            </MobileHeaderWrapper>
        </div>
    )

}

export default ThirdBlock;
