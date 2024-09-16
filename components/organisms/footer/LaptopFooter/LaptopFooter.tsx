import {footerData} from "@/data/footerData";
import Link from "next/link";
import Text from "@/components/atoms/text/text-base/Text";
import {useUnit} from "effector-react";
import {toggleCallRequestOpenEvent} from "@/components/organisms/popups/call-request/model";
import {IconRow} from "@/components/organisms/footer/IconRow/IconRow";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import React from "react";

const wrapperCV: ClassValue[] = [
    "w-full flex flex-row justify-between items-start",
    "pb-[50px] border-b-2 border-light-gray"
]

const LeftRow = () => (
    <div className={"flex flex-row lg:gap-8 xl:gap-[90px]"}>
        {
            Array.from({length: 4}).map((_, colIndex) => (
                <div className={"flex flex-col gap-[25px]"} key={colIndex}>
                    {
                        footerData.map((item, itemIndex) => (
                            (itemIndex >= colIndex * 4 && itemIndex < colIndex * 4 + 4) && (
                                <div className={"flex flex-row item-center gap-[15px]"} key={itemIndex}>
                                    {
                                        item.icon ? <img
                                            className={"stroke-text-gray object-scale-down w-5 h-5"}
                                            src={item.icon as string} alt={'/'}
                                        /> : null
                                    }
                                    <Link
                                        href={item.href ?? item.path}
                                        rel={item.href ? "noopener noreferer" : undefined}
                                        target={item.href ? "_blank" : undefined}
                                    >
                                        <Text
                                            className={"hoverable pointer text-text-gray hover:text-link-blue"}
                                            text={item.text}
                                        />
                                    </Link>
                                </div>
                            )
                        ))
                    }
                </div>
            ))
        }
    </div>
)

const RightCol = () => {

    const togglePopupState = useUnit(toggleCallRequestOpenEvent)

    return (
        <div className={"flex flex-col gap-[25px]"}>
            <IconRow/>
            <Link href={"tel:+733339900"}>
                <Text
                    className={"text-link-blue hoverable hover:text-blue-800 pointer"}
                    text={"+7 (383) 333-99-00"}
                />
            </Link>
            <Text
                text={"Заказать звонок"}
                className={"text-link-blue hoverable hover:text-blue-800 pointer"}
                onClick={togglePopupState}
            />
        </div>
    )
}

const BottomRow = () => {
    return (
        <div className={"flex flex-row items-baseline justify-between"}>
            <Text
                text={"Разработка сайта — SiberSite"}
                className={"text-text-gray"}
            />
        </div>
    )
}

const TopCol = () => (
    <div className={cn(wrapperCV)}>
        <LeftRow/>
        <RightCol/>
    </div>
)

export const LaptopFooter = () => (
    <section className={"w-full hidden sm:flex flex-col lg:gap-8 xl:gap-[50px]"}>
        <TopCol/>
        <BottomRow/>
    </section>
)