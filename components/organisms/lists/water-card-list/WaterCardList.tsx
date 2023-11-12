import style from "./WaterCardList.module.css"
import WaterCard, {WaterCardDTO} from "@/components/organisms/cards/water-card/WaterCard";

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
