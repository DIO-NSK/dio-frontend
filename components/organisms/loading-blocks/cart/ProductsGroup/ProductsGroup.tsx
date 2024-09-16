import {HeaderGroupWrapper} from "@/components/organisms/loading-blocks/cart/HeaderGroupWrapper/HeaderGroupWrapper";
import {useUnit} from "effector-react";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {cn} from "@/utlis/cn";
import React from "react";

export const ProductsGroup = () => {
    const cart = useUnit($cart)

    return (
        <HeaderGroupWrapper header={'Продукты'} amount={cart?.products.length}>
            {cart?.products.map((product, productIndex, arr) =>
                <ShoppingCartProductCard
                    card={product} key={productIndex}
                    className={cn({
                        "md:pb-5 md:border-b-2 md:border-light-gray xl:pb-0 xl:border-b-0": productIndex !== arr.length - 1
                    })}
                />
            )}
        </HeaderGroupWrapper>
    )
}