import {FiChevronRight} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";
import Link from "next/link";

type WaterCardType = {
    waterCard: ResponseOurWater,
    className?: string
}

const WaterCard = ({waterCard, className}: WaterCardType) => {
    return (
        <Link
            className={cn("sm:w-full sm:col-span-3 flex flex-col gap-3 sm:gap-5 group cursor-pointer", className)}
            href={waterCard.filterCharacteristic}
        >
            <div
                className={"flex items-center justify-center w-full h-[150px] sm:h-[300px] rounded-xl bg-bg-light-blue"}>
                <img
                    src={waterCard.image}
                    className={"p-3 sm:p-10 w-full h-full object-scale-down select-none"}
                    alt={waterCard.name}
                />
            </div>
            <div className={"flex flex-row gap-[10px] items-center"}>
                <Text
                    className={"text-[16px] sm:text-[18px] text-black pointer hoverable group-hover:text-link-blue"}
                    text={waterCard.name}
                />
                <FiChevronRight
                    className={"stroke-link-blue h-[18px] w-[18px] sm:h-6 sm:w-6"}
                />
            </div>
        </Link>
    )
}

export default WaterCard
