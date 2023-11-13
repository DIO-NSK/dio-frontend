import style from "./AdvantageCard.module.css"
import {IconHeaderCard} from "@/types/cards";
import Image from "next/image";
import React from "react";
import TextLg from "@/components/atoms/text/text-lg/TextLg";

const AdvantageCard = ({card}: { card: IconHeaderCard }) => {
    return (
        <div className={style.wrapper}>
            <Image src={card.icon} alt={'/'}
                   className={style.icon} width={40}
                   height={40} quality={100}
            />
            <TextLg text={card.header} />
        </div>
    )
}

export default AdvantageCard
