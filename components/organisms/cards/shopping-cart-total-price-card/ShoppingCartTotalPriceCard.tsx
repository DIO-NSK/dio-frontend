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
import {MINIMUM_CART_PRICE, MINIMUM_OUR_WATER_AMOUNT_IN_CART, OUR_WATER_CATEGORY_ID} from "@/constants";

const rowCV: ClassValue = "w-full flex flex-row items-baseline justify-between"
const textCV: ClassValue = "text-base text-text-gray"

type CartItem = ResponseCartItem | ResponseProductSearch;

const validateCart = (totalPrice: number, products: CartItem[]) => {
    const waterAmountInCart = products.reduce((acc, item) => {
        if ((item as ResponseCartItem).categoryId === OUR_WATER_CATEGORY_ID) {
            return acc + (item as ResponseCartItem).quantity;
        } return acc;
    }, 0);

    return waterAmountInCart >= MINIMUM_OUR_WATER_AMOUNT_IN_CART || totalPrice >= MINIMUM_CART_PRICE;
}

const ShoppingCartTotalPriceCard = ({products, promos, buttonText, onClick}: {
    products: CartItem[],
    promos: ResponseCartSaleItem[],
    buttonText: string,
    onClick: () => void
}) => {

    const hasProductNotInStock = products.some(product => !product.inStock)
    const hasSaleNotInStock = promos.some(promo => !promo.products.some(product => !product.inStock))
    const hasItemInStock = hasSaleNotInStock || hasProductNotInStock;

    const totalProductsActualPrice = products.reduce((acc, item) => {
        const [_, newPrice] = useDiscount(item.price, item.discountPercent)
        return "quantity" in item ? acc + newPrice * item.quantity : acc + newPrice
    }, 0)

    const totalPromosPrice = promos.reduce((acc, promo) => {
        return "quantity" in promo ? acc + promo.price * promo.quantity : acc + (promo as any).price
    }, 0)

    const totalProductsOldPrice = products.reduce((acc, item) => {
        const [oldPrice, _] = useDiscount(item.price, item.discountPercent)
        return "quantity" in item ? acc + oldPrice * item.quantity : acc + oldPrice
    }, 0.0)

    const totalProductsAmount = products.reduce((acc, item) => {
        return "quantity" in item ? acc + item.quantity : acc + 1
    }, 0)

    const totalPromosAmount = promos.reduce((acc, promo) => {
        return "quantity" in promo ? acc + promo.quantity : acc + 1
    }, 0)

    const totalActualPrice = totalProductsActualPrice + totalPromosPrice;
    const totalDiscount = totalProductsOldPrice - totalProductsActualPrice;
    const totalItemsAmount = totalProductsAmount + totalPromosAmount;

    const isValidCart = validateCart(totalActualPrice, products);

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
                    text={`${totalActualPrice.toFixed(2)} ₽`}
                    className={"text-[24px] font-medium text-link-blue"}
                />
            </div>
            {!isValidCart ? (
                <Text
                    text={'Стоимость заказа должна быть от 800₽ или заказ должен содержать минимум две 19-ти литровые воды.'}
                    className={'text-text-gray text-sm pt-5 border-t-2 border-light-gray'}
                />
            ) : null}
            <Button
                hasSpinner={false} disabled={!(hasItemInStock || isValidCart)}
                text={buttonText} onClick={onClick}
            />
        </StickyCardWrapper>
    );

};

export default ShoppingCartTotalPriceCard;
