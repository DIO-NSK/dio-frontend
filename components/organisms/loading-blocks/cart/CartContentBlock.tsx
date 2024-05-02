import React from 'react';
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const CartContentBlock = ({products}: { products: ResponseCartItem[] }) => (
    <section className={"flex flex-col gap-3 sm:col-span-9 sm:-pt-5 sm:gap-7"}>
        {products.map((product, productIndex) =>
            <ShoppingCartProductCard card={product} key={productIndex}/>
        )}
    </section>
)

export default CartContentBlock;
