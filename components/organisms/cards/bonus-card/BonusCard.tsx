import style from "./BonusCard.module.css"
import {ImageHeaderDescrCard} from "@/types/cards";
import React from "react";
import Image from "next/image";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";
import TextLg from "@/components/atoms/text/text-lg/TextLg";

const BonusCard = ({bonusCard}: { bonusCard: ImageHeaderDescrCard }) => {
    return (
        <div className={style.wrapper}>

            <div className={style.circle}>
                <Image
                    src={bonusCard.image} alt={'/'}
                    className={style.image} width={60}
                    height={60} quality={100}
                />
            </div>

            <div className={style.textCol}>
                <Text2XL text={bonusCard.header} color={COLOR["link-blue"]} />
                <TextLg text={bonusCard.descr} />
            </div>

        </div>
    )
}

export default BonusCard
