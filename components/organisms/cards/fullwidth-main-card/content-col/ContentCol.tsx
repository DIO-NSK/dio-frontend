import {FullwidthMainCardType} from "@/types/cards";

export const ContentCol = ({card}: { card: FullwidthMainCardType }) => (
    <div className={"w-full sm:col-span-6 flex flex-col gap-5 sm:gap-7"}>
        <div className={"w-full flex flex-row items-center gap-5 sm:gap-7"}>
            <img
                className={"w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-fill"}
                src={card.icon} alt={'Иконка'}
            />
            <h2 className={"text-[18px] font-semibold sm:text-[32px] sm:font-bold"}>{card.header}</h2>
        </div>
        <p className={"text-base sm:text-[20px] sm:font-medium"}>{card.descr}</p>
    </div>
)
