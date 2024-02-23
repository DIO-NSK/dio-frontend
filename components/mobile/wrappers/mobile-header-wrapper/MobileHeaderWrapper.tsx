import React from 'react';
import {HeaderWrapperProps} from "@/types/props/Wrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useRouter} from "next/navigation";
import {cn} from "@/utlis/cn";

const MobileHeaderWrapper = (props: HeaderWrapperProps) => {

    const router = useRouter()
    const handleButtonClick = () => props.textLink && router.push(props.textLink.link)

    return (
        <section className={cn("w-full flex flex-col gap-5 sm:hidden", props.classNames?.mainWrapper)}>
            <div className={"px-5 w-full flex flex-row items-baseline justify-between"}>
                {
                    props.header && <Text
                        text={props.header}
                        className={"text-[20px] font-semibold"}
                    />
                }
                {
                    props.textLink && <TextButton
                        className={"text-[14px]"}
                        onClick={handleButtonClick}
                        text={props.textLink.text}
                    />
                }
            </div>
            <section className={"w-full overflow-x-scroll -pr-5"}>
                <div className={cn("w-[120vw] grid grid-cols-3 gap-3 px-5", props.classNames?.contentWrapper)}>
                    {props.children}
                </div>
            </section>
        </section>
    );

};

export default MobileHeaderWrapper;
