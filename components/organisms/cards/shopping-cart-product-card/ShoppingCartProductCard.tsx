import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {FiTrash2} from "react-icons/fi";
import Counter from "@/components/moleculas/counter/Counter";
import {removeProductFromCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useUnit} from "effector-react";
import {useCounter} from "@/utlis/hooks/product/useCounter";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import Chip from "@/components/atoms/chip/Chip";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import {LinkedImage} from "@/components/organisms/cards/shopping-cart-product-card/LinkedImage/LinkedImage";
import {Price} from "@/components/organisms/cards/shopping-cart-product-card/Price/Price";
import {CounterRow} from "@/components/organisms/cards/shopping-cart-product-card/CounterRow/CounterRow";
import {
    ShoppingCartProductCardProps
} from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard.types";
import {cn} from "@/utlis/cn";

const headerRowCN = [
    "w-full flex",
    "md:flex-col md:gap-3 md:items-start",
    "xl:flex-row xl:justify-between xl:items-center"
]

const HeaderRow = ({ card, canInteract = true }: ShoppingCartProductCardProps) => {
    const [amount, increase, decrease] = useCounter(card.productId, card.quantity)
    const [price, newPrice] = useDiscount(card.price, card.discountPercent);
    const breakpoint = useBreakpoint();

    return (
        <div className={cn(headerRowCN)}>
            <div className={"flex flex-col gap-2"}>
                {!card.inStock && <Chip className={"bg-gray-100"}>
                    <Text text={"Нет в наличии"} className={"text-xs uppercase text-text-gray"}/>
                </Chip>}
                {breakpoint !== 'xl' ? (
                    <Price
                        price={price} newPrice={newPrice} amount={amount}
                        discountPercent={card.discountPercent}
                    />
                ) : null}
                <Text text={card.name} className={"max-w-[400px] text-base font-medium"}/>
            </div>
            <div className={"flex flex-row items-center gap-7"}>
                <CounterRow
                    canInteract={canInteract}
                    onIncrease={increase}
                    onDecrease={decrease}
                    amount={amount}
                    card={card}
                />
                {breakpoint === 'xl' ? (
                    <Price
                        price={price} newPrice={newPrice} amount={amount}
                        discountPercent={card.discountPercent}
                    />
                ) : null}
            </div>
        </div>
    )
}

const MobileHeaderRow = ({canInteract = true, ...props}: ShoppingCartProductCardProps) => {

    const removeProductFromCart = useUnit(removeProductFromCartEvent)

    const [amount, increase, decrease] = useCounter(props.card.productId, props.card.quantity)

    const [price, newPrice] = useDiscount(props.card.price, props.card.discountPercent)

    const handleDeleteProduct = () => removeProductFromCart({productId: props.card.productId})

    return (
        <section className={"md:hidden flex flex-col gap-2"}>
            {!props.card.inStock && <Chip className={"bg-gray-100"}>
                <Text text={"Нет в наличии"} className={"text-xs uppercase text-text-gray"}/>
            </Chip>}
            <Text text={props.card.name}/>
            <div className={"flex flex-row items-baseline gap-2"}>
                <Text
                    text={`${(newPrice * props.card.quantity).toFixed(2)} ₽`}
                    className={"text-lg text-link-blue font-semibold"}
                />
                {props.card.discountPercent !== 0 && <Text
                    text={`${(price * props.card.quantity).toFixed(2)} ₽`}
                    className={"text-text-gray line-through"}
                />}
            </div>
            {
                canInteract ? <div className={"flex flex-row items-center gap-7"}>
                    <Counter amount={amount} increase={increase} decrease={decrease}/>
                    <FiTrash2 size={"18px"} className={"text-info-red"} onClick={handleDeleteProduct}/>
                </div> : <Text
                    className={"text-base sm:text-lg text-text-gray"}
                    text={`${props.card.quantity} шт.`}
                />
            }
        </section>
    )

}

const ShoppingCartProductCard = (props: ShoppingCartProductCardProps) => {
    const breakpoint = useBreakpoint();

    return (
        <div className={cn("w-full flex flex-row gap-4 md:gap-5", props.className)}>
            <LinkedImage {...props}/>
            <div className={"w-full flex flex-col"}>
                {breakpoint !== 'sm' ? <HeaderRow {...props} /> : null}
                {breakpoint === 'sm' || breakpoint === 'init' ? <MobileHeaderRow {...props} /> : null}
            </div>
        </div>
    )
}

export default ShoppingCartProductCard;
