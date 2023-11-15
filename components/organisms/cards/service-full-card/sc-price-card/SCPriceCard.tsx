"use client"

import React from 'react';
import style from "./SCPriceCard.module.css"
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";

const SCPriceCard = ({price, text, onClick}: {
    price: number,
    text: string,
    onClick : () => void
}) => {
    return (
        <div className={style.card}>

            <div className={style.priceRow}>
                <Text2XL text={`от ${price} ₽`} color={COLOR["link-blue"]}/>
                <TextBase text={"в мес."} color={COLOR["text-gray"]}/>
            </div>

            <div className={style.buttonRow}>
                <Button
                    text={text} onClick={onClick}
                    color={COLOR["light-gray"]}
                />
                <LikeButton/>
            </div>

        </div>
    )
}

export default SCPriceCard
