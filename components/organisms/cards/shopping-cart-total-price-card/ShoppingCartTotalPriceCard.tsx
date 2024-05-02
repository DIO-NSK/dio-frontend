import React from 'react';
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";

const ShoppingCartTotalPriceCard = ({products, buttonText, onClick}: {
    products: (ResponseCartItem | ResponseProductSearch)[],
    buttonText: string,
    onClick: () => void
}) => {

    const totalPriceWithoutDiscount = products.reduce((acc, item) => {
        const [_, price] = useDiscount(item.price, item.discountPercent)
        return "quantity" in item ? acc + price * item.quantity : acc + price
    }, 0)

    const totalPriceWithDiscount = products.reduce((acc, item) => {
        const [newPrice, _] = useDiscount(item.price, item.discountPercent)
        return "quantity" in item ? acc + newPrice * item.quantity : acc + newPrice
    }, 0.0)

    const totalAmount = products.reduce((acc, item) => {
        return "quantity" in item ? acc + item.quantity : acc + 1
    }, 0)

    const totalDiscount = totalPriceWithoutDiscount - totalPriceWithDiscount

    const rowCV: ClassValue = "w-full flex flex-row items-baseline justify-between"
    const textCV: ClassValue = "text-base text-text-gray"

    const cardRows = [
        {header: "Количество", data: totalAmount + " шт."},
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
                <Text text={`${totalPriceWithDiscount} ₽`} className={"text-[24px] font-medium text-link-blue"}/>
            </div>
            <Button
                hasSpinner={false}
                disabled={!products.length}
                text={products.length ? buttonText : "Корзина пуста"}
                onClick={onClick}
            />
        </StickyCardWrapper>
    );

};

export default ShoppingCartTotalPriceCard;
