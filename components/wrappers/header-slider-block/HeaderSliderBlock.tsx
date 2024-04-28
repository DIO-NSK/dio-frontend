"use client"

import React, {useState} from 'react';
import ButtonSlider from "@/components/moleculas/sliders/button-slider/ButtonSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import Text from "@/components/atoms/text/text-base/Text";
import {mockCardArray} from "@/data/productCardData";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const HeaderSliderBlock = ({header}: {header : string}) => {

    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(4)

    const handleStartIndex = (newIndex: number): void => {
        if (newIndex >= 0) {
            setStartIndex(newIndex)
            setEndIndex(endIndex - 1)
        }
    }

    const handleEndIndex = (newIndex: number): void => {
        if (newIndex <= mockCardArray.length) {
            setEndIndex(newIndex)
            setStartIndex(startIndex + 1)
        }
    }

    const wrapperCV : ClassValue[] = [
        "sm:px-[100px] w-full flex flex-col gap-7 sm:gap-10 px-5",
        "py-7 bg-bg-light-blue border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>

            <div className={"w-full sm:col-span-full flex flex-row items-center justify-between"}>
                <Text className={"text-[20px] sm:text-[24px] font-semibold leading-none"} text={header}/>
                <ButtonSlider/>
            </div>

            <div className={"hidden w-full grid-cols-12 gap-x-[20px] gap-y-[30px] sm:grid"}>
                {
                    mockCardArray.slice(startIndex, endIndex).map((card) => {
                        return <ProductCard productCard={card} />
                    })
                }
            </div>

            <MobileSliderWrapper>
                {
                    mockCardArray.slice(startIndex, endIndex).map((card) => {
                        return <ProductCard productCard={card} />
                    })
                }
            </MobileSliderWrapper>

        </div>
    )
}

export default HeaderSliderBlock
