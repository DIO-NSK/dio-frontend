import {FullwidthMainCardType} from "@/types/cards";
import {Side} from "@/data/enums/side";
import {ContentCol} from "@/components/organisms/cards/fullwidth-main-card/content-col/ContentCol";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const wrapperCV : ClassValue[] = [
    "md:grid md:grid-cols-12 md:gap-[40px] xl:gap-[60px] md:items-center",
    "flex flex-col gap-7"
]

const FullwidthMainCard = ({card}: { card: FullwidthMainCardType }) => (
    <>
        <section className={"hidden md:flex w-full"}>
            {
                card.side === Side.LEFT ? <div className={cn(wrapperCV)}>
                    <ContentCol card={card}/>
                    <ContentImage image={card.image}/>
                </div> : <div className={cn(wrapperCV)}>
                    <ContentImage image={card.image}/>
                    <ContentCol card={card}/>
                </div>
            }
        </section>
        <section className={"md:hidden flex flex-col gap-5 w-full"}>
            <ContentImage image={card.image}/>
            <ContentCol card={card}/>
        </section>
    </>
)

export default FullwidthMainCard
