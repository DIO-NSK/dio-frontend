"use client"

import style from "../InnerPages.module.css"
import ProductPhotoSlider from "@/components/moleculas/product-photo-slider/ProductPhotoSlider";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {useState} from "react";

import MockProductImage1 from "../../../public/images/prodcut-card/product-image-1.png"
import MockProductImage2 from "../../../public/images/prodcut-card/product-image-2.png"
import MockProductImage3 from "../../../public/images/prodcut-card/product-image-3.png"
import MockProductImage4 from "../../../public/images/prodcut-card/product-image-4.png"

const ProductCardPage = () => {

    const mockPhotos = [
        MockProductImage1.src,
        MockProductImage2.src,
        MockProductImage3.src,
        MockProductImage4.src,
        MockProductImage1.src,
        MockProductImage2.src,
        MockProductImage3.src,
        MockProductImage4.src,
    ]

    const [activePhoto, setActivePhoto] = useState<string | StaticImport>(mockPhotos[0])

    return (
        <div className={style.content}>
            <ProductPhotoSlider
                photos={mockPhotos}
                activePhoto={activePhoto}
                setActive={(photo) => setActivePhoto(photo)}
            />
        </div>
    )
}

export default ProductCardPage
