import {FullwidthMainCardType} from "@/types/cards";

export const ContentCol = ({card}: { card: FullwidthMainCardType }) => (
    <div className={"w-full sm:col-span-6 flex flex-col gap-5 md:gap-6 xl:gap-7"}>
        <div className={"w-full flex flex-row items-center gap-5 md:gap-6 xl:gap-7"}>
            <img
                className={"w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-fill"}
                src={card.icon} alt={'Иконка'}
            />
            <h2 className={"text-[18px] font-semibold md:text-[24px] xl:text-[32px] md:font-semibold"}>{card.header}</h2>
        </div>
        <p className={"text-base md:text-lg xl:text-[20px] xl:font-medium"}>{card.descr}</p>
    </div>
)
