"use client"

import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useStore} from "@/store/Store";

const ShoppingCartPage = () => {

    const pathname = usePathname()
    const router = useRouter()

    const cart = useUnit($cart)
    const switchPopupState = useStore(state => state.switchPopupState)

    const handleSubmit = () => router.push("/mobile/checkout/step-1")

    const handleButtonClick = () => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN")
        if (accessToken) router.push(pathname.concat("/checkout"))
        else switchPopupState("signup")
    }

    if (cart) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <HeaderRow header={"Корзина"} leftContent={`Всего ${cart.responseCart.products.length}`}/>
            <section className={"flex flex-col gap-3 sm:col-span-9 sm:-pt-5 sm:gap-7"}>
                {cart.responseCart.products.map((product, productIndex) =>
                    <ShoppingCartProductCard card={product} key={productIndex}/>
                )}
            </section>
            <ShoppingCartTotalPriceCard
                products={cart.responseCart.products}
                buttonText={"Перейти к оформлению"}
                onClick={handleButtonClick}
            />
            <MobileCartInfoBlock
                infoBlockData={[]}
                buttonText={"Перейти к оформлению"}
                onSubmit={handleSubmit}
            />
        </InnerPageWrapper>
    );

};

export default ShoppingCartPage;
