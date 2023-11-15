"use client"

import style from "../../InnerPages.module.css"
import ProductPhotoSlider from "@/components/moleculas/product-photo-slider/ProductPhotoSlider";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import React, {useState} from "react";

import MockProductImage1 from "../../../../public/images/prodcut-card/product-image-1.png"
import MockProductImage2 from "../../../../public/images/prodcut-card/product-image-2.png"
import MockProductImage3 from "../../../../public/images/prodcut-card/product-image-3.png"
import MockProductImage4 from "../../../../public/images/prodcut-card/product-image-4.png"
import CharacteristicList from "@/components/moleculas/characteristic-list/CharacteristicList";
import {ProductCharacteristic} from "@/types/product";
import DescriptionCol from "@/components/moleculas/description-col/DescriptionCol";
import ProductPriceCard from "@/components/organisms/cards/product-price-card/ProductPriceCard";
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
const ProductCardPage = () => {

    const mockPhotos = [
        MockProductImage1.src, MockProductImage2.src,
        MockProductImage3.src, MockProductImage4.src,
        MockProductImage1.src, MockProductImage2.src,
        MockProductImage3.src, MockProductImage4.src,
    ]

    const [activePhoto, setActivePhoto] = useState<string | StaticImport>(mockPhotos[0])

    const mockCharacteristics : ProductCharacteristic[] = [
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

    return (
        <div className={style.innerLayout}>
            
            <ProductPhotoSlider
                photos={mockPhotos}
                activePhoto={activePhoto}
                setActive={(photo) => setActivePhoto(photo)}
            />
            
            <div className={"col-span-4 flex flex-col gap-[20px]"}>
                <CharacteristicList characteristics={mockCharacteristics} />
                <DescriptionCol text={mockCardDescription} />
            </div>

            <ProductPriceCard price={4700} oldPrice={5200} />

            <div className={"col-span-9 h-[1px] bg-light-gray"} />

            <HeaderBlock header={"Описание товара"}>
                <DescriptionCol text={mockCardDescription} />
            </HeaderBlock>

            <HeaderBlock header={"Характеристики товара"}>
                <CharacteristicList characteristics={mockCharacteristics} />
            </HeaderBlock>
            
        </div>
    )
}

export default ProductCardPage
