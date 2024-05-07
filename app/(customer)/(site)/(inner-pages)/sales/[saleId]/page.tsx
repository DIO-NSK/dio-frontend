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
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import {FiCheck} from "react-icons/fi";
import {MobilePhotoSliderWrapper} from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95]"
    ])
}

const SalePriceCard = ({saleId} : {saleId : number}) => {

    const [isInCart, onBuyClick] = useBuyButton(false, saleId, true)

    const saleDetails = useUnit($saleDetails)
    const totalProducts = saleDetails?.products.reduce((acc, item) => acc + (item as any).quantity, 0)

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
                icon={isInCart && <FiCheck className={"stroke-[3px]"}/>}
                text={isInCart ? "В корзине" : "В корзину"}
                buttonType={isInCart ? "PRIMARY" : "SECONDARY"}
                onClick={onBuyClick}
            />
        </StickyCardWrapper>
    )

}

const SalePage = ({params}: {
    params: {
        saleId: number
    }
}) => {

    const [isInCart, onBuyClick] = useBuyButton(false, params.saleId, true)

    const resetSaleDetails = useUnit(resetSaleDetailsEvent)
    const [saleDetails, getSaleDetails] = useUnit([$saleDetails, getSaleDetailsEvent])

    const [activePhoto, setActivePhoto] = useState<string>()
    const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0)

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Акции", link: "/sales"},
        {text: saleDetails?.name ?? "", link: `/sales/${params.saleId}`},
    ]

    const totalProducts = saleDetails?.products.reduce((acc, item) => acc + (item as any).quantity, 0)

    const infoBlockData = [
        {header : "Товаров в акции", description : `${totalProducts} шт.`},
        {header : "Стоимость", description : (saleDetails as any)?.price, className : "text-link-blue font-medium text-lg"},
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
        <div className={"w-full sm:col-span-full flex flex-col gap-5 sm:gap-7"}>
            <div className={"sm:px-[100px] px-5 w-full sm:col-span-full sm:grid sm:grid-cols-12 sm:gap-x-5 sm:gap-y-7"}>
                <section className={"sm:col-span-full flex flex-col gap-2 -mt-5 sm:mt-0"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                    <Text text={saleDetails.name} className={"sm:text-2xl text-xl font-medium"}/>
                </section>
                <div className={"w-full sm:col-span-9 flex flex-col gap-7"}>
                    <ProductPhotoSlider
                        setActive={setActivePhoto}
                        activePhoto={activePhoto}
                        photos={saleDetails.images}
                    />
                    <MobilePhotoSliderWrapper
                        className={"mt-5 mb-0"}
                        activeIndex={activePhotoIndex}
                        onChange={setActivePhotoIndex}
                    >
                        {saleDetails.images.map((banner, key) =>
                            <img
                                src={banner} alt={'Изображение акции'}
                                className={"w-full h-[200px] object-cover"}
                                key={key}
                            />
                        )}
                    </MobilePhotoSliderWrapper>
                    <div className={"w-full flex flex-col gap-2"}>
                        <Text text={"Описание"} className={"sm:text-xl text-lg font-medium"}/>
                        <Text text={saleDetails.description} className={"w-full"}/>
                    </div>
                    <CardBulletCol
                        header={"Для участия в акции"}
                        items={saleDetails.ruleList}
                    />
                </div>
                <SalePriceCard saleId={params.saleId}/>
            </div>
            <div className={"w-full py-7 sm:px-[100px] border-y-2 border-light-gray"}>
                <SliderGroup headerSize={'sm'} header={"Товары, участвующие в акции"}>
                    {saleDetails.products.map((product, index) => (
                        <ProductCard classNames={productCardCV} productCard={product} key={index}/>
                    ))}
                </SliderGroup>
            </div>
            <div className={"w-full p-5"}>
                <MobileCartInfoBlock
                    infoBlockData={infoBlockData}
                    buttonText={isInCart ? "В корзине" : "В корзину"}
                    //@ts-ignore
                    onSubmit={onBuyClick}
                />
            </div>
        </div>
    );
};

export default SalePage;
