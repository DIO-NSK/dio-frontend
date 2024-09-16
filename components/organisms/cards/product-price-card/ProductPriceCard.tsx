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
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const wrapperCN : ClassValue[] = [
    "md:col-start-9 md:col-span-4 xl:col-start-10 top-0",
    "md:p-0 md:shadow-none md:rounded-0 lg:shadow-xl lg:shadow-gray-200/50 lg:rounded-xl lg:p-7",
    "md:border-0 lg:border-2 lg:border-light-gray"
]

const ProductPriceCard = ({product}: { product: ResponseProduct }) => {

    const [isLiked, toggleLike] = useLike(product.inFavourites, product.id)
    const [isInCart, onBuyClick] = useBuyButton(product.inCart, product.id)
    const [price, newPrice] = useDiscount(product.price, product.discountPercent)

    return (
        <StickyCardWrapper startCol={cn(wrapperCN)}>

            <div className={"w-full flex flex-row items-baseline gap-[10px]"}>
                <Text
                    text={`${newPrice.toFixed(2)} ₽`}
                    className={"text-[24px] font-semibold text-link-blue"}
                />
                {product.discountPercent !== 0 && <Text
                        text={`${price.toFixed(2)} ₽`}
                        className={"text-text-gray line-through"}
                    />}
            </div>

            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                <Button
                    classNames={{button : 'md:w-[calc(100%-20px)]'}}
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
