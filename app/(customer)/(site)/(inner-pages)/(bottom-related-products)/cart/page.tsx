"use client"

import {ShoppingCartProductCardDTO} from "@/types/dto/admin/cards/ProductCard";
import {ShoppingCartServiceCardDTO} from "@/types/dto/admin/cards/ServiceCard";
import ShoppingCartGroupWrapper from "@/components/wrappers/shopping-cart-group-wrapper/ShoppingCartGroupWrapper";
import ShoppingCartServiceCard from "@/components/organisms/cards/shopping-cart-service-card/ShoppingCartServiceCard";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {mockShoppingCartProducts} from "@/data/shoppingCartProducts";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import {InfoBlockElement} from "@/types/dto/text";
import {useRouter} from "next/navigation";


const ShoppingCartPage = () => {

    const router = useRouter()

    const infoBlockData : InfoBlockElement[] = [
        {header : "Количество", description : "2 шт."},
        {header : "Скидка", description : "7249 ₽"},
        {header : "Итого", description : "4700 ₽", className : "text-link-blue text-[20px] font-medium"},
    ]

    const handleSubmit = () => router.push("/mobile/checkout/step-1")

    return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <HeaderRow header={"Корзина"} leftContent={"Всего 6"}/>
            <div className={"flex flex-col gap-3 sm:col-span-9 sm:-pt-5 sm:gap-7"}>
                {
                    mockShoppingCartProducts.map((group) =>
                        <ShoppingCartGroupWrapper>
                            {
                                group.items.map((item) =>
                                    (item as ShoppingCartServiceCardDTO).description
                                        ? <ShoppingCartServiceCard card={item as ShoppingCartServiceCardDTO}/>
                                        : <ShoppingCartProductCard card={item as ShoppingCartProductCardDTO}/>)
                            }
                        </ShoppingCartGroupWrapper>)
                }
            </div>
            <ShoppingCartTotalPriceCard
                amount={3}
                discount={7429}
                totalPrice={4700}
            />
            <MobileCartInfoBlock
                infoBlockData={infoBlockData}
                buttonText={"Перейти к оформлению"}
                onSubmit={handleSubmit}
            />
        </InnerPageWrapper>
    );

};

export default ShoppingCartPage;
