import React from 'react';
import {HeaderWrapperProps} from "@/types/props/Wrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useRouter} from "next/navigation";
import {cn} from "@/utlis/cn";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";

const MobileHeaderWrapper = (props: HeaderWrapperProps) => {

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
            <MobileSliderWrapper>
                {props.children}
            </MobileSliderWrapper>
        </section>
    );

};

export default MobileHeaderWrapper;
