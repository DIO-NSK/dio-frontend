"use client"

import {ShoppingCartProductCardDTO} from "@/types/dto/cards/ProductCard";
import {ShoppingCartServiceCardDTO} from "@/types/dto/cards/ServiceCard";
import ShoppingCartGroupWrapper from "@/components/wrappers/shopping-cart-group-wrapper/ShoppingCartGroupWrapper";
import ShoppingCartServiceCard from "@/components/organisms/cards/shopping-cart-service-card/ShoppingCartServiceCard";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";

import CoolerImage from "@/public/images/shopping-cart-cooler.png"
import WaterImage from "@/public/images/shopping-cart-water.png"
import CoolerService from "@/public/images/shopping-cooler-service.png"
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";


const ShoppingCartPage = () => {

    const coolerProductCard: ShoppingCartProductCardDTO = {
        price: 4700,
        header: "Кулер Ecotronic M30-LXE black + silver",
        image: CoolerImage.src,
        productCode: 1060622,
        amount: 3
    }

    const waterProductCard: ShoppingCartProductCardDTO = {
        price: 320,
        header: "Вода «Горная Вершина» 1,5 л. 12 шт.",
        image: WaterImage.src,
        productCode: 3210288,
        amount: 2
    }

    const coolerServiceCard: ShoppingCartServiceCardDTO = {
        header: "Обслуживание пурифайера",
        deadline: "15.10.23",
        description: "Аренда может осуществляться как на краткосрочной основе, так и на длительный период.\n" +
            "Напольный кулер с нагревом и охлаждением и с холодильником на 16 литров",
        amount: 1,
        price: 0,
        image: CoolerService.src
    }

    const mockShoppingCartProducts = [
        {
            groupId: 1,
            items: [
                coolerProductCard,
                coolerServiceCard
            ]
        }, {
            groupId: 2,
            items: [
                waterProductCard,
                waterProductCard
            ]
        }
    ]

    return (
        <>
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
        </>
    );

};

export default ShoppingCartPage;
