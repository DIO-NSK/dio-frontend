"use client"

import React, {useEffect} from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import Button from "@/components/atoms/buttons/button/Button";
import {InfoBlockElement} from "@/types/dto/text";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import {useUnit} from "effector-react";
import {
    $favourites,
    getFavouritesEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {addAllToCartEvent} from "@/components/organisms/cards/product-price-card/model";
import {getCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const FavoritesHeaderRow = ({selectedCards}: { selectedCards: any[] }) => {

    const handleDeleteAllProducts = () => console.log("Delete All Products")
    const handleDeleteSelectedProducts = () => console.log("Delete Selected Products")

    return (
        <div className={"w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>

            <div className={"flex flex-row items-baseline gap-2"}>
                <Text text={"Избранное"} className={"text-[20px] sm:text-[24px] font-medium"}/>
                <Text text={`Всего ${selectedCards.length}`} className={"text-[14px] sm:ext-base text-text-gray"}/>
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

    const [favourites, getFavourites, getCart, addAllToCart]
        = useUnit([$favourites, getFavouritesEvent, getCartEvent, addAllToCartEvent])

    const infoBlockData: InfoBlockElement[] = [
        {
            header: "Выбрано",
            description: `${favourites?.products.length} шт.`
        },
        {
            header: "Итого",
            description: `${favourites?.products
                .reduce((acc, item) =>
                    acc + item.price - 0.01 * item.price * item.discountPercent, 0)} ₽`,
            className: "text-link-blue font-medium text-[20px]"
        },
    ]

    const handleButtonClick = () => {
        const productItemIds = favourites?.products.map(item => item.id)
        if (productItemIds) addAllToCart(productItemIds)
    }

    useEffect(() => {
        getCart()
        getFavourites()
    }, [])

    if (favourites) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>

            <div className={"w-full sm:col-span-9 flex flex-col gap-7"}>
                <FavoritesHeaderRow selectedCards={[]}/>
                <section className={"w-full flex flex-col gap-3 sm:gap-7 sm:grid sm:grid-cols-9"}>
                    {favourites.products.map((card, index) => {

                        const productCard: ResponseProductSearch = {
                            ...card, image: card.image
                        }

                        return <ProductCard
                            classNames={{mainWrapper: "w-full"}}
                            productCard={productCard}
                            key={index}
                        />

                    })}
                </section>
            </div>

            <ShoppingCartTotalPriceCard
                products={favourites.products}
                onClick={handleButtonClick}
                buttonText={"Добавить все в корзину"}
            />

            <MobileCartInfoBlock
                infoBlockData={infoBlockData}
                buttonText={"Добавить все в корзину"}
                onSubmit={handleButtonClick}
            />

        </InnerPageWrapper>
    );

};

export default FavoritesPage;
