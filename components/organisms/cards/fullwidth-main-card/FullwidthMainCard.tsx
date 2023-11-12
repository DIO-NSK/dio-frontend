import style from "./FullwidthMainCard.module.css"
import {FullwidthMainCardType} from "@/types/cards";
import {Side} from "@/data/enums/side";
import {ContentCol} from "@/components/organisms/cards/fullwidth-main-card/content-col/ContentCol";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";

const FullwidthMainCard = ({card}: {
    card: FullwidthMainCardType
}) => {
    return (
        <>
            {
                card.side === Side.LEFT ? <div className={style.wrapper}>
                    <FullwidthMainCard.ContentCol card={card}/>
                    <FullwidthMainCard.ContentImage card={card}/>
                </div> : <div className={style.wrapper}>
                    <FullwidthMainCard.ContentImage card={card}/>
                    <FullwidthMainCard.ContentCol card={card}/>
                </div>
            }
        </>
    )
}

FullwidthMainCard.ContentCol = ContentCol
FullwidthMainCard.ContentImage = ContentImage

export default FullwidthMainCard
