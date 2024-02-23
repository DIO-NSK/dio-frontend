import React from "react";
import Link from "next/link";
import {HeaderLinkWrapperType} from "@/types/wrappers";
import Text from "@/components/atoms/text/text-base/Text";

const HeaderGroup = ({header, children, textLink = null}: HeaderLinkWrapperType) => {
    return (
        <div className={"w-full px-5 sm:mx-0 sm:col-span-full flex flex-col gap-5 sm:gap-7"}>
            <div className={"w-full flex flex-row justify-between items-baseline"}>
                {
                    header && <Text
                        className={"sm:text-[32px] text-[20px] w-full font-semibold"}
                        text={header}
                    />
                }
                {
                    textLink && <Link href={textLink.path}>
                        <Text text={textLink.text} className={"sm:text-[20px] text-link-blue text-[14px]"}/>
                    </Link>
                }
            </div>
            <div className={"w-full flex flex-col gap-3 sm:grid-cols-12 sm:grid sm:gap-5"}>
                {children}
            </div>
        </div>
    )
}

export default HeaderGroup
