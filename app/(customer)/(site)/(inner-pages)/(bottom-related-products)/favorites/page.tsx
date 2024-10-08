"use client"

import React, {useEffect} from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import {InfoBlockElement} from "@/types/dto/text";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import {useUnit} from "effector-react";
import {
    $favourites,
    getFavouritesEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";
import {addAllToCartEvent} from "@/components/organisms/cards/product-price-card/model";
import dynamic from "next/dynamic";
import Loading from "@/components/mobile/loading/Loading";
import EmptyPage from "@/components/organisms/empty-page/EmptyPage";
import Button from "@/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";

const FavoritesContentBlock = dynamic(
    () => import("@/components/organisms/loading-blocks/favorites/FavoritesContentBlock"),
    {loading: () => <Loading className={"col-span-9"}/>}
)

const CATALOG_PATH = "/catalog/categories/3"
const emptyHeader = "Нет избранных товаров"
const emptyMessage = "Добавьте продукты в избранное и возвращайтесь снова!"

const FavoritesHeaderRow = ({selectedCards}: { selectedCards: any[] }) => {
    return (
        <div className={"w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
            <div className={"flex flex-row items-baseline gap-2"}>
                <Text text={"Избранное"} className={"text-[20px] sm:text-[24px] font-medium"}/>
                <Text text={`Всего ${selectedCards.length}`} className={"text-[14px] sm:ext-base text-text-gray"}/>
            </div>
        </div>
    )
}

const FavoritesPage = () => {

    const router = useRouter()

    const [favourites, getFavourites, addAllToCart]
        = useUnit([$favourites, getFavouritesEvent, addAllToCartEvent])

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
        getFavourites()
    }, [])

    if (favourites) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>

            {
                favourites.products.length ? (
                        <div className={"w-full md:col-span-8 xl:col-span-9 flex flex-col md:gap-5 xl:gap-7"}>
                            <FavoritesHeaderRow selectedCards={favourites.products}/>
                            <FavoritesContentBlock products={favourites.products}/>
                        </div>
                    ) :
                    (<EmptyPage
                        className={"sm:col-span-9 sm:items-center sm:justify-center sm:ml-0"}
                        header={emptyHeader} description={emptyMessage}
                    >
                        <Button onClick={() => router.push(CATALOG_PATH)} text={"К продуктам"}/>
                    </EmptyPage>)
            }

            <ShoppingCartTotalPriceCard
                promos={[]}
                products={favourites.products}
                onClick={handleButtonClick}
                buttonText={"Добавить все в корзину"}
            />

            {
                favourites.products.length !== 0 && <MobileCartInfoBlock
                    infoBlockData={infoBlockData}
                    buttonText={"Добавить все в корзину"}
                    onSubmit={handleButtonClick}
                />
            }

        </InnerPageWrapper>
    );

};

export default FavoritesPage;
