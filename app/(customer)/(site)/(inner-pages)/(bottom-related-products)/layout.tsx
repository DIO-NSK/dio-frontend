import React from 'react';
import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";

const BottomRelatedProductsLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className={"w-full flex flex-col gap-5 sm:col-span-full sm:gap-[40px]"}>
            {children}
            <HeaderSliderBlock header={"Вам может понравиться"}/>
        </div>
    )
}

export default BottomRelatedProductsLayout;
