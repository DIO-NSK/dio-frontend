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

const CartContentBlock = dynamic(
    () => import("@/components/organisms/loading-blocks/cart/CartContentBlock"),
    {loading: () => <Loading className={"col-span-9"}/>}
)

const CATALOG_PATH = "/catalog/4"

const emptyHeader = "Корзина пуста"
const emptyMessage = "Добавьте продукты в корзину и возвращайтесь снова!"

const ShoppingCartPage = () => {

    const router = useRouter()

    const [cart, getCart] = useUnit([$cart, getCartEvent])
    const switchPopupState = useStore(state => state.switchPopupState)

    const handleButtonClick = () => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN")
        if (accessToken) router.push("/cart/checkout")
        else switchPopupState("login")
    }

    useEffect(() => {
        if (!cart) {
            getCart()
        }
    }, []);

    if (cart) return (
        <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
            <HeaderRow header={"Корзина"} leftContent={`Всего ${cart.products.length}`}/>
            {
                cart.products.length ? (<CartContentBlock/>) :
                    (<EmptyPage
                        header={emptyHeader}
                        description={emptyMessage}
                        className={"col-span-9"}
                    >
                        <Button
                            text={"К продуктам"}
                            onClick={() => router.push(CATALOG_PATH)}
                        />
                    </EmptyPage>)
            }
            <ShoppingCartTotalPriceCard
                products={cart.products}
                buttonText={"Перейти к оформлению"}
                onClick={handleButtonClick}
            />
            <MobileCartInfoBlock
                infoBlockData={[]}
                buttonText={"Перейти к оформлению"}
                onSubmit={handleButtonClick}
            />
        </InnerPageWrapper>
    );

};

export default ShoppingCartPage;
