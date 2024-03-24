"use client"

import ProductPhotoSlider from "@/components/moleculas/sliders/product-photo-slider/ProductPhotoSlider";
import React, {useEffect, useState} from "react";
import CharacteristicList from "@/components/moleculas/lists/characteristic-list/CharacteristicList";
import DescriptionCol from "@/components/moleculas/cols/description-col/DescriptionCol";
import ProductPriceCard from "@/components/organisms/cards/product-price-card/ProductPriceCard";
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {mockCardArray} from "@/data/productCardData";
import CatalogHeaderCol from "@/components/moleculas/cols/catalog-header-col/CatalogHeaderCol";
import {TextLink} from "@/types/dto/text";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import Text from "@/components/atoms/text/text-base/Text";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import BuyButton from "@/components/mobile/moleculas/buy-button/BuyButton";
import {useToggle} from "@/utlis/hooks/useToggle";
import MobilePhotoGalleryPopup from "@/components/mobile/popups/photo-gallery-popup/MobilePhotoGalleryPopup";
import {useUnit} from "effector-react";
import {
    $product,
    $productInformationIsDone,
    getProductEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/model";
import {useLike} from "@/utlis/hooks/product/useLike";
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";

const MobileHeaderRow = ({product} : {product : ResponseProduct}) => {

    const discountPrice = product?.price - product?.price * 0.01 * product?.discountPercent
    const newPrice = product.discountPercent === 0 ? product.price : discountPrice

    const [isLiked, toggleLike] = useLike(product.id)
    const [isInCart, onBuyClick] = useBuyButton(product.name, product.id)

    return (
        <div className={"sm:hidden flex flex-col gap-1 px-5"}>
            <Text text={product.name} className={"text-[20px] font-semibold"}/>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center gap-3"}>
                    <Text
                        text={`${newPrice.toFixed(2)} ₽`}
                        className={"text-[20px] font-medium text-link-blue"}
                    />
                    {
                        product.discountPercent === 0 && <Text
                            className={"text-base text-text-gray line-through"}
                            text={`${product.price.toFixed(2)} ₽`}
                        />
                    }
                </div>
                <div className={"flex flex-row items-center gap-3"}>
                    <LikeButton isLiked={isLiked} toggleLike={toggleLike}/>
                    <BuyButton isInCart={isInCart} onClick={onBuyClick}/>
                </div>
            </div>
        </div>
    )

}

const ProductCardPage = ({params}: { params: { productId: number } }) => {

    const [product, productIsDone, getProduct]
        = useUnit([$product, $productInformationIsDone, getProductEvent])

    const popupToggle = useToggle()

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Каталог", link: "/catalog"},
        {text: "Кулеры", link: "/catalog/coolers"},
        {text: "HotFrost", link: "/catalog/coolers/hot-frost"},
    ]

    const [
        activePhoto,
        setActivePhoto
    ] = useState<string | undefined>(product?.photos[0] ?? undefined)

    useEffect(() => {
        getProduct(params.productId)
    }, [])

    if (product && productIsDone) return (
        <section className={"w-full flex flex-col"}>
            {
                popupToggle.state && <MobilePhotoGalleryPopup
                    onClose={popupToggle.toggleState}
                />
            }
            <CatalogHeaderCol
                text={"Кулеры"}
                amount={mockCardArray.length}
                breadcrumbs={breadcrumbs}
            />

            <InnerPageWrapper classNames={{mobileWrapper: "px-0"}}>

                <div onClick={popupToggle.toggleState}>
                    <MobilePhotoSlider/>
                </div>

                <MobileHeaderRow product={product}/>

                <ProductPhotoSlider
                    setActive={(photo) => setActivePhoto(photo)}
                    activePhoto={activePhoto}
                    photos={product.photos}
                />

                <div className={"col-span-4 flex flex-col gap-5 px-5 sm:px-0"}>
                    <CharacteristicList characteristics={product.properties}/>
                    <DescriptionCol text={product.description}/>
                </div>

                <ProductPriceCard product={product}/>

                <div className={"col-span-9 h-[1px] mx-5 sm:mx-0 bg-light-gray"}/>

                <HeaderBlock header={"Описание товара"}>
                    <DescriptionCol text={product.description}/>
                </HeaderBlock>

                <HeaderBlock header={"Характеристики товара"}>
                    <CharacteristicList characteristics={product.properties}/>
                </HeaderBlock>

            </InnerPageWrapper>
        </section>
    )

}

export default ProductCardPage
