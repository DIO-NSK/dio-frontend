"use client"

import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import LinesEllipsis from "react-lines-ellipsis";
import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {ResponseShortSale} from "@/app/admin/sales/model";

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
                <Text text={header} className={"text-lg font-semibold"}/>
                <LinesEllipsis
                    className={"w-full"}
                    text={description} maxLine='3'
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
    card: ResponseShortSale
}) => {

    const router = useRouter()

    const wrapperCV: ClassValue[] = [
        "col-span-6 bg-white p-[20px] rounded-xl flex flex-row gap-[20px]",
        "sm:hover:z-10 border-2 border-light-gray sm:hover:shadow-lg sm:hover:shadow-gray-200/50 sm:hover:scale-[1.01] sm:hoverable pointer"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <img
                className={"w-[180px] h-fit rounded-xl object-cover"}
                src={card.image} alt={'/'}
            />
            <div className={"w-full flex flex-col gap-[10px]"}>
                <SaleFullCard.TopRow
                    info={card.discount === 100 ? "Бесплатно" : `Скидка ${card.discount}%`}
                    duration={card.deadline!!}
                />
                <SaleFullCard.MainCol
                    onClick={() => router.push(`/sales/${card.id}`)}
                    description={card.description!!}
                    header={card.name}
                />
            </div>
        </div>
    )
}

SaleFullCard.MainCol = MainCol
SaleFullCard.TopRow = TopRow

export default SaleFullCard
