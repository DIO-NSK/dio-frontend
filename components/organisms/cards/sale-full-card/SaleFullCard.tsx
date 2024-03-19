"use client"

import {SaleCardDTO} from "@/types/cards";
import Text from "@/components/atoms/text/text-base/Text";
import Image from "next/image";
import Button from "@/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import LinesEllipsis from "react-lines-ellipsis";
import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const TopRow = ({info, duration}: {
    info: string,
    duration: string
}) => {
    return (
        <div className={"w-full flex flex-row gap-[10px] items-baseline"}>
            <Text text={info} className={"text-link-blue"}/>
            <Text text={`до ${duration}`} className={"text-text-gray"}/>
        </div>
    )
}

const MainCol = ({header, description, onClick}: {
    header: string,
    description: string,
    onClick: () => void
}) => {
    return (
        <div className={"w-full flex flex-col gap-[20px]"}>

            <div className={"w-full flex flex-col gap-[10px]"}>
                <Text text={header} className={"text-lg font-semibold"} />
                <LinesEllipsis
                    text={description} maxLine='2'
                    ellipsis='..' trimRight
                    basedOn='letters'
                />
            </div>

            <div className={"w-[200px]"}>
                <Button
                    buttonType={"SECONDARY"}
                    text={"Подробнее"}
                    onClick={onClick}
                />
            </div>

        </div>
    )
}

const SaleFullCard = ({card}: {
    card: SaleCardDTO
}) => {

    const router = useRouter()

    const wrapperCV : ClassValue[] = [
        "col-span-6 bg-white p-[20px] rounded-xl flex flex-row gap-[20px]",
        "hover:drop-shadow-lg pointer hoverable"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Image
                className={"h-full w-[200px] rounded-xl object-scale-down"}
                src={card.image} alt={'/'}
                width={200} height={200}
                quality={100}
            />
            <div className={"w-full flex flex-col gap-[10px]"}>

                <SaleFullCard.TopRow
                    info={"БЕСПЛАТНО"}
                    duration={card.duration}
                />

                <SaleFullCard.MainCol
                    description={card.descr} header={card.header}
                    onClick={() => router.push('/')}
                />

            </div>
        </div>
    )
}

SaleFullCard.MainCol = MainCol
SaleFullCard.TopRow = TopRow

export default SaleFullCard
