import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {TextLink} from "@/types/dto/text";
import Link from "next/link";

type ServiceCardProps = {
    number: number,
    item: TextLink,
}

const ServiceCard = ({number, item}: ServiceCardProps) => {

    const wrapperCV: ClassValue[] = [
        "sm:hover:bg-white sm:hover:border-[2px] sm:hover:border-light-gray cursor-pointer",
        "w-full col-span-4 flex flex-col p-5 sm:p-[40px] rounded-xl border-2 border-light-gray bg-bg-light-blue"
    ]

    return (
        <Link className={cn(wrapperCV)} href={`/services?type=${item.link}`}>
            <div className={"w-full flex flex-row items-center sm:items-start sm:flex-col gap-5 sm:gap-[10px]"}>
                <Text
                    className={"text-[15px] sm:text-[24px] font-semibold text-link-blue"}
                    text={"0" + number.toString()}
                />
                <Text
                    className={"text-[15px] sm:text-[20px] font-semibold break-words"}
                    text={item.text}
                />
            </div>
        </Link>
    )
}

export default ServiceCard
