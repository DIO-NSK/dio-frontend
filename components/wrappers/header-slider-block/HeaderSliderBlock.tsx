"use client"

import style from "./HeaderSliderBlock.module.css"

import React, {useState} from 'react';
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import ButtonSlider from "@/components/moleculas/sliders/button-slider/ButtonSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {ProductCardDTO} from "@/types/product";

const HeaderSliderBlock = ({header, cards}: {
    header: string,
    cards: ProductCardDTO[],
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

    return (
        <div className={style.wrapper}>

            <div className={style.headerRow}>
                <Text2XL text={header}/>
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
