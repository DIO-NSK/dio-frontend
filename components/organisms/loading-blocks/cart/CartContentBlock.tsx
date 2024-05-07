import React from 'react';
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useUnit} from "effector-react";
import {cn} from "@/utlis/cn";
import ShoppingCartSaleCard from "@/components/organisms/cards/shopping-cart-sale-card/ShoppingCartSaleCard";
import Text from "@/components/atoms/text/text-base/Text";

const CartContentBlock = () => {

    const cart = useUnit($cart)

    const productsBlockCV = cart?.promos.length && "pb-7 border-b-2 border-light-gray"

    return (
        <section className={"w-full sm:col-span-9 flex flex-col gap-7"}>

            <section className={cn("w-full flex flex-col gap-7", productsBlockCV)}>
                <div className={"w-full flex flex-row items-baseline gap-3"}>
                    <Text text={"Продукты"} className={"font-medium sm:text-xl text-lg"}/>
                    <Text text={`Всего ${cart?.products.length} шт.`}
                          className={"text-sm sm:text-base text-text-gray"}/>
                </div>
                <section className={"flex flex-col gap-3 w-full sm:gap-7"}>
                    {cart?.products.map((product, productIndex) =>
                        <ShoppingCartProductCard card={product} key={productIndex}/>
                    )}
                </section>
            </section>
            <section className={"w-full flex flex-col gap-7"}>
                <div className={"w-full flex flex-row items-baseline gap-3"}>
                    <Text text={"Акции"} className={"font-medium sm:text-xl text-lg"}/>
                    <Text text={`Всего ${cart?.promos.length} шт.`}
                          className={"text-sm sm:text-base text-text-gray"}/>
                </div>
                <section className={"flex flex-col gap-3 sm:gap-7"}>
                    {cart?.promos.map((promo, promoIndex) =>
                        <ShoppingCartSaleCard promo={promo} key={promoIndex}/>
                    )}
                </section>
            </section>
        </section>
    )

}

export default CartContentBlock;
