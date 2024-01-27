import React from 'react';
import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";
import {mockCardArray} from "@/data/productCardData";

const BottomRelatedProductsLayout = ({children}: {
    children: React.ReactNode
}) => {

    return (
        <div className={"col-span-full flex flex-col gap-[40px]"}>
            {children}
            <HeaderSliderBlock header={"Вам может понравиться"} cards={mockCardArray}/>
        </div>
    )
}

export default BottomRelatedProductsLayout;
