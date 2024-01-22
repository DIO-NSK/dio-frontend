import style from "./WaterCard.module.css"
import {FiChevronRight} from "react-icons/fi";
import {WaterCardDTO} from "@/types/cards";
import Text from "@/components/atoms/text/text-base/Text";

type WaterCardType = {
    waterCard: WaterCardDTO,
    className ?: string
}

const WaterCard = ({waterCard}: WaterCardType) => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <img
                    src={waterCard.image}
                    className={style.image}
                    alt={'/'}
                />
            </div>
            <div
                className={style.headerRow}
                onClick={() => console.log(waterCard.textLink.link)}
            >
                <Text
                    className={"text-[18px] text-black pointer hoverable hover:text-link-blue"}
                    text={waterCard.textLink.text}
                />
                <FiChevronRight
                    className={"stroke-link-blue"}
                    size={"24px"}
                />
            </div>
        </div>
    )
}

export default WaterCard
