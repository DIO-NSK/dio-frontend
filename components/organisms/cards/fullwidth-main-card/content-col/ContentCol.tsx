import {FullwidthMainCardType} from "@/types/cards";
import style from "./ContentCol.module.css"
import Image from "next/image";
import Title from "@/components/atoms/text/title/Title";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import TextLg from "@/components/atoms/text/text-lg/TextLg";

export const ContentCol = ({card}: { card: FullwidthMainCardType }) => {
    return (
        <div className={style.textCol}>
            <div className={style.iconHeaderRow}>
                <Image
                    src={card.icon} alt={'/'}
                    className={style.icon} width={80}
                    height={80} quality={100}
                />
                <Title text={card.header}/>
            </div>
            <TextLg text={card.descr}/>
        </div>
    )
}
