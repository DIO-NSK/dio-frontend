"use client"

import {ShoppingCartProductCardDTO} from "@/types/dto/cards/ProductCard";
import {ShoppingCartServiceCardDTO} from "@/types/dto/cards/ServiceCard";
import ShoppingCartGroupWrapper from "@/components/wrappers/shopping-cart-group-wrapper/ShoppingCartGroupWrapper";
import ShoppingCartServiceCard from "@/components/organisms/cards/shopping-cart-service-card/ShoppingCartServiceCard";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {mockShoppingCartProducts} from "@/data/shoppingCartProducts";


const ShoppingCartPage = () => {

    return (
        <InnerPageWrapper>
            <HeaderRow header={"Корзина"} leftContent={"Всего 6"}/>
            <div className={"col-span-9 pt-5 flex flex-col gap-[50px]"}>
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
        </InnerPageWrapper>
    );

};

export default ShoppingCartPage;
