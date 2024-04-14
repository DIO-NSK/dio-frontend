import React from "react";
import ButtonSlider from "@/components/moleculas/sliders/button-slider/ButtonSlider";
import {HeaderWrapperType} from "@/types/wrappers";
import Text from "@/components/atoms/text/text-base/Text";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import {cn} from "@/utlis/cn";

const SliderGroup = ({header, children, className}: HeaderWrapperType) => {
    return (
        <div className={cn("sm:pl-0 w-full flex flex-col gap-5 sm:gap-7", className)}>

            <div className={"px-5 sm:px-0 col-span-full flex flex-row justify-between items-center"}>
                {
                    header && <Text
                        text={header}
                        className={"text-[20px] sm:text-[32px] font-bold leading-none"}
                    />
                }
                <ButtonSlider
                    onBackClick={() => console.log("Назад")}
                    onNextClick={() => console.log("Вперёд")}
                />
            </div>

            <div className={"hidden w-full sm:overflow-visible sm:grid-cols-12 sm:grid sm:gap-5"}>
                {children}
            </div>

            <MobileSliderWrapper>
                {children}
            </MobileSliderWrapper>

        </div>
    )
}

export default SliderGroup
