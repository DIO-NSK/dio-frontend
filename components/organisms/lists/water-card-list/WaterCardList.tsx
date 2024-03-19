import style from "./WaterCardList.module.css"
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import {WaterCardDTO} from "@/types/cards";

type WaterCardListTypes = {
    waterCardList : WaterCardDTO[]
}

const WaterCardList = ({waterCardList} : WaterCardListTypes) => {
    return (
        <div className={style.wrapper}>
            {
                waterCardList.map((waterCard) => {
                    return <WaterCard waterCard={waterCard} />
                })
            }
        </div>
    )
}

export default WaterCardList
