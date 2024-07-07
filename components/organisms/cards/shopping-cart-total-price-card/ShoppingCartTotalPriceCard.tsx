import React from 'react';
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {
    ResponseCartItem,
    ResponseCartSaleItem
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";

const ShoppingCartTotalPriceCard = ({products, promos, buttonText, onClick}: {
    products: (ResponseCartItem | ResponseProductSearch)[],
    promos: ResponseCartSaleItem[],
    buttonText: string,
    onClick: () => void
}) => {

    const hasProductNotInStock = products.some(product => !product.inStock)
    const hasSaleNotInStock = promos.some(promo => !promo.products.some(product => !product.inStock))
    const hasItemInStock = hasSaleNotInStock || hasProductNotInStock;

    const totalProductsPriceWithoutDiscount = products.reduce((acc, item) => {
        const [_, price] = useDiscount(item.price, item.discountPercent)
        return "quantity" in item ? acc + price * item.quantity : acc + price
    }, 0)

    const totalPromosPrice = promos.reduce((acc, promo) => {
        return "quantity" in promo ? acc + promo.price * promo.quantity : acc + (promo as any).price
    }, 0)

    const totalProductsPriceWithDiscount = products.reduce((acc, item) => {
        const [newPrice, _] = useDiscount(item.price, item.discountPercent)
        return "quantity" in item ? acc + newPrice * item.quantity : acc + newPrice
    }, 0.0)

    const totalProductsAmount = products.reduce((acc, item) => {
        return "quantity" in item ? acc + item.quantity : acc + 1
    }, 0)

    const totalPromosAmount = promos.reduce((acc, promo) => {
        return "quantity" in promo ? acc + promo.quantity : acc + 1
    }, 0)

    const totalPriceWithoutDiscount = totalProductsPriceWithoutDiscount + totalPromosPrice;
    const totalDiscount = totalProductsPriceWithoutDiscount - totalProductsPriceWithDiscount;
    const totalPriceWithDiscount = totalPriceWithoutDiscount - totalDiscount;
    const totalItemsAmount = totalProductsAmount + totalPromosAmount;

    const rowCV: ClassValue = "w-full flex flex-row items-baseline justify-between"
    const textCV: ClassValue = "text-base text-text-gray"

    const cardRows = [
        {header: "Количество", data: totalItemsAmount + " шт."},
        {header: "Скидка", data: totalDiscount.toFixed(2) + " ₽"},
    ]

    return (
        <StickyCardWrapper startCol={"col-start-10"}>
            <div className={"border-b-2 border-light-gray"}>
                {cardRows.map((row) =>
                    <div className={cn(rowCV, "pb-5")}>
                        <Text text={row.header} className={cn(textCV)}/>
                        <Text text={row.data} className={cn(textCV)}/>
                    </div>
                )}
            </div>
            <div className={cn(rowCV)}>
                <Text text={"Итого"} className={cn(textCV)}/>
                <Text
                    text={`${totalPriceWithDiscount.toFixed(2)} ₽`}
                    className={"text-[24px] font-medium text-link-blue"}
                />
            </div>
            <Button
                hasSpinner={false}
                disabled={false}
                text={products.length || promos.length ? buttonText : "Корзина пуста"}
                onClick={onClick}
            />
        </StickyCardWrapper>
    );

};

export default ShoppingCartTotalPriceCard;
