import style from "./ContentImage.module.css"
import Image from "next/image"
import {FullwidthMainCardType} from "@/types/cards";

export const ContentImage = ({card}: { card: FullwidthMainCardType }) => {
    return (
        <Image src={card.image} alt={'/'}
               className={style.image} width={500}
               height={300} quality={100}
        />
    )
}
