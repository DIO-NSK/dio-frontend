import DIOLogo from "@/public/images/dio-logo.png"
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const BannerCard = () => {

    const wrapperCV : ClassValue = [
        "w-full col-span-4 flex flex-row gap-5 p-5 sm:p-[40px] rounded-xl",
        "border-2 border-light-gray bg-bg-light-blue",
        "sm:hover:bg-white sm:hover:border-2 sm:hover:border-light-gray cursor-pointer"
    ]

    return (
        <div
            className={cn(wrapperCV)}
            onClick={() => console.log("Все товары")}
        >
            <img
                className={"mt-1 sm:m-0 w-10 sm:w-[50px] h-10 sm:h-[50px] object-cover"}
                src={DIOLogo.src}
                alt={'/'}
            />
            <div className={"flex flex-col gap-1 sm:gap-[10px]"}>
                <Text
                    className={"sm:w-full max-w-[50vw] sm:text-[24px] font-semibold text-link-blue"}
                    text={`DIO — Вода из Сибири для сибиряков`}
                />
                <Text
                    className={"text-[15px] sm:text-[24px] text-text-gray"}
                    text={"Посмотреть все товары"}
                />
            </div>
        </div>
    )
}

export default BannerCard
