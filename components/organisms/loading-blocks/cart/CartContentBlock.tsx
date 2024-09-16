import React from 'react';
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useUnit} from "effector-react";
import {ProductsGroup} from "@/components/organisms/loading-blocks/cart/ProductsGroup/ProductsGroup";
import {SalesGroup} from "@/components/organisms/loading-blocks/cart/SalesGroup/SalesGroup";

const CartContentBlock = () => {
    const cart = useUnit($cart)

    return (
        <section className={"w-full md:col-span-8 xl:col-span-9 flex flex-col gap-7"}>
            {cart?.products.length !== 0 ? <ProductsGroup/> : null}
            <div className={'hidden xl:flex w-full h-[2px] bg-light-gray'}/>
            {cart?.promos.length !== 0 ? <SalesGroup/> : null}
        </section>
    )
}

export default CartContentBlock;
