import {HeaderGroupWrapper} from "@/components/organisms/loading-blocks/cart/HeaderGroupWrapper/HeaderGroupWrapper";
import {useUnit} from "effector-react";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import React from "react";
import ShoppingCartSaleCard from "@/components/organisms/cards/shopping-cart-sale-card/ShoppingCartSaleCard";
import {cn} from "@/utlis/cn";

export const SalesGroup = () => {
    const cart = useUnit($cart)

    return (
        <HeaderGroupWrapper header={'Акции'} amount={cart?.promos.length}>
            {cart?.promos.map((promo, promoIndex, arr) =>
                <ShoppingCartSaleCard
                    promo={promo} key={promoIndex}
                    className={cn({
                        "md:pb-5 md:border-b-2 md:border-light-gray xl:pb-0 xl:border-b-0": promoIndex !== arr.length - 1
                    })}
                />
            )}
        </HeaderGroupWrapper>
    )
}