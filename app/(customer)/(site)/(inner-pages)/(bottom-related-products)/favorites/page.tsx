"use client"

import React, {useState} from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import {mockCardArray} from "@/data/productCardData";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";

const FavoritesHeaderRow = ({selectedCards}: { selectedCards: any[] }) => {
    return (
        <div className={"col-span-full h-fit flex flex-row items-center justify-between"}>

            <div className={"flex flex-row items-baseline gap-3"}>
                <Text text={"Избранное"} className={"text-[24px] font-medium"}/>
                <Text text={"Всего 6"} className={"text-base text-text-gray"}/>
            </div>

            <div className={"flex flex-row items-baseline gap-5"}>
                <Text text={`Удалить (${selectedCards.length})`} className={"pointer gray-text"}/>
                <Text text={"Удалить все"} className={"pointer red-text"}/>
            </div>

        </div>
    )
}

const FavoritesPage = () => {

    const [
        selectedCards,
        selectCards
    ] = useState<any[]>([])

    return (
        <InnerPageWrapper>
            <div className={"col-span-9 grid grid-cols-9 gap-[30px]"}>
                <FavoritesHeaderRow selectedCards={selectedCards}/>
                {
                    mockCardArray.map((card) => {
                        return <ProductCard productCard={card}/>
                    })
                }
            </div>
            <ShoppingCartTotalPriceCard amount={2} discount={1200} totalPrice={7600}/>
        </InnerPageWrapper>
    );

};

export default FavoritesPage;
