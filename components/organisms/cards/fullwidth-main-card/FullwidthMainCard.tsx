import {FullwidthMainCardType} from "@/types/cards";
import {Side} from "@/data/enums/side";
import {ContentCol} from "@/components/organisms/cards/fullwidth-main-card/content-col/ContentCol";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const FullwidthMainCard = ({card}: {
    card: FullwidthMainCardType
}) => {

    const wrapperCV : ClassValue[] = [
        "sm:grid sm:grid-cols-12 sm:gap-[60px] sm:items-center",
        "flex flex-col gap-7"
    ]

    return (
        <>
            <div className={"hidden sm:flex w-full"}>
                {
                    card.side === Side.LEFT ? <div className={cn(wrapperCV)}>
                        <ContentCol card={card}/>
                        <ContentImage image={card.image}/>
                    </div> : <div className={cn(wrapperCV)}>
                        <ContentImage image={card.image}/>
                        <ContentCol card={card}/>
                    </div>
                }
            </div>
            <div className={"sm:hidden flex flex-col gap-5 w-full"}>
                <ContentImage image={card.image}/>
                <ContentCol card={card}/>
            </div>
        </>
    )
}

export default FullwidthMainCard
