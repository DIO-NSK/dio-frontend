"use client"

import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import React, {useEffect} from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$cart, getCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useStore} from "@/store/Store";
import dynamic from "next/dynamic";
import Loading from "@/components/mobile/loading/Loading";
import Button from "@/components/atoms/buttons/button/Button";
import EmptyPage from "@/components/organisms/empty-page/EmptyPage";
import {resetOrderToRepeatEvent} from "@/app/(customer)/profile/orders/model";

const CartContentBlock = dynamic(
    () => import("@/components/organisms/loading-blocks/cart/CartContentBlock"),
    {loading: () => <Loading className={"col-span-9"}/>}
)

const CATALOG_PATH = "/catalog/categories/3"

const emptyHeader = "Корзина пуста"
const emptyMessage = "Добавьте продукты в корзину и возвращайтесь снова!"

const ShoppingCartPage = () => {

    const router = useRouter()

    const [cart, getCart, resetOrderToRepeat] = useUnit([$cart, getCartEvent, resetOrderToRepeatEvent])
    const switchPopupState = useStore(state => state.switchPopupState)

    const handleButtonClick = () => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN")
        if (accessToken) {
            resetOrderToRepeat();
            router.push("/cart/checkout")
        } else switchPopupState("login")
    }

    useEffect(() => {
        getCart()
    }, []);

    if (cart) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <HeaderRow className={"md:flex hidden"} header={"Корзина"} leftContent={`Всего ${cart.products.length}`}/>
            {
                (cart.products.length || cart.promos.length) ? (<CartContentBlock/>) :
                    (<EmptyPage
                        header={emptyHeader}
                        description={emptyMessage}
                        className={"sm:col-span-9 sm:items-center sm:justify-center sm:ml-0"}
                    >
                        <Button
                            text={"К продуктам"}
                            onClick={() => router.push(CATALOG_PATH)}
                        />
                    </EmptyPage>)
            }
            <ShoppingCartTotalPriceCard
                promos={cart.promos}
                products={cart.products}
                buttonText={"Перейти к оформлению"}
                onClick={handleButtonClick}
            />
            {
                (cart.products.length !== 0 || cart.promos.length !== 0) && <MobileCartInfoBlock
                    infoBlockData={[]}
                    buttonText={"Перейти к оформлению"}
                    onSubmit={handleButtonClick}
                />
            }
        </InnerPageWrapper>
    );

};

export default ShoppingCartPage;
