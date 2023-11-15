"use client"

import style from "./SaleFullCard.module.css"
import {SaleCardDTO} from "@/types/cards";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";
import Image from "next/image";
import Button from "@/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import TextM from "@/components/atoms/text/text-m/TextM";
import LinesEllipsis from "react-lines-ellipsis";
import React from "react";

const TopRow = ({info, duration}: {
    info: string,
    duration: string
}) => {
    return (
        <div className={style.topRow}>
            <TextBase text={info} color={COLOR["link-blue"]}/>
            <TextBase text={`до ${duration}`} color={COLOR["text-gray"]}/>
        </div>
    )
}

const MainCol = ({header, descr, onClick}: {
    header: string,
    descr: string,
    onClick: () => void
}) => {
    return (
        <div className={style.headerButtonCol}>

            <div className={style.headerDescrCol}>
                <TextM text={header} weight={"semibold"} />
                <LinesEllipsis
                    text={descr} maxLine='2'
                    ellipsis='..' trimRight
                    basedOn='letters'
                />
            </div>

            <div className={"w-[200px]"}>
                <Button
                    text={"Подробнее"}
                    onClick={onClick}
                    color={COLOR["light-gray"]}
                />
            </div>

        </div>
    )
}

const SaleFullCard = ({card}: {
    card: SaleCardDTO
}) => {

    const router = useRouter()

    return (
        <div className={style.wrapper}>
            <Image
                className={style.image}
                src={card.image} alt={'/'}
                width={200} height={200}
                quality={100}
            />
            <div className={style.content}>

                <SaleFullCard.TopRow
                    info={"БЕСПЛАТНО"}
                    duration={card.duration}
                />

                <SaleFullCard.MainCol
                    descr={card.descr} header={card.header}
                    onClick={() => router.push('/')}
                />

            </div>
        </div>
    )
}

SaleFullCard.MainCol = MainCol
SaleFullCard.TopRow = TopRow

export default SaleFullCard
