"use client"

import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import React from "react";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import {FiCheck} from "react-icons/fi";
import {useLike} from "@/utlis/hooks/product/useLike";
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";

const ProductPriceCard = ({product}: { product: ResponseProduct }) => {

    const [isLiked, toggleLike] = useLike(product.inFavourites, product.id)
    const [isInCart, onBuyClick] = useBuyButton(product.inCart, product.id)

    const discountPrice = product?.price - product?.price * 0.01 * product?.discountPercent
    const newPrice = product.discountPercent === 0 ? product.price : discountPrice

    return (
        <StickyCardWrapper startCol={"col-start-10"}>

            <div className={"w-full flex flex-row items-baseline gap-[10px]"}>
                <Text
                    text={`${newPrice} ₽`}
                    className={"text-[24px] font-semibold text-link-blue"}
                />
                {
                    product.discountPercent !== 0 && <Text
                        text={`${product.price.toFixed(2)} ₽`}
                        className={"text-text-gray line-through"}
                    />
                }
            </div>

            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                <Button
                    icon={isInCart && <FiCheck className={"stroke-[3px]"}/>}
                    text={isInCart ? "В корзине" : "В корзину"}
                    buttonType={isInCart ? "PRIMARY" : "SECONDARY"}
                    onClick={onBuyClick}
                />
                <LikeButton
                    isLiked={isLiked}
                    toggleLike={toggleLike}
                />
            </div>

        </StickyCardWrapper>
    )

}

export default ProductPriceCard
