import React from 'react';
import style from "../InnerPages.module.css"
import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";
import {mockCardArray} from "@/data/productCardData";

const InnerLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div style={{padding: "0 100px 0 100px"}} className={style.innerLayout}>
            {children}
        </div>
    )
}

const BottomRelatedProductsLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className={"col-span-full flex flex-col gap-[40px]"}>
            <BottomRelatedProductsLayout.InnerLayout children={children}/>
            <HeaderSliderBlock header={"Новинки"} cards={mockCardArray} />
        </div>
    )
}

BottomRelatedProductsLayout.InnerLayout = InnerLayout

export default BottomRelatedProductsLayout;
