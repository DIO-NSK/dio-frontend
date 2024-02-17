"use client"

import ProductPhotoSlider from "@/components/moleculas/sliders/product-photo-slider/ProductPhotoSlider";
import React, {useState} from "react";

import MockProductImage1 from "../../../../../../public/images/prodcut-card/product-image-1.png"
import MockProductImage2 from "../../../../../../public/images/prodcut-card/product-image-2.png"
import MockProductImage3 from "../../../../../../public/images/prodcut-card/product-image-3.png"
import MockProductImage4 from "../../../../../../public/images/prodcut-card/product-image-4.png"
import CharacteristicList from "@/components/moleculas/lists/characteristic-list/CharacteristicList";
import {ProductCharacteristic} from "@/types/product";
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
import Button from "@/components/atoms/buttons/button/Button";

const ProductCardPage = () => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Каталог", link: "/catalog"},
        {text: "Кулеры", link: "/catalog/coolers"},
        {text: "HotFrost", link: "/catalog/coolers/hot-frost"},
    ]

    const mockPhotos = [
        MockProductImage1.src, MockProductImage2.src,
        MockProductImage3.src, MockProductImage4.src,
        MockProductImage1.src, MockProductImage2.src,
        MockProductImage3.src, MockProductImage4.src,
    ]

    const [activePhoto, setActivePhoto] = useState<string>(mockPhotos[0])

    const mockCharacteristics: ProductCharacteristic[] = [
        {name: "Размер коробки ш*в*г (мм)", value: "318*382*318"},
        {name: "Вес (брутто)", value: "2,40 кг"},
        {name: "Вес (нетто)", value: "1,40 кг"},
        {name: "Страна производства", value: "Китай"},
    ]

    const mockCardDescription = "Кулер HotFrost D95 F обладает высокими показателями стабильности" +
        "и длительности в работе. При создании его корпуса был использован очень прочный пластик." +
        "Кулер может подавать воду двух температур: практически кипяток (+90-95°С), который вы" +
        "будете использовать для заваривания горячих напитков, и вода комнатной температуры" +
        "для питья ее в первозданном виде."

    const popupToggle = useToggle()
    const handleAddProductClick = () => console.log("Product added!")

    return (
        <>

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

            <Button
                onClick={handleAddProductClick}
                text={"Добавить в корзину"}
                classNames={{button : "sm:hidden fixed z-10 w-[90vw] bottom-7 mx-5"}}
            />

            <InnerPageWrapper classNames={{mobileWrapper: "px-0"}}>

                <div onClick={popupToggle.toggleState}>
                    <MobilePhotoSlider/>
                </div>

                <div className={"sm:hidden flex flex-col gap-1 px-5"}>
                    <Text text={"Кулер Ecotronic M30-LXE"} className={"text-[20px] font-semibold"}/>
                    <div className={"w-full flex flex-row items-center justify-between"}>
                        <div className={"flex flex-row items-center gap-3"}>
                            <Text text={"4700 ₽"} className={"text-[20px] font-medium text-link-blue"}/>
                            <Text text={"5200 ₽"} className={"text-base text-text-gray"}/>
                        </div>
                        <div className={"flex flex-row items-center gap-3"}>
                            <LikeButton/>
                            <BuyButton/>
                        </div>
                    </div>
                </div>

                <ProductPhotoSlider
                    setActive={(photo) => setActivePhoto(photo)}
                    activePhoto={activePhoto}
                    photos={mockPhotos}
                />

                <div className={"col-span-4 flex flex-col gap-5 px-5 sm:px-0"}>
                    <CharacteristicList characteristics={mockCharacteristics}/>
                    <DescriptionCol text={mockCardDescription}/>
                </div>

                <ProductPriceCard price={4700} oldPrice={5200}/>

                <div className={"col-span-9 h-[1px] mx-5 sm:mx-0 bg-light-gray"}/>

                <HeaderBlock header={"Описание товара"}>
                    <DescriptionCol text={mockCardDescription}/>
                </HeaderBlock>

                <HeaderBlock header={"Характеристики товара"}>
                    <CharacteristicList characteristics={mockCharacteristics}/>
                </HeaderBlock>

            </InnerPageWrapper>
        </>
    )
}

export default ProductCardPage
