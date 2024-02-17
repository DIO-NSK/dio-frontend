import {FullwidthMainCardType} from "@/types/cards";
import Text from "@/components/atoms/text/text-base/Text";

export const ContentCol = ({card}: { card: FullwidthMainCardType }) => {
    return (
        <div className={"w-full sm:col-span-6 flex flex-col gap-5 sm:gap-7"}>
            <div className={"w-full flex flex-row items-center gap-5 sm:gap-7"}>
                <img
                    className={"w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-fill"}
                    src={card.icon} alt={'/'}
                />
                <Text text={card.header} className={"text-[18px] font-semibold sm:text-[32px] sm:font-bold"}/>
            </div>
            <Text text={card.descr} className={"text-base sm:text-[20px] sm:font-medium"}/>
        </div>
    )
}
