import {FiChevronRight} from "react-icons/fi";
import {WaterCardDTO} from "@/types/cards";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

type WaterCardType = {
    waterCard: WaterCardDTO,
    className ?: string
}

const WaterCard = ({waterCard, className}: WaterCardType) => {
    return (
        <div className={cn("sm:w-full sm:col-span-3 flex flex-col gap-3 sm:gap-5", className)}>
            <div className={"flex items-center justify-center w-full h-[150px] sm:h-[300px] rounded-xl bg-bg-light-blue"}>
                <img
                    src={waterCard.image}
                    className={"p-3 sm:p-10 w-full h-full object-scale-down"}
                    alt={'/'}
                />
            </div>
            <div
                className={"flex flex-row gap-[10px] items-center"}
                onClick={() => console.log(waterCard.textLink.link)}
            >
                <Text
                    className={"text-[16px] sm:text-[18px] text-black pointer hoverable hover:text-link-blue"}
                    text={waterCard.textLink.text}
                />
                <FiChevronRight
                    className={"stroke-link-blue h-[18px] w-[18px] sm:h-6 sm:w-6"}
                />
            </div>
        </div>
    )
}

export default WaterCard
