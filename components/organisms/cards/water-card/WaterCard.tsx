import style from "./WaterCard.module.css"

import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import {FiChevronRight} from "react-icons/fi";
import {TextLink} from "@/types/links";

export type WaterCardDTO = {
    image: string | StaticImport,
    textLink : TextLink
}

type WaterCardType = {
    waterCard: WaterCardDTO
}

const WaterCard = ({waterCard}: WaterCardType) => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Image
                    src={waterCard.image}
                    className={style.image}
                    quality={100}
                    alt={'/'}
                />
            </div>
            <div
                className={style.headerRow}
                onClick={() => console.log(waterCard.textLink.path)}
            >
                <TextLg text={waterCard.textLink.text}/>
                <FiChevronRight
                    className={"stroke-link-blue"}
                    size={"24px"}
                />
            </div>
        </div>
    )
}

export default WaterCard
