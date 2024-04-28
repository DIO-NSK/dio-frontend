import {FiChevronRight} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";
import {useRouter} from "next/navigation";

type WaterCardType = {
    waterCard: ResponseOurWater,
    className?: string
}

const WaterCard = ({waterCard, className}: WaterCardType) => {

    const router = useRouter()

    const handlePushToCatalog = () => {
        router.push(waterCard.filterCharacteristic)
    }

    return (
        <div className={cn("sm:w-full sm:col-span-3 flex flex-col gap-3 sm:gap-5", className)}>
            <div
                className={"flex items-center justify-center w-full h-[150px] sm:h-[300px] rounded-xl bg-bg-light-blue"}>
                <img
                    src={waterCard.image}
                    className={"p-3 sm:p-10 w-full h-full object-scale-down"}
                    alt={'/'}
                />
            </div>
            <div
                className={"flex flex-row gap-[10px] items-center cursor-pointer"}
                onClick={handlePushToCatalog}
            >
                <Text
                    className={"text-[16px] sm:text-[18px] text-black pointer hoverable hover:text-link-blue"}
                    text={waterCard.name}
                />
                <FiChevronRight
                    className={"stroke-link-blue h-[18px] w-[18px] sm:h-6 sm:w-6"}
                />
            </div>
        </div>
    )
}

export default WaterCard
