'use client';

import React, {useEffect} from 'react';
import {useToggle} from "@/utlis/hooks/useToggle";
import Loading from "@/components/mobile/loading/Loading";
import MobilePhotoGalleryPopup from "@/components/mobile/popups/photo-gallery-popup/MobilePhotoGalleryPopup";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import MobileHeaderRow from "./MobileHeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import ProductPhotoSlider from "@/components/moleculas/sliders/product-photo-slider/ProductPhotoSlider";
import CharacteristicList from "@/components/moleculas/lists/characteristic-list/CharacteristicList";
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
import DescriptionCol from "@/components/moleculas/cols/description-col/DescriptionCol";
import ProductPriceCard from "@/components/organisms/cards/product-price-card/ProductPriceCard";
import {
    $breadcrumbs,
    $product,
    getBreadcrumbsEvent,
    getProductEvent,
    productPageDidMountEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/model";
import {useUnit} from "effector-react";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import ProductChips
    from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/ui/ProductChips";
import MobileProductStickyButton from "@/components/atoms/buttons/MobileProductStickyButton";

const ClientProductCardPage = ({productId}: { productId: number }) => {

    const [breadcrumbs, getBreadcrumbs] = useUnit([$breadcrumbs, getBreadcrumbsEvent])
    const [pageDidMount, product, getProduct] = useUnit([productPageDidMountEvent, $product, getProductEvent])
    const popupToggle = useToggle()

    useEffect(() => {
        pageDidMount()
        getBreadcrumbs(productId)
        getProduct(productId)
    }, [])

    if (!product) return (
        <Loading/>
    )

    return (
        <section className={"w-full flex flex-col"}>

            {popupToggle.state && <MobilePhotoGalleryPopup
                photos={product.photos}
                onClose={popupToggle.toggleState}
            />}

            <InnerPageWrapper classNames={{mobileWrapper: "px-0 -mt-7"}}>
                <div className={"px-5 w-full sm:px-0 sm:col-span-full flex flex-col gap-3 sm:gap-2 -mb-7"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                    <div className={"flex flex-col gap-4 sm:gap-3"}>
                        <Text text={product.name} className={"text-2xl hidden sm:flex font-medium"}/>
                        <ProductChips product={product} className={'hidden sm:flex'}/>
                    </div>
                </div>
                <div onClick={popupToggle.toggleState}>
                    <MobilePhotoSlider
                        photos={product?.photos.map((photo) => ({image: photo}))}
                        className={"my-0"} showQuantity
                    />
                </div>
                <MobileHeaderRow product={product}/>
                <div className={'w-full col-span-full flex flex-col gap-7 sm:grid sm:grid-cols-12'}>
                    <div className={'w-full flex flex-col col-span-9 sm:grid sm:grid-cols-9 gap-7'}>
                        <ProductPhotoSlider photos={product.photos}/>
                        <div className={"w-full col-span-4 flex flex-col gap-5 px-5 sm:px-0"}>
                            <CharacteristicList characteristics={[...product.properties, ...product.extraProperties]}/>
                        </div>
                        <div className={"w-full hidden sm:flex sm:col-span-9 sm:h-[2px] sm:bg-light-gray"}/>
                        <HeaderBlock header={"Описание товара"}>
                            <DescriptionCol maxSymbols={500} text={product.description}/>
                        </HeaderBlock>
                        <HeaderBlock header={"Характеристики товара"}>
                            <CharacteristicList characteristics={[...product.properties, ...product.extraProperties]}/>
                        </HeaderBlock>
                    </div>
                    <ProductPriceCard product={product}/>
                </div>
            </InnerPageWrapper>
            <MobileProductStickyButton id={productId} item={product}/>
        </section>
    )

};

export default ClientProductCardPage;
