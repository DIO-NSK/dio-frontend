"use client"

import CardBulletCol from "@/components/moleculas/cols/card-bullet-col/CardBulletCol";
import {useUnit} from "effector-react";
import {
    $saleDetails,
    getSaleDetailsEvent,
    resetSaleDetailsEvent
} from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/model";
import React, {useEffect, useState} from "react";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";
import ProductPhotoSlider from "@/components/moleculas/sliders/product-photo-slider/ProductPhotoSlider";
import {cn} from "@/utlis/cn";
import Loading from "@/components/mobile/loading/Loading";

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95]"
    ])
}

const SalePriceCard = () => {

    const saleDetails = useUnit($saleDetails)
    const totalProducts = saleDetails?.products.reduce((acc, item) => acc + (item as any).quantity, 0)

    const handleAddToCart = () => console.log("Added to cart")

    return (
        <StickyCardWrapper startCol={"col-start-10"}>
            <div className={"w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray"}>
                <Text text={"Товаров в акции"}/>
                <Text text={`${totalProducts} шт.`}/>
            </div>
            <div className={"w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray"}>
                <Text text={"Итого"}/>
                <Text text={`${(saleDetails as any).price} ₽`} className={"text-link-blue font-medium text-xl"}/>
            </div>
            <Button
                buttonType={'SECONDARY'}
                text={'Добавить в корзину'}
                onClick={handleAddToCart}
            />
        </StickyCardWrapper>
    )

}

const SalePage = ({params}: {
    params: {
        saleId: number
    }
}) => {

    const resetSaleDetails = useUnit(resetSaleDetailsEvent)
    const [saleDetails, getSaleDetails] = useUnit([$saleDetails, getSaleDetailsEvent])
    const [activePhoto, setActivePhoto] = useState<string>()

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Акции", link: "/sales"},
        {text: saleDetails?.name ?? "", link: `/sales/${params.saleId}`},
    ]

    useEffect(() => {
        resetSaleDetails()
        getSaleDetails(params.saleId)
    }, []);

    if (!saleDetails) {
        return (
            <Loading/>
        )
    }

    if (saleDetails) return (
        <div className={"col-span-full flex flex-col gap-7"}>
            <div
                style={{padding: "0 100px 0 100px"}}
                className={"col-span-full grid grid-cols-12 gap-x-[20px] gap-y-[30px]"}
            >
                <section className={"col-span-full flex flex-col gap-2"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                    <Text text={saleDetails.name} className={"text-2xl font-medium"}/>
                </section>
                <div className={"col-span-9 flex flex-col gap-7"}>
                    <ProductPhotoSlider
                        setActive={setActivePhoto}
                        activePhoto={activePhoto}
                        photos={saleDetails.images}
                    />
                    <div className={"w-full flex flex-col gap-2"}>
                        <Text text={"Описание"} className={"text-xl font-medium"}/>
                        <Text text={saleDetails.description}/>
                    </div>
                    <CardBulletCol
                        header={"Для участия в акции"}
                        items={saleDetails.ruleList}
                    />
                </div>
                <SalePriceCard/>
            </div>
            <div className={"w-full py-7 px-[100px] border-y-2 border-light-gray"}>
                <SliderGroup headerSize={'sm'} header={"Товары, участвующие в акции"}>
                    {saleDetails.products.map((product, index) => (
                        <ProductCard classNames={productCardCV} productCard={product} key={index}/>
                    ))}
                </SliderGroup>
            </div>
        </div>
    );
};

export default SalePage;
