import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/navigation";

type HeaderRowProps = {
    header: string,
    leftContent ?: string | React.ReactNode,
    rightContent ?: React.ReactNode,
    hasBackIcon ?: boolean,
    className ?: string
}

const HeaderRow = ({hasBackIcon = false, ...props} : HeaderRowProps) => {

    const router = useRouter()
    const handleBackClick = () => router.back()

    return (
        <div className={cn("col-span-full flex flex-row items-center justify-between", props.className)}>
            <div className={"flex flex-row items-baseline gap-3"}>
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
                        className={"text-[24px] font-medium"}
                    />
                </div>
                {
                    typeof props.leftContent == "string"
                        ? <Text text={props.leftContent} className={"text-base text-text-gray"}/>
                        : props.leftContent
                }
            </div>
            {props.rightContent}
        </div>
    );
};

export default HeaderRow;
