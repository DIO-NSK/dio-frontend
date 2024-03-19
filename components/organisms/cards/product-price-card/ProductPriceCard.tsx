"use client"

import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import React, {useState} from "react";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import {useUnit} from "effector-react";
import {$product} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/model";
import {$addToCartError, addToCartEvent} from "@/components/organisms/cards/product-price-card/model";

const ProductPriceCard = () => {

    const [isLiked, setLiked] = useState<boolean>(false)
    const toggleLike = () => setLiked(prev => !prev)

    const [product, addToCart, addToCartError] = useUnit(
        [$product, addToCartEvent, $addToCartError]
    )

    if (product) return (
        <StickyCardWrapper startCol={"col-start-10"}>

            <div className={"w-full flex flex-row items-baseline gap-[10px]"}>
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

            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                <Button text={"В корзину"} onClick={() => addToCart(product?.id)}/>
                <LikeButton isLiked={isLiked} toggleLike={toggleLike}/>
            </div>

        </StickyCardWrapper>
    )
}

export default ProductPriceCard
