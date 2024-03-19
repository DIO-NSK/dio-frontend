import React from 'react';
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const ShoppingCartTotalPriceCard = () => {

    const cart = useUnit($cart)
    if (!cart) return

    const {products} = cart.responseCart
    const totalPriceWithoutDiscount = products.reduce((acc, item) => acc + item.price, 0)
    const totalDiscount = products.reduce((acc, item) => acc + 0.01 * item.discountPercent * item.price, 0.0)
    const totalPriceWithDiscount = totalPriceWithoutDiscount - totalDiscount
    const totalAmount = products.length

    const router = useRouter()
    const pathname = usePathname()

    const rowCV: ClassValue = "w-full flex flex-row items-baseline justify-between"
    const textCV: ClassValue = "text-base text-text-gray"

    const cardRows = [
        {header: "Количество", data: totalAmount + " шт."},
        {header: "Скидка", data: totalDiscount.toFixed(2) + " ₽"},
    ]

    const handleButtonClick = () => router.push(pathname.concat('/checkout'))

    return (
        <StickyCardWrapper startCol={"col-start-10"}>
            <div className={"border-b-2 border-light-gray"}>
                {
                    cardRows.map((row) =>
                        <div className={cn(rowCV, "pb-5")}>
                            <Text text={row.header} className={cn(textCV)}/>
                            <Text text={row.data} className={cn(textCV)}/>
                        </div>
                    )
                }
            </div>
            <div className={cn(rowCV)}>
                <Text text={"Итого"} className={cn(textCV)}/>
                <Text text={`${totalPriceWithDiscount} ₽`} className={"text-[24px] font-medium text-link-blue"}/>
            </div>
            <Button text={"Перейти к оформлению"} onClick={handleButtonClick}/>
        </StickyCardWrapper>
    );

};

export default ShoppingCartTotalPriceCard;
