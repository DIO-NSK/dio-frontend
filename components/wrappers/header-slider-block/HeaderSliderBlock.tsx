"use client"

import React, {useState} from 'react';
import ButtonSlider from "@/components/moleculas/sliders/button-slider/ButtonSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const HeaderSliderBlock = ({header, cards}: {
    header: string,
    cards: ProductCard[],
}) => {

    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(4)

    const handleStartIndex = (newIndex: number): void => {
        if (newIndex >= 0) {
            setStartIndex(newIndex)
            setEndIndex(endIndex - 1)
        }
    }

    const handleEndIndex = (newIndex: number): void => {
        if (newIndex <= cards.length) {
            setEndIndex(newIndex)
            setStartIndex(startIndex + 1)
        }
    }

    const wrapperCV : ClassValue[] = [
        "px-[100px] py-[30px] bg-bg-light-blue border-b-2 border-light-gray",
        "grid grid-cols-12 gap-x-[20px] gap-y-[30px]"
    ]

    return (
        <div className={cn(wrapperCV)}>

            <div className={"col-span-full flex flex-row items-center justify-between"}>
                <Text className={"text-[24px] font-semibold leading-none"} text={header}/>
                <ButtonSlider
                    onBackClick={() => handleStartIndex(startIndex - 1)}
                    onNextClick={() => handleEndIndex(endIndex + 1)}
                />
            </div>

            {
                cards.slice(startIndex, endIndex).map((card) => {
                    return <ProductCard productCard={card} />
                })
            }

        </div>
    )
}

export default HeaderSliderBlock
