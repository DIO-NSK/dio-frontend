'use client';

import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {useLike} from "@/utlis/hooks/product/useLike";
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import Text from "@/components/atoms/text/text-base/Text";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import BuyButton from "@/components/mobile/moleculas/buy-button/BuyButton";
import React from "react";
import ProductChips
    from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/ui/ProductChips";

const MobileHeaderRow = ({product}: {
    product: ResponseProduct
}) => {

    const [price, newPrice] = useDiscount(product.price, product.discountPercent)

    const [isLiked, toggleLike] = useLike(product.inFavourites, product.id)
    const [isInCart, onBuyClick] = useBuyButton(product.inCart, product.id)

    return (
        <div className={"sm:hidden flex flex-col gap-1 px-5"}>
            <div className={"flex flex-col gap-3"}>
                <ProductChips product={product} className={'sm:hidden'}/>
                <Text text={product.name} className={"text-[20px] font-semibold"}/>
            </div>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center gap-3"}>
                    <Text
                        text={`${newPrice.toFixed(2)} ₽`}
                        className={"text-[20px] font-medium text-link-blue"}
                    />
                    {product.discountPercent !== 0 && <Text
                        className={"text-base text-text-gray line-through"}
                        text={`${price.toFixed(2)} ₽`}
                    />}
                </div>
                <div className={"flex flex-row items-center gap-3"}>
                    <LikeButton isLiked={isLiked} toggleLike={toggleLike}/>
                    <BuyButton className={'bg-link-blue text-white'} isInCart={isInCart} onClick={onBuyClick}/>
                </div>
            </div>
        </div>
    )

}

export default MobileHeaderRow;