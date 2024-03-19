"use client"

import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import React, {useEffect} from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import {InfoBlockElement} from "@/types/dto/text";
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$cart, getCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const ShoppingCartPage = () => {

    const router = useRouter()
    const [cart, getCart] = useUnit([$cart, getCartEvent])

    const infoBlockData: InfoBlockElement[] = [
        {header: "Количество", description: `${cart?.responseCart.products.length} шт.`},
        {header: "Скидка", description: "7249 ₽"},
        {header: "Итого", description: "4700 ₽", className: "text-link-blue text-[20px] font-medium"},
    ]

    const handleSubmit = () => router.push("/mobile/checkout/step-1")

    useEffect(() => {
        getCart()
    }, [getCart])

    if (cart) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <HeaderRow header={"Корзина"} leftContent={`Всего ${cart.responseCart.products.length}`}/>
            <section className={"flex flex-col gap-3 sm:col-span-9 sm:-pt-5 sm:gap-7"}>
                {cart.responseCart.products.map((product, productIndex) =>
                    <ShoppingCartProductCard card={product} key={productIndex}/>
                )}
            </section>
            <ShoppingCartTotalPriceCard/>
            <MobileCartInfoBlock
                infoBlockData={infoBlockData}
                buttonText={"Перейти к оформлению"}
                onSubmit={handleSubmit}
            />
        </InnerPageWrapper>
    );

};

export default ShoppingCartPage;
