import React from 'react';
import {HeaderWrapperProps} from "@/types/props/Wrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useRouter} from "next/navigation";
import {cn} from "@/utlis/cn";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";

const MobileHeaderWrapper = ({canSlide = true, ...props}: HeaderWrapperProps) => {

    const router = useRouter()
    const handleButtonClick = () => props.textLink && router.push(props.textLink.link as string)

    return (
        <section className={cn("w-full flex flex-col gap-5 sm:hidden", props.classNames?.mainWrapper)}>
            <div className={"px-5 w-full flex flex-row items-baseline justify-between"}>
                {props.header && <Text
                    text={props.header}
                    className={"text-[20px] font-semibold"}
                />}
                {props.textLink && <TextButton
                    className={"text-[14px]"}
                    onClick={handleButtonClick}
                    text={props.textLink.text}
                />}
            </div>
            {
                canSlide ? <section className={"sm:hidden flex w-full ml-5"}>
                    <MobileSliderWrapper>{props.children}</MobileSliderWrapper>
                </section> : <section className={"w-full px-5 grid grid-cols-2 gap-2 pb-5"}>
                    {props.children}
                </section>
            }
        </section>
    );

};

export default MobileHeaderWrapper;
