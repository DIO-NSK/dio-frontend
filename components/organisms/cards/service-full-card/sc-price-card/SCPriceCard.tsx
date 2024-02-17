"use client"

import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";

const SCPriceCard = ({price, text, onClick}: {
    price: number,
    text: string,
    onClick : () => void
}) => {
    return (
        <div className={"sm:col-span-3 flex flex-row items-center justify-between sm:flex-col sm:gap-5 h-fit"}>

            <div className={"w-full flex flex-col sm:flex-row sm:gap-[10px] sm:items-baseline"}>
                <Text text={`от ${price} ₽`} className={"text-[20px] sm:text-[24px] font-semibold text-link-blue"}/>
                <Text text={"в мес."} className={"text-text-gray"}/>
            </div>

            <div className={"w-full flex flex-row-reverse sm:flex-row items-center gap-5 h-fit"}>
                <Button
                    classNames={{button : "px-7 sm:px-[50px]"}}
                    text={text} onClick={onClick}
                    buttonType={"SECONDARY"}
                />
                <LikeButton/>
            </div>

        </div>
    )
}

export default SCPriceCard
