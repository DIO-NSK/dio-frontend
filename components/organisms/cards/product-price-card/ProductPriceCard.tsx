"use client"

import style from "./ProductPriceCard.module.css"
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import React from "react";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import {useUnit} from "effector-react";
import {$product} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/model";

const ProductPriceCard = () => {

    const product = useUnit($product)

    if (product) return (
        <StickyCardWrapper startCol={"col-start-10"}>

            <div className={style.priceRow}>
                <Text
                    text={`${product.newPrice} ₽`}
                    className={"text-[24px] font-semibold text-link-blue"}
                />
                {
                    product.oldPrice > product.newPrice && <Text
                        text={`${product.oldPrice} ₽`}
                        className={"text-text-gray line-through"}
                    />
                }
            </div>

            <div className={style.buttonRow}>
                <Button
                    text={"В корзину"}
                    onClick={() => console.log("В корзину")}
                />
                <LikeButton/>
            </div>

        </StickyCardWrapper>
    )
}

export default ProductPriceCard
