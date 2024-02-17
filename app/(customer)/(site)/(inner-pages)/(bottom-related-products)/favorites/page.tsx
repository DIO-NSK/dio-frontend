"use client"

import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import {mockCardArray} from "@/data/productCardData";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import Button from "@/components/atoms/buttons/button/Button";
import {InfoBlockElement} from "@/types/dto/text";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";

const FavoritesHeaderRow = ({selectedCards}: { selectedCards: any[] }) => {

    const handleDeleteAllProducts = () => console.log("Delete All Products")
    const handleDeleteSelectedProducts = () => console.log("Delete Selected Products")

    return (
        <div
            className={"w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>

            <div className={"flex flex-row items-baseline gap-2"}>
                <Text text={"Избранное"} className={"text-[20px] sm:text-[24px] font-medium"}/>
                <Text text={"Всего 6"} className={"text-[14px] sm:ext-base text-text-gray"}/>
            </div>

            <div className={"hidden sm:flex flex-row items-baseline gap-5"}>
                <Text
                    onClick={handleDeleteSelectedProducts}
                    text={`Удалить (${selectedCards.length})`}
                    className={"pointer gray-text"}
                />
                <Text
                    onClick={handleDeleteAllProducts}
                    className={"pointer red-text"}
                    text={"Удалить все"}
                />
            </div>

            <div className={"sm:hidden w-full flex flex-row gap-3"}>
                <Button
                    disabled={selectedCards.length === 0}
                    classNames={{button: "w-full"}}
                    onClick={handleDeleteSelectedProducts}
                    text={`Удалить (${selectedCards.length})`}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
                <Button
                    classNames={{button: "text-info-red bg-red-50 w-full"}}
                    onClick={handleDeleteAllProducts}
                    buttonType={"SECONDARY"}
                    text={"Удалить все"}
                    size={"sm"}
                />
            </div>

        </div>
    )
}

const FavoritesPage = () => {

    const infoBlockData: InfoBlockElement[] = [
        {header: "Выбрано", description: "2 шт."},
        {header: "Итого", description: "4700 ₽", className: "text-link-blue font-medium text-[20px]"},
    ]

    const handleSubmit = () => console.log("Items submitted")

    return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <div className={"w-full sm:col-span-9 flex flex-col gap-7"}>
                <FavoritesHeaderRow selectedCards={[]}/>
                <section className={"w-full flex flex-col gap-3 sm:gap-7 sm:grid sm:grid-cols-9"}>
                    {
                        mockCardArray.map((card) => {
                            return <ProductCard
                                classNames={{mainWrapper: "w-full"}}
                                productCard={card}
                            />
                        })
                    }
                </section>
            </div>

            <ShoppingCartTotalPriceCard amount={2} discount={1200} totalPrice={7600}/>
            <MobileCartInfoBlock
                infoBlockData={infoBlockData}
                buttonText={"В корзину"}
                onSubmit={handleSubmit}
            />
        </InnerPageWrapper>
    );

};

export default FavoritesPage;
