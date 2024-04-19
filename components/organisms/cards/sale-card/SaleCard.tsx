import {ImageHeaderDescrCard} from "@/types/cards";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const SaleCard = ({saleCard}: {saleCard : ImageHeaderDescrCard}) => {

    const wrapperCV : ClassValue[] = [
        "relative w-full flex flex-row p-7 sm:p-[40px] items-center justify-between",
        "col-span-4 h-[120px] sm:h-[200px] rounded-xl bg-light-gray overflow-clip"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <img
                className={"absolute z-0 -right-7 bottom-0 h-full object-fill"}
                src={saleCard.image}
                alt={'/'}
            />
            <div className={"z-10 flex flex-col gap-1 sm:gap-[10px]"}>
                <Text
                    className={"text-base sm:text-[24px] font-semibold uppercase text-link-blue"}
                    text={saleCard.header}
                />
                <Text
                    className={"w-[40vw] sm:w-full text-base sm:text-[20px] font-semibold"}
                    text={saleCard.descr}
                />
            </div>
        </div>
    )
}

export default SaleCard
