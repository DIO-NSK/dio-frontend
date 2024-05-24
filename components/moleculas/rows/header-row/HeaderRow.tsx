import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/navigation";
import {ClassValue} from "clsx";

export type HeaderRowProps = {
    header: string,
    leftContent?: string | React.ReactNode,
    rightContent?: React.ReactNode,
    hasBackIcon?: boolean,
    onBackClick ?: () => void,
    className?: string,
    headerCN ?: string,
    theme?: "default" | "bordered"
}

const HeaderRow = ({hasBackIcon = false, theme = "default", ...props}: HeaderRowProps) => {

    const router = useRouter()
    const handleBackClick = () => props.onBackClick ? props.onBackClick() : router.back()

    const wrapperCV: ClassValue[] = [
        "w-full sm:col-span-full flex flex-row items-center justify-between",
        {"sm:px-7 pb-7 border-b-2 border-light-gray": theme == "bordered"},
        props.className,
    ]

    return (
        <div className={cn(wrapperCV)}>
            <div className={"flex flex-row items-center gap-4"}>
                <div className={"flex flex-row items-center gap-3"}>
                    {
                        hasBackIcon && <FiArrowLeft
                            size={"20px"}
                            className={"pointer gray-text"}
                            onClick={handleBackClick}
                        />
                    }
                    <Text
                        text={props.header}
                        className={cn("text-[20px] sm:text-[24px] font-medium", props.headerCN)}
                    />
                </div>
                {
                    typeof props.leftContent == "string"
                        ? <Text text={props.leftContent} className={"text-[14px] sm:text-base text-text-gray"}/>
                        : props.leftContent
                }
            </div>
            {props.rightContent}
        </div>
    );
};

export default HeaderRow;
