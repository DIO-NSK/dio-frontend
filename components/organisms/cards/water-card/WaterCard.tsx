import {FiChevronRight} from "react-icons/fi";
import {WaterCardDTO} from "@/types/cards";
import Text from "@/components/atoms/text/text-base/Text";

type WaterCardType = {
    waterCard: WaterCardDTO,
    className ?: string
}

const WaterCard = ({waterCard}: WaterCardType) => {
    return (
        <div className={"sm:w-full sm:col-span-3 flex flex-col sm:gap-[20px]"}>
            <div className={"flex items-center justify-center w-full h-[100px] sm:h-[300px] rounded-xl bg-bg-light-blue"}>
                <img
                    src={waterCard.image}
                    className={"p-3 sm:p-10 w-full h-full object-scale-down"}
                    alt={'/'}
                />
            </div>
            <div
                className={"hidden sm:flex flex-row gap-[10px] items-center"}
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
