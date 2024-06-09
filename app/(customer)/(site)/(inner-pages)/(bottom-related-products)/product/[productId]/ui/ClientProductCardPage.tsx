'use client';

import React, {useEffect} from 'react';
import {useToggle} from "@/utlis/hooks/useToggle";
import Loading from "@/components/mobile/loading/Loading";
import MobilePhotoGalleryPopup from "@/components/mobile/popups/photo-gallery-popup/MobilePhotoGalleryPopup";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import MobileHeaderRow from "./MobileHeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import Chip from "@/components/atoms/chip/Chip";
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
                <div className={"px-5 w-full sm:px-0 sm:col-span-full flex flex-col gap-2 -mb-7"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                    <div className={"flex flex-col gap-4 sm:gap-3"}>
                        <Text text={product.name} className={"text-2xl hidden sm:flex font-medium"}/>
                        <div className={"flex flex-row items-center gap-3"}>
                            {
                                product.discountPercent !== 0 && <Chip className={"bg-green-500"}>
                                    <Text
                                        className={"text-xs sm:text-sm uppercase text-white font-medium"}
                                        text={`Скидка ${product.discountPercent}%`}
                                    />
                                </Chip>
                            }
                            {
                                !product.inStock && <Chip className={"bg-gray-100"}>
                                    <Text
                                        className={"text-xs sm:text-sm uppercase text-text-gray"}
                                        text={"Нет в наличии"}
                                    />
                                </Chip>
                            }
                        </div>
                    </div>
                </div>

                <div onClick={popupToggle.toggleState}>
                    <MobilePhotoSlider photos={product?.photos.map((photo) => ({image: photo}))}/>
                </div>

                <MobileHeaderRow product={product}/>

                <div className={'col-span-full grid grid-cols-12 gap-7'}>
                    <div className={'col-span-9 grid grid-cols-9 gap-7'}>
                        <ProductPhotoSlider photos={product.photos}/>
                        <div className={"col-span-4 flex flex-col gap-5 px-5 sm:px-0"}>
                            <CharacteristicList characteristics={[...product.properties, ...product.extraProperties]}/>
                        </div>
                        <div className={"hidden sm:flex sm:col-span-9 sm:h-[2px] sm:bg-light-gray"}/>
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
        </section>
    )

};

export default ClientProductCardPage;
