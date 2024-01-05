import React from 'react';
import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";
import {mockCardArray} from "@/data/productCardData";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import CatalogHeaderCol from "@/components/moleculas/cols/catalog-header-col/CatalogHeaderCol";
import {TextLink} from "@/types/dto/text";

const BottomRelatedProductsLayout = ({children}: {
    children: React.ReactNode
}) => {

    const breadcrumbs : TextLink[] = [
        {text : "Главная", link : "/"},
        {text : "Каталог", link : "/catalog"},
        {text : "Кулеры", link : "/catalog/coolers"},
        {text : "HotFrost", link : "/catalog/coolers/hot-frost"},
    ]

    return (
        <>
            <CatalogHeaderCol
                text={"Кулеры"}
                amount={mockCardArray.length}
                breadcrumbs={breadcrumbs}
            />
            <div className={"col-span-full flex flex-col gap-[40px]"}>
                <InnerPageWrapper>
                    {children}
                </InnerPageWrapper>
                <HeaderSliderBlock header={"Новинки"} cards={mockCardArray} />
            </div>
        </>
    )
}

export default BottomRelatedProductsLayout;
